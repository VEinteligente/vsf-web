$(document).ready(
		function() {

			// url where its fetched the measurements data
			var url_data = url_data_measurement;
			$("#download").attr("href", url_excel)
			// months names & number list so it can be displayed on the
			// html as a month name or month number
			var month_names = [ "Enero", "Febrero", "Marzo", "Abril",
			                    "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
			                    "Octubre", "Noviembre", "Diciembre" ];
			var month_number = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];

			// .json for modal display
			var raw_data = null;
			var data_modal = null;
			var raw_json = null;
			var date = null;
			var mid = null;

			// id count for displyaing the correct .json
			idcount = 0;

			// Variables to display in modal
			var site = null;
			var m_url = null;
			var state = null;
			var city = null;
			var isp = null;
			var type = null;

			// AJAX call for the .json data
			$.ajax({
				url : url_data,
				method : 'GET',
				dataType : 'json',
				contentType : 'application/json'

			}).done(
					function(data) {

						var temporal = "";
						// For each element in the JSON we need
						// to collect their values
						for (var i = 0; i < data.length; i++)
							temporal = temporal.concat(data[i]);
						var dataJson = JSON.parse(temporal);
						// for each result in the .json
						// {count,next,previous,results}
						// data.results =
						// [{id,probe{region,country,plan{name,isp,upload,download,comment},identification,city,isp},target{site,url,ip},medicion,date,isp,ip,flag,type_med,event}]
						console.log(dataJson);
						$
						.each(
								dataJson.events,
								function(index, value) {
									// Site that has
									// been measured
									if (value.isp == null){
										isp ="N.A.";
									}else{

										isp = value.isp;
									}
									if (value.target.site == null){
										site ="N.A.";
									}else{

										site = value.target.site;
										var date = new Date(
												value.start_date);
										console.log(date);

									}
									// url from the
									// measurement
									if (value.target.url == null){
										m_url ="N.A.";
									}else{
										m_url = value.target.url;
									}
									
									// type
									// of
									// measurement

									if (value.type == null){
										type ="N.A.";
									}else{
										type = value.type;
									}
									// Json from the row
									// that is inserted
									// in the table
									raw_data = JSON
									.stringify(value);
									console.log(value);

									if ((value.flags).length == 0){
										city ="N.A.";
										state ="N.A.";
									}else {
										$
										.each(
												value.flags,
												function(
														index,
														value) {
													



													if (value.probe == null){
														city ="N.A.";
														state ="N.A.";
														isp="N.A.";

													}else{
														// country
														// of
														// the
														// measurement

														// city
														// of
														// the
														// measurement

														if (value.probe.city == null){
															city ="N.A.";
														}else{
															city = value.probe.city;
														}
														// state
														// or
														// region
														// of
														// the
														// measurement
														if (value.probe.region == null){
															state ="N.A.";
														}else{

															state = value.probe.region;
														}

														
													}

													// data
													// has
													// the
													// json
													// date
													// in
													// format
													// so
													// we
													// can
													// grab
													// day,month
													// or
													// year
													// as
													// needed
												});
									}

									// We
									// pass
									// the
									// ID
									// and
									// JSON
									// in
									// the
									// data-id
									// and
									// data-json
									// fields
									// in
									// the
									// modal
									
														
										$(
												"#dataTableM")
												.append(
														'<div class="row" id="mRow"><div class="col-xs-2 mData" id="mDataSite">'
														+ site
														+ '</div><div class="col-xs-3 mData">'
														+ m_url
														+ '</div><div class="col-xs-1 mData" id="mDataDate">'
														+ date.getDate()
														+ '/'
														+ month_number[date.getMonth()]
														+ '/'
														+ date
														.getFullYear()
														+ '</div><div class="col-xs-1 mData" id="mDataRegion">'
														+ state
														+ '</div><div class="col-xs-1 mData" id="mDataCity">'
														+ city
														+ '</div><div class="col-xs-1 mData" id="mDataIsp">'
														+ isp
														+ '</div><div class="col-xs-1 mData" id="mDataJson"><a data-id="'
														+ value.id
														+ '" data-json=\''
														+ raw_data
														+ '\' id="modalbutton" data-toggle="modal" data-target="#myModal">.Json</a></div><div class="col-xs-2 mData" id="mDataType">'
														+ type
														+ '</div></div>');
									

									

									idcount = idcount + 1;

								});
						var height = idcount*34  + 228;
						$("#mTable").closest(".bodyContent").css("height", height + "px");


					}).fail(function(jqXHR, textStatus, errorThrown) {

						$('#dataTableM').html("<div class='failedService'><img src='"+ fail_service_img + "' alt='service fail' /><br><p>Failed to load service</p></div>");
					});

			//Function to give the modal the Json file on click with the format we like to

			$(document).on(
					"click",
					"#modalbutton",
					function() {
						
						//Here we grab the Json from de data-json field
						var raw_json = $(this).data('json');

						//Id from the measurement that goes in the title of the modal
						
						var mid = $(this).data('id');
						//Stringify for display the Json inside the modal
						data_modal = JSON.stringify(raw_json);
						//Sends the JSON file to the Modal
						$("#measurementData").jJsonViewer(raw_json, {
							expanded : true
						});

						//Sends the id to the title of the Modal
						$("#measurementTitle").html(
								'Measurement');
					});


			var height_bodyContent = $(".marginPage").height()+50;
			$(".marginPage").closest(".bodyContent").height(height_bodyContent+ 'px' )
		});