Array.prototype.remove = function(elem, all) {
  for (var i=this.length-1; i>=0; i--) {
    if (this[i] === elem) {
        this.splice(i, 1);
        if(!all)
          break;
    }
  }
  return this;
};

function getBase64(file) {
   var reader = new FileReader();
   reader.readAsText(file);
   reader.onload = function () {
     console.log(reader.result);
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}

function newCategory() {
    var python_file = document.querySelector('input[type="file"]').files[0];
    var reader = new FileReader();
    try {
      reader.readAsText(python_file);
      reader.onload = function () {
          //console.log(reader.result);
          var category_data = {'name': $("input[id=category_name]").val(),
                               'desc': $("input[id=category_desc]").val(),
                               'corpus': $('#corpus').val().split('\n').remove('', true),
                               'reprDict': {},
                               'findFunc': reader.result,
                               'distMethod': {}
                              };
          $('.param').each(function(idx, item) {
              if($(item).prop('checked')) {
                  category_data['reprDict'][$(item).attr('id')] = $('#' + $(item).attr('id') + '-features').val().split('\n').remove('', true);
                  selected_idx = $('#' + $(item).attr('id') + '-select option').index($('#' + $(item).attr('id') + '-select option:selected'));
                  if(selected_idx == 0) {
                      category_data['distMethod'][$(item).attr('id')] = "w";
                  }
                  else {
                      category_data['distMethod'][$(item).attr('id')] = "e";
                  }
              }
          });
          socket.emit('new', category_data);
      };
    }
    catch(err) {
      alert("Check your file!");
    }
}

$(document).ready(function () {
    //console.log(JSON.stringify("[{'corpus': [u'\uae00\ub77c\uc6b0\ubca0\ud398\uc774\ud1a0\uc790\ud504\ub85c\ud544\uc744\uc54c\uace0\uc2f6\ub124\uc694\uc2e0\uc7a5\uc740193CM\ub77c\ub294\uac74\uc54c\uace0\uc788\uace0\uadf8\uc678', u'\ud55c\uac00\uc778\uc758\ud0a4\uc640\ubab8\ubb34\uac8c\ub294??'], 'name': u'People', 'desc': u'Desc: People'}, {'corpus': [u'5\uc6d45\uc77c\uc790\ub86f\ub3c4\ub2f9\ucca8\ubc88\ud638\uc54c\ub824\uc8fc\uc138\uc694', u'\uc774\ubc88\uc8fc\ub85c\ub610\ubc88\ud638\uc694'], 'name': u'Lotto', 'desc': u'Desc: Lotto'}, {'corpus': [u'\uc624\ub298 \ub0a0\uc528 \uc5b4\ub54c\uc694??', u'\uc624\ub298\ub0a0\uc528\ub294~?'], 'name': u'Weather', 'desc': u'Desc: Weather'}]"));
    $('#python').click(function() {
        newCategory();
    });
    $('#reset').click(function() {
        $('#reset1').click();
        $('#reset2').click();
        $('.param').each(function() {
            var this_id = $(this).attr('id') + '-form';
            $('#' + this_id).removeClass('hidden');
            if(!$(this).prop('checked')) {
                $('#' + this_id).addClass('hidden');
            }
        });
    });
    $('.param').change(function() {
        var this_id = $(this).attr('id') + '-form';
        $('#' + this_id).removeClass('hidden');
        if(!$(this).prop('checked')) {
            $('#' + this_id).addClass('hidden');
        }
    });
    $('#chat-input').keypress(function (e) {
      if (e.which == 13) {
        $('#input-button').click();
      }
    });
    $('#input-button').click(function() {
        var txt = $("input[id=chat-input]").val();
        $("input[id=chat-input]").val("");
        var msg = '<div class="message-wrapper">\
            <div class="message outgoing">\
                <div class="message-inner">' + 
                    txt    
            +   '</div>\
            </div>\
        </div>'
        $( ".messages-inner" ).append(msg);
        $("input[id=chat-input]").focus();
        socket.emit('query', {question: txt});
        $(".chat-container")[0].scrollTop = $(".chat-container")[0].scrollHeight;
    });
});