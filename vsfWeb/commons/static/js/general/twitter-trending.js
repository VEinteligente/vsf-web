
           
    // These variables are the URLs used for the AJAX calls in the list.js file. They need to be specified here 
    // because of DJango configuration
     
    

            $.ajax({
                url: url_data_twitter,
                context: document.body
            }).done(function(response){
                    
                    console.log(response)
                     $('#twitter').html(response);   
     
                });
            
    