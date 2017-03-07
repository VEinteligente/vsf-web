// array_class defines the class of the list of cases per state so it can be hidden if the state is not the selecter one 
var array_class = null;
// array_name defines the state name per state
var array_name = [];
// array_total defines the total of cases per state
var array_total = [];
// array_counter is used to add an ID to each element of the list cases per
// state depending on the state and the number of cases
var array_counter = [];
// counter is used to know which element of the arrays is being iterated on
var counter = 1;
// Similar to counter but with each case
var counterCase = 1;
// element_hover indicates the id of the hovered element
var element_hover = null;
// element_hoverSpace is the name of the hover element without spaces to compare
// it to the ID of the svg elements
var element_hoverSpace = "";
// mouseX and mouseY are the X and Y coordinates of the mouse
var mouseX = null; // X coordinates of mouse
var mouseY = null; // Y coordinates of mouse
// count indicate the click number the user had used
var count_map = 0;
// The commands inside the $(document).ready are all the commands that will be
// loaded
// after the rest of the page is loaded.

$(document).ready(
				function() {

					$("#download").attr("href", url_map_excel)
					// This sections allows you to use a map of any country if
					// you use a SVG image and loads the states in the select
					// options.

					// arraySelectOptions is the array for the dropdown of the
					// "select" and making it a global variable
					var arraySelectOptions = [];
					// element is each element of the arraySelectOptions
					var element = 0;

					// This function searches for all IDs of your map (svg
					// image) and add them to the arraySelectOptions
					$(function() {

						$("svg > g").each(
										
							function() {
								arraySelectOptions[element] = $(this).attr('id').replace(/([A-Z])/g, ' $1').trim();
								$('#mapSelector').append('<option value="' + arraySelectOptions[element] + '">' + arraySelectOptions[element] + '</option>');
								element = arraySelectOptions.length;
							});

							// The tooltip is hidden by default
							$('.informationPanel').hide();
	
							// Correspond to the number of elements in the JSON. Its
							// default value is "0"
							$("#countMap").html("0");
	
							hoverEvents();
					});

					// When the user changes the selected option in the "select"
					// element
					// the state will be hovered, the list of cases and the
					// tooltip will be updated
					$('select').on( 'change', function(e) {
											
							var optionSelected = $("option:selected", this);
							var valueSelected = this.value;

							$("select option").each(
									function() {
										if ($(this).text() == valueSelected) {
												$("#" + valueSelected.replace( /\s+/g, '')).addClass("hover");
												$(this).attr("selected","selected");
												$('.informationPanelState').html(valueSelected);
												$(".informationPanelTotalCases").html("");
												var element_hoverSpace = valueSelected.replace(/([A-Z])/g,' $1').trim();

												for (var i = 0; i < array_name.length; i++) {

														if (array_name[i] == valueSelected) {
																		$(".informationPanelTotalCases").html(array_total[i]);
																		$(".class"+ array_counter[i]).show();
																		$("#countMap").html(array_total[i]);
														}
												}

												if ($('.informationPanelTotalCases').is(':empty')) {
													$(".informationPanelTotalCases").html("0");
												}

												// If a state is selected the position of the tooltip will be fixed
													$('.informationPanel').css(
														{
															top : $("#mapSelector").offset().top ,
															left : $("#mapSelector").offset().left 
														});

													$('.informationPanel').show();
												} else {
													$("#" + ($(this).text()).replace(/\s+/g,'')).removeClass("hover");
													$(this).removeAttr("selected");
												}
									});

								});

					// Function hoverEvents enables the hover options of the map
					// and when a state is selected the tooltip, list of cases
					// and selected option in select are updated
					function hoverEvents() {

						$('.map g').on('mouseover', function(e) {

							// Reset the total of cases viewed in the page
							$("#countMap").html("0");

							// Show the tooltip
							$('.informationPanel').show();

							var element_hover = $(this).closest('g').attr('id');

							if (element_hover != null) {
								var element_hoverSpace = element_hover.replace(/([A-Z])/g, ' $1').trim();

								$(".informationPanelTotalCases").html("");

								for (var i = 0; i < array_name.length; i++) {

									if ($('.informationPanelTotalCases').is(':empty')) {
										$(".informationPanelTotalCases").html("0");
									}

									if (array_name[i] == element_hoverSpace) {

										$(".informationPanelTotalCases").html(array_total[i]);
										$(".class" + array_counter[i]).show();
										$("#countMap").html(array_total[i]);
										
										$("select").val(element_hover.replace(/([A-Z])/g,' $1').trim()).change();

									} else {
										$(".class" + array_counter[i]) .hide();
										
										$("select").val(element_hover.replace(/([A-Z])/g,' $1').trim()).change();
									}

								}

								$('.informationPanelState').html(element_hover);

								$("select option").each(function() {
									if ($(this).closest('g').text() == element_hover.replace(/([A-Z])/g, ' $1').trim()) {
										$("#" + element_hover).addClass( "hover");
										$(this).closest('g').attr("selected","selected");
										$("select").val(element_hover.replace(/([A-Z])/g,' $1').trim()).change();
									}
	
									else {
										$("#" + $(this).text().replace(/\s+/g,'')).removeClass("hover");
										$(this).removeAttr("selected");
									}
								});

							}

						});

						$('.map g').on('mousemove', function(e) {
							mouseX = e.pageX;
							mouseY = e.pageY;

							$('.informationPanel').css({
								top : mouseY - $('.map').offset().top,
								left : mouseX - $('.map').offset().left
							});
						});
					}

					// This AJAX call corresponds to the request of the HTML of
					// the total of cases and lists of cases per states.
					$.ajax({
								url : url_data_map,
								method : "GET",
								dataType : 'json',
								contentType : 'application/json'
							})
							.done(
									function(data) {

										var temporal = "";
										// For each element in the JSON we need
										// to collect their values
										for (var i = 0; i < data.length; i++)
											temporal = temporal.concat(data[i]);
										var dataJson = JSON.parse(temporal);
										$
												.each(
														dataJson,
														function(key, value) { // First
																				// Level

															if (key == "results") {

																$
																		.each(
																				value,
																				function(
																						secondKey,
																						secondValue) { // Second
																										// Level

																					$
																							.each(
																									secondValue,
																									function(
																											thirdKey,
																											thirdValue) { // Third
																															// Level

																										if (thirdKey == "name") {
																											array_name[array_name.length] = thirdValue;
																											array_counter[array_counter.length] = counter;
																										}

																										if (thirdKey == "number_cases") {
																											array_total[array_total.length] = thirdValue;
																										}

																										if (thirdKey == "cases") {

																											$
																													.each(
																															thirdValue,
																															function(
																																	fourthKey,
																																	fourthValue) { // Fourth
																																					// Level

																																// This
																																// AJAX
																																// call
																																// corresponds
																																// to
																																// the
																																// request
																																// of
																																// the
																																// HTML
																																// of
																																// the
																																// elements
																																// of
																																// the
																																// list.
																																// Note
																																// that
																																// the
																																// async:
																																// false
																																// because
																																// we
																																// are
																																// not
																																// validating
																																// or
																																// using
																																// the
																																// post
																																// method.
																																$
																																		.ajax(
																																				{
																																					url : url_style_list,
																																					context : document.body,
																																					async : false,
																																				})
																																		.done(
																																				function(
																																						result) {
																																					$(
																																							"#caseregionList")
																																							.append(
																																									result);
																																				});

																																$
																																		.each(
																																				fourthValue,
																																				function(
																																						fifthKey,
																																						fifthValue) { // Fifth
																																										// Level

																																					if (fifthKey == "title") {

																																						$('#value').html(fifthValue);
																																						$('#value').removeClass('col-xs-11');
																																						$('#value').addClass('col-xs-10');
																																						counterCase = counterCase + 1;
																																						$('#value').closest(".subtitleBar").hide();
																																						oldLinkID = $('#value').closest(".subtitleBar");

																																						oldLinkID
																																								.addClass("class"
																																										+ counter);
																																						oldLinkID = document
																																								.getElementById("value");
																																						oldLinkID.id = "iden"
																																								+ counter
																																								+ "iden"
																																								+ counterCase;

																																						oldLinkID = document
																																								.getElementById("list-html");
																																						oldLinkID.id = "link"
																																								+ counter
																																								+ "link"
																																								+ counterCase;

																																						$("#" + "link" + counter + "link" + counterCase).find("a").html("Abrir");
																																						
																																						$("#" + "link" + counter + "link" + counterCase).removeClass("col-xs-10");
																																						$("#" + "link" + counter + "link" + counterCase).addClass("col-xs-2");
																										
																										
																																						$("#" + "link" + counter + "link" + counterCase).find("a").attr("href", url_web+"/cases/case/"+$("#caseID").val());

																																					}
																																					
																																					if(fifthKey == "id"){
																																					
																																						$("#caseID").val(fifthValue) ;
																																					
																																					}

																																				});

																															});
																										}
																									});

																					count_map = count_map + 1;

																				});
															}

														});

									}).fail(function(jqXHR, textStatus, errorThrown) {

										$('#caseregionList').html("<div class='failedService'><img style='background:gray' src='"+ fail_service_img + "' alt='service fail' /><br><p>Failed to load service</p></div>");
									});

					$('svg > g').on('click', function() { // when you click
															// the div

						count_map++;
						// The count variable enables that the action when
						// second click is different
						// from the first click action
						if (count_map % 2 != 0) {
							$("svg > g").each(function() {
								$(this).removeClass('no-hover');
							});
						
							hoverEvents();
						} else {
							$(this).removeClass('hover');

							$(this).addClass('no-hover');

							$('.map g').off('mouseover');
							$('.map g').off('mousemove');
						

						}
					});

				});
