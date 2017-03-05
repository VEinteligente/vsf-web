// The commands inside the $(document).ready are all the commands that will be loaded 
// after the rest of the page is loaded. 

$( document ).ready(function() {
        
        // url_data is the URL corresponding to the AJAX code
        var url_data_aux = null;
        // show_result is the different key element name of the JSON array depending on the action selected by the user 
        var show_result = null;
        
        // Correspond to the number of elements in the JSON. Its default value is "0"
        $("#count").html("0");
        
        // The default value of the blocked sites/domains list is "Sites"
        selectBlockedSites("sites");
        
});

// Fnction select(option): Enables the option to use the same AJAX code for the sites or domains list. 
// The input "option" corresponds to the type of list that we are going to show. Ex. "sites" or "domains"

function selectBlockedSites(option){
	$('#hiddenID').val(0);  
        // When select function is invoked the list is emptied  
        $("#blockedSitesList").empty();
        
        // Depending on selected option we need to load the corresponding title and variable key of the result we want to show
        if(option=="sites"){
        
            // This variable loads the translated string of the title corresponding to the "site" option 
            var sites=$("#sites").val();
            
            $("#title").html(sites);
            $("#download").attr("href",url_excel_sites)
            url_data_aux=url_data_sites;
            show_result = "name";
         // This AJAX call corresponds to the request of the JSON data from Pandora project API.
            $.ajax({
                    url: url_data_aux,
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
                            
                            if(key=="count"){     
                                $("#count").html(value);
                            }
                            
                            // We need to access this element to get each site/domain data
                            if(key=="results"){                   
                            	$('#hiddenID').val(0);  
                     
                                        
                                $.each(dataJson.results , function(secondLevelKey, secondLevelValue){ // Second Level 
                                	
                                		
                                    $.each(secondLevelValue , function(thirdLevelKey , thirdLevelValue){ // Third Level 
                                    	$('#hiddenID').val(Number($('#hiddenID').val())+1);                                	                                                                           	
                          
                                        if(thirdLevelKey==show_result){
                                        
                                                    // We load the show_result value in the specific ID.  
                                        			
                                        			$('#'+ $('#hiddenDomainID').val()).html(thirdLevelValue);
                                        		
                                                    // If the element is a site we need to add the "external-link" icon and remove the "lock" icon 
                                                  
                                                    $("#"+$('#hiddenLinkID').val()).find("a").attr("href","http://"+thirdLevelValue);
                                                                                                   

                                        }                                    
                                        
                                        if(thirdLevelKey=="domains"){
                                        	
                                        	
                                            $.each(thirdLevelValue , function(fourthLevelKey , fourthLevelValue){ // Third Level 
                                            	  
                                                $.each(fourthLevelValue , function(fifthLevelKey, fifthLevelValue){ // Fourth Level 
                                                
                                                    // This AJAX call corresponds to the request of the HTML of the elements of the list.
                                                    // Note that the async: false because we are not validating or using the post method.
                                               
                                                   if(fifthLevelKey=="id"){
                                                
                                                        $.ajax({                                                                                
                                                        url: url_style_list,
                                                        context: document.body,
                                                        data: thirdLevelValue,
                                                        async: false,                                                         
                                                        }).done( function( result ) {
                                                            // We have a generic ID for the list element and the anchor tag in the HTML 
                                                            // template that we need to change to a specific one for each element to then
                                                            // load the value of showResult there.
                                                        	
                                                      
                                                        	$('#blockedSitesList').append(result);
                                                            oldID = document.getElementById("value");
                                                            oldID.id = "idenDomain" + fifthLevelValue;
                                                            $('#hiddenDomainID').val("idenDomain" + fifthLevelValue );
                                                                                                   
                                                            oldLinkID = document.getElementById("list-html");
                                                            oldLinkID.id = "linkDomain" + fifthLevelValue;   
                                                                                
                                                            $('#hiddenDomainLinkID').val("linkDomain"  + fifthLevelValue);
                                                            
                                                            // This section makes it possible that the  list corresponding to a site are hidden 
                                                            // and only shown when the site is clicked and with their corresponding background color.
                                                            $("#"+$('#hiddenDomainLinkID').val()).addClass("domain"+$('#hiddenID').val());
                                                            $("#"+$('#hiddenDomainLinkID').val()).closest(".subtitleBar").addClass($('#hiddenLinkID').val());
                                                            
                                                            $(".domain"+$('#hiddenID').val()).hide();
                                                            $(".domain"+$('#hiddenID').val()).addClass("col-xs-12");
                                                            $('#hiddenLinkID').val( "link"+$('#hiddenID').val() )
                                                            var parentID= $('#'+ $('#hiddenDomainLinkID').val()).parent(".subtitleBar");
                                                            var childID =$('#'+ $('#hiddenDomainLinkID').val());
                                                            var count=0;
                                                            
                                                            parentID.click(function(){
                                                                count++;
                                                                //The count variable enables that the action when second click is different
                                                                // from the first click action
                                                                if(count % 2 != 0) {
                                                                    childID.show();
                                                                    parentID.css("background","#A0A0A0");
                                                                    childID.css("background","#808080");
                                                                    childID.css("font-size","0.95em");
                                                                    parentID.css("color","white");
                                                                    childID.css("color","white");
                                                                }else{
                                                                    childID.hide();
                                                                    parentID.css("background","white");
                                                                    childID.css("background","white");
                                                                    parentID.css("color","#373a3c");
                                                                    childID.css("color","#373a3c");
                                                                }    
                                                                
                                                            });
                                                  
                                                        }).fail( function( jqXHR, textStatus, errorThrown ) {
                                                            $('#blockedSitesList').html(" ");
                                                        });
                                                    }
                                                    
                                                    if(fifthLevelKey=="url"){
                                                 
                                                        // We load the showResult value in the specific ID. 
                                                        $('#'+ $('#hiddenDomainLinkID').val()).html('<span class="col-xs-11" style="padding-left: 15px">' + fifthLevelValue + '</span><a target="_blank" href=""><i class="fa fa-lock" aria-hidden="true"></i></a>');
                                                        $("#"+$('#hiddenDomainLinkID').val()).find("a").attr("href",fifthLevelValue);                                               
                                                        $("#"+$('#hiddenLinkID').val()).find("a").attr("href",fifthLevelValue);
                                                    }
                                            
                                                });
                                            });                                                                                                                                                                
                                        }                                                                                                    
                                    });
                                });
                            }  
            
                        });
                        
                    }).fail( function( jqXHR, textStatus, errorThrown ) {
                        $('#blockedSitesList').html(" ");
                    });
  
        }
        else {

            // This variable loads the translated string of the title corresponding to the "domain" option
            var domain=$("#domains").val();            
            $("#title").html(domain);
            $("#download").attr("href",url_excel_domains)
            url_data_aux = url_data_domains;
            show_result = "url";
         // This AJAX call corresponds to the request of the JSON data from Pandora project API.
            $.ajax({
                    url: url_data_aux,
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
                            
                            if(key=="count"){     
                                $("#count").html(value);
                            }
                            
                            // We need to access this element to get each site/domain data
                            if(key=="results"){                   
                                $('#hiddenID').val("");       
                                        
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
                                                        
                                                        $("#"+ $('#hiddenID').val()).closest(".subtitleBar").addClass($('#hiddenID').val());
                                                        
                                                        
                                                        
                                              
                                                    }).fail( function( jqXHR, textStatus, errorThrown ) {
                                                        $('#blockedSitesList').html(" ");
                                                    });
                                        }
                
                                        if(thirdLevelKey==show_result){
                                        			
                                                    // We load the show_result value in the specific ID.  
                                        			
                                        
                                                    $('#'+ $('#hiddenID').val()).html(thirdLevelValue);
                                     
                                                    // If the element is a site we need to add the "external-link" icon and remove the "lock" icon 
                                                    if(show_result!="name")
                                                        $("#"+$('#hiddenLinkID').val()).find("a").attr("href","http://"+thirdLevelValue);
                                                    else
                                                    {
                                                        $("#"+$('#hiddenLinkID').val()).find("a").find("i").removeClass("fa-lock");
                                                        $("#"+$('#hiddenLinkID').val()).find("a").find("i").addClass("fa-external-link");
                                                        $("#"+$('#hiddenLinkID').val()).find("a").find("i").css("color","blue");
                                                        
                                                        $.ajax({
                                                            
                                                            url: url_style_list,
                                                            context: document.body,
                                                            data: thirdLevelValue,
                                                            async: false,                                                         
                                                            }).done( function( result ) 
                                                            {   
                                                                
                                                                $('#blockedSitesList').append(result);
                                                                oldID = document.getElementById("value");
                                                                oldID.id = "iden" + thirdLevelValue;
                                                                $('#hiddenID').val("iden" + thirdLevelValue);
                                                                                                                
                                                                oldLinkID = document.getElementById("list-html");
                                                                oldLinkID.id = "link" + thirdLevelValue;                                        
                                                                $('#hiddenLinkID').val("link" + thirdLevelValue);
                                                                
                                                                $("#"+ $('#hiddenID').val()).closest(".subtitleBar").addClass($('#hiddenID').val());
                                                                
                                                                
                                                                
                                                      
                                                            }).fail( function( jqXHR, textStatus, errorThrown ) {
                                                                $('#blockedSitesList').html(" ");
                                                            });
                                                    }                                                    

                                        }                                    
                                        
                                        if(thirdLevelKey=="domains"){
                                        
                                            $.each(thirdLevelValue , function(fourthLevelKey , fourthLevelValue){ // Third Level 
                                                
                                                $.each(fourthLevelValue , function(fifthLevelKey, fifthLevelValue){ // Fourth Level 
                                                
                                                    // This AJAX call corresponds to the request of the HTML of the elements of the list.
                                                    // Note that the async: false because we are not validating or using the post method.
                                               
                                                   if(fifthLevelKey=="id"){
                                                
                                                        $.ajax({                                                                                
                                                        url: url_style_list,
                                                        context: document.body,
                                                        data: thirdLevelValue,
                                                        async: false,                                                         
                                                        }).done( function( result ) {
                                                            // We have a generic ID for the list element and the anchor tag in the HTML 
                                                            // template that we need to change to a specific one for each element to then
                                                            // load the value of showResult there.
                                                        	$('#blockedSitesList').append(result);
                                                            oldID = document.getElementById("value");
                                                            oldID.id = "idenDomain" + fifthLevelValue;
                                                            $('#hiddenDomainID').val("idenDomain" + fifthLevelValue );
                                                                                                   
                                                            oldLinkID = document.getElementById("list-html");
                                                            oldLinkID.id = "linkDomain" + fifthLevelValue;   
                                                                                
                                                            $('#hiddenDomainLinkID').val("linkDomain"  + fifthLevelValue);
                                                            
                                                            // This section makes it possible that the  list corresponding to a site are hidden 
                                                            // and only shown when the site is clicked and with their corresponding background color.
                                                            $("#"+$('#hiddenDomainLinkID').val()).closest(".subtitleBar").addClass("domain");
                                                            $("#"+$('#hiddenDomainLinkID').val()).closest(".subtitleBar").addClass($('#hiddenLinkID').val());
                                                            
                                                            $(".domain").hide();
                                                            
                                                            var parentID= $("#"+$('#hiddenID').val()).parent(".subtitleBar");
                                                            var childID =$("."+$('#hiddenLinkID').val());
                                                            var count=0;
                                                            
                                                            parentID.click(function(){
                                                                count++;
                                                                //The count variable enables that the action when second click is different
                                                                // from the first click action
                                                                if(count % 2 != 0) {
                                                                    childID.show();
                                                                    parentID.css("background","#A0A0A0");
                                                                    childID.css("background","#808080");
                                                                    childID.css("font-size","0.95em");
                                                                    parentID.css("color","white");
                                                                    childID.css("color","white");
                                                                }else{
                                                                    childID.hide();
                                                                    parentID.css("background","white");
                                                                    childID.css("background","white");
                                                                    parentID.css("color","#373a3c");
                                                                    childID.css("color","#373a3c");
                                                                }    
                                                                
                                                            });
                                                  
                                                        }).fail( function( jqXHR, textStatus, errorThrown ) {
                                                            $('#blockedSitesList').html(" ");
                                                        });
                                                    }
                                                    
                                                    if(fifthLevelKey=="url"){
                                                 
                                                        // We load the showResult value in the specific ID. 
                                                        $('#'+ $('#hiddenDomainID').val()).html(fifthLevelValue);
                                                        $("#"+$('#hiddenDomainLinkID').val()).find("a").attr("href",fifthLevelValue);                                               
                                                        $("#"+$('#hiddenLinkID').val()).find("a").attr("href",fifthLevelValue);
                                                    }
                                            
                                                });
                                            });                                                                                                                                                                
                                        }                                                                                                    
                                    });
                                });
                            }  
            
                        });
                        
                    }).fail( function( jqXHR, textStatus, errorThrown ) {
                        $('#blockedSitesList').html(" ");
                    });
        }
        
 
        
}
   
