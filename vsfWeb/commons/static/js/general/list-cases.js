// The commands inside the $(document).ready are all the commands that will be loaded 
// after the rest of the page is loaded. 

$( document ).ready(function() {
        
// Fnction select(option): Enables the option to use the same AJAX code for the sites or domains list. 
// The input "option" corresponds to the type of list that we are going to show. Ex. "sites" or "domains"
        
        var hidden_title = $( "#hidden_title" ).val();
        var hidden_category = $( "#hidden_category" ).val();
        var hidden_region = $( "#hidden_region" ).val();
        var hidden_start_date = $( "#hidden_start_date" ).val();
        var hidden_end_date = $( "#hidden_end_date" ).val();
        
        if(hidden_title=="none"){
            hidden_title="";
        }
        
        if(hidden_category=="none"){
            hidden_category=""; 
        }
        
        if(hidden_region=="none"){
            hidden_region=""; 
        }
        
        if(hidden_start_date=="none"){
            hidden_start_date=""; 
        }
        
        if(hidden_end_date=="none" || hidden_end_date=="--"){
            hidden_end_date=""; 
        }
        
        var hidden = hidden_title + hidden_category + hidden_region + hidden_start_date + hidden_end_date;
        console.log(hidden.length)
        if(hidden.length== 0){
                console.log(hidden.length)
                 // This AJAX call corresponds to the request of the JSON data from Pandora project API.
            $.ajax({
                    url: url_data,
                    method: "GET",
                    dataType: 'json',
                    contentType: 'application/json'
                    }).done( function( data ) {
                        
                        var oldID =null;
                        var oldLinkID =null;
                        var temporal = ""; 
                        
                        // For each element in the JSON we need to collect their values
                        for(var i=0; i<data.length; i++)
                            temporal=temporal.concat(data[i]);
                            
                        var dataJson=JSON.parse(temporal);
                            
                        $.each(dataJson , function(key , value){ // First Level                                         
                            
                            // We need to access this element to get each case data
                            if(key=="results"){                   
         
                                $.each(dataJson.results , function(secondLevelKey, secondLevelValue){ // Second Level 
                                
                                    $.each(secondLevelValue , function(thirdLevelKey , thirdLevelValue){ // Third Level 
                                                                                                                                                
                                        if(thirdLevelKey=="id"){
                                            
                                            $(".listCases").append("<a href='http://192.168.0.115:8000/cases/api/detail/"+thirdLevelValue+"'>LINK</a> <br>");                                         
                                            
                                        }
                                        
                                        if(thirdLevelKey=="title"){
                                        
                                            $(".listCases").append("<strong>Title: </strong>"+thirdLevelValue+" <br>");                                                       
    
                                        }                                    
                                        
                                        if(thirdLevelKey=="start_date"){
                                        
                                           $(".listCases").append("<strong>Start Date: </strong>"+thirdLevelValue+" <br>");  
                                                                                                                                                                                                   
                                        }
                                        
                                        if(thirdLevelKey=="end_date"){
                                        
                                            if(thirdLevelValue != null)
                                                $(".listCases").append("<strong>End Date: </strong>"+ thirdLevelValue+" <br>");
                                            else
                                                $(".listCases").append("<strong>State: </strong>"+ "Continue"+" <br>");                                          
                                                                                                                                                                                                   
                                        } 
                                        
                                        if(thirdLevelKey=="category"){
                                        
                                           $(".listCases").append("<strong>Category: </strong>"+ thirdLevelValue +" <br>");  
                                                                                                                                                                                                   
                                        }                                                                                                   
                                    });
                                });
                            }  
            
                        });
                         $(".listCases").append(" <hr>");  
                       
                    }).fail( function( jqXHR, textStatus, errorThrown ) {
                        $('.listCases').html("");
                    });
       
      }
        else {
            if(hidden_title=="none"){
                $("#title").val("");
            }
            else{
               $("#title").val(hidden_title); 
            }
            
            if(hidden_category=="none"){
            $("#category").val("");
            }
            else{
               $("#category").val(hidden_category); 
            }
            
            if(hidden_region=="none"){
                $("#region").val("");
            }
            else{
               $("#region").val(hidden_region); 
            }
        
            if(hidden_start_date=="none"){
                $("#start_date").val("");
            }
            else{
               $("#start_date").val(hidden_start_date); 
            }
            
            if(hidden_end_date=="none" || hidden_end_date=="--"){
                $("#end_date").val("");
            }
            else{
               $("#end_date").val(hidden_end_date); 
            }
        

        $("#advanced_search").submit();
    }

    
    });

      
  
       
