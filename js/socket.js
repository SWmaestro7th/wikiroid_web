//var socket = io.connect('http://soma.yun.do:10101');
var socket = io.connect('http://server.artech.works:10000');
socket.on('connect', function() {
    
});

socket.on('classifier', function(msg) {
	var template = '<li>\
                    <div class="timeline-badge danger"><i class="fa fa-sitemap"></i>\
                    </div>\
                    <div class="timeline-panel">\
                        <div class="timeline-heading">\
                            <h4 class="timeline-title">메시지의 맥락이 파악되었습니다.</h4>\
                            <p><small class="text-muted"><i class="fa fa-pie-chart"></i> via <b>Context Classifier</b></small>\
                            </p>\
                        </div>\
                        <div class="timeline-body">\
                            <table class="table">\
                                <thead>\
                                    <tr>\
                                        <th>Function</th>\
                                        <th>Possibilty</th>\
                                    </tr>\
                                </thead>\
                                <tbody>\
                                    <tr style="background-color: #555555; font-weight: bold">\
                                        <td>' + msg[0][0] + '</td>\
                                        <td>' + (msg[0][1] * 100).toFixed(2) + '%</td>\
                                    </tr>';

                                    for(i=1; i<msg.length; i++) {
                                    	template += '<tr>\
				                                        <td>' + msg[i][0] + '</td>\
				                                        <td>' + (msg[i][1] * 100).toFixed(2) + '%</td>\
				                                    </tr>'
                                    }
                   template += '</tbody>\
                            </table>\
                            <p>위와 같은 확률에 근거하여, Context Classifier가 적절한 대응 함수를 발견했습니다.</p>\
                        </div>\
                    </div>\
                    \
                    <div class="timeline-panel-add">\
                        <div class="timeline-heading">\
                            <h4 class="timeline-title">매개변수를 특정지으십시오.</h4>\
                            <p><small class="text-muted"><i class="fa fa-check-circle-o"></i> via <b>Context Classifier</b></small>\
                            </p>\
                        </div>\
                        <div class="timeline-body">\
                            <p><b>findWeather</b> 함수는 <i>Morpheme-based Parameter Extractor</i>를 사용하여 <b>[when, where]</b>를 추출하기를 요구합니다.</p>\
                        </div>\
                    </div>\
                </li>';

    $(".timeline").append(template);
	$(".description")[0].scrollTop = $(".description")[0].scrollHeight;
});

socket.on('extractor', function(msg) {
    var template = '<li>\
                        <div class="timeline-badge warning"><i class="fa fa-tags"></i>\
                        </div>\
                        <div class="timeline-panel">\
                            <div class="timeline-heading">\
                                <h4 class="timeline-title">매개변수가 특정되었습니다.</h4>\
                                <p><small class="text-muted"><i class="fa fa-pie-chart"></i> via <b>Morpheme-based Parameter Extractor</b></small>\
                                </p>\
                            </div>\
                            <div class="timeline-body">\
                                <table class="table table-striped">\
                                    <thead>\
                                        <tr>\
                                            <th>5W</th>\
                                            <th>Substring</th>\
                                            <th>Possibilty</th>\
                                        </tr>\
                                    </thead>\
                                    <tbody>';
                                        $.each(msg, function(index, value) {
                                            if(value.length > 0) {
                                                template += '<tr>\
                                                                <td>' + index +'</td>\
                                                                <td>' + value[0][0] +'</td>\
                                                                <td>' + (value[0][1] * 100).toFixed(2) +'%</td>\
                                                            </tr>'
                                                for(i=1; i<value.length; i++){
                                                    template += '<tr>\
                                                                    <td>' + '' +'</td>\
                                                                    <td>' + value[i][0] +'</td>\
                                                                    <td>' + (value[i][1] * 100).toFixed(2) +'%</td>\
                                                                </tr>'
                                                }
                                            }
                                        }); 
                                        
                        template += '</tbody>\
                                </table>\
                                <p>형태소 단위 유사도 분석을 마쳤습니다.</p>\
                            </div>\
                        </div>\
                    </li>';
                    
    $(".timeline").append(template);
    $(".description")[0].scrollTop = $(".description")[0].scrollHeight;    
});

socket.on('new_category', function(msg) {
    alert(msg);
});

socket.on('error', function(msg) {
    alert(msg);
});

socket.on('reply', function(msg) {
    var template = '<li>\
                    <div class="timeline-badge success"><i class="fa fa-code"></i>\
                    </div>\
                    <div class="timeline-panel">\
                        <div class="timeline-heading">\
                            <h4 class="timeline-title">함수를 실행했습니다.</h4>\
                            <p><small class="text-muted"><i class="fa fa-check-circle"></i> via <b>findWeather(오늘, 강남)</b></small>\
                            </p>\
                        </div>\
                        <div class="timeline-body">\
							<div class="incoming-full">' + msg + '</div>\
                        </div>\
                    </div>\
                </li>'

    $(".timeline").append(template);

	var msg = '<div class="message-wrapper">\
	                <div class="message incoming">\
	                    <div class="message-inner">' + 
	                        msg
	                +   '</div>\
	                </div>\
	            </div>'
    $( ".messages-inner" ).append(msg);
    $(".chat-container")[0].scrollTop = $(".chat-container")[0].scrollHeight;
	$(".description")[0].scrollTop = $(".description")[0].scrollHeight;
});

socket.on('get', function(msg) {
	var template = '<li class="timeline-inverted">\
        <div class="timeline-badge info"><i class="fa fa-commenting"></i></div>\
            <div class="timeline-panel">\
                <div class="timeline-heading">\
                    <h4 class="timeline-title">' +
                    	'새로운 메시지가 도착했습니다.'
                  +'</h4>\
                    <small class="text-muted"><i class="fa fa-comment"></i> via User Input</small>\
                </div>\
				<div class="timeline-body">\
                    <div class="outgoing-full">' +
                    	msg.question
                  +'</div>\
                </div>\
            </div>\
    	</li>'

    $(".timeline").append(template);
	$(".description")[0].scrollTop = $(".description")[0].scrollHeight;
});