$(document).ready(function(){

	// url where its fetched the measurements data
	var date =null;
	var url_data= url_data_measurement;
	console.log(url_data_measurement);
	//months names & number list so it can be displayed on the html as a month name or month number
	var month_names = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	var month_number = [1,2,3,4,5,6,7,8,9,10,11,12];
	
	//.json for modal display
	var raw_data = null;
	var data_modal = null;
	var raw_json = null;

	//id count for displyaing the correct .json
	idcount=0;
	
	//AJAX call for the .json data
	$.ajax({
	
		url: url_data,
		method: 'GET',
		dataType: 'json',
		contentType:'application/json'
	
	})

	.done(function(data){

		var temporal = ""; 
        // For each element in the JSON we need to collect their values
        for(var i=0; i<data.length; i++)
            temporal=temporal.concat(data[i]);
            var dataJson=JSON.parse(temporal);



		//for each result in the .json {count,next,previous,results}
		//data.results = [{id,probe{region,country,plan{name,isp,upload,download,comment},identification,city,isp},target{site,url,ip},medicion,date,isp,ip,flag,type_med,event}]
		$.each(dataJson.results,function(index,value){

			//data has the json date in format so we can grab day,month or year as needed
			date = new Date(value.date);
			
			//Json from the row that is inserted in the table
			raw_data = JSON.stringify(dataJson.results[idcount]);
			
			//We pass the ID and JSON in the data-id and data-json fields in the modal

			$("#dataTableM").append('<div class="row" id="mRow"><div class="col-xs-3 mData">'+value.target.site+'</div><div class="col-xs-2 mData">'+value.target.url+'</div><div class="col-xs-1 mData" style="font-size:12px">'+date.getDate()+'/'+month_number[date.getMonth()]+'/'+date.getFullYear()+'</div><div class="col-xs-1 mData">'+value.probe.country+'</div><div class="col-xs-1 mData">'+value.probe.region+'</div><div class="col-xs-1 mData">'+value.probe.city+'</div><div class="col-xs-1 mData">'+value.isp+'</div><div class="col-xs-1 mData"><a data-id="'+value.id+'" data-json=\''+raw_data+'\' id="modalbutton" data-toggle="modal" data-target="#myModal">.Json</a></div><div class="col-xs-1 mData">'+value.type_med+'</div></div>');
			idcount= idcount +1;


		})

	});

//Function to give the modal the Json file on click with the format we like to

$(document).on("click", "#modalbutton", function () {
	//Here we gran the Json from de data-json field
    var raw_json = $(this).data('json');

    //Id from the measurement that goes in the title of the modal
	var mid = $(this).data('id');
	
	//Stringify for display the Json inside the modal
	data_modal = JSON.stringify(raw_json);

	//Sends the JSON file to the Modal
	$("#measurementData").jJsonViewer(raw_json, {expanded:true});
	
	//Sends the id to the title of the Modal
	$("#measurementTitle").html('Measurement ID '+mid);
});

});
