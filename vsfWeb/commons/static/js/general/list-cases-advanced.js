// formSer are the serialized form values
var formSer = "";



// The commands inside the $(document).ready are all the commands that will be
// loaded
// after the rest of the page is loaded.
$(document)
		.ready(
				function() {
					
					// Datepickers format
					$(".datepicker").datepicker({
						dateFormat : 'yy-mm-dd'
					}).val("");

					changeMultipleChoice([ "#category", "#isp", "#site",
							"#region" ]);

					// Variables corresponding to the search fields from the URL
					// parameters
					var hidden_title = $("#hidden_title").val();
					var hidden_category = $("#hidden_category").val();
					var hidden_region = $("#hidden_region").val();
					var hidden_start_date = $("#hidden_start_date").val();
					var hidden_end_date = $("#hidden_end_date").val();
					var hidden_site = $("#hidden_site").val();
					var hidden_isp = $("#hidden_isp").val();

					// If no date exist in the URL then replace the
					// hidden_element by empty string
					if (hidden_start_date == "--") {
						hidden_start_date = "";
					}

					if (hidden_end_date == "--") {
						hidden_end_date = "";
					}

					// Concatenate the parameters value from URL to check if any
					// exists
					var hidden = hidden_title + hidden_site + hidden_isp
							+ hidden_category + hidden_region
							+ hidden_start_date + hidden_end_date;
					
					
					
					
				    
		
					
					if (hidden.length == 0) {
						
						fillSelectors("#isp", url_isp,"");
					    fillSelectors("#category", url_category,"");
					    fillSelectors("#region", url_region,"");
					    fillSelectors("#site", url_site,"");
						// This AJAX call corresponds to the request of the JSON
						// data from Pandora project API.
						$
								.ajax({
									url : url_data,
									method : "GET",
									dataType : 'json',
									contentType : 'application/json'
								})
								.done(
										function(data) {

											var temporal = "";

											// For each element in the JSON we
											// need to collect their values
											for (var i = 0; i < data.length; i++) {
												temporal = temporal
														.concat(data[i]);
											}

											var dataJson = JSON.parse(temporal);
											$("#download")
													.attr("href", url_csv);

											$
													.each(
															dataJson,
															function(key, value) { // First
																					// Level

																if (key == "count") {

																	$(
																			"#resultados")
																			.html(
																					"Resultados de busqueda <strong>"
																							+ value
																							+ "</strong>");

																}

																// We need to
																// access this
																// element to
																// get each case
																// data
																if (key == "results") {

																	$
																			.each(
																					dataJson.results,
																					function(
																							secondLevelKey,
																							secondLevelValue) { // Second
																												// Level

																						$
																								.each(
																										secondLevelValue,
																										function(
																												thirdLevelKey,
																												thirdLevelValue) { // Third
																																	// Level

																											if (thirdLevelKey == "id") {

																												$(
																														".listCasesAdvanced")
																														.append(
																																"<div class='col-xs-12 smallBar' onclick=goTo("+ thirdLevelValue +")><div class='h5Style title' style='padding-left: 0px;' >"
																																		+ "<input type='hidden' class='id_case' value='"+ thirdLevelValue +"'>"		
																																		+ "<div class='col-xs-1 dateStart' style='padding-left: 0px;'></div>"
																																		+ "<div class='col-xs-1 dateEnd' style='padding-left: 0px;'></div>"
																																		+ "<div class='col-xs-3 name' style='display: flex; padding-left: 0px;'></div>"
																																		+ "<div class='col-xs-1 site' style='padding-left: 0px;'></div>"
																																		+ "<div class='col-xs-1 isp' style='padding-left: 0px;'></div>"
																																		+ "<div class='col-xs-1 category' style='padding-left: 0px; padding-bottom: 5px;'></div>"
																																		+ "<div class='col-xs-1 region' style='padding-left: 0px;'></div>"
																																		+ "</div>     </div>");

																											}

																											if (thirdLevelKey == "region") {

																												if (thirdLevelValue.length < 2) {

																													$(
																															".listCasesAdvanced")
																															.find(
																																	".region")
																															.append(
																																	thirdLevelValue);

																												} else {
																													for (var i = 0; i < thirdLevelValue.length; i++) {
																														if (i == thirdLevelValue.length - 1) {
																															$(
																																	".listCasesAdvanced")
																																	.find(
																																			".region")
																																	.append(
																																			thirdLevelValue[i]);
																														} else {
																															$(
																																	".listCasesAdvanced")
																																	.find(
																																			".region")
																																	.append(
																																			thirdLevelValue[i]
																																					+ ", ");
																														}

																													}

																												}
																												$(
																														".listCasesAdvanced")
																														.find(
																																".region")
																														.addClass(
																																"regionSort");
																												$(
																														".listCasesAdvanced")
																														.find(
																																".region")
																														.removeClass(
																																"region");

																											}

																											if (thirdLevelKey == "description") {

																												$(
																														".listCasesAdvanced")
																														.find(
																																".name")
																														.append(
																																"<strong style='white-space: nowrap;overflow: hidden; text-overflow: ellipsis;'>"
																																		+ thirdLevelValue
																																		+ "</strong> <br>");
																												$(
																														".listCasesAdvanced")
																														.find(
																																".name")
																														.addClass(
																																"nameSort");
																												$(
																														".listCasesAdvanced")
																														.find(
																																".name")
																														.removeClass(
																																"name");

																											}

																											if (thirdLevelKey == "domains") {

																												$.each( thirdLevelValue, function( fourthLevelKey, fourthLevelValue) {
																													console.log(thirdLevelValue.length)
																													if (thirdLevelValue.length < 2) {
																										
																														$(".listCasesAdvanced").find(".site").append(fourthLevelValue.site);

																													} else {
																													
																														for (var i = 0; i < thirdLevelValue.length; i++) {
																															
																															if (i == thirdLevelValue.length - 1) {
																																console.log(thirdLevelValue[i])
																																$(".listCasesAdvanced").find(".site").append(thirdLevelValue[i].site);
																															} else {
																																console.log((fourthLevelValue.site))
																																$(".listCasesAdvanced").find(".site").append(thirdLevelValue[i].site + ", ");
																															}

																														}

																													}				
																													
//																													$(".listCasesAdvanced").find(".site").append(fourthLevelValue.site);
																																	
																																	$(".listCasesAdvanced").find(".site").addClass("siteSort");
																																	$(".listCasesAdvanced").find(".site").removeClass("site");

																																});

																											}

																											if (thirdLevelKey == "isp") {

																												if (thirdLevelValue.length < 2) {

																													$(
																															".listCasesAdvanced")
																															.find(
																																	".isp")
																															.append(
																																	thirdLevelValue);

																												} else {
																													for (var i = 0; i < thirdLevelValue.length; i++) {
																														if (i == thirdLevelValue.length - 1) {
																															$(
																																	".listCasesAdvanced")
																																	.find(
																																			".isp")
																																	.append(
																																			thirdLevelValue[i]);
																														} else {
																															$(
																																	".listCasesAdvanced")
																																	.find(
																																			".isp")
																																	.append(
																																			thirdLevelValue[i]
																																					+ ", ");
																														}

																													}

																												}

																												$(
																														".listCasesAdvanced")
																														.find(
																																".isp")
																														.addClass(
																																"ispSort");
																												$(
																														".listCasesAdvanced")
																														.find(
																																".isp")
																														.removeClass(
																																"isp");

																											}

																											if (thirdLevelKey == "start_date") {

																												datethirdLevelValue = thirdLevelValue
																														.split("T");
																												datethirdLevelValue = datethirdLevelValue[0]
																														.split("-");
																												date = datethirdLevelValue[2]
																														+ "/"
																														+ datethirdLevelValue[1]
																														+ "/"
																														+ datethirdLevelValue[0];
																												$(
																														".listCasesAdvanced")
																														.find(
																																".dateStart")
																														.append(
																																"<strong>"
																																		+ date
																																		+ "</strong> <br>");
																												$(
																														".listCasesAdvanced")
																														.find(
																																".dateStart")
																														.addClass(
																																"dateStartSort");
																												$(
																														".listCasesAdvanced")
																														.find(
																																".dateStart")
																														.removeClass(
																																"dateStart");
																											}

																											if (thirdLevelKey == "end_date") {

																												if (thirdLevelValue != null) {

																													datethirdLevelValue = thirdLevelValue
																															.split("T");
																													datethirdLevelValue = datethirdLevelValue[0]
																															.split("-");
																													date = datethirdLevelValue[2]
																															+ "/"
																															+ datethirdLevelValue[1]
																															+ "/"
																															+ datethirdLevelValue[0];
																													$(
																															".listCasesAdvanced:last-child")
																															.find(
																																	".dateEnd")
																															.append(
																																	date);
																													$(
																															".listCasesAdvanced")
																															.find(
																																	".dateEnd")
																															.addClass(
																																	"dateEndSort");
																													$(
																															".listCasesAdvanced")
																															.find(
																																	".dateEnd")
																															.removeClass(
																																	"dateEnd");

																												} else {

																													$(
																															".listCasesAdvanced:last-child")
																															.find(
																																	".dateEnd")
																															.append(
																																	"presente");
																													$(
																															".listCasesAdvanced")
																															.find(
																																	".dateEnd")
																															.addClass(
																																	"dateEndSort");
																													$(
																															".listCasesAdvanced")
																															.find(
																																	".dateEnd")
																															.removeClass(
																																	"dateEnd");

																												}
																											}

																											if (thirdLevelKey == "category") {

																												CategoryTag(thirdLevelValue);
																												
																												
											


								

															
																												
																												

																												$(
																														".listCasesAdvanced")
																														.find(
																																".category")
																														.addClass(
																																"categorySort");
																												$(
																														".listCasesAdvanced")
																														.find(
																																".category")
																														.removeClass(
																																"category");

																											}

																										});

																					});
																}

															});

											$(".listCasesAdvanced").append(
													" <hr>");

										})
								.fail(function(jqXHR, textStatus, errorThrown) {
									$('.listCasesAdvanced').html("<div class='failedService'><img src='"+ fail_service_img + "' alt='service fail' /><br><p>Failed to load service</p></div>");
								});

					} else {

						// Change the input of the search with the URL
						// parameters if they exist and submit the form
						
						if (hidden_title.length == 0) {
							$("#title").val("");
						} else {
							$("#title").val(hidden_title);
						}

						if (hidden_category.length == 0) {
							$("#category").val("");
							
							
						    fillSelectors("#category", url_category,"");
						   
						} else {
							
							
							
						    fillSelectors("#category", url_category,hidden_category);
						    
							
							 
						}

						if (hidden_isp.length == 0) {
							$("#isp").val("");
							fillSelectors("#isp", url_isp,"");
						    
						} else {

							
							
							
							fillSelectors("#isp", url_isp,hidden_isp);
						   
							
							 
							 

						}

						if (hidden_site.length == 0) {
							$("#site").val("");
							
						    fillSelectors("#site", url_site,"");
						} else {
							
						    fillSelectors("#site", url_site,hidden_site);

						}

						if (hidden_region.length == 0) {
							$("#region").val("");
						
						    fillSelectors("#region", url_region,"");
				
						} else {
						
						
						    fillSelectors("#region", url_region,hidden_region);
						    

						}

						if (hidden_start_date == "--") {
							$("#start_date").val("");
						} else {
							$("#start_date").val(hidden_start_date);
						}

						if (hidden_end_date == "--") {
							$("#end_date").val("");
						} else {
							$("#end_date").val(hidden_end_date);
						}

						$("#advanced_search").submit();
						

					}

					 
				});

