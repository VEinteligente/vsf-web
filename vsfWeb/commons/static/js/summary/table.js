// The commands inside the $(document).ready are all the commands that will be loaded 
// after the rest of the page is loaded. 

$(document).ready(function() {

	// url_data is the URL corresponding to the AJAX code
	var url_data = null;
	// show_result is the different key element name of the JSON array depending
	// on the action selected by the user
	var show_result = null;

	// The default value of the summary table category/isp list is "category"
	select("category");

	var name = null;
	var number = null;
	var count = 0;
	var title = null;
	var content = null;
});

// Fnction select(option): Enables the option to use the same AJAX code for the
// summary table for category or isp.
// The input "option" corresponds to the type of list that we are going to show.
// Ex. "Category" or "ISP"

function select(option) {

	// When select function is invoked the list is emptied
	$("#tablebody").empty();

	// Depending on selected option we need to load the corresponding title and
	// variable key of the result we want to show
	if (option == "category") {

		// This variable loads the translated string of the title corresponding
		// to the "site" option
		var categories = $("#category").val();

		$("#tableheader").html("Category");

		url_data = url_data_category;

	} else {
		// This variable loads the translated string of the title corresponding
		// to the "domain" option
		var isps = $("#isp").val();
		$("#tableheader").html("ISP");

		url_data = url_data_isp;

	}

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
					function(data) {

						var temporal = "";
						// For each element in the JSON we need to collect their
						// values
						for (var i = 0; i < data.length; i++)
							temporal = temporal.concat(data[i]);
						var dataJson = JSON.parse(temporal);

						// Depending on the option choosed, the table loads the
						// info for Category or ISP's

						if (option == "category") {
							count = 0;

							// The table header is updated each time the option
							// is selected that's why it first needs to be
							// emptied
							$("#tabletitle").empty();

							// Pill with total number of cases in red and the
							// title of the option

							$("#tabletitle")
									.html(
											'<span class="tag tag-default tag-pill float-xs-left pill-size" id="countSummary"></span> &nbsp <strong>Casos</strong> Por Categoría');

							$("#download").attr("href", url_excel_category)
							// In data.results we find the info we need for this
							// section, it is an array of objects
							$
									.each(
											dataJson.results,
											function(index, result) {

												// name of the category it is
												// iterating on
												name = (result.category).display_name;
												aux = (result.category).name;
												// number of cases the catefory
												// has
												number = result.number_cases;

												// variable that has the total
												// number of cases for the
												// category option
												count = count
														+ result.number_cases;

												// displays
												$("#countSummary").html(count);
												$("#tablebody")
														.append(
																'<tr class="focus" data-toggle="collapse" data-target="#data'
																		+ name
																		+ '" class="clickable"><td id="rowName"><span class="tag tag-default tag-pill float-xs-left">'
																		+ number
																		+ '</span> &nbsp '
																		+ name
																		+ '</td><tr><td id="focusSummary" class ="prueba" style="padding:0"><div id="data'
																		+ name
																		+ '" class="collapse"></div></td></tr>');

												// for each case wee need its
												// title to display as info on
												// the table each name of the
												// categories is a tr that is
												// has an id with #dataname
												// where name is the name of the
												// category so it can be
												// appended where it belongs

												$
														.each(
																result.cases,
																function(key,
																		value) {

																	title = value.title;

																	if (name == "bloqueo") {
																		content = aux;

																		$(
																				"#data"
																						+ name)
																				.append(
																						'<tr><td id="rowTitleDataCategory">'
																								+ title
																								+ '</td><td style="min-width:300px"><div class="'
																								+ content
																								+ '"><div class="left_cornerTag"></div><div class="contentTag">'
																								+ name
																								+ '</div><div class="right_cornerTag"></div></div> </td><td><a href="http://127.0.0.1:8000/cases/one-element-case/'
																								+ value.id
																								+ '">Abrir</a></td></tr><br>');

																	}

																	else if (name == "desconexion") {
																		content = aux;

																		$(
																				"#data"
																						+ name)
																				.append(
																						'<tr><td id="rowTitleDataCategory">'
																								+ title
																								+ '</td><td style="min-width:135px"><div class="'
																								+ content
																								+ '"><div class="left_cornerTag"></div><div class="contentTag">'
																								+ name
																								+ '</div><div class="right_cornerTag"></div></div> </td><td> <a href="http://127.0.0.1:8000/cases/one-element-case/'
																								+ value.id
																								+ '">Abrir</a></td></tr><br>');

																	}

																	else if (name == "relentizacion") {
																		content = aux;

																		$(
																				"#data"
																						+ name)
																				.append(
																						'<tr><td id="rowTitleDataCategory">'
																								+ title
																								+ '</td><td style="min-width:135px"><div class="'
																								+ content
																								+ '"><div class="left_cornerTag"></div><div class="contentTag">'
																								+ name
																								+ '</div><div class="right_cornerTag"></div></div></td><td> <a href="http://127.0.0.1:8000/cases/one-element-case/'
																								+ value.id
																								+ '">Abrir</a></td></tr><br>');

																	}

																	else if (name == "conexion") {
																		content = aux;

																		$(
																				"#data"
																						+ name)
																				.append(
																						'<tr><td id="rowTitleDataCategory">'
																								+ title
																								+ '</td><td style="min-width:135px"><div class="'
																								+ content
																								+ '"><div class="left_cornerTag"></div><div class="contentTag">'
																								+ name
																								+ '</div><div class="right_cornerTag"></div></div> </td><td> <a href="http://127.0.0.1:8000/cases/one-element-case/'
																								+ value.id
																								+ '">Abrir</a></td></tr><br>');

																	}

																	else if (name == "intercepcion") {
																		content = aux;

																		$(
																				"#data"
																						+ name)
																				.append(
																						'<tr><td id="rowTitleDataCategory">'
																								+ title
																								+ '</td><td style="min-width:135px"><div class="'
																								+ content
																								+ '"><div class="left_cornerTag"></div><div class="contentTag">'
																								+ name
																								+ '</div><div class="right_cornerTag"></div></div></td><td> <a href="http://127.0.0.1:8000/cases/one-element-case/'
																								+ value.id
																								+ '">Abrir</a></td></tr><br>');

																	}

																	else if (name == "falla") {
																		content = aux;

																		$(
																				"#data"
																						+ name)
																				.append(
																						'<tr><td id="rowTitleDataCategory">'
																								+ title
																								+ '</td><td style="min-width:135px"><div class="'
																								+ content
																								+ '"><div class="left_cornerTag"></div><div class="contentTag">'
																								+ name
																								+ '</div><div class="right_cornerTag"></div></div> </td><td> <a href="http://127.0.0.1:8000/cases/one-element-case/'
																								+ value.id
																								+ '">Abrir</a></td></tr><br>');

																	}

																	else {
																		content = aux;

																		$(
																				"#data"
																						+ name)
																				.append(
																						'<tr><td id="rowTitleDataCategory">'
																								+ title
																								+ '</td><td style="min-width:135px"><div class="'
																								+ content
																								+ '"><div class="left_cornerTag"></div><div class="contentTag">'
																								+ name
																								+ '</div><div class="right_cornerTag"></div></div> </td><td> <a href="http://127.0.0.1:8000/cases/one-element-case/'
																								+ value.id
																								+ '">Abrir</a></td></tr><br>');

																	}

																})
											})
						}

						else {

							count = 0;
							// The table header is updated each time the option
							// is selected, that's wh it first needs to be
							// emptied
							$("#tabletitle").empty();

							// Pill with total number of cases in red and the
							// title of the option
							$("#tabletitle")
									.append(
											'<span class="tag tag-default tag-pill float-xs-left pill-size" id="countSummary"></span> &nbsp <strong>Casos</strong> Por ISP');

							$("#download").attr("href", url_excel_isp)
							// In data.results we find the info for this
							// section, it is an array of objects

							$
									.each(
											dataJson.results,
											function(index, result) {

												// name of the isp
												name = result.isp;

												// number of cases associated
												// with the isp
												number = result.number_cases;

												// total number of all the isp
												// cases
												count = count
														+ result.number_cases;

												// displays in the title the
												// total number of cases
												$("#countSummary").html(count);

												// adds the info on the body of
												// the table for each of the isp
												// encountered on the JSON
												// object
												$("#tablebody")
														.append(
																'<tr class="focus" data-toggle="collapse" data-target="#data'
																		+ name
																		+ '" class="clickable"><td id="rowName"><span class="tag tag-default tag-pill float-xs-left">'
																		+ number
																		+ '</span> &nbsp '
																		+ name
																		+ '</td><tr id="focusSummary"><td style="padding:0"><div id="data'
																		+ name
																		+ '" class="collapse"></div></td><td style="padding:0"></td></tr>');

												// adds the cases for each of
												// the ISP's encountered on the
												// iteration before
												$
														.each(
																result.cases,
																function(key,
																		value) {

																	title = value.title;

																	$(
																			"#data"
																					+ name)
																			.append(
																					'<tr><td id="rowTitleDataIsp">'
																							+ title
																							+ '</td><td><a href="http://127.0.0.1:8000/cases/one-element-case/'
																							+ value.id
																							+ '">Abrir</a></td></tr></tr>');

																})
											})

						}

					}).fail(function(jqXHR, textStatus, errorThrown) {

						$('#tablebody').html("<div class='failedService'><img style='background: gray' src='"+ fail_service_img + "' alt='service fail' /><br><p>Failed to load service</p></div>");
					});;

}