// formSer are the serialized form values
var formSer="";
// The commands inside the $(document).ready are all the commands that will be loaded 
// after the rest of the page is loaded. 
$( document ).ready(function() {

    // Variables corresponding to the search fields from the URL parameters
    var hidden_title = $( "#hidden_title" ).val();
    var hidden_category = $( "#hidden_category" ).val();
    var hidden_region = $( "#hidden_region" ).val();
    var hidden_start_date = $( "#hidden_start_date" ).val();
    var hidden_end_date = $( "#hidden_end_date" ).val();
    
    
    // If no date exist in the URL then replace the hidden_element by empty string
    if( hidden_start_date == "--" ){
        hidden_start_date=""; 
    }
        
    if( hidden_end_date == "--" ){
        hidden_end_date=""; 
    }
    
    // Concatenate the parameters value from URL to check if any exists  
    var hidden = hidden_title + hidden_category + hidden_region + hidden_start_date + hidden_end_date;

    if( hidden.length == 0 ){
        
        // This AJAX call corresponds to the request of the JSON data from Pandora project API.
        $.ajax({
            url: url_data,
            method: "GET",
            dataType: 'json',
            contentType: 'application/json'
            }).done( function( data ) {

                var temporal = ""; 
                        
                // For each element in the JSON we need to collect their values
                for( var i = 0; i < data.length; i++ ){
                    temporal = temporal.concat( data[i] );                   
                }
                            
                var dataJson=JSON.parse( temporal );
                            
                $.each( dataJson , function( key , value ){ // First Level                                         
                            
                    // We need to access this element to get each case data
                    if( key == "results" ){                   
         
                        $.each( dataJson.results , function( secondLevelKey, secondLevelValue ){ // Second Level 
                                
                            $.each( secondLevelValue , function( thirdLevelKey , thirdLevelValue ){ // Third Level 
                                                                                                                                                
                                if( thirdLevelKey == "id" ){
                                    $( ".listCases" ).append( "<a href='http://192.168.0.115:8000/cases/api/detail/" + thirdLevelValue + "'>LINK</a> <br>" );                                         
                                            
                                }
                                        
                                if( thirdLevelKey == "title" ){                                        
                                    $(".listCases").append("<strong>Title: </strong>"+thirdLevelValue+" <br>");                                                       
                                }                                    
                                        
                                if( thirdLevelKey == "start_date" ){                                        
                                    $( ".listCases" ).append( "<strong>Start Date: </strong>" + thirdLevelValue + " <br>" );                                                                                                                                                                                                  
                                }
                                        
                                if( thirdLevelKey == "end_date" ){                                        
                                    if( thirdLevelValue != null ){
                                        $( ".listCases" ).append( "<strong>End Date: </strong>"+ thirdLevelValue + " <br>" );
                                    }
                                    else{
                                        $( ".listCases" ).append( "<strong>State: </strong>" + "Continue" + " <br>" );
                                    }                                                                                                                                                                                                                                                                                        
                                } 
                                        
                                if( thirdLevelKey == "category" ){                                        
                                    $( ".listCases" ).append( "<strong>Category: </strong>" + thirdLevelValue + " <br>");                                                                                                                                                                                                     
                                }                                                                                                   
                            });
                        });
                    }  
            
                });
                
                $( ".listCases" ).append( " <hr>" );  
                       
            }).fail( function( jqXHR, textStatus, errorThrown ) {
                    $( '.listCases' ).html( "" );
                });
       
    }
    else {
        
        // Change the input of the search with the URL parameters if they exist and submit the form
        
        if( hidden_title.length == 0 ){
            $( "#title" ).val( "" );
        }
        else{
            $( "#title" ).val( hidden_title ); 
        }
            
        if(hidden_category.length==0){
            $( "#category" ).val( "" );
        }
        else{
            $( "#category" ).val( hidden_category ); 
        }
            
        if( hidden_region.length == 0 ){
            $( "#region" ).val( "" );
        }
        else{
            $( "#region" ).val( hidden_region ); 
        }
        
        if( hidden_start_date == "--" ){
            $( "#start_date" ).val( "" );
        }
        else{
            $( "#start_date" ).val( hidden_start_date ); 
        }
            
        if( hidden_end_date == "--" ){
            $( "#end_date" ).val( "" );
        }
        else{
            $( "#end_date" ).val( hidden_end_date ); 
        }
        

        $("#advanced_search").submit();
    }

    
});

      
  


$("#advanced_search").submit(function(e){
    
    // Empty the search result to fill with new result
    $( ".listCases" ).empty();
    
    // Serialize the form 
    formSer = $( "#advanced_search" ).serializeObject();
    
    // Prevent the page to redirect to new one
    e.preventDefault();
        
    // This AJAX call corresponds to the request of the JSON data for the search results from Pandora project API.
    
    $.ajax({
        url: url_data_search,
        dataType: 'json',
        method: 'POST',
        data : JSON.stringify(formSer),
        contentType: 'application/json'
        }).done( function( data ) {
        
       //Get the form values to construct the URL of the search result
        
        if( ( formSer.title ).length != 0 ){
            var title = formSer.title;
         }
        else{
            var title = "";
        }
        
        if( ( formSer.category ).length != 0 ){
            var category = formSer.category;
        }
        else{
            var category = "";
        }
        
        if( ( formSer.region ).length != 0 ){
            var region = formSer.region;
        }
        else{
            var region = "";
        }
        
        if( ( formSer.start_date ).length != 0 ){
            var start_date = formSer.start_date;
        }
        else{
            var start_date = "--";
        }

        if( ( formSer.end_date ).length != 0 ){
            var end_date = hidden_end_date;
        }
        else{
            var end_date = "--";
        }
        
        // If there is a search parameter then change the URL to add the parameters or to initial search page but do not redirect to it
        var hidden =  title + category + start_date + end_date + region;
        
        if( hidden.length != 0 ){
            history.pushState( null, null, url_data_list_empty + "title=" + title + "&category=" + category + "&start_date=" + start_date + "&end_date=" + end_date + "&region=" + region);            
        }
        else if( hidden == " " ){
            history.pushState(null, null, url_data_list_empty);
        }

        e.preventDefault();
            
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
                            $( ".listCases" ).append( "<a href='http://192.168.0.115:8000/cases/api/detail/" + thirdLevelValue + "'>LINK</a> <br>" );                                         
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
        
        $( ".listCases" ).append( " <hr>" );  
                     
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        $( '.listCases' ).html( "" );
    });
   
});
