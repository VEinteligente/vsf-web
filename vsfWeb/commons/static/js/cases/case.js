$(document).ready(function() 
{

	//Global Variables
	var month_names = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	
	var count=0;
	
	//url_data is where we fetch most of the case information and pk is the id of the case

	var url_data_detail = url_one_case;

	//url_data is where we get the update data of the case and pk is the id of the case
	var url_data_update = url_one_case_update;         
                 
	//First Ajax call to recieve the case data from server
	$.ajax({
		url: url_data_detail,
		method: 'GET',
		dataType: 'json',
		contentType:'application/json'
	})
	.done(function(dataJson){

	   var temporal = ""; 
        // For each element in the JSON we need to collect their values
        for(var i=0; i<dataJson.length; i++)
            temporal=temporal.concat(dataJson[i]);
            var data=JSON.parse(temporal);
        
	
		//variable that has the data from server
		var dataJson = data;
		//list of event's id's for future automatically url search
		var id_events=[];

		select("domains", dataJson);

		//case ID
		case_id = data.id;
		// date has the case date in dateType format to use javascript methods
		var date=new Date(dataJson.start_date);
		var title = dataJson.title;
		var description = dataJson.description;

		var twitter_search  = dataJson.twitter_search;

		//Title & date for the main DIV in the details template
		
		$('#titleAjax').html(title);
		$('#titleDateAjax').html(date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear());

		$.each(dataJson.isp, function(secondLevelKey, secondLevelValue){
			
			$('#ispAjax').append('<button class="contextualButtonFixedSize">'+secondLevelValue+'</button>');
		})

		$('#descriptionAjax').html(description);
		
		//if the end_date is null it means that the case is still active, still needs to do the else case when the case is considered finished

		if (dataJson.end_date == null){
			$('#statusAjax').html("Continua");
			$('#statusDateAjax').html(date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear());
		}
	

    	if( twitter_search != null ){
    	    
    	    twitterSearch( twitter_search );
    	}
    	

		//AJAX call for updates datails API associated to the case
		$.ajax({
			url: url_data_update,
			method: 'GET',
			dataType: 'json',
			contentType:'application/json'
		}).done(function(dataJson){
			//dataEvents has the whole case data with the details of the events in the following Object {id,events,title,description,start_date,end_date,category,draft}
			//where the events key has an array of objects {isp,start_date,end_date,target,identification,type}
			
			var temporal = ""; 
			         
            // For each element in the JSON we need to collect their values
            for(var i=0; i<dataJson.length; i++)
             temporal=temporal.concat(dataJson[i]);
         
            var data=JSON.parse(temporal);
            
   
            //variable that has the data from server
            var dataUpdates = data;
            
			$.each(dataUpdates.updates,function(index,value){
			
	      
				var update_date = new Date(value.date);
				var update_text = value.text;
				var update_category = value.category;
				
				if (update_category == "grave"){
				$('#updateListAjax').append('<div class="col-xs-12 updateBar"><div class="col-xs-2" ><div class="col-xs-7" ><div class="col-xs-12 dateDayMonth headline" id="dateDayMonthEventAjax">'+update_date.getDate()+" "+month_names[update_date.getMonth()]+'</div><div class="col-xs-12 dateYear" id="dateYearEventAjax">'+update_date.getFullYear()+'</div></div><div class="col-xs-2" style="padding-left: 0;"><div class="symbolBlocked"></div></div></div><div class="col-xs-7 content" style="padding-left: 0;">'+update_text+'</div><div class="col-xs-3 share"><a href="#">View more...</a><a href="#" target="_blank"><i class="fa fa-facebook-square "></i></a><a href="#" target="_blank"><i class="fa fa-twitter"></i></a><a href="#" target="_blank"><i class="fa fa-pinterest"></i></a></div></div>');
				}
				else if (update_category == "info"){
				$('#updateListAjax').append('<div class="col-xs-12 updateBar"><div class="col-xs-2" ><div class="col-xs-7" ><div class="col-xs-12 dateDayMonth headline" id="dateDayMonthEventAjax">'+update_date.getDate()+" "+month_names[update_date.getMonth()]+'</div><div class="col-xs-12 dateYear" id="dateYearEventAjax">'+update_date.getFullYear()+'</div></div><div class="col-xs-2" style="padding-left: 0;"><div class="symbolBlocked" style = "background:cyan"></div></div></div><div class="col-xs-7 content" style="padding-left: 0;">'+update_text+'</div><div class="col-xs-3 share"><a href="#">View more...</a><a href="#" target="_blank"><i class="fa fa-facebook-square "></i></a><a href="#" target="_blank"><i class="fa fa-twitter"></i></a><a href="#" target="_blank"><i class="fa fa-pinterest"></i></a></div></div>');
				}
				else {
				$('#updateListAjax').append('<div class="col-xs-12 updateBar"><div class="col-xs-2" ><div class="col-xs-7" ><div class="col-xs-12 dateDayMonth headline" id="dateDayMonthEventAjax">'+update_date.getDate()+" "+month_names[update_date.getMonth()]+'</div><div class="col-xs-12 dateYear" id="dateYearEventAjax">'+update_date.getFullYear()+'</div></div><div class="col-xs-2" style="padding-left: 0;"><div class="symbolBlocked" style = "background:green"></div></div></div><div class="col-xs-7 content" style="padding-left: 0;">'+update_text+'</div><div class="col-xs-3 share"><a href="#">View more...</a><a href="#" target="_blank"><i class="fa fa-facebook-square "></i></a><a href="#" target="_blank"><i class="fa fa-twitter"></i></a><a href="#" target="_blank"><i class="fa fa-pinterest"></i></a></div></div>');
				}
	
			})
		});
	});

});

//function for the domain/sites list in the page

function select(option){
        
        // When select function is invoked the list is emptied  
        $("#domainTableBody").empty();
 		var url_data = url_one_case;


        // This AJAX call corresponds to the request of the JSON data from Pandora project API.
        $.ajax({
                url:url_data,
                method: "GET",
                dataType: 'json',
                contentType: 'application/json'
        })

        .done(function(dataJson){
        var temporal = ""; 
          
                     
            // For each element in the JSON we need to collect their values
            for(var i=0; i<dataJson.length; i++)
             temporal=temporal.concat(dataJson[i]);
         
            var data=JSON.parse(temporal);
            
        if (option == "domains"){

        	count =0;

            $("#domainTableTitle").html('<span class="tag tag-default tag-pill float-xs-left pill-size" id="count" style="font-size:100%; background-color:red"></span>&nbsp Dominios');
           
            $.each(data.domains,function(index,result){

            	count = count +1;


            	$("#count").html(count);

                $("#domainTableBody").append('<tr><td style="border-radius:5px">'+result.url+'</td><tr>');

       
            })
        }
        
        else{

        	count =0;

            $("#domainTableTitle").html('<span class="tag tag-default tag-pill float-xs-left pill-size" id="count" style="font-size:100%; background-color:red"></span>&nbsp Sitios');
           
            $.each(data.domains,function(index,result){

                count= count +1;

                $("#count").html(count);

                $("#domainTableBody").append('<tr><td style="text-transform:capitalize;border-radius:5px">'+result.site+'</td><tr>');

            })

        }

        });



}