$("#advanced_search")
		.submit(
				function(e) {

					// Empty the search result to fill with new result
				
					$(".listCasesAdvanced").empty();
					

					// Serialize the form
					formSer = $("#advanced_search").serializeObject();
					
					
					if (($("#region").chosen().val()).length === 0) {

						formSer.region = $("#hidden_region").val();
						$("hidden_region").val("");

					} else {

						if (($("#region").chosen().val()).length < 2) {

							formSer.region = $("#region").chosen().val()[0];

						} else {
							formSer.region = $("#region").chosen().val()[0] + ", ";
							for (var i = 1; i < ($("#region").chosen().val()).length; i++) {

								if (i == ($("#region").chosen().val()).length - 1)
									formSer.region = formSer.region
											+ $("#region").chosen().val()[i];
								else
									formSer.region = formSer.region
											+ $("#region").chosen().val()[i] + ", ";

							}

						}

					}
				

					if (($("#category").chosen().val()).length === 0) {

						formSer.category = $("#hidden_category").val();
						$("hidden_category").val("");

					} else {

						if (($("#category").chosen().val()).length < 2) {

							formSer.category = $("#category").chosen().val()[0];

						} else {
							formSer.category = $("#category").chosen().val()[0] + ", ";
							for (var i = 1; i < ($("#category").chosen().val()).length; i++) {

								if (i == ($("#category").chosen().val()).length - 1)
									formSer.category = formSer.category
											+ $("#category").chosen().val()[i];
								else
									formSer.category = formSer.category
											+ $("#category").chosen().val()[i] + ", ";

							}

						}

					}
					

					if (($("#isp").chosen().val()).length === 0) {

						formSer.isp = $("#hidden_isp").val();
						$("#hidden_isp").val("")

					} else {

						if (($("#isp").chosen().val()).length < 2) {

							formSer.isp = $("#isp").chosen().val()[0];

						} else {
							formSer.isp = $("#isp").chosen().val()[0] + ", ";
							for (var i = 1; i < ($("#isp").chosen().val()).length; i++) {

								if (i == ($("#isp").chosen().val()).length - 1)
									formSer.isp = formSer.isp
											+ $("#isp").chosen().val()[i];
								else
									formSer.isp = formSer.isp
											+ $("#isp").chosen().val()[i] + ", ";

							}

						}

					}
					

        
					if (($("#site").chosen().val()).length === 0) {
						
						
						formSer.site = $("#hidden_site").val();
						
						$("#hidden_site").val("")
						 

					} else {

						if (($("#site").chosen().val()).length < 2) {

							formSer.site = $("#site").chosen().val()[0];
							$("#hidden_site").val(formSer.site)
						} else {
							formSer.site = $("#site").chosen().val()[0] + ", ";
							for (var i = 1; i < ($("#site").chosen().val()).length; i++) {

								if (i == ($("#site").chosen().val()).length - 1)
									formSer.site = formSer.site
											+ $("#site").chosen().val()[i];
								else
									formSer.site = formSer.site
											+ $("#site").chosen().val()[i] + ", ";

							}
							$("#hidden_site").val(formSer.site)

						}

					}
					
					// Prevent the page to redirect to new one
					e.preventDefault();

					// This AJAX call corresponds to the request of the JSON
					// data for the search results from Pandora project API.

					$
							.ajax({
								url : url_data_search,
								dataType : 'json',
								method : 'POST',
								data : JSON.stringify(formSer),
								contentType : 'application/json'
							})
							.done(
									function(data) {

										// Get the form values to construct the
										// URL of the search result

										if ((formSer.title).length !== 0) {
											var title = formSer.title;
										} else {
											var title = "";
										}

										if ((formSer.category).length !== 0) {
											var category = formSer.category;
										} else {
											var category = "";
										}

										if ((formSer.isp).length !== 0) {
											var isp = formSer.isp;
										} else {
											var isp = "";
										}

										if ((formSer.site).length !== 0) {
											var site = formSer.site;
										} else {
											var site = "";
										}

										var domain = "";

										if ((formSer.region).length !== 0) {
											var region = formSer.region;
										} else {
											var region = "";
										}

										if ((formSer.start_date).length !== 0) {
											var start_date = formSer.start_date;
										} else {
											var start_date = "--";
										}

										if ((formSer.end_date).length !== 0) {
											var end_date = formSer.end_date;
										} else {
											var end_date = "--";
										}

										// If there is a search parameter then
										// change the URL to add the parameters
										// or to initial search page but do not
										// redirect to it
										var hidden = title + category
												+ start_date + end_date
												+ region + isp + site + domain;

										if (hidden.length != 0) {
											history.pushState(null, null,
													url_data_list_empty
															+ "title=" + title
															+ "&category="
															+ category
															+ "&start_date="
															+ start_date
															+ "&end_date="
															+ end_date
															+ "&region="
															+ region + "&site="
															+ site + "&isp="
															+ isp);
											$("#download").attr(
													"href",
													url_csv + "title=" + title
															+ "&category="
															+ category
															+ "&start_date="
															+ start_date
															+ "&end_date="
															+ end_date
															+ "&region="
															+ region + "&site="
															+ site + "&isp="
															+ isp)

										} else if (hidden == " ") {
											history.pushState(null, null,
													url_data_list_empty);
											$("#download")
													.attr("href", url_csv);
										}

										e.preventDefault();

										var temporal = "";

										// For each element in the JSON we need
										// to collect their values
										for (var i = 0; i < data.length; i++) {
											temporal = temporal.concat(data[i]);
										}

										var dataJson = JSON.parse(temporal);

										$
												.each(
														dataJson,
														function(key, value) { // First
																				// Level

															if (key == "count") {

																$("#resultados")
																		.html(
																				"Resultados de busqueda <strong>"
																						+ value
																						+ "</strong>");
															}

															// We need to access
															// this element to
															// get each case
															// data
															if (key == "results") {

																$
																		.each(
																				dataJson.results,
																				function(
																						secondLevelKey,
																						secondLevelValue) { // Second
																											// Level

																					$
																							.each(
																									secondLevelValue,
																									function(
																											thirdLevelKey,
																											thirdLevelValue) { // Third
																																// Level

																										if (thirdLevelKey == "id") {

																											$(
																													".listCasesAdvanced")
																													.append(
																															"<div class='col-xs-12 smallBar' onclick=goTo("+ thirdLevelValue +")><div class='h5Style title' style='padding-left: 0px;' >"
																																	+ "<input type='hidden' class='id_case' value='"+ thirdLevelValue +"'>"
																																	+ "<div class='col-xs-1 dateStart' style='padding-left: 0px;'></div>"
																																	+ "<div class='col-xs-1 dateEnd' style='padding-left: 0px; '></div>"
																																	+ "<div class='col-xs-3 name' style='display: flex; padding-left: 0px;'></div>"
																																	+ "<div class='col-xs-1 site' style='padding-left: 0px;'></div>"
																																	+ "<div class='col-xs-1 isp' style='padding-left: 0px;'></div>"
																																	+ "<div class='col-xs-1 category' style='padding-left: 0px; padding-bottom: 5px;'></div>"
																																	+ "<div class='col-xs-1 region' style='padding-left: 0px;'></div>"
																																	+ "</div>     </div>");

																											// $(
																											// ".listCasesAdvanced"
																											// ).append(
																											// "<a
																											// href='http://192.168.0.115:8000/cases/api/detail/"
																											// +
																											// thirdLevelValue
																											// +
																											// "'>LINK</a>
																											// <br>"
																											// );
																										}

																										if (thirdLevelKey == "region") {
																											if (thirdLevelValue.length < 2) {

																												$(
																														".listCasesAdvanced")
																														.find(
																																".region")
																														.append(
																																thirdLevelValue);

																											} else {
																												for (var i = 0; i < thirdLevelValue.length; i++) {
																													if (i == thirdLevelValue.length - 1) {
																														$(
																																".listCasesAdvanced")
																																.find(
																																		".region")
																																.append(
																																		thirdLevelValue[i]);
																													} else {
																														$(
																																".listCasesAdvanced")
																																.find(
																																		".region")
																																.append(
																																		thirdLevelValue[i]
																																				+ ", ");
																													}

																												}

																											}

																											$(
																													".listCasesAdvanced")
																													.find(
																															".region")
																													.addClass(
																															"regionSort");
																											$(
																													".listCasesAdvanced")
																													.find(
																															".region")
																													.removeClass(
																															"region");
																										}

																										if (thirdLevelKey == "isp") {

																											if (thirdLevelValue.length < 2) {

																												$(
																														".listCasesAdvanced")
																														.find(
																																".isp")
																														.append(
																																thirdLevelValue);

																											} else {
																												for (var i = 0; i < thirdLevelValue.length; i++) {
																													if (i == thirdLevelValue.length - 1) {
																														$(
																																".listCasesAdvanced")
																																.find(
																																		".isp")
																																.append(
																																		thirdLevelValue[i]);
																													} else {
																														$(
																																".listCasesAdvanced")
																																.find(
																																		".isp")
																																.append(
																																		thirdLevelValue[i]
																																				+ ", ");
																													}

																												}

																											}

																											$(
																													".listCasesAdvanced")
																													.find(
																															".isp")
																													.addClass(
																															"ispSort");
																											$(
																													".listCasesAdvanced")
																													.find(
																															".isp")
																													.removeClass(
																															"isp");

																										}

																										if (thirdLevelKey == "description") {

																											$(
																													".listCasesAdvanced")
																													.find(
																															".name")
																													.append(
																															"<strong style='white-space: nowrap;overflow: hidden; text-overflow: ellipsis;'>"
																																	+ thirdLevelValue
																																	+ "</strong> <br>");
																											$(
																													".listCasesAdvanced")
																													.find(
																															".name")
																													.addClass(
																															"nameSort");
																											$(
																													".listCasesAdvanced")
																													.find(
																															".name")
																													.removeClass(
																															"name");
																										}

																										if (thirdLevelKey == "domains") {

																											$.each( thirdLevelValue, function( fourthLevelKey, fourthLevelValue) {
																												console.log(thirdLevelValue.length)
																												if (thirdLevelValue.length < 2) {
																									
																													$(".listCasesAdvanced").find(".site").append(fourthLevelValue.site);

																												} else {
																												
																													for (var i = 0; i < thirdLevelValue.length; i++) {
																														
																														if (i == thirdLevelValue.length - 1) {
																															console.log(thirdLevelValue[i])
																															$(".listCasesAdvanced").find(".site").append(thirdLevelValue[i].site);
																														} else {
																															console.log((fourthLevelValue.site))
																															$(".listCasesAdvanced").find(".site").append(thirdLevelValue[i].site + ", ");
																														}

																													}

																												}				
																												
//																												$(".listCasesAdvanced").find(".site").append(fourthLevelValue.site);
																																
																																$(".listCasesAdvanced").find(".site").addClass("siteSort");
																																$(".listCasesAdvanced").find(".site").removeClass("site");

																															});

																										}


																										if (thirdLevelKey == "start_date") {
																											datethirdLevelValue = thirdLevelValue
																													.split("T");
																											datethirdLevelValue = datethirdLevelValue[0]
																													.split("-");
																											date = datethirdLevelValue[2]
																													+ "/"
																													+ datethirdLevelValue[1]
																													+ "/"
																													+ datethirdLevelValue[0];
																											$(
																													".listCasesAdvanced")
																													.find(
																															".dateStart")
																													.append(
																															"<strong>"
																																	+ date
																																	+ "</strong> <br>");
																											$(
																													".listCasesAdvanced")
																													.find(
																															".dateStart")
																													.addClass(
																															"dateStartSort");
																											$(
																													".listCasesAdvanced")
																													.find(
																															".dateStart")
																													.removeClass(
																															"dateStart");
																										}

																										if (thirdLevelKey == "end_date") {
																											if (thirdLevelValue !== null) {
																												datethirdLevelValue = thirdLevelValue
																														.split("T");
																												datethirdLevelValue = datethirdLevelValue[0]
																														.split("-");
																												date = datethirdLevelValue[2]
																														+ "/"
																														+ datethirdLevelValue[1]
																														+ "/"
																														+ datethirdLevelValue[0];
																												$(
																														".listCasesAdvanced:last-child")
																														.find(
																																".dateEnd")
																														.append(
																																date);
																												$(
																														".listCasesAdvanced")
																														.find(
																																".dateEnd")
																														.addClass(
																																"dateEndSort");
																												$(
																														".listCasesAdvanced")
																														.find(
																																".dateEnd")
																														.removeClass(
																																"dateEnd");
																											} else {
																												$(
																														".listCasesAdvanced:last-child")
																														.find(
																																".dateEnd")
																														.append(
																																"presente");
																												$(
																														".listCasesAdvanced")
																														.find(
																																".dateEnd")
																														.addClass(
																																"dateEndSort");
																												$(
																														".listCasesAdvanced")
																														.find(
																																".dateEnd")
																														.removeClass(
																																"dateEnd");
																												// $(
																												// ".listCasesAdvanced"
																												// ).append(
																												// "<strong>State:</strong>
																												// Continue<br>"
																												// );
																											}
																										}

																										if (thirdLevelKey == "category") {

																											CategoryTag(thirdLevelValue);

																											$(
																													".listCasesAdvanced")
																													.find(
																															".category")
																													.addClass(
																															"categorySort");
																											$(
																													".listCasesAdvanced")
																													.find(
																															".category")
																													.removeClass(
																															"category");

																										}
																									});
																				});
															}
														});

										$(".listCasesAdvanced").append(" <hr>");

									}).fail(
									function(jqXHR, textStatus, errorThrown) {
										$('.listCasesAdvanced').html("");
									});

				});
