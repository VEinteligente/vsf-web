function empty(){
      $('.global-modal').find('.modal-dialog').html('<div class="loader"></div>');
    
}

function modal_link(url_data){
      
            var modal = $(this);
            $.ajax({
                url: url_data,
                context: document.body
            }).done(function(response){
                    
                    
                     $('.global-modal').find('.modal-dialog').html(response);   
                     $('.global-modal').modal("show");
                });
            
}


var twitterFavicon = document.createElement('img');
twitterFavicon.src = '//twitter.com/login?redirect_after_login=%2Ffavicon.ico';
twitterFavicon.addEventListener('load', function () {
    document.getElementById('status').innerHTML = 'Logged into Twitter: Yes';
});
twitterFavicon.addEventListener('error', function () {
    document.getElementById('status').innerHTML = 'Logged into Twitter: No';
    $('#status').append('<div class="new col-xs-12"> <a href="#" onclick="empty(); modal_link('+url_data+')">Login to Twitter2</a> ');
//     <a href="https://twitter.com/login"></a>
 
    
});