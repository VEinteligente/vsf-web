
 function EventsMonth(elementDiv){
	 var data = [  ];
	  
	//This AJAX call corresponds to the request of the JSON data from Pandora
	//project API.
	$
			.ajax({
				url : url_events_month,
				method : "GET",
				dataType : 'json',
				contentType : 'application/json'
			})
			.done(
					function(array) {
			
						var temporal = "";

						// For each element in the JSON we need to collect their
						// values
						for (var i = 0; i < array.length; i++)
							temporal = temporal.concat(array[i]);

						var dataJson = JSON.parse(temporal);

							$.each(dataJson.dates, function(key, value) { // First Level
								

								var dateSplit = key.split(" "); 
								var dateKey = new Date(dateSplit[0]+ " " + dateSplit[2]);
								if(dateKey.getMonth()!=10 & dateKey.getMonth() != 11){
									var month = "0" + (dateKey.getMonth()+1);
								}
								else{
									var month = (dateKey.getMonth()+1);
								}
								
								if( dateKey.getDate() < 10) {
									var day  = "0" + dateKey.getDate();
								}
								else{
									var day =  dateKey.getDate()
								}
								var dateString = ""+ dateKey.getFullYear() + "-" + month + "-" + day + "";
								element = { 'date': dateString, "trendingValue": value}

							
							
								data.push(element)
								
							});	
		

							function getDate(d) {
							 var dt = new Date(d.date);
							 dt.setHours(0);
							 dt.setMinutes(0);
							 dt.setSeconds(0);
							 dt.setMilliseconds(0);
							 
							 console.log(dt)
							 return dt;
							 }
							 
							function showData(obj, d) {
							 var coord = d3.mouse(obj);
							 var infobox = d3.select(".infobox");
							 // now we just position the infobox roughly where our mouse is
							 infobox.style("left", (coord[0] + 100) + "px" );
							 infobox.style("top", (coord[1] - 175) + "px");
							 $(".infobox").html(d);
							 $(".infobox").show();
							 }
							 
							function hideData() {
							 $(".infobox").hide();
							 }
							 
							var drawChart = function(data) {
							 // define dimensions of graph
							 var m = [20, 40, 20, 100]; // margins
							 var w = 200 - m[1] - m[3]; // width
							 var h = 200 - m[0] - m[2]; // height
							 
							data.sort(function(a, b) {
							 var d1 = getDate(a);
							 var d2 = getDate(b);
							 if (d1 == d2) return 0;
							 if (d1 > d2) return 1;
							 return -1;
							 });
							 
							// get max and min dates - this assumes data is sorted
							 var minDate = getDate(data[0]),
							 maxDate = getDate(data[data.length-1]);
							 
							 var x = d3.time.scale().domain([minDate, maxDate]).range([0, w]);
							 
							// X scale will fit all values from data[] within pixels 0-w
							 //var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
							 // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
							 var y = d3.scale.linear().domain([0, d3.max(data, function(d) { return d.trendingValue; } )]).range([h, 0]);
							 
							// create a line function that can convert data[] into x and y points
							 var line = d3.svg.line()
							 // assign the X function to plot our line as we wish
							 .x(function(d, i) {
							 // return the X coordinate where we want to plot this datapoint
							 return x(getDate(d)); //x(i);
							 })
							 .y(function(d) {
							 // return the Y coordinate where we want to plot this datapoint
							 return y(d.trendingValue);
							 });
							 
							 function xx(e) { return x(getDate(e)); };
							 function yy(e) { return y(e.trendingValue); };
							 
							$(elementDiv).append("<p><small><em>Please move the mouse over data points to see details.</em></small></p>");
							 
							// Add an SVG element with the desired dimensions and margin.
							 var graph = d3.select(elementDiv).append("svg:svg")
							 .attr("width", w + m[1] + m[3])
							 .attr("height", h + m[0] + m[2])
							 .append("svg:g")
							 .attr("transform", "translate(" + '60' + "," + m[0] + ")");
							 
							// create yAxis
							 var xAxis = d3.svg.axis().scale(x).ticks(d3.time.months, 1).tickSize(-h).tickSubdivide(true);
							 // Add the x-axis.
							 graph.append("svg:g")
							 .attr("class", "x axis")
							 .attr("transform", "translate(0," + h + ")")
							 .call(xAxis);
							 
							// create left yAxis
							 var yAxisLeft = d3.svg.axis().scale(y).ticks(d3.max(data, function(d) { return d.trendingValue; } )).orient("left"); //.tickFormat(formalLabel);
							 // Add the y-axis to the left
							 graph.append("svg:g")
							 .attr("class", "y axis")
							 .attr("transform", "translate(-25,0)")
							 .call(yAxisLeft);
							 
							// Add the line by appending an svg:path element with the data line we created above
							 // do this AFTER the axes above so that the line is above the tick-lines
							 graph
							 .selectAll("circle")
							 .data(data)
							 .enter().append("circle")
							 .attr("fill", "yellow")
							 .attr("r", 5)
							 .attr("cx", xx)
							 .attr("cy", yy)
							 .on("mouseover", function(d) { showData(this, d.trendingValue);})
							 .on("mouseout", function(){ hideData();});
							 
							 graph.append("svg:path").attr("d", line(data));
							 graph.append("svg:text")
							 .attr("x", -200)
							 .attr("y", -90)
							 .attr("dy", ".1em")
							 
							 
							 
							 $(elementDiv).append("<div class='infobox' style='display:none;'>Test</div>");
							 }
							 
							var draw = function() {
//							 var data = [  {'date': "2012-09-01", 'trendingValue': 900}, 
//							               {'date': "2012-08-01", 'trendingValue': 1100}, 
//							               {'date': "2012-07-01", 'trendingValue': 950}, 
//							               {'date': "2012-06-01", 'trendingValue': 1050}];
//							
							 drawChart(data);
							 }

			draw();


					});



					
 }
 EventsMonth("#chart");
	