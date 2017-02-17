$(document)
		.ready(
				function() {

					// Global Variables
					var month_names = [ "Enero", "Febrero", "Marzo", "Abril",
							"Mayo", "Junio", "Julio", "Agosto", "Septiembre",
							"Octubre", "Noviembre", "Diciembre" ];

					var month_number = [ "01", "02", "03", "04", "05", "06",
							"07", "08", "09", 10, 11, 12 ];
					var count = 0;
					// url_data is where we fetch most of the case information
					// and pk is the id of the case

					var url_data_detail = url_one_case;

					// url_data is where we get the update data of the case and
					// pk is the id of the case
					var url_data_update = url_one_case_update;

					var url_share_facebook = "http://www.facebook.com/sharer.php?u=http://dev.web.pandora.saturno.space"
							+ url_case;
					var url_share_twitter = "http://twitter.com/share?url=http://dev.web.pandora.saturno.space"
							+ url_case;
					
					var url_share_reddit = "http://www.reddit.com/submit?url=http://dev.web.pandora.saturno.space"
						+ url_case;
					$("#download").attr("href", url_one_case_excel + "id=" + pk);
					
					$('#downloadPdf').attr("href", url_one_case_pdf + "id=" +pk);
					
					$("#shareFacebook").attr("href", url_share_facebook);

					$("#shareTwitter").attr("href", url_share_twitter);
					
					$("#shareReddit").attr("href", url_share_reddit);
					
					$("#measurementsLink").attr("href", url_data_measurements);
					

					// This AJAX call corresponds to the request of the JSON data from Pandora
					// project API.
					$
							.ajax({
								url : url_one_case,
								method : "GET",
								dataType : 'json',
								contentType : 'application/json'
							})

							.done(
									function(dataJson) {
										var temporal = "";

										// For each element in the JSON we need to collect their
										// values
										for (var i = 0; i < dataJson.length; i++)
											temporal = temporal.concat(dataJson[i]);

										var data = JSON.parse(temporal);

										

											count = 0;

											$("#domainTableTitle")
													.html(
															'<span class="tag tag-default tag-pill float-xs-left pill-size" id="count"></span>&nbsp'+$('#domainTrans').val());

											$.each(data.domains, function(index, result){

												count = count + 1;

												$("#count").html(count);


												$("#domainTableBody").append('<tr class="focus clickable" data-toggle="collapse" data-target="#data'+result.site+'"><td id="nameDomain">'+result.site+'</td><tr><td id="focusDomain" class="prueba" style="padding:0;"><div class="collapse" id="data'+result.site+'"><div></td></tr>');
												
											})
											
											$.each(data.domains, function(index, result){
												
												$("#data"+result.site).append('<tr class="rowDomain"><td id="siteDomain" style="width:100%">'+result.url+'</td><td><i class="fa fa-lock" aria-hidden="true"></i></td></tr>');
											
											})
											
											$("#caseCategory").append('&nbsp <div class="'
													+ (data.category).name
													+ '"><div class="left_cornerTag"></div><div class="contentTag">'
													+ (data.category).display_name
													+ '</div><div class="right_cornerTag"></div></div>')
											
											
										

										
									});
					// First Ajax call to recieve the case data from server
					$
							.ajax({
								url : url_data_detail,
								method : 'GET',
								dataType : 'json',
								contentType : 'application/json'
							})
							.done(
									function(dataJson) {
										var temporal = "";
										// For each element in the JSON we need
										// to collect their values
										for (var i = 0; i < dataJson.length; i++)
											temporal = temporal
													.concat(dataJson[i]);
										var data = JSON.parse(temporal);

										// variable that has the data from
										// server
										var dataJson = data;
										// list of event's id's for future
										// automatically url search
										var id_events = [];


										// case ID
										case_id = data.id;
										// date has the case date in dateType
										// format to use javascript methods
										var date = new Date(dataJson.start_date);
										var dateEnd = new Date(dataJson.end_date);
										var title = dataJson.title_de;
										var description = dataJson.description_de;
										var twitter_search = dataJson.twitter_search;
										var domains_count = (dataJson.domains).length;
										

										
										// Carrousel for multiple sites case or simple image for single site case
										
										if(domains_count == 1){
											// For cases with one site, a simple image is loaded. The image is stored in 
											// static/screenshots and has a name similar to "screen_case_#ID_0.png"
											$("#caseImage").html('<img src="" class="img-fluid" style="width:100%">');
											var png = png_commons + "_0.png";	
											$("#caseImage img").attr("src", png);
											var image_meta = png;
										}
										else{
											// For cases with multiple sites, a carrousel is loaded. The images are stored in 
											// static/screenshots and has a name similar to "screen_case_#ID_#DomainCount.png"
											$("#caseImage").append('<div id="owl-demo" class="owl-carousel owl-theme"></div>');
											
											for(var i = 0; i < domains_count; i++){
												
												$(".owl-carousel").append('<div class="item"><img src="" class="img-fluid"></div>');
												var png = png_commons + "_" + i + ".png";	
												$(".img-fluid").attr("src", png);
												$(".img-fluid").removeClass('img-fluid');
												
												if(i == 0){
													var image_meta = png;
												}
											}
											
											// Settings for the carrousel
											$("#owl-demo").owlCarousel({
												  

											      navigation : true, 
											      navText: [
											                       "<i class='fa fa-chevron-left'></i>",
											                       "<i class='fa fa-chevron-right'></i>"
											                    ],
											      slideSpeed : 300,
											      paginationSpeed : 400,
											      nav: true,
											      items : 1, 
											      itemsDesktop : false,
											      itemsDesktopSmall : false,
											      itemsTablet: false,
											      itemsMobile : false

											 
											 });
											
											 // Custom Navigation Events
											  function showNav(e){
												    if ($(".next").css("float") == "right") {
												      $(".next").fadeIn();
												      $(".prev").fadeIn();
												    }
												  }
												  function hideNav(e){
												    $(".next").fadeOut();
												    $(".prev").fadeOut();
												  }
												  $("#jm-Section-CARU").hover(showNav, hideNav);
												  $('.customNextBtn').click(function(e) {
												    e.preventDefault();
												    $(".owl-carousel").trigger('next.owl.carousel');
												  });
												  $('.customPrevBtn').click(function(e) {
												    e.preventDefault();
												    $(".owl-carousel").trigger('prev.owl.carousel');
												  });
											 
										}
									
										
										
										
										// Title & date for the main DIV in the
										// details template										
										$('head').append(
												'<meta property="og:title" content="VE Sin filtro: '
														+ title + '" />');

										$('head')
												.append(
														'<meta property="og:image" content="'
																+ image_meta
																+ '" />');
										$('head').append(
												'<meta property="og:url" content="http://dev.web.pandora.saturno.space'
														+ url_case + '" />');
										$('head').append(
												'<meta property="og:description" content="'
														+ description + '" />');

										$('head')
												.append(
														'<meta property="twitter:card" content="summary_large_image" />');
										$('head').append(
												'<meta property="twitter:title" content="VE Sin filtro: '
														+ title + '" />');
										$('head')
												.append(
														'<meta property="twitter:site" content="VSF" />');
										$('head').append(
												'<meta property="twitter:description" content="'
														+ description + '" />');
										$('head')
												.append(
														'<meta property="twitter:image:src" content="'
																+ image_meta
																+ '" />');

										$('#titleDateAjax').html(
												date.getDate()
														+ "/"
														+ month_number[date
																.getMonth()]
														+ "/"
														+ date.getFullYear());

										$.each(dataJson.isp, function(
												secondLevelKey,
												secondLevelValue) {

											$('#ispAjax').append(
													'<button class="contextualButtonFixedSize">'
															+ secondLevelValue
															+ '</button>');
										})
										// Title & Description according Main website Language
										$('#titleAjax').html(title);
										$('#descriptionAjax').html(description);
										
										// If website langues is not de main one, find the title
										// and description according to the language in var:language
										if (language != "en"){
											var titleLanguage= "title_"+language;
											var descriptionLanguage = "description_"+language;
											$('#titleAjax').html(dataJson[titleLanguage]);
											$('#descriptionAjax').html(dataJson[descriptionLanguage]);
											
											// if the translated field is empty on Json use the main
											// language of the website and highlight it
											if (dataJson[titleLanguage] == null){
												$('#titleAjax').html("<strong>"+title+"</strong>");
											}
											if (dataJson[descriptionLanguage] == null){
												$('#titleAjax').html("<strong>"+description+"</strong>");
											}
											
										} 
										
										

										// if the end_date is null it means that
										// the case is still active, still needs
										// to do the else case when the case is
										// considered finished

										if (dataJson.end_date == null) {
											$('#statusAjax').html($('#continueTrans').val());
											$('#statusDateAjax').html(date.getDate()
																	+ "/"
																	+ month_number[date.getMonth()]
																	+ "/"
																	+ date.getFullYear());
										}
										else{
											$('#statusDateAjax').html(date.getDate()
													+ "/"
													+ month_number[date.getMonth()]
													+ "/"
													+ date.getFullYear());
											
											$('#statusAjax').html(dateEnd.getDate()
													+ "/"
													+ month_number[dateEnd.getMonth()]
													+ "/"
													+ dateEnd.getFullYear());
											
											$(".timelineBarContinue").addClass("timelineBarClosed")
											$(".timelineBarContinue").removeClass("timelineBarContinue")
									
										}


										if (twitter_search != "") {
											

											$("#twitterSearchTextTitle .title").html("Resultados de Twitter")
											$("#twitterSearchTextContent .title").html(decodeURI(twitter_search))

											if (dataJson.end_date == null) {
												
												var until = new Date();
												var today =  until.getFullYear()+ "-"+ until.getMonth() + "-"+ until.getDate();
												var since = date.getFullYear()+ "-"+ date.getMonth() + "-"+ date.getDate();
												twitter_search = twitter_search + " " +  since
												twitterSearch(encodeURIComponent(twitter_search));
											}
											else{
												var until = dateEnd.getFullYear()+ "-"+ dateEnd.getMonth()+ "-"+ dateEnd.getDate();
												var since = date.getFullYear()+ "-"+ date.getMonth() + "-"+ date.getDate();
												twitter_search = twitter_search + " " + until  + " " +  since
												twitterSearch(encodeURIComponent(twitter_search));
											}
											
											
										}
										else{
											$('#twitterTweet').html("<div class='failedService'><img style='background:gray' src='"+ fail_twitter_img + "' alt='service fail' /><br><p>No search word</p></div>");

										}

										// AJAX call for updates datails API
										// associated to the case
										$
												.ajax(
														{
															url : url_data_update,
															method : 'GET',
															dataType : 'json',
															contentType : 'application/json'
														})
												.done(
														function(dataJson) {
															// dataEvents has
															// the whole case
															// data with the
															// details of the
															// events in the
															// following Object
															// {id,events,title,description,start_date,end_date,category,draft}
															// where the events
															// key has an array
															// of objects
															// {isp,start_date,end_date,target,identification,type}

															var temporal = "";

															// For each element
															// in the JSON we
															// need to collect
															// their values
															for (var i = 0; i < dataJson.length; i++)
																temporal = temporal
																		.concat(dataJson[i]);

															var data = JSON
																	.parse(temporal);

															// variable that has
															// the data from
															// server
															var dataUpdates = data;
															
															if ((dataUpdates.updates).length == 0){
																
																$('#updateListAjax').html("<div class='failedService'><img src='"+ fail_service_img + "' alt='service fail' /><br><p>No updates</p></div>");
																
															}
															else{
																
																$
																.each(
																		dataUpdates.updates,
																		function(
																				index,
																				value) {

																			var update_date = new Date(
																					value.date)
																			var update_text = value.text_de;
																			if (language!= "en"){
																				var textLanguage = "text_"+language;
																				update_text = value[textLanguage];
																			}
																			var update_category = value.category;

																			if (update_category == "grave") {
																				$(
																						'#updateListAjax')
																						.append(
																								'<div class="col-xs-12 updateBar"><div class="col-xs-2" ><div class="col-xs-7" ><div class="col-xs-12 dateDayMonth headline" id="dateDayMonthEventAjax">'
																										+ update_date
																												.getDate()
																										+ " "
																										+ month_names[update_date
																												.getMonth()]
																										+ '</div><div class="col-xs-12 dateYear" id="dateYearEventAjax">'
																										+ update_date
																												.getFullYear()
																										+ '</div></div><div class="col-xs-2" style="padding-left: 0;"><div class="symbolBlocked"></div></div></div><div class="col-xs-7 content" style="padding-left: 0;">'
																										+ update_text
																										+ '</div><div class="col-xs-3 share"><a href="#">View more...</a><a href="#" target="_blank"><i class="fa fa-facebook-square "></i></a><a href="#" target="_blank"><i class="fa fa-twitter"></i></a><a href="#" target="_blank"><i class="fa fa-pinterest"></i></a></div></div>');
																			} else if (update_category == "info") {
																				$(
																						'#updateListAjax')
																						.append(
																								'<div class="col-xs-12 updateBar"><div class="col-xs-2" ><div class="col-xs-7" ><div class="col-xs-12 dateDayMonth headline" id="dateDayMonthEventAjax">'
																										+ update_date
																												.getDate()
																										+ " "
																										+ month_names[update_date
																												.getMonth()]
																										+ '</div><div class="col-xs-12 dateYear" id="dateYearEventAjax">'
																										+ update_date
																												.getFullYear()
																										+ '</div></div><div class="col-xs-2" style="padding-left: 0;"><div class="symbolBlocked" style = "background:cyan"></div></div></div><div class="col-xs-7 content" style="padding-left: 0;">'
																										+ update_text
																										+ '</div><div class="col-xs-3 share"><a href="#">View more...</a><a href="#" target="_blank"><i class="fa fa-facebook-square "></i></a><a href="#" target="_blank"><i class="fa fa-twitter"></i></a><a href="#" target="_blank"><i class="fa fa-pinterest"></i></a></div></div>');
																			} else {
																				$(
																						'#updateListAjax')
																						.append(
																								'<div class="col-xs-12 updateBar"><div class="col-xs-2" ><div class="col-xs-7" ><div class="col-xs-12 dateDayMonth headline" id="dateDayMonthEventAjax">'
																										+ update_date
																												.getDate()
																										+ " "
																										+ month_names[update_date
																												.getMonth()]
																										+ '</div><div class="col-xs-12 dateYear" id="dateYearEventAjax">'
																										+ update_date
																												.getFullYear()
																										+ '</div></div><div class="col-xs-2" style="padding-left: 0;"><div class="symbolBlocked" style = "background:green"></div></div></div><div class="col-xs-7 content" style="padding-left: 0;">'
																										+ update_text
																										+ '</div><div class="col-xs-3 share"><a href="#">View more...</a><a href="#" target="_blank"><i class="fa fa-facebook-square "></i></a><a href="#" target="_blank"><i class="fa fa-twitter"></i></a><a href="#" target="_blank"><i class="fa fa-pinterest"></i></a></div></div>');
																			}

																		})
															}

															
														});

									}).fail(function(jqXHR, textStatus, errorThrown) {
										$('#twitterDiv').html("<div class='failedService'><img style='margin-top: 100px; background:gray' src='"+ fail_twitter_img + "' alt='service fail' /><br><p>Failed to load service</p></div>");
										$('#caseImage').closest('.container-fluid').html("<div class='failedService'><img src='"+ fail_service_img + "' alt='service fail' /><br><p>Failed to load service</p></div>");
										$('#titleAjax').html("Failed to load case");
										$('#download').closest('.row').html('');
										$('#descriptionAjax').html("<div class='failedService'><img style='background:gray'  src='"+ fail_service_img + "' alt='service fail' /><br><p>Failed to load service</p></div>");
										$('#updateListAjax').html("<div class='failedService'><img src='"+ fail_service_img + "' alt='service fail' /><br><p>Failed to load service</p></div>");
										$('#timeline1').closest('.container-fluid').html("<div class='failedService'><img  style='background:gray'  src='"+ fail_service_img + "' alt='service fail' /><br><p>Failed to load service</p></div>");
										
										
									});

				});

