function twitterSearch(searchWord) {

	$.ajax({
		url : url_data_twitter + "search_twitter=" + searchWord,
		context : document.body,
	}).done(
		function(response) {
			var search_metadata = response.search_metadata;
			var statuses = response.statuses;
				if(statuses.length === 0){
					$('#twitterTweet').append('No tweets')
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

			$('#twitterTweet').html("<div class='failedService'><img style='background:gray' src='"+ fail_twitter_img + "' alt='service fail' /><br><p>Failed to load service</p></div>");
		});

}