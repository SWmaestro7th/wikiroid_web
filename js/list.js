var contextList;

function contextView(name) {
	socket.emit('query', {"name": name});
}

function contextDelete(name) {
    socket.emit('remove', {"name": name});   
}

function viewCategory(category_data) {
    $('#view_category_name').val(category_data['name']);
    $('#view_category_desc').val(category_data['desc']);
    $('#view_file').val(category_data['findCode']);
    $('#view_corpus').val(category_data['corpus'].join("\n"));

    $('#view-when-form').removeClass('hidden').addClass('hidden');
    $('#view-where-form').removeClass('hidden').addClass('hidden');
    $('#view-what-form').removeClass('hidden').addClass('hidden');
    $('#view-who-form').removeClass('hidden').addClass('hidden');
    $('#view-details-form').removeClass('hidden').addClass('hidden');
    $('#view_when').attr("checked", false); 
    $('#view_where').attr("checked", false); 
    $('#view_what').attr("checked", false); 
    $('#view_who').attr("checked", false); 
    $('#view_details').attr("checked", false); 
    $('#delete-btn').attr("onclick", "return contextDelete('" + category_data['name'] + "')")

    for(var i in category_data['distMethod']){
		$('#view-'+i+'-form').removeClass('hidden');
		$('#view_'+i).attr("checked", true); 
		$('#view_'+i+'-features').val(category_data['reprDict'][i].join("\n"));
		if(category_data['distMethod'][i] == 'w')
			$('#view_' + i + '-select option:eq(0)').attr("selected", "selected");
		else if(category_data['distMethod'][i] == 'e')
			$('#view_' + i + '-select option:eq(1)').attr("selected", "selected");
	}
    $('#viewModal').modal('show');
}

$(document).ready(function () {
	socket.emit('ask_list');
});

socket.on('new_result', function(msg) {
    alert("카테고리를 추가하였습니다.");
    $('#myModal').modal('hide');   
});

socket.on('remove_result', function(msg) {
    if(msg == 'Succeed') {
        alert("삭제되었습니다.");
    }
    else alert("삭제하는 데 실패했습니다.");
    $('#viewModal').modal('hide');   
});

socket.on('info', function(msg) {
	viewCategory(msg);
});

socket.on('list', function(msg) {
	contextList = msg;
	$(".context").remove();
    for(i=0; i<msg.length; i++) {
    	var template =  '<div class="col-md-4 context" style="padding: 1em; height: 19em" onClick="return contextView(' + "'" + msg[i]['name'] + "'" + ')"> \
            <h4>' + msg[i]['name'] + '</h4>\
            <p>' + msg[i]['desc'] + '</p>\
            <hr>\
            <div class="outgoing-full">' + msg[i]['corpus'][0] + '</div>\
            <div class="outgoing-full">' + msg[i]['corpus'][1] + '</div>\
        </div>';
       	$(".description").append(template);
		$(".description")[0].scrollTop = $(".description")[0].scrollHeight;
    }
});