$(document).ready(function(){

	// url where its fetched the measurements data
	var url_data = "http://127.0.0.1:8001/measurements/api/flags/"
	var date =null;
	//months names & number list so it can be displayed on the html as a month name or month number
	var month_names = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	var month_number = [1,2,3,4,5,6,7,8,9,10,11,12];
	
	//AJAX call for the .json data
	$.ajax({
	
		url: url_data,
		method: 'GET',
		dataType: 'json',
		contentType:'application/json'
	
	})

	.done(function(data){

		//for each result in the .json {count,next,previous,results}
		//data.results = [{id,probe{region,country,plan{name,isp,upload,download,comment},identification,city,isp},target{site,url,ip},medicion,date,isp,ip,flag,type_med,event}]
		$.each(data.results,function(index,value){
			date = new Date(value.date);
			$("#mtablebody").append('<tr><td>'+value.target.site+'</td><td>'+value.target.url+'</td><td>'+date.getDate()+'-'+month_number[date.getMonth()]+'-'+date.getFullYear()+'</td><td>'+value.probe.country+'</td><td>'+value.probe.region+'</td><td>'+value.probe.city+'</td><td>'+value.isp+'</td><td>'+value.probe.plan.name+'</td><td>'+value.probe.plan.upload+'</td><td>'+value.probe.plan.download+'</td><td></td><td>'+value.type_med+'</td></tr>');



		})

	});

});
