function twitterSearch(searchWord) {
	console.log(searchWord)
	
	console.log(searchWord)
	$.ajax({
		url : url_data_twitter + "search_twitter=" + searchWord,
		context : document.body,
	}).done(
		function(response) {
			var search_metadata = response.search_metadata;
			var statuses = response.statuses;
				if(statuses.length === 0){
					$('#subGraphTwitter').remove();
				}
				else{
					$.each(statuses,function(index, result) {
						var username = result.user.screen_name;
						var id = result.id_str;
						// Renders the tweet block to be styled by the Twitter API
						if (result.user.profile_background_image_url_https != null) {
							$('#twitterTweet').append('<blockquote class="twitter-tweet" data-lang="en"><a href="https://twitter.com/'
														+ username + '/status/' + id + ' "><img src="' + result.user.profile_background_image_url_https
														+ '">&mdash; ' + result.user.name + "(@" + username + ')' + result.created_at + ' <p lang="en" dir="ltr">'
														+ result.text + '</p> </a></blockquote>');

						} else {
							$('#twitterTweet').append( '<blockquote class="twitter-tweet" data-lang="en"><a href="https://twitter.com/'
														+ username + '/status/' + id + ' ">&mdash; ' + result.user.name
														+ "(@" + username + ')' + result.created_at + '  <p lang="en" dir="ltr">'
														+ result.text + '</p> </a></blockquote>');

						}
						// Load the component style from the tweet with the twitter API			
						!function(d, s, id) {
							var js, fjs = d.getElementsByTagName(s)[0];
							
							if (!d.getElementById(id)) {
								js = d.createElement(s);
								js.id = id;
								js.src = "//platform.twitter.com/widgets.js";
								fjs.parentNode.insertBefore(js, fjs);
							}
						}
						(document, "script", "twitter-wjs"); 
					});
				}
				

		}).fail(function(jqXHR, textStatus, errorThrown) {
			$('#twitterDiv').css('padding-right','0');
			$('#twitterTweet').html("<div class='failedService'><img  src='"+ fail_twitter_img + "' alt='service fail' /><br><p>Failed to load service</p></div>");
		});

}



function twitterSearchModal() {
	$(".modal-footer").css('background','white');
	$(".modal-footer").css('padding','15px');
	
	$(".modal-footer").append('<div class="modal-body container-fluid col-xs-12"'
			 + 'id="modaltwtterDiv"> <div id="modaltwitterTweet"></div>'
			 + '<div id="modaltwitterSearchText"><div id="modaltwitterSearchTextTitle">'
			 + '<div class="h4Style title"></div></div><div id="modaltwitterSearchTextContent">'
			 + '<div class="title"></div></div></div></div>');
	var searchWord = $("#hidden_twitterSearch").val();
	var searchWordText = $("#twitterSearchTextContent .title").text();
	$("#modalSearchTextTitle").append('<div id="twitterSearchTextTitle"><div class="h4Style title">Resultados de Twitter: </div></div>')
	$("#modalSearchTextTitle").append( searchWordText );
	
	$.ajax({
		url : url_data_twitter + "search_twitter=" + searchWord,
		context : document.body,
	}).done(
		function(response) {
			var search_metadata = response.search_metadata;
			var statuses = response.statuses;
			
			
				if(statuses.length === 0){
					$(".modal-footer").css('background','#dedede');
					$(".modal-footer").css('padding','0');
					
					$('#modaltwitterDiv').css('padding-right','0');
					$('#modaltwitterTweet').html("<div class='failedService' ><img  src='"+ fail_twitter_img + "' alt='service fail' /><br><p>No tweets found</p></div>");
				}
				else{
					$.each(statuses,function(index, result) {
						var username = result.user.screen_name;
						var id = result.id_str;
						// Renders the tweet block to be styled by the Twitter API
						if (result.user.profile_background_image_url_https != null) {
							$('#modaltwitterTweet').append('<blockquote class="twitter-tweet" data-lang="en"><a href="https://twitter.com/'
														+ username + '/status/' + id + ' "><img src="' + result.user.profile_background_image_url_https
														+ '">&mdash; ' + result.user.name + "(@" + username + ')' + result.created_at + ' <p lang="en" dir="ltr">'
														+ result.text + '</p> </a></blockquote>');

						} else {
							$('#modaltwitterTweet').append( '<blockquote class="twitter-tweet" data-lang="en"><a href="https://twitter.com/'
														+ username + '/status/' + id + ' ">&mdash; ' + result.user.name
														+ "(@" + username + ')' + result.created_at + '  <p lang="en" dir="ltr">'
														+ result.text + '</p> </a></blockquote>');

						}
						 if (typeof (twttr) != 'undefined') {
					            twttr.widgets.load();
					        } else {
					            $.getScript('http://platform.twitter.com/widgets.js');
					        }
					});
				}
				

		}).fail(function(jqXHR, textStatus, errorThrown) {
			$(".modal-footer").css('background','#dedede');
			$(".modal-footer").css('padding','0');
			$('#modaltwitterDiv').css('padding-right','0');
			$('#modaltwitterTweet').html("<div class='failedService'><img  src='"+ fail_twitter_img + "' alt='service fail' /><br><p>Failed to load service</p></div>");
		});
	
	$('.global-modal').modal("show");
}

