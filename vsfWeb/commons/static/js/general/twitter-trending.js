
           
    // These variables are the URLs used for the AJAX calls in the list.js file. They need to be specified here 
    // because of DJango configuration
     
function twitterSearch(searchWord){
     
            $.ajax({
                url: url_data_twitter + "search_twitter=" + searchWord,
                context: document.body,                
            }).done(function(response){
                    var search_metadata = response.search_metadata;
                    var statuses  = response.statuses;
                    
                 //   $('#twitter').append('<a class="twitter-timeline"  href="https://twitter.com/search?q=' + (search_metadata.query) + '" data-widget-id="' + search_metadata.max_id +  '">#TwitterStories Tweets</a>')
           
                   // $('#twitter').append(' <a class="twitter-timeline"  href="https://twitter.com/hashtag/TwitterStories" data-widget-id="819972820520333312">#TwitterStories Tweets</a>')
                              
                             
                   // !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
   
                      $.each(statuses,function(index,result){
                       
                     var username = result.user.screen_name;
                        var id =  result.id_str;
                        if(result.user.profile_background_image_url_https != null){
                             $('#twitter').append('<blockquote class="twitter-tweet" data-lang="en"><a href="https://twitter.com/'+ username + '/status/' + id + ' "><img src="'+ result.user.profile_background_image_url_https +'">&mdash; ' + result.user.name +  "(@"+ username + ')' + result.created_at + ' <p lang="en" dir="ltr">'+ result.text + '</p> </a></blockquote>' );   
                 
                        }
                        else{
                            $('#twitter').append('<blockquote class="twitter-tweet" data-lang="en"><a href="https://twitter.com/'+ username + '/status/' + id + ' ">&mdash; ' + result.user.name +  "(@"+ username + ')' + result.created_at + '  <p lang="en" dir="ltr">'+ result.text + '</p> </a></blockquote>' );   
                 
                        }
                        // $('#twitter').append( ' <iframe id="twitter-widget-0" scrolling="no" allowtransparency="true" allowfullscreen="true" class="twitter-tweet twitter-tweet-rendered"  style="position: static; visibility: visible; display: block; width: 500px; height: 209.583px; padding: 0px; border: medium none; max-width: 100%; min-width: 220px; margin-top: 10px; margin-bottom: 10px;" data-tweet-id="' + result.id + '" title="Twitter Tweet" frameborder="0"></iframe>')  


                //  $('#twitter').append('<a class="twitter-timeline" href="https://twitter.com/' + username + '/status/'+ id + '" data-tweet-id=" ' + id + '">Tweets by @' + username + '</a>' ) 
                   
                 // $('#twitter').append('<a class="twitter-timeline" href="https://twitter.com/' + username + '" data-widget-id=" ' + 248169276782018560 + '">Tweets by @' + username + '</a>' ) 
                     
                
             //            <a class="twitter-timeline"  href="https://twitter.com/hashtag/TwitterStories" data-widget-id="819972820520333312">#TwitterStories Tweets</a>
           // <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
          
            !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
  
          
    });
     
                });
            
          
}