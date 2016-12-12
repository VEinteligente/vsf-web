$(document).ready(function() {

	//Global Variables
	var month_names = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

	//First Ajax call to recieve the case data from server
	$.ajax({
		url: "http://192.168.0.130:8000/cases/api/detail/1/",
		method: 'GET',
		dataType: 'json',
		contentType:'application/json'
	})
	.done(function(data){
		
		//variable that has the data from server
		var dataJson=data;
		//list of event's id's for future automatically url search
		var id_events=[];

		//case ID
		var id_case = data.id;
		// date has the case date in dateType format to use javascript methods
		var date=new Date(dataJson.start_date);

		//First level "for" in the object {id,events,title,description,start_date,end_date,category,draft}
		$.each(dataJson, function(key , value){

			//Title & date for the main DIV in the details template
			if(key=="title"){
				
				$('#titleAjax').html(value);
				$('#titleDateAjax').html(date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear());

			}

			//ISP's that are associated with the case for the buttons display on template 
			if (key=="isp"){
				//second level "for" for the object where the key is now isp
				$.each(dataJson.isp, function(secondLevelKey, secondLevelValue){
					$('#ispAjax').append('<button class="contextualButtonFixedSize">'+secondLevelValue+'</button>')
				})
			}

			//Description of the case
			if (key=="description"){
				
				$('#descriptionAjax').html(value);
			}

			//if the end_date is null it means that the case is still active, still needs to do the else case when the case is considered finished
			if (dataJson.end_date == null){
				
				$('#statusAjax').html("Continua");
				$('#statusDateAjax').html(date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear());

			}

			//The event's details are fetched from another API service so we need to make another AJAX call
			if (key=="events"){
				
				//possible implementation of events id's url, we save an array with all the cases's event's id's
				id_events.push(value);

				//AJAX call for events datails API associated to the case
				$.ajax({
					url: "http://192.168.0.130:8000/cases/api/detail_event/"+id_case+"/",
					method: 'GET',
					dataType: 'json',
					contentType:'application/json'
				})
				.done(function(dataEvents){
					//dataEvents has the whole case data with the details of the events in the following Object {id,events,title,description,start_date,end_date,category,draft}
					//where the events key has an array of objects {isp,start_date,end_date,target,identification,type}
					$.each(dataEvents,function(key,value){
						
						//First level keys selection
						if (key=="events"){
							console.log(dataEvents.events);
							
							//second level key selection Object is an array of objects [{},{},...,{}]
							$.each(dataEvents.events, function(secondLevelKey, secondLevelValue){
							
								//third level key selection, Object is the event {isp,start_date,end_date,target,identification,type}
								$.each(secondLevelValue, function(thirdLevelKey,thirdLevelValue){
							
									console.log(secondLevelKey);
									//Fetching data of the event for the update list in the template
									if(thirdLevelKey=="isp"){
										var date_event = new Date(dataEvents.start_date);
										var isp_event = thirdLevelValue;
										console.log(isp_event);
										$('#eventListAjax').append('<div class="col-xs-12 updateBar"><div class="col-xs-2" ><div class="col-xs-7" ><div class="col-xs-12 dateDayMonth headline" id="dateDayMonthEventAjax">'+date_event.getDate()+" "+month_names[date_event.getMonth()]+'</div><div class="col-xs-12 dateYear" id="dateYearEventAjax">'+date_event.getFullYear()+'</div></div><div class="col-xs-2" style="padding-left: 0;"><div class="symbolBlocked"></div></div></div><div class="col-xs-7 content" style="padding-left: 0;">'+isp_event+" ha bloqueado"+'</div><div class="col-xs-3 share"><a href="#">View more...</a><a href="#" target="_blank"><i class="fa fa-facebook-square "></i></a><a href="#" target="_blank"><i class="fa fa-twitter"></i></a><a href="#" target="_blank"><i class="fa fa-pinterest"></i></a></div></div>');
							
									}
								})
							})
						}
					})
				})
			}





		})

	});
});