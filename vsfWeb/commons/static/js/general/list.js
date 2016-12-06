$( document ).ready(function() {
        var url_data = null;
        var showResult = null;
        select("sites");
        
    });

// select(option) function: Enables the option to use the same AJAX code for the sites or domains list. 
// The input "option" corresponds to the type of list that we are going to show. Ex. "sites" or "domains"

    function select(option){
        
        // When select function is invoked the list is emptied  
        $("#blockedSitesList").empty();
        // Order of the title blocks depending on the language

        var language = $("#language").val();
    
        
        if(language=="es"){
              
            $("#order2").css("-webkit-box-ordinal-group","2");
            $("#order2").css("-moz-box-ordinal-group","2");
            $("#order2").css("box-ordinal-group","2");
            
            $("#order1").css("-webkit-box-ordinal-group","3");
            $("#order1").css("-moz-box-ordinal-group","3");
            $("#order1").css("box-ordinal-group","3");

           
        }
        else{
        
            $("#order1").css("-webkit-box-ordinal-group","2");
            $("#order1").css("-moz-box-ordinal-group","2");
            $("#order1").css("box-ordinal-group","2");
            
            $("#order2").css("-webkit-box-ordinal-group","3");
            $("#order2").css("-moz-box-ordinal-group","3");
            $("#order2").css("box-ordinal-group","3");
            
    
            
        }
        
        // Depending on selected option we need to load the corresponding title and variable key of the result we want to show
        if(option=="sites"){
            var sites=$("#sites").val();
            $("#title").html(sites);
            url_data=url_data_sites
            showResult = "name"
            
        }
        else {
            var domain=$("#domains").val();            
            $("#title").html(domain);
            url_data = url_data_domains
            showResult = "site"
            
        }
        
 
        // This AJAX call corresponds to the request of the JSON data from Pandora project API.
        $.ajax({
                url: url_data,
                method: "GET",
                dataType: 'json',
                contentType: 'application/json'
                }).done( function( data ) {
                
                    var dataJson=JSON.parse(data);
                    var oldID =null;
                    
                    // For each element in the JSON we need to collect their values
                    
                    $.each(dataJson , function(key , value){ // First Level 
                        
                        if(key=="count"){     
                            $("#count").html(value);
                        }
                        
                        // We need to access this element to get each site/domain data
                        if(key=="results"){                   
                                           
                            $.each(dataJson.results , function(secondLevelKey, secondLevelValue){ // Second Level 
                            
                                $.each(secondLevelValue , function(thirdLevelKey , thirdLevelValue){ // Third Level 
                                    
                                     if(thirdLevelKey=="id"){
                                        
                                        // This AJAX call corresponds to the request of the HTML of the elements of the list.
                                        // Note that the async: false because we are not validating or using the post method.
                                        $.ajax({
                                                                            
                                                url: url_style_list,
                                                context: document.body,
                                                data: thirdLevelValue,
                                                async: false,                                                         
                                                }).done( function( result ) 
                                                {
                                                    // We have a generic ID for the list element and the anchor tag in the HTML 
                                                    // template that we need to change to a specific one for each element to then
                                                    // load the value of showResult there.
                                                    $('#blockedSitesList').append(result);
                                                    oldID = document.getElementById("value");
                                                    oldID.id = "iden" + thirdLevelValue;
                                                    $('#hiddenID').val("iden" + thirdLevelValue);
                                                                                                    
                                                    oldLinkID = document.getElementById("list-html");
                                                    oldLinkID.id = "link" + thirdLevelValue;                                        
                                                    $('#hiddenLinkID').val("link" + thirdLevelValue);
                                          
                                                }).fail( function( jqXHR, textStatus, errorThrown ) {
                                                    $('#blockedSitesList').html(" ");
                                        });
                                    }
                                    
                                    if(thirdLevelKey==showResult){
                                                // We load the showResult value in the specific ID. 
                                                $('#'+ $('#hiddenID').val()).html(thirdLevelValue);
                                                $("#"+$('#hiddenLinkID').val()).find("a").attr("href","http://"+thirdLevelValue);

                                    }
                           
                                });
                            });
                        }  
        
                    });
                    
                 }).fail( function( jqXHR, textStatus, errorThrown ) {
                    $('#blockedSitesList').html(" ");
                    });
    }
   
