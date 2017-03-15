// The commands inside the $(document).ready are all the commands that will be loaded 
// after the rest of the page is loaded. 

$(document).ready(function() {

	// url_data is the URL corresponding to the AJAX code
	var url_data = null;
	// show_result is the different key element name of the JSON array depending
	// on the action selected by the user
	var show_result = null;

	// The default value of the summary table category/isp list is "category"
	selectBlocked("domains");

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

function selectBlocked(option) {
	var language = $('#language').val();
	// When select function is invoked the list is emptied
	$("#blockbody").empty();

	// Depending on selected option we need to load the corresponding title and
	// variable key of the result we want to show
	if (option == "Domains") {

		// This variable loads the translated string of the title corresponding
		// to the "site" option
		var domainsT = $("#domains").val();

		$("#blockedheader").html("Domains");

		url_data = url_data_domains;

	} else {
		// This variable loads the translated string of the title corresponding
		// to the "domain" option
		var sitesT = $("#sites").val();
		$("#blockedheader").html("Sites");

		url_data = url_data_sites;

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

						if (option == "Domains") {
							count = dataJson.count;

							// The table header is updated each time the option
							// is selected that's why it first needs to be
							// emptied
							$("#blocktitle").empty();

							// Pill with total number of cases in red and the
							// title of the option
							
							//Translation IF for title of the table
							
							$("#blocktitle")
							.html(
									'<span class="tag tag-default tag-pill float-xs-left pill-size" id="countBlocked"></span> &nbsp'+domainsT);

							
							$("#download").attr("href", url_excel_domains)
							// In data.results we find the info we need for this
							// section, it is an array of objects
							$
									.each(
											dataJson.results,
											function(index, result) {

											

												// variable that has the total
												// number of cases for the
												// Domain option
										

												// displays
												$("#countBlocked").html(count);
												$("#blockbody")
														.append(
																'<tr><td id="blockedDomain" style="width:100%">'+result.url+'<a href="'+result.url+'"><i class="fa fa-external-link" style="float:right" aria-hidden="true"></i></a></td></tr>');
																		})
						}

						else {

							count = dataJson.count;
							// The table header is updated each time the option
							// is selected, that's wh it first needs to be
							// emptied
							$("#blocktitle").empty();

							// Pill with total number of cases in red and the
							// title of the option

							$("#blocktitle")
							.html(
									'<span class="tag tag-default tag-pill float-xs-left pill-size" id="countBlocked"></span> &nbsp'+sitesT);
							
							$("#download").attr("href", url_excel_sites)
							// In data.results we find the info for this
							// section, it is an array of objects

							$
									.each(
											dataJson.results,
											function(index, result) {

												// name of the isp
												name = result.name;

								 
												

												// displays in the title the
												// total number of cases
												$("#countBlocked").html(count);

												// adds the info on the body of
												// the table for each of the isp
												// encountered on the JSON
												// object
												$("#blockbody")
														.append(
																'<tr class="focus" data-toggle="collapse" data-target="#data'
																		+ name
																		+ '" class="clickable"><td id="blockName">'
																		+ name
																		+ '</td><tr id="focusBlocked"><td style="padding:0"><div id="data'
																		+ name
																		+ '" class="collapse"></div></td><td style="padding:0"></td></tr>');

												// adds the cases for each of
												// the ISP's encountered on the
												// iteration before
												$
														.each(
																result.domains,
																function(key,
																		value) {

																	url = value.url;

																	$(
																			"#data"
																					+ name)
																			.append(
																					'<tr><td id="rowTitleDataBlocked">'
																							+ url
																							+ '</td><td><a href="'+url+'"><i class="fa fa-external-link" style="float:right" aria-hidden="true"></i></a></td></tr>');

																})
											})

						}

					}).fail(function(jqXHR, textStatus, errorThrown) {

						$('#blockbody').html("<div class='failedService'><img style='background: gray' src='"+ fail_service_img + "' alt='service fail' /><br><p>Failed to load service</p></div>");
					});;

}