$(document).ready(function() {

	var case_id;
	var case_title;
	var case_category;
	$.ajax({
		url: "http://192.168.0.130:8000/cases/api/list/",
		method: 'GET',
		dataType: 'json',
		contentType:'application/json'
	})
	.done(function(data){

		$.each(data.results, function(Index , Value){
			console.log(Value);
			$.each(Value.isp,function(secondLevelIndex, SecondLevelValue){
				
				$('#summaryAjax').append('<tr><th scope="row">'+Value.id+'</th><td>'+Value.title+'</td><td>'+SecondLevelValue+'</td><td>'+Value.category+'</td></tr>');
			})
		})

	});
});

