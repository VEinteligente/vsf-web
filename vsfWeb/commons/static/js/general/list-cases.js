// formSer are the serialized form values
var formSer = "";
// The commands inside the $(document).ready are all the commands that will be
// loaded after the rest of the page is loaded.
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
							+ hidden_category + hidden_site + hidden_region
							+ hidden_start_date + hidden_end_date;

					if (hidden.length == 0) {

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

											$
													.each(
															dataJson,
															function(key, value) {
																// First Level

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
																							secondLevelValue) {
																						// Second
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
																														".listCases")
																														.append(
																																"<div class='col-xs-12 smallBar' style='border-bottom:1px solid #7C96E8'><div class='h5Style title search'>"
																																		+ "<div class='col-xs-2 date'></div>"
																																		+ "<div class='col-xs-2 name' style='display: flex;'></div>"
																																		+ "<div class='col-xs-2 site'></div>"
																																		+ "<div class='col-xs-2 isp'></div>"
																																		+ "<div class='col-xs-2 category'></div>"
																																		+ "<div class='col-xs-2 region'></div>"
																																		+ "</div>     </div>");

																											}
																											// Select all the possible values of the multiselect

																											if (thirdLevelKey == "region") {

																												if (thirdLevelValue.length < 2) {
																													$(
																															".listCases")
																															.find(
																																	".region")
																															.append(
																																	thirdLevelValue);
																												} else {
																													$(
																															".listCases")
																															.find(
																																	".region")
																															.append(
																																	"Varios");
																												}

																												$(
																														".listCases")
																														.find(
																																".region")
																														.addClass(
																																"regionSort");
																												$(
																														".listCases")
																														.find(
																																".region")
																														.removeClass(
																																"region");

																											}

																											if (thirdLevelKey == "description") {

																												$(
																														".listCases")
																														.find(
																																".name")
																														.append(
																																"<strong style='white-space: nowrap;overflow: hidden; text-overflow: ellipsis;'>"
																																		+ thirdLevelValue
																																		+ "</strong> <br>");
																												$(
																														".listCases")
																														.find(
																																".name")
																														.addClass(
																																"nameSort");
																												$(
																														".listCases")
																														.find(
																																".name")
																														.removeClass(
																																"name");

																											}

																											if (thirdLevelKey == "domains") {

																												$
																														.each(
																																thirdLevelValue,
																																function(
																																		fourthLevelKey,
																																		fourthLevelValue) {

																																	$(
																																			".listCases")
																																			.find(
																																					".site")
																																			.append(
																																					fourthLevelValue.site);
																																	$(
																																			".listCases")
																																			.find(
																																					".site")
																																			.addClass(
																																					"siteSort");
																																	$(
																																			".listCases")
																																			.find(
																																					".site")
																																			.removeClass(
																																					"site");

																																});

																											}

																											if (thirdLevelKey == "isp") {

																												if (thirdLevelValue.length < 2) {
																													$(
																															".listCases")
																															.find(
																																	".isp")
																															.append(
																																	thirdLevelValue);
																												} else {
																													$(
																															".listCases")
																															.find(
																																	".isp")
																															.html(
																																	"Varios");
																												}

																												$(
																														".listCases")
																														.find(
																																".isp")
																														.addClass(
																																"ispSort");
																												$(
																														".listCases")
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
																														".listCases")
																														.find(
																																".date")
																														.append(
																																"<strong>"
																																		+ date
																																		+ "</strong> <br>");

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
																															".listCases:last-child")
																															.find(
																																	".date")
																															.append(
																																	date);
																													$(
																															".listCases")
																															.find(
																																	".date")
																															.addClass(
																																	"dateSort");
																													$(
																															".listCases")
																															.find(
																																	".date")
																															.removeClass(
																																	"date");

																												} else {

																													$(
																															".listCases:last-child")
																															.find(
																																	".date")
																															.append(
																																	"presente");
																													$(
																															".listCases")
																															.find(
																																	".date")
																															.addClass(
																																	"dateSort");
																													$(
																															".listCases")
																															.find(
																																	".date")
																															.removeClass(
																																	"date");

																												}
																											}

																											if (thirdLevelKey == "category") {

																												$(
																														".listCases")
																														.find(
																																".category")
																														.html(
																																'<div class="blocked_tag"><div class="left_cornerTag"></div><div class="contentTag">'
																																		+ thirdLevelValue
																																		+ ' </div><div class="right_cornerTag"></div></div>');

																												$(
																														".listCases")
																														.find(
																																".category")
																														.addClass(
																																"categorySort");
																												$(
																														".listCases")
																														.find(
																																".category")
																														.removeClass(
																																"category");

																											}

																										});

																					});
																}

															});

											$(".listCases").append(" <hr>");

										})
								.fail(function(jqXHR, textStatus, errorThrown) {
									$('.listCases').html("");
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
						} else {
							fillChosenValues(hidden_category, "#category");
						}

						if (hidden_isp.length == 0) {
							$("#isp").val("");
						} else {

							fillChosenValues(hidden_isp, "#isp");

						}

						if (hidden_site.length == 0) {
							$("#site").val("");
						} else {

							fillChosenValues(hidden_site, "#site");

						}

						if (hidden_region.length == 0) {
							$("#region").val("");
						} else {

							fillChosenValues(hidden_region, "#region");

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

// When click on search icon
$("#advanced_search")
		.submit(
				function(e) {

					// Empty the search result to fill with new result
					$(".listCases").empty();

					// Serialize the form
					formSer = $("#advanced_search").serializeObject();

					if (($("#region").val()).length === 0) {

						formSer.region = "";

					} else {

						if (($("#region").val()).length < 2) {

							formSer.region = $("#region").val()[0];

						} else {
							formSer.region = $("#region").val()[0] + ", ";
							for (var i = 1; i < ($("#region").val()).length; i++) {

								if (i == ($("#region").val()).length - 1)
									formSer.region = formSer.region
											+ $("#region").val()[i];
								else
									formSer.region = formSer.region
											+ $("#region").val()[i] + ", ";

							}

						}

					}

					if (($("#category").val()).length === 0) {

						formSer.category = "";

					} else {

						if (($("#category").val()).length < 2) {

							formSer.category = $("#category").val()[0];

						} else {
							formSer.category = $("#category").val()[0] + ", ";
							for (var i = 1; i < ($("#category").val()).length; i++) {

								if (i == ($("#category").val()).length - 1)
									formSer.category = formSer.category
											+ $("#category").val()[i];
								else
									formSer.category = formSer.category
											+ $("#category").val()[i] + ", ";

							}

						}

					}

					if (($("#isp").val()).length === 0) {

						formSer.isp = "";

					} else {

						if (($("#isp").val()).length < 2) {

							formSer.isp = $("#isp").val()[0];

						} else {
							formSer.isp = $("#isp").val()[0] + ", ";
							for (var i = 1; i < ($("#isp").val()).length; i++) {

								if (i == ($("#isp").val()).length - 1)
									formSer.isp = formSer.isp
											+ $("#isp").val()[i];
								else
									formSer.isp = formSer.isp
											+ $("#isp").val()[i] + ", ";

							}

						}

					}

					if (($("#site").val()).length === 0) {

						formSer.site = "";

					} else {

						if (($("#site").val()).length < 2) {

							formSer.site = $("#site").val()[0];

						} else {
							formSer.site = $("#site").val()[0] + ", ";
							for (var i = 1; i < ($("#site").val()).length; i++) {

								if (i == ($("#site").val()).length - 1)
									formSer.site = formSer.site
											+ $("#site").val()[i];
								else
									formSer.site = formSer.site
											+ $("#site").val()[i] + ", ";

							}

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

										} else if (hidden == " ") {
											history.pushState(null, null,
													url_data_list_empty);
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
																													".listCases")
																													.append(
																															"<div class='col-xs-12 smallBar' style='border-bottom:1px solid #7C96E8'><div class='h5Style title search'>"
																																	+ "<div class='col-xs-2 date'></div>"
																																	+ "<div class='col-xs-2 name' style='display: flex;'></div>"
																																	+ "<div class='col-xs-2 site'></div>"
																																	+ "<div class='col-xs-2 isp'></div>"
																																	+ "<div class='col-xs-2 category'></div>"
																																	+ "<div class='col-xs-2 region'></div>"
																																	+ "</div>     </div>");

																											// $(
																											// ".listCases"
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
																														".listCases")
																														.find(
																																".region")
																														.append(
																																thirdLevelValue);

																											} else {

																												$(
																														".listCases")
																														.find(
																																".region")
																														.append(
																																"Varios");
																											}

																											$(
																													".listCases")
																													.find(
																															".region")
																													.addClass(
																															"regionSort");
																											$(
																													".listCases")
																													.find(
																															".region")
																													.removeClass(
																															"region");
																										}

																										if (thirdLevelKey == "isp") {

																											if (thirdLevelValue.length < 2) {

																												$(
																														".listCases")
																														.find(
																																".isp")
																														.append(
																																thirdLevelValue);

																											} else {

																												$(
																														".listCases")
																														.find(
																																".isp")
																														.append(
																																"Varios");
																											}

																											$(
																													".listCases")
																													.find(
																															".isp")
																													.addClass(
																															"ispSort");
																											$(
																													".listCases")
																													.find(
																															".isp")
																													.removeClass(
																															"isp");
																										}

																										if (thirdLevelKey == "description") {

																											$(
																													".listCases")
																													.find(
																															".name")
																													.append(
																															"<strong style='white-space: nowrap;overflow: hidden; text-overflow: ellipsis;'>"
																																	+ thirdLevelValue
																																	+ "</strong> <br>");
																											$(
																													".listCases")
																													.find(
																															".name")
																													.addClass(
																															"nameSort");
																											$(
																													".listCases")
																													.find(
																															".name")
																													.removeClass(
																															"name");
																										}

																										if (thirdLevelKey == "domains") {
																											$
																													.each(
																															thirdLevelValue,
																															function(
																																	fourthLevelKey,
																																	fourthLevelValue) {

																																$(
																																		".listCases")
																																		.find(
																																				".site")
																																		.append(
																																				fourthLevelValue.site);
																																$(
																																		".listCases")
																																		.find(
																																				".site")
																																		.addClass(
																																				"siteSort");
																																$(
																																		".listCases")
																																		.find(
																																				".site")
																																		.removeClass(
																																				"site");
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
																													".listCases")
																													.find(
																															".date")
																													.append(
																															"<strong>"
																																	+ date
																																	+ "</strong> <br>");

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
																														".listCases:last-child")
																														.find(
																																".date")
																														.append(
																																date);
																												$(
																														".listCases")
																														.find(
																																".date")
																														.addClass(
																																"dateSort");
																												$(
																														".listCases")
																														.find(
																																".date")
																														.removeClass(
																																"date");
																											} else {
																												$(
																														".listCases:last-child")
																														.find(
																																".date")
																														.append(
																																"presente");
																												$(
																														".listCases")
																														.find(
																																".date")
																														.addClass(
																																"dateSort");
																												$(
																														".listCases")
																														.find(
																																".date")
																														.removeClass(
																																"date");
																												// $(
																												// ".listCases"
																												// ).append(
																												// "<strong>State:</strong>
																												// Continue<br>"
																												// );
																											}
																										}

																										if (thirdLevelKey == "category") {
																											$(
																													".listCases")
																													.find(
																															".category")
																													.html(
																															'<div class="blocked_tag"><div class="left_cornerTag"></div><div class="contentTag">'
																																	+ thirdLevelValue
																																	+ ' </div><div class="right_cornerTag"></div></div>');

																											$(
																													".listCases")
																													.find(
																															".category")
																													.addClass(
																															"categorySort");
																											$(
																													".listCases")
																													.find(
																															".category")
																													.removeClass(
																															"category");

																										}
																									});
																				});
															}
														});

										$(".listCases").append(" <hr>");

									}).fail(
									function(jqXHR, textStatus, errorThrown) {
										$('.listCases').html("");
									});

				});