//Order by name of the case
$("#nameClick").on('click', function() { // when you click the div
	
	if ($("#nameClick").hasClass("desc")) {
		sortNameAsc("#nameClick", ".nameSort strong");
		$("#nameClick").addClass("asc");
		$("#nameClick").removeClass("desc");
	} else {
		sortNameDes("#nameClick", ".nameSort strong");
		$("#nameClick").addClass("desc");
		$("#nameClick").removeClass("asc");
	}

});
//Order by isp of the case
$("#ispClick").on('click', function() { // when you click the div

	if ($("#ispClick").hasClass("desc")) {
		sortNameAsc("#ispClick", ".ispSort");
		$("#ispClick").addClass("asc");
		$("#ispClick").removeClass("desc");
	} else {
		sortNameDes("#ispClick", ".ispSort ");
		$("#ispClick").addClass("desc");
		$("#ispClick").removeClass("asc");
	}

});
//Order by site of the case
$("#siteClick").on('click', function() { // when you click the div

	if ($("#siteClick").hasClass("desc")) {
		sortNameAsc("#siteClick", ".siteSort");
		$("#siteClick").addClass("asc");
		$("#siteClick").removeClass("desc");
	} else {
		sortNameDes("#siteClick", ".siteSort ");
		$("#siteClick").addClass("desc");
		$("#siteClick").removeClass("asc");
	}

});
//Order by region of the case
$("#regionClick").on('click', function() { // when you click the div

	if ($("#regionClick").hasClass("desc")) {

		sortNameAsc("#regionClick", ".regionSort");
		$("#regionClick").addClass("asc");
		$("#regionClick").removeClass("desc");
	} else {
		sortNameDes("#regionClick", ".regionSort ");
		$("#regionClick").addClass("desc");
		$("#regionClick").removeClass("asc");
	}

});
//Order by category of the case
$("#categoryClick").on('click', function() { // when you click the div

	if ($("#categoryClick").hasClass("desc")) {
		sortNameAsc("#categoryClick", ".categorySort .contentTag");
		$("#categoryClick").addClass("asc");
		$("#categoryClick").removeClass("desc");
	} else {
		sortNameDes("#categoryClick", ".categorySort .contentTag");
		$("#categoryClick").addClass("desc");
		$("#categoryClick").removeClass("asc");
	}

});
//Order by date of the case
$("#dateStartClick").on('click', function() { // when you click the div

	if ($("#dateStartClick").hasClass("desc")) {
		sortDateAsc("#dateStartClick", ".dateStartSort strong");
		$("#dateStartClick").addClass("asc");
		$("#dateStartClick").removeClass("desc");
	} else {
		sortDateDes("#dateStartClick", ".dateStartSort strong");
		$("#dateStartClick").addClass("desc");
		$("#dateStartClick").removeClass("asc");
	}

});