// function for the domain/sites list in the page

function select(option) {

	// When select function is invoked the list is emptied
	$("#domainTableBody").empty();
	var url_data = url_one_case;

	// This AJAX call corresponds to the request of the JSON data from Pandora
	// project API.
	$
			.ajax({
				url : url_data,
				method : "GET",
				dataType : 'json',
				contentType : 'application/json'
			})

			.done(
					function(dataJson) {
						var temporal = "";

						// For each element in the JSON we need to collect their
						// values
						for (var i = 0; i < dataJson.length; i++)
							temporal = temporal.concat(dataJson[i]);

						var data = JSON.parse(temporal);

						if (option == "domains") {

							count = 0;

							$("#domainTableTitle")
									.html(
											'<span class="tag tag-default tag-pill float-xs-left pill-size" id="count" style="font-size:100%; background-color:red"></span>&nbsp'+$('#domainTrans').val());

							$.each(data.domains, function(index, result) {

								count = count + 1;

								$("#count").html(count);

								$("#domainTableBody").append(
										'<tr><td style="border-radius:5px">'
												+ result.url + '</td><tr>');
								
							})
						}

						else {

							count = 0;

							$("#domainTableTitle")
									.html(
											'<span class="tag tag-default tag-pill float-xs-left pill-size" id="count" style="font-size:100%; background-color:red"></span>&nbsp'+$('#siteTrans').val());

							$.each(data.domains, function(index, result) {

								count = count + 1;

								$("#count").html(count);

								$("#domainTableBody").append(
										'<tr><td style="text-transform:capitalize;border-radius:5px">'
												+ result.site + '</td><tr>');

							})

						}

					})
					;

}