// Order by name of the case
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
$("#dateClick").on('click', function() { // when you click the div

	if ($("#dateClick").hasClass("desc")) {
		sortDateAsc("#dateClick", ".dateSort strong");
		$("#dateClick").addClass("asc");
		$("#dateClick").removeClass("desc");
	} else {
		sortDateDes("#dateClick", ".dateSort strong");
		$("#dateClick").addClass("desc");
		$("#dateClick").removeClass("asc");
	}

});

//Ordering the list by date of the case in ascending order
function sortDateAsc(parent, child) {

	clearSelectedOrder();

	$(parent).addClass("selectOrder");

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

	$(".listCases").empty();

	alphabeticallyOrderedDivs
			.each(function(index) {

				$(".listCases")
						.append(
								"<div class='this col-xs-12 smallBar' style='border-bottom:1px solid #7C96E8'><div class='h5Style title'></div></div>");
				$(".this ").html($(this));
				$(".this ").removeClass("this ");

			});

}

//Ordering the list by date of the case in ascending order
function sortDateDes(parent, child) {

	clearSelectedOrder();

	$(parent).addClass("selectOrder");

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

	$(".listCases").empty();

	alphabeticallyOrderedDivs
			.each(function(index) {

				$(".listCases")
						.append(
								"<div class='this col-xs-12 smallBar' style='border-bottom:1px solid #7C96E8'><div class='h5Style title'></div></div>");
				$(".this ").html($(this));
				$(".this ").removeClass("this");

			});

}