$("#dateEndClick").on('click', function() { // when you click the div

	if ($("#dateEndClick").hasClass("desc")) {
		sortDateAsc("#dateEndClick", ".dateEndSort");
		$("#dateEndClick").addClass("asc");
		$("#dateEndClick").removeClass("desc");
	} else {
		sortDateDes("#dateEndClick", ".dateEndSort");
		$("#dateEndClick").addClass("desc");
		$("#dateEndClick").removeClass("asc");
	}

});

//Ordering the list by name of the case in ascending order
function sortDateAsc(parent, child) {

	clearSelectedOrder();

	$(parent).addClass("selectOrderAdvanced");

	var parentSort = (parent.split(/(?=[A-Z])/)[0]
			+ parent.split(/(?=[A-Z])/)[1] + "Sort").replace('#', ".");
	$('.smallBar').find(parentSort).addClass('selectedColumnAdvanced');

	var $divs = $(".smallBar .title ");

	var alphabeticallyOrderedDivs = $divs.sort(function(a, b) {

		var aDate = $(a).find(child).text();
		var aSplit = aDate.split('/');
		var aDate = new Date(aSplit[2], aSplit[1] - 1, aSplit[0]); // Y M D
		var aTimestamp = aDate.getTime();

		var bDate = $(b).find(child).text();
		var bSplit = bDate.split('/');
		var bDate = new Date(bSplit[2], bSplit[1] - 1, bSplit[0]); // Y M D
		var bTimestamp = bDate.getTime();

		return aTimestamp < bTimestamp;
	});

	$(".listCasesAdvanced").empty();

	alphabeticallyOrderedDivs
			.each(function(index) {

				$(".listCasesAdvanced")
						.append(
								"<div class='this col-xs-12 smallBar' onclick=goTo("+ $(this).find(".id_case").val() +")><div class='h5Style title'></div></div>");
				$(".this ").html($(this));
				$(".this ").removeClass("this ");

			});

}
//Ordering the list by date of the case in descending order
function sortDateDes(parent, child) {

	clearSelectedOrder();

	$(parent).addClass("selectOrderAdvanced");

	var parentSort = (parent.split(/(?=[A-Z])/)[0]
			+ parent.split(/(?=[A-Z])/)[1] + "Sort").replace('#', ".");
	$('.smallBar').find(parentSort).addClass('selectedColumnAdvanced');

	var $divs = $(".smallBar .title ");

	var alphabeticallyOrderedDivs = $divs.sort(function(a, b) {

		var aDate = $(a).find(child).text();
		var aSplit = aDate.split('/');
		var aDate = new Date(aSplit[2], aSplit[1] - 1, aSplit[0]); // Y M D
		var aTimestamp = aDate.getTime();

		var bDate = $(b).find(child).text();
		var bSplit = bDate.split('/');
		var bDate = new Date(bSplit[2], bSplit[1] - 1, bSplit[0]); // Y M D
		var bTimestamp = bDate.getTime();

		return aTimestamp > bTimestamp;
	});

	$(".listCasesAdvanced").empty();

	alphabeticallyOrderedDivs
			.each(function(index) {

				$(".listCasesAdvanced")
						.append(
								"<div class='this col-xs-12 smallBar' onclick=goTo("+ $(this).find(".id_case").val() +")><div class='h5Style title'></div></div>");
				$(".this ").html($(this));
				$(".this ").removeClass("this");

			});

}
//Ordering the list by name of the case in ascending order
function sortNameAsc(parent, child) {

	clearSelectedOrder();
	$(parent).addClass("selectOrderAdvanced");

	

	var parentSort = (parent.split(/(?=[A-Z])/)[0] + "Sort").replace('#', ".");
	
	$('.smallBar').find(parentSort).addClass('selectedColumnAdvanced');

	var $divs = $(".smallBar .title ");


	var alphabeticallyOrderedDivs = $divs.sort(function(a, b) {

		return $(a).find(child).text() < $(b).find(child).text();

	});

	$(".listCasesAdvanced").empty();

	alphabeticallyOrderedDivs
			.each(function(index) {

				$(".listCasesAdvanced")
						.append(
								"<div class='this col-xs-12 smallBar' onclick=goTo("+ $(this).find(".id_case").val() +")><div class='h5Style title'></div></div>");
				$(".this ").html($(this));
				$(".this ").removeClass("this ");

			});

}
//Ordering the list by name of the case in descending order
function sortNameDes(parent, child) {

	clearSelectedOrder();

	$(parent).addClass("selectOrderAdvanced");

	var parentSort = (parent.split(/(?=[A-Z])/)[0] + "Sort").replace('#', ".");
	$('.smallBar').find(parentSort).addClass('selectedColumnAdvanced');

	var $divs = $(".smallBar .title ");

	var alphabeticallyOrderedDivs = $divs.sort(function(a, b) {

		return $(a).find(child).text() > $(b).find(child).text();

	});

	$(".listCasesAdvanced").empty();

	alphabeticallyOrderedDivs
			.each(function(index) {

				$(".listCasesAdvanced")
						.append(
								"<div class='this col-xs-12 smallBar' onclick=goTo("+ $(this).find(".id_case").val() +")><div class='h5Style title'></div></div>");
				$(".this ").html($(this));
				$(".this ").removeClass("this");

			});

}
//Clear selection order
function clearSelectedOrder() {

	$("#dateStartClick").removeClass("selectOrderAdvanced");
	$("#dateEndClick").removeClass("selectOrderAdvanced");
	$("#nameClick").removeClass("selectOrderAdvanced");
	$("#siteClick").removeClass("selectOrderAdvanced");
	$("#ispClick").removeClass("selectOrderAdvanced");
	$("#categoryClick").removeClass("selectOrderAdvanced");
	$("#regionClick").removeClass("selectOrderAdvanced");

	$('.dateStartSort').removeClass('selectedColumnAdvanced');
	$('.dateEndSort').removeClass('selectedColumnAdvanced');
	$('.siteSort').removeClass('selectedColumnAdvanced');
	$('.nameSort').removeClass('selectedColumnAdvanced');
	$('.ispSort').removeClass('selectedColumnAdvanced');
	$('.categorySort').removeClass('selectedColumnAdvanced');
	$('.regionSort').removeClass('selectedColumnAdvanced');

}
//Adjust the height of the vertical borders of the container of a multiselect
//when multiple options are selected
function changeMultipleChoiceContainerHeight(selectors) {

	for (var i = 0; i < selectors.length; i++) {
		var selector = selectors[i];
		var height = $(selector + "_chosen").outerHeight(true);
		height = height - 5;
		$(
				'<style>#advanced_search ' + selector
						+ '_chosen.chosen-container::before {height: ' + height
						+ 'px;}</style>').appendTo('body .changeStyling');
		$(
				'<style>#advanced_search ' + selector
						+ '_chosen.chosen-container::after {height: ' + height
						+ 'px;}</style>').appendTo('body .changeStyling');
	}
}

//Detect if there is a change in any of the multiselector
function changeMultipleChoice(selectors) {

	for (var i = 0; i < selectors.length; i++) {
		var selector = selectors[i];

		$(selector).on('change', function(evt, params) {
			$(".changeStyling").empty();
			changeMultipleChoiceContainerHeight(selectors);
		});
	}
}

//Fills the values of the multiselect if they are given when the page is loaded
function fillChosenValues(values, id) {


	var str_array = values.split(',');
	
	for (var i = 0; i < str_array.length; i++) {
		str_array[i] = str_array[i].replace(/^\s*/, "").replace(",", "");
		
		console.log("values: " + str_array[i])
		var selectorElement =  id + " option[value='"+str_array[i]+"']";
		
		$(selectorElement).attr('selected','selected');
	}
	
	console.log("values: " + id)
	
	console.log("values: " + str_array)
	
	$(id).val(str_array).trigger("chosen:updated");


}


function CategoryTag(thirdLevelValue){
	
	switch(thirdLevelValue.name) {
    case "blocked_tag":
    	$(".listCasesAdvanced").find(".category")
		.append(' <div class="blocked_tag"><div class="left_cornerTag"></div><div class="contentTag">'
				+ thirdLevelValue.display_name + '</div><div class="right_cornerTag"></div></div>');																								
        break;
    case "continue_tag":
    	$(".listCasesAdvanced").find(".category")
		.append(' <div class="continue_tag"><div class="left_cornerTag"></div><div class="contentTag">'
				+ thirdLevelValue.display_name + '</div><div class="right_cornerTag"></div></div>');

        break;
    
    case "interception_tag":
    	$(".listCasesAdvanced").find(".category")
		.append(' <div class="interception_tag"><div class="left_cornerTag"></div><div class="contentTag">'
				+ thirdLevelValue.display_name + '</div><div class="right_cornerTag"></div></div>');

        break;
    
    case "disconnected_tag":
    	$(".listCasesAdvanced").find(".category")
		.append(' <div class="disconnected_tag"><div class="left_cornerTag"></div><div class="contentTag">'
				+ thirdLevelValue.display_name + '</div><div class="right_cornerTag"></div></div>');

        break;
        
    case "slowdown_tag":
    	$(".listCasesAdvanced").find(".category")
		.append(' <div class="slowdown_tag"><div class="left_cornerTag"></div><div class="contentTag">'
				+ thirdLevelValue.display_name + '</div><div class="right_cornerTag"></div></div>');

        break;
        
    case "dos_tag":
    	$(".listCasesAdvanced").find(".category")
		.append(' <div class="dos_tag"><div class="left_cornerTag"></div><div class="contentTag">'
				+ thirdLevelValue.display_name + '</div><div class="right_cornerTag"></div></div>');

        break;
    
    case "fail_tag":
    	$(".listCasesAdvanced").find(".category")
		.append(' <div class="fail_tag"><div class="left_cornerTag"></div><div class="contentTag">'
				+ thirdLevelValue.display_name + '</div><div class="right_cornerTag"></div></div>');

        break; 
        
    default:
    	$(".listCasesAdvanced").find(".category")
		.append(' <div class=""><div class="left_cornerTag"></div><div class="contentTag">'
				+ thirdLevelValue.display_name + '</div><div class="right_cornerTag"></div></div>');

        break;
	}
	
}



function goTo(id){
	
	window.location.href = url_web+"/cases/case/"+id;
	
}