var formSer="";

$("#advanced_search").submit(function(e){
    // This AJAX call corresponds to the request of the JSON data from Pandora project API.
        console.log(url_data_search)
        $( ".listCases" ).empty();
        formSer = $( "#advanced_search" ).serializeObject();
         //This is where we update the address bar with the 'url' parameter
        

        e.preventDefault();
        
   
        $.ajax({
            url: url_data_search,
            dataType: 'json',
            method: 'POST',
            data : JSON.stringify(formSer),
            contentType: 'application/json'
        }).done( function( data ) {
        
        var hidden_title = $( "#title" ).val();
        var hidden_category = $( "#category" ).val();
        var hidden_region = $( "#region" ).val();
        var hidden_start_date = $( "#start_date" ).val();
        var hidden_end_date = $( "#end_date" ).val();
        
        if(hidden_title=="none"){
            hidden_title="";
        }
        
        if(hidden_category=="none"){
            hidden_category=""; 
        }
        
        if(hidden_region=="none"){
            hidden_region=""; 
        }
        
        if(hidden_start_date=="none"){
            hidden_start_date=""; 
        }
        
        if(hidden_end_date=="none"){
            hidden_end_date=""; 
        }
        
        var hidden = hidden_title + hidden_category + hidden_region + hidden_start_date + hidden_end_date;
        
        console.log(hidden.length)
        
        if(formSer.title==""){
            var title = "none";
        }
        else{
            var title=hidden_title;
        }

        
        if(formSer.category==""){
            var category = "none";
        }
        else{
            var category=  hidden_category;
        }
        
        if(formSer.region==""){
            var region = "none";
        }
        else{
            var region=  hidden_region;
        }
        
        if(formSer.start_date==""){
            var start_date = "none";
        }
        else{
            var start_date=  hidden_start_date;
        }

        if(formSer.end_date==""){
            var end_date = "none";
        }
        else{
            var end_date=  hidden_end_date;
        }
      
      
        
        
        

        
        

        if(hidden.length!=0){
            history.pushState(null, null, url_data_list_empty+"title="+title+"&category="+category+"&start_date="+start_date+"&end_date="+end_date+"&region="+region);
            
        }
        else if( hidden == " " ){
        
            history.pushState(null, null, url_data_list_empty);
        }
        
            e.preventDefault();
            
  
            var oldID =null;
            var oldLinkID =null;
            var temporal = ""; 
                    
            // For each element in the JSON we need to collect their values
            for( var i = 0; i < data.length; i++) {
                temporal = temporal.concat( data[ i ] );
            }
                
            var dataJson=JSON.parse( temporal );
                
            $.each( dataJson , function( key , value ) { // First Level                                         
                        
                // We need to access this element to get each case data
                if( key=="results" ) {                   

                    $.each( dataJson.results , function( secondLevelKey, secondLevelValue ) { // Second Level 
                   
                        $.each( secondLevelValue , function( thirdLevelKey , thirdLevelValue ) { // Third Level 
                            if( thirdLevelKey =="id" ) {
                               
                                $( ".listCases" ).append(
                                    "<a href='http://192.168.0.115:8000/cases/api/detail/"+thirdLevelValue+"'>LINK</a> <br>"
                                );                                         
                            }
                                    
                            if( thirdLevelKey == "title" ) {
                                $( ".listCases" ).append( "<strong>Title: </strong>" + thirdLevelValue + " <br>" );                                                       
                            }                                    
                                    
                            if( thirdLevelKey == "start_date" ) {
                                $( ".listCases" ).append( "<strong>Start Date: </strong>" + thirdLevelValue + " <br>" );  
                            }
                                    
                            if( thirdLevelKey == "end_date" ) {
                                if( thirdLevelValue != null ) {
                                    $( ".listCases" ).append( "<strong>End Date: </strong>" + thirdLevelValue + " <br>" );
                                }
                                else {
                                    $( ".listCases" ).append( "<strong>State:</strong> Continue<br>" );
                                }                                          
                            } 
                                    
                            if( thirdLevelKey=="category" ) {
                               $( ".listCases" ).append( "<strong>Category: </strong>" + thirdLevelValue + " <br>" );  
                            }                                                                                                   
                        });
                    });
                }  
            });
                     $(".listCases").append(" <hr>");  
                     
                }).fail( function( jqXHR, textStatus, errorThrown ) {
   
                    $('.listCases').html("data");
                });
   
    
});