//Ordering the list by name of the case in ascending order
function sortNameAsc(parent, child) {

	clearSelectedOrder();

	$(parent).addClass("selectOrder");

	var $divs = $(".smallBar .title ");

	var alphabeticallyOrderedDivs = $divs.sort(function(a, b) {

		return $(a).find(child).text() < $(b).find(child).text();

	});

	$(".listCases").empty();

	alphabeticallyOrderedDivs
			.each(function(index) {

				$(".listCases")
						.append(
								"<div class='this col-xs-12 smallBar' style='border-bottom:1px solid #7C96E8'><div class='h5Style title'></div></div>");
				$(".this ").html($(this));
				$(".this ").removeClass("this ");

			});

}

//Ordering the list by name of the case in ascending order
function sortNameDes(parent, child) {

	clearSelectedOrder();

	$(parent).addClass("selectOrder");

	var $divs = $(".smallBar .title ");

	var alphabeticallyOrderedDivs = $divs.sort(function(a, b) {

		return $(a).find(child).text() > $(b).find(child).text();

	});

	$(".listCases").empty();

	alphabeticallyOrderedDivs
			.each(function(index) {

				$(".listCases")
						.append(
								"<div class='this col-xs-12 smallBar' style='border-bottom:1px solid #7C96E8'><div class='h5Style title'></div></div>");
				$(".this ").html($(this));
				$(".this ").removeClass("this");

			});

}

//Clear selection order
function clearSelectedOrder() {

	$("#dateClick").removeClass("selectOrder");
	$("#nameClick").removeClass("selectOrder");
	$("#siteClick").removeClass("selectOrder");
	$("#ispClick").removeClass("selectOrder");
	$("#categoryClick").removeClass("selectOrder");
	$("#regionClick").removeClass("selectOrder");

}

// Adjust the height of the vertical borders of the container of a multiselect
// when multiple options are selected
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

// Detect if there is a change in any of the multiselector
function changeMultipleChoice(selectors) {

	for (var i = 0; i < selectors.length; i++) {
		var selector = selectors[i];

		$(selector).on('change', function(evt, params) {
			$(".changeStyling").empty();
			changeMultipleChoiceContainerHeight(selectors);
		});
	}
}

// Fills the values of the multiselect if they are given when the page is loaded
function fillChosenValues(values, id) {
	var str_array = values.split(',');

	for (var i = 0; i < str_array.length; i++) {
		str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
	}

	$(id).val(str_array).trigger("chosen:updated");

}
