// The commands inside the $(document).ready are all the commands that will be loaded 
// after the rest of the page is loaded. 

$( document ).ready(function() {
        
// Fnction select(option): Enables the option to use the same AJAX code for the sites or domains list. 
// The input "option" corresponds to the type of list that we are going to show. Ex. "sites" or "domains"
        if($("#probando").val() == "" ){
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
        console.log($("#probando").val())
            $("#title").val($("#probando").val());
   
        console.log($("#title").val())
        $("#advanced_search").submit()
        }

    
    });

      
  
       
var formSer="";

$("#advanced_search").submit(function(e){
    // This AJAX call corresponds to the request of the JSON data from Pandora project API.
    
        $( ".listCases" ).empty();
        formSer = $( "#advanced_search" ).serializeObject();
         //This is where we update the address bar with the 'url' parameter
        

        e.preventDefault();
        
        console.log(url_data_list+"/filter="+formSer.title)
   
        $.ajax({
            url: url_data_search,
            dataType: 'json',
            method: 'POST',
            data : JSON.stringify(formSer),
            contentType: 'application/json'
        }).done( function( data ) {
        
            history.pushState(null, url_data_list, url_data_list+"/title="+formSer.title);
//%20
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
