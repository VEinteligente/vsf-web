// This value indicates the maximum Y values of a graph. If the value is 
// over this value then a simplificated graph will be shown. 
var maxYValues = 12; 

// These values indicate the diferent options for the X axis 
var Year = "Year";
var Month = "Month";
var All = "All";

// This value indicates if the Gantt has been collapsed
var collapse = 0;

function eventLabel(target){
    // Returns the expected label for an event of given target
    // Consitency is *critical* for correct representation of timeline chart
    console.log("target for eventLabel:"+target);
    var label ="";
    if(target.site != null){
    		label = target.site.name;
    	}
	else{
        switch (target.type){   // checks te type of target
            case "ip":
                if(target.ip != null){
				    label = target.ip;
                }
            case  "url":
                if(target.url != null){
    				label = target.url;
    			}        			
            case "domain":
                if(target.domain != null){
    				label = target.domain ;
    			}
    			break        			
            default:  //if other type of teget
                console.log("Error: unrecoognized type of target o missing type.\n"+result);
        }
    }
    console.log(label);
    return label;
}

function gantt(timelap){

	if(language=="es"){
		
		var Formatters = d3.locale({
			  "decimal": ",",
			  "thousands": ".",
			  "grouping": [3],
			  "currency": ["BsF.", ""],
			  "dateTime": "%a %b %e %X %Y",
			  "date": "%d.%m.%Y",
			  "time": "%H:%M:%S",
			  "periods": ["AM", "PM"],
			  "days": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
			  "shortDays": ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
			  "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
			  "shortMonths": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
			});

			

	}else if(language=="en"){
		var Formatters = d3.locale({
			  "decimal": ",",
			  "thousands": ".",
			  "grouping": [3],
			  "currency": ["$", ""],
			  "dateTime": "%a %b %e %X %Y",
			  "date": "%d.%m.%Y",
			  "time": "%H:%M:%S",
			  "periods": ["AM", "PM"],
			  "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			  "shortDays": ["Su", "Mo", "Tu", "We", "Thu", "Fri", "Sa"],
			  "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
			  "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
			});

			
	}

	
	// This function calls the gantt graph. Timelap indicates the unit of time
	// of the X axis
	
	$("#timeline1").html("<div class='row' style='float:right; " +
			"margin-right:25px'><button onClick='gantt(Year)'" +
			"class='contextualButtonFixedSize'>Año</button>" +
			"<button onClick='gantt(Month)' class='contextualButtonFixedSize'>Mes</button>" +
			"<button onClick='gantt(All)' class='contextualButtonFixedSize'>Todo</button>" +
			"</div>");
	
	// This value indicates the starting time of the Gantt
	var timelineStart = (new Date($('#hiddenDate').val())).getTime();
	// This value indicates the ending time of the Gantt
	var timelineEnd = (new Date($('#hiddenDateEnd').val())).getTime();
	
	var dateStart = new Date($('#hiddenDate').val());
	var start = (new Date($('#hiddenDateStart').val()));
	// This value corresponds to the time between the start and ending time
	// of the Gantt
	var timeDiff = Math.abs(timelineEnd- timelineStart);
	// This value corresponds to the days between the start and ending time
	// of the Gantt
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
	
	
	// If the timelap selected is Days show the last week
	if(timelap == "Days"){
		
			var separation = diffDays/7 ;
			var tickFormat = { format: Formatters.timeFormat("%d %b"),
			          tickTime: d3.time.days,
			          tickInterval: separation,
			          tickSize: 6,
			          tickValues: null
			        };
			
			
			timelineStart = new Date(dateStart.setDate(start.getDate() - 7));
			timelineEnd = new Date();
		
		
	}
		
	else if(timelap == "Month"){

		// If the timelap selected is Month show the whole month
				var tickFormat = { format: Formatters.timeFormat("%b %Y"),
				          tickTime: d3.time.month,
				          tickInterval: 12,
				          tickSize: 6,
				          tickValues: null
				        };
				start_timelap = new Date();
				timelineStart = new Date(start.getFullYear(), start.getMonth(), 1);
				timelineEnd = new Date();
				
	}
	 
	else if(timelap == "Year"){
			// If the timelap selected is Days show the first 6 months of the
			// year
					var tickFormat = { format: Formatters.timeFormat("%Y"),
					          tickTime: d3.time.year,
					          tickInterval: 1,
					          tickSize: 6,
					          tickValues: null
					        };
					
					start_timelap = new Date();
					timelineStart = new Date(start.getFullYear(), 0, 1);
					timelineEnd = new Date();
					
					
				
	}
	
	else{

		// If the number of days is smaller than 3 then show the X axis
		// with the day number and month name
		if(diffDays < 3){
			
				var tickFormat = { format: Formatters.timeFormat("%d %b"),
				          tickTime: d3.time.days,
				          tickInterval: 1,
				          tickSize: 6,
				          tickValues: null
				        };
				
				timelineEnd = new Date();
				timelineStart = new Date(dateStart.setDate(start.getDate() - 3));
			
		}
		else{

			// If the number of days is smaller than 7 then show the X axis
			// with the day number and month name. The set the starting date
			// of the Gantt a week before that date

			if(diffDays < 7) {
				var tickFormat = { format: Formatters.timeFormat("%d %b"),
				          tickTime: d3.time.days,
				          tickInterval: 1,
				          tickSize: 6,
				          tickValues: null
				        };
				
				
				timelineStart = dateStart.setDate(start.getDate() - 7);
				timelineEnd = new Date();
			}
			

			
			else{
				// If the number of days is smaller than 31 then show the X axis
				// with the day number and month name. The set the starting date
				// of the Gantt as the first day of month
				if(diffDays < 31) {
					var tickFormat = { format: Formatters.timeFormat("%d %b"),
					          tickTime: d3.time.days,
					          tickInterval: 3,
					          tickSize: 6,
					          tickValues: null
					        };
					timelineStart = new Date(start.getFullYear(), start.getMonth(), 1);
					timelineEnd = new Date();
				}
				else{
					// If the number of days is smaller than a year then show
					// the X axis
					// with the month name and year. The set the starting date
					// of the Gantt as the first of January
					if(diffDays < 365){
						var tickFormat = { format: Formatters.timeFormat("%b %Y"),
						          tickTime: d3.time.months,
						          tickInterval: 1,
						          tickSize: 6,
						          tickValues: null
						        };
						
						timelineStart = new Date(start.getFullYear(), start.getMonth(), 1);
						timelineEnd = new Date();
					}
					else{
						
						// If the number of days is higher than a year then show
						// the X axis
						// with the month name and year. The set the starting
						// date
						// of the Gantt as the date of the first event
						var tickFormat = { format: Formatters.timeFormat("%Y"),
						          tickTime: d3.time.years,
						          tickInterval: 1,
						          tickSize: 6,
						          tickValues: null
						        };
						
						timelineStart = new Date(start.getFullYear(), start.getMonth(),  start.getDate());
						timelineEnd = new Date();
						
					}
				}
			}
		}
		
		
		
	}
	
	
		
// These section loads the d3 chart characteristics and options. The option 
// "rect" is a polygon. 
	
(function () {
  d3.timeline = function() {
    var DISPLAY_TYPES = ["circle", "rect"];
    
    // When hover over a element of the Gantt show tooltip
    var hover = function (d,i) {  
  	
    	},
        mouseover = function (d,i) {  
    		  	
      
    	},
        mouseout = function () {
      
        },
        click = function () {},
        scroll = function () {},
        labelFunction = function(label) { return label; },
        navigateLeft = function () {},
        navigateRight = function () {},
        orient = "bottom",
        width = null,
        height = null,
        rowSeparatorsColor = null,
        backgroundColor = null,
        colorCycle = d3.scale.category20(),
        colorPropertyName = null,
        display = "rect",
        beginning = 0,
        labelMargin = 0,
        ending = 0,
        margin = {left: 30, right:30, top: 30, bottom:30},
        stacked = false,
        rotateTicks = false,
        timeIsRelative = false,
        fullLengthBackgrounds = false,
        itemHeight = 20,
        itemMargin = 5,
        navMargin = 60,
        showTimeAxis = true,
        showAxisTop = false,
        showTodayLine = false,
        timeAxisTick = false,
        timeAxisTickFormat = {stroke: "stroke-dasharray", spacing: "4 10"},
        showTodayFormat = {marginTop: 25, marginBottom: 0, width: 1, color: colorCycle},
        showBorderLine = false,
        showBorderFormat = {marginTop: 25, marginBottom: 0, width: 1, color: colorCycle},
        showAxisHeaderBackground = false,
        showAxisNav = false,
        showAxisCalendarYear = false,
        axisBgColor = "white",
        chartData = {}
      ;

        
    var appendTimeAxis = function(g, xAxis, yPosition) {

      if(showAxisHeaderBackground){ appendAxisHeaderBackground(g, 0, 0); }

      if(showAxisNav){ appendTimeAxisNav(g) };

      var axis = g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + 0 + "," + yPosition + ")")
        .call(xAxis);
    };

    var appendTimeAxisCalendarYear = function (nav) {
      var calendarLabel = beginning.getFullYear();

      if (beginning.getFullYear() != ending.getFullYear()) {
        calendarLabel = beginning.getFullYear() + "-" + ending.getFullYear()
      }

      nav.append("text")
        .attr("transform", "translate(" + 20 + ", 0)")
        .attr("x", 0)
        .attr("y", 14)
        .attr("class", "calendarYear")
        .text(calendarLabel)
      ;
    };
    var appendTimeAxisNav = function (g) {
      var timelineBlocks = 6;
      var leftNavMargin = (margin.left - navMargin);
      var incrementValue = (width - margin.left)/timelineBlocks;
      var rightNavMargin = (width - margin.right - incrementValue + navMargin);

      var nav = g.append('g')
          .attr("class", "axis")
          .attr("transform", "translate(0, 20)")
        ;

      if(showAxisCalendarYear) { appendTimeAxisCalendarYear(nav) };

      nav.append("text")
        .attr("transform", "translate(" + leftNavMargin + ", 0)")
        .attr("x", 0)
        .attr("y", 14)
        .attr("class", "chevron")
        .text("<")
        .on("click", function () {
          return navigateLeft(beginning, chartData);
        })
      ;

      nav.append("text")
        .attr("transform", "translate(" + rightNavMargin + ", 0)")
        .attr("x", 0)
        .attr("y", 14)
        .attr("class", "chevron")
        .text(">")
        .on("click", function () {
          return navigateRight(ending, chartData);
        })
      ;
    };

    var appendAxisHeaderBackground = function (g, xAxis, yAxis) {
      g.insert("rect")
        .attr("class", "row-green-bar")
        .attr("x", xAxis)
        .attr("width", width)
        .attr("y", yAxis)
        .attr("height", itemHeight)
        .attr("fill", axisBgColor);
    };

    var appendTimeAxisTick = function(g, xAxis, maxStack) {
      g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + 0 + "," + (margin.top + (itemHeight + itemMargin) * maxStack) + ")")
        .attr(timeAxisTickFormat.stroke, timeAxisTickFormat.spacing)
        .call(xAxis.tickFormat("").tickSize(-(margin.top + (itemHeight + itemMargin) * (maxStack - 1) + 3), 0, 0));
    };

    var appendBackgroundBar = function (yAxisMapping, index, g, data, datum) {
      var greenbarYAxis = ((itemHeight + itemMargin) * yAxisMapping[index]) + margin.top;
      g.selectAll("svg").data(data).enter()
        .insert("rect")
        .attr("class", "row-green-bar")
        .attr("x", fullLengthBackgrounds ? 0 : margin.left)
        .attr("width", fullLengthBackgrounds ? width : (width - margin.right - margin.left))
        .attr("y", greenbarYAxis)
        .attr("height", itemHeight)
        .attr("fill", backgroundColor instanceof Function ? backgroundColor(datum, index) : backgroundColor)
      ;
    };

    var appendLabel = function (gParent, yAxisMapping, index, hasLabel, datum) {
      var fullItemHeight    = itemHeight + itemMargin;
      var rowsDown          = margin.top + (fullItemHeight/2) + fullItemHeight * (yAxisMapping[index] || 1);

      gParent.append("g")
        .attr("class", "timeline-label")
        .attr("transform", "translate(" + labelMargin + "," + rowsDown + ")")
        .text(hasLabel ? labelFunction(datum.label) : datum.id)
        .on("click", function (d, i) { click(d, index, datum); });
    };

    function timeline (gParent) {
      var g = gParent.append("g");
      var gParentSize = gParent[0][0].getBoundingClientRect();

      var gParentItem = d3.select(gParent[0][0]);

      var yAxisMapping = {},
        maxStack = 1,
        minTime = 0,
        maxTime = 0;
      

      setWidth();

      // check if the user wants relative time
      // if so, substract the first timestamp from each subsequent timestamps
      if(timeIsRelative){
        g.each(function (d, i) {
          d.forEach(function (datum, index) {
            datum.times.forEach(function (time, j) {
              if(index === 0 && j === 0){
                originTime = time.starting_time;               
                
                // Store the timestamp that will serve as origin
                time.starting_time = 0;                        
                // Set the origin
                time.ending_time = time.ending_time - originTime;     
                // Store the relative time (millis)
              }else{
                time.starting_time = time.starting_time - originTime;
                time.ending_time = time.ending_time - originTime;
              }
            });
          });
        });
      }

      // check how many stacks we're gonna need
      // do this here so that we can draw the axis before the graph
      if (stacked || ending === 0 || beginning === 0) {
        g.each(function (d, i) {
          d.forEach(function (datum, index) {
            // create y mapping for stacked graph
        	
            if (stacked && Object.keys(yAxisMapping).indexOf(index) == -1) {    
     
            yAxisMapping[index] = maxStack;
            
            maxStack++;
            }

            // figure out beginning and ending times if they are unspecified
            datum.times.forEach(function (time, i) {
              if(beginning === 0)
                if (time.starting_time < minTime || (minTime === 0 && timeIsRelative === false))
                  minTime = time.starting_time;
              if(ending === 0)
                if (time.ending_time > maxTime)
                  maxTime = time.ending_time;
            });
          });
        });

        if (ending === 0) {
          ending = maxTime;
        }
        if (beginning === 0) {
          beginning = minTime;
        }
      }

      var scaleFactor = (1/(ending - beginning)) * (width - margin.left - margin.right);

      // draw the axis
      var xScale = d3.time.scale()
        .domain([beginning, ending])
        .range([margin.left, width - margin.right]);

      var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient(orient)
        .tickFormat(tickFormat.format)
        .tickSize(tickFormat.tickSize);

      if (tickFormat.tickValues != null) {
        xAxis.tickValues(tickFormat.tickValues);
      } else {
        xAxis.ticks(tickFormat.numTicks || tickFormat.tickTime, tickFormat.tickInterval);
      }
      var count = 0;
      var position = 0; 
      // draw the chart
      g.each(function(d, i) {
    	
        chartData = d;
        d.forEach( function(datum, index){
        
          var data = datum.times;
        
          var hasLabel = (typeof(datum.label) != "undefined");

          // issue warning about using id per data set. Ids should be
			// individual to data elements
          if (typeof(datum.id) != "undefined") {
            console.warn("d3Timeline Warning: Ids per dataset is deprecated in favor of a 'class' key. Ids are now per data element.");
          }

          if (backgroundColor) { appendBackgroundBar(yAxisMapping, index, g, data, datum); }

          g.selectAll("svg").data(data).enter()
            .append(function(d, i) {
                return document.createElementNS(d3.ns.prefix.svg, "polygon");
            })
            .attr("transform", getPosition)
            .attr("points", getPoints)
            .attr("x", getXPos)          
            .attr("y", getStackPosition)          
            .attr("height", itemHeight)
            .style("fill", function(d, i){
              var dColorPropName;
              if (d.color) return d.color;
              if( colorPropertyName ){
                dColorPropName = d[colorPropertyName];
                if ( dColorPropName ) {
                  return colorCycle( dColorPropName );
                } else {
                  return colorCycle( datum[colorPropertyName] );
                }
              }
              return colorCycle(index);
            })
            .on("mousemove", function (d, i) {
              hover(d, index, datum);
 
            })
            .on("mouseover", function (d, i) {
              // This loads the function and tooltip
              mouseover(d, i, datum);
              $(".informationPanelGantt").show();
            })
            .on("mouseout", function (d, i) {
              // This loads the function and hides tooltip
              mouseout(d, i, datum);
              $(".informationPanelGantt").hide();
            })
            .on("click", function (d, i) {
              click(d, index, datum);
            })
            .attr("class", function (d, i) {
              return datum.class ? "timelineSeries_"+datum.class : "timelineSeries_"+index;
            })
            .attr("id", function(d, i) {
              // use deprecated id field
              if (datum.id && !d.id) {
                return 'timelineItem_'+datum.id;
              }

              return d.id ? d.id : "timelineItem_"+index+"_"+i;
            })
          ;

          g.selectAll("svg").data(data).enter()
            .append("text")
            .attr("x", getXTextPos)
            .attr("y", getStackTextPosition)
            .text(function(d) {
              return d.label;
            })
          ;

          if (rowSeparatorsColor) {
            var lineYAxis = ( itemHeight + itemMargin / 2 + margin.top + (itemHeight + itemMargin) * yAxisMapping[index]);
            gParent.append("svg:line")
              .attr("class", "row-separator")
              .attr("x1", 0 + margin.left)
              .attr("x2", width - margin.right)
              .attr("y1", lineYAxis)
              .attr("y2", lineYAxis)
              .attr("stroke-width", 1)
              .attr("stroke", rowSeparatorsColor);
          }

          // add the label
          if (hasLabel) { appendLabel(gParent, yAxisMapping, index, hasLabel, datum); }

          if (typeof(datum.icon) !== "undefined") {
            gParent.append("image")
              .attr("class", "timeline-label")
              .attr("transform", "translate("+ 0 +","+ (margin.top + (itemHeight + itemMargin) * yAxisMapping[index])+")")
              .attr("xlink:href", datum.icon)
              .attr("width", margin.left)
              .attr("height", itemHeight);
          }

          function getStackPosition(d, i) {
            if (stacked) {
              return margin.top + (itemHeight + itemMargin) * yAxisMapping[index];
            }
            return margin.top;
          }
          function getStackTextPosition(d, i) {
            if (stacked) {
              return margin.top + (itemHeight + itemMargin) * yAxisMapping[index] + itemHeight * 0.75;
            }
            return margin.top + itemHeight * 0.75;
          }
        });
      });

      var belowLastItem = (margin.top + (itemHeight + itemMargin) * maxStack);
      var aboveFirstItem = margin.top;
      var timeAxisYPosition = showAxisTop ? aboveFirstItem : belowLastItem;
      if (showTimeAxis) { appendTimeAxis(g, xAxis, timeAxisYPosition); }
      if (timeAxisTick) { appendTimeAxisTick(g, xAxis, maxStack); }

      if (width > gParentSize.width) {
        var move = function() {
          var x = Math.min(0, Math.max(gParentSize.width - width, d3.event.translate[0]));
          zoom.translate([x, 0]);
          g.attr("transform", "translate(" + x + ",0)");
          scroll(x*scaleFactor, xScale);
        };

        var zoom = d3.behavior.zoom().x(xScale).on("zoom", move);

        gParent
          .attr("class", "scrollable")
          .call(zoom);
      }

      if (rotateTicks) {
        g.selectAll(".tick text")
          .attr("transform", function(d) {
            return "rotate(" + rotateTicks + ")translate("
              + (this.getBBox().width / 2 + 10) + "," // TODO: change this 10
              + this.getBBox().height / 2 + ")";
          });
      }

      var gSize = g[0][0].getBoundingClientRect();
      setHeight();

      if (showBorderLine) {
        g.each(function (d, i) {
          d.forEach(function (datum) {
            var times = datum.times;
            times.forEach(function (time) {
              appendLine(xScale(time.starting_time), showBorderFormat);
              appendLine(xScale(time.ending_time), showBorderFormat);
            });
          });
        });
      }

      if (showTodayLine) {
        var todayLine = xScale(new Date());
        appendLine(todayLine, showTodayFormat);
      }

      function getXPos(d, i) {
    	 
        return margin.left + (d.starting_time - beginning) * scaleFactor;
      }
      
      function getPoints(d, i) {
    	  var x = getXPos(d, i);
    	  
    	 
    	  var width = (d.ending_time - d.starting_time) * scaleFactor;
    	  // If the event start date is outside the graph then set the polygon
    	  // with left corner flat
			if(timelineStart.getTime() > d.starting_time){
				 width = (d.ending_time - d.starting_time) * scaleFactor-(timelineStart.getTime() - d.starting_time) * scaleFactor;
				  return width +",8 " + (width-8) + ",0 " + (width-8) +
		          ",0 " + (width-8) + ",0 8,0 8,16 8,16 " + (width-8) + 
		          ",16 " + (width-8) + ",16 " + (width-8) + ",16"
			} 
			else if(timelineEnd.getTime() < d.ending_time){
				 //width = (d.ending_time - d.starting_time) * scaleFactor-(timelineStart.getTime() - d.starting_time) * scaleFactor;
				 return (width-8) +",8 " + (width-8) + ",0 " + (width-8) +
		          ",0 " + (width-8) + ",0 8,0 8,0 0,8 8,16 8,16 " + (width-8) + 
		          ",16 " + (width-8) + ",16 " + (width-8) + ",16"
			} 
			// If the event start date is inside the graph then set the polygon
	    	// with left corner sharp
			else{
				
				  return width +",8 " + (width-8) + ",0 " + (width-8) +
		          ",0 " + (width-8) + ",0 8,0 8,0 0,8 8,16 8,16 " + (width-8) + 
		          ",16 " + (width-8) + ",16 " + (width-8) + ",16"
			}
			
         
        }
      
      function getPosition(d, i) {
    	  
    	  	// / If the event start date is outside the graph then set the
			// polygon
    	  	// position at the left side of graph
    	  	if(timelineStart.getTime() > d.starting_time){
    		  var x = margin.left-8;
			} 
			else{
				
				var x = getXPos(d, i);
			}
			
        
    	  
    	  if(count !=0 && i == 0 ){
    		  position ++;  
    	  }
    	
    	  if (stacked) {
    		 
   
    		  var y =  margin.top + (itemHeight + itemMargin) * yAxisMapping[position];
    		
            }
    	  count ++;
    	  
    
    	  
          return "translate("+x + " " + y + ")";
        }
      
      
      function getXTextPos(d, i) {
        return margin.left + (d.starting_time - beginning) * scaleFactor + 5;
      }

      function setHeight() {
        if (!height && !gParentItem.attr("height")) {
          if (itemHeight) {
            // set height based off of item height
            height = gSize.height + gSize.top - gParentSize.top;
            // set bounding rectangle height
            d3.select(gParent[0][0]).attr("height", height);
          } else {
            throw "height of the timeline is not set";
          }
        } else {
          if (!height) {
            height = gParentItem.attr("height");
          } else {
            gParentItem.attr("height", height);
          }
        }
      }

      function setWidth() {
        if (!width && !gParentSize.width) {
          try {
            width = gParentItem.attr("width");
            if (!width) {
              throw "width of the timeline is not set. As of Firefox 27, timeline().with(x) needs to be explicitly set in order to render";
            }
          } catch (err) {
            console.log( err );
          }
        } else if (!(width && gParentSize.width)) {
          try {
            width = gParentItem.attr("width");
          } catch (err) {
            console.log( err );
          }
        }
        // if both are set, do nothing
      }

      function appendLine(lineScale, lineFormat) {
        gParent.append("svg:line")
          .attr("x1", lineScale)
          .attr("y1", lineFormat.marginTop)
          .attr("x2", lineScale)
          .attr("y2", height - lineFormat.marginBottom)
          .style("stroke", lineFormat.color)// "rgb(6,120,155)")
          .style("stroke-width", lineFormat.width);
      }

    }

    // SETTINGS

    timeline.margin = function (p) {
      if (!arguments.length) return margin;
      margin = p;
      return timeline;
    };

    timeline.orient = function (orientation) {
      if (!arguments.length) return orient;
      orient = orientation;
      return timeline;
    };

    timeline.itemHeight = function (h) {
      if (!arguments.length) return itemHeight;
      itemHeight = h;
      return timeline;
    };

    timeline.itemMargin = function (h) {
      if (!arguments.length) return itemMargin;
      itemMargin = h;
      return timeline;
    };

    timeline.navMargin = function (h) {
      if (!arguments.length) return navMargin;
      navMargin = h;
      return timeline;
    };

    timeline.height = function (h) {
      if (!arguments.length) return height;
      height = h;
      return timeline;
    };

    timeline.width = function (w) {
      if (!arguments.length) return width;
      width = w;
      return timeline;
    };

    timeline.display = function (displayType) {
      if (!arguments.length || (DISPLAY_TYPES.indexOf(displayType) == -1)) return display;
      display = displayType;
      return timeline;
    };

    timeline.labelFormat = function(f) {
      if (!arguments.length) return labelFunction;
      labelFunction = f;
      return timeline;
    };

    timeline.tickFormat = function (format) {
      if (!arguments.length) return tickFormat;
      tickFormat = format;
      return timeline;
    };

    
    timeline.hover = function (hoverFunc) {
      if (!arguments.length) return hover;
      hover = hoverFunc;
      return timeline;
    };

    timeline.mouseover = function (mouseoverFunc) {
      if (!arguments.length) return mouseover;
      mouseover = mouseoverFunc;
      return timeline;
    };

    timeline.mouseout = function (mouseoutFunc) {
      if (!arguments.length) return mouseout;
      mouseout = mouseoutFunc;
      return timeline;
    };

    timeline.click = function (clickFunc) {
      if (!arguments.length) return click;
      click = clickFunc;
      return timeline;
    };

    timeline.scroll = function (scrollFunc) {
      if (!arguments.length) return scroll;
      scroll = scrollFunc;
      return timeline;
    };

    timeline.colors = function (colorFormat) {
      if (!arguments.length) return colorCycle;
      colorCycle = colorFormat;
      return timeline;
    };

    timeline.beginning = function (b) {
      if (!arguments.length) return beginning;
      beginning = b;
      return timeline;
    };

    timeline.ending = function (e) {
      if (!arguments.length) return ending;
      ending = e;
      return timeline;
    };

    timeline.labelMargin = function (m) {
      if (!arguments.length) return labelMargin;
      labelMargin = m;
      return timeline;
    };

    timeline.rotateTicks = function (degrees) {
      if (!arguments.length) return rotateTicks;
      rotateTicks = degrees;
      return timeline;
    };

    timeline.stack = function () {
      stacked = !stacked;
      return timeline;
    };

    timeline.relativeTime = function() {
      timeIsRelative = !timeIsRelative;
      return timeline;
    };

    timeline.showBorderLine = function () {
      showBorderLine = !showBorderLine;
      return timeline;
    };

    timeline.showBorderFormat = function(borderFormat) {
      if (!arguments.length) return showBorderFormat;
      showBorderFormat = borderFormat;
      return timeline;
    };

    timeline.showToday = function () {
      showTodayLine = !showTodayLine;
      return timeline;
    };

    timeline.showTodayFormat = function(todayFormat) {
      if (!arguments.length) return showTodayFormat;
      showTodayFormat = todayFormat;
      return timeline;
    };

    timeline.colorProperty = function(colorProp) {
      if (!arguments.length) return colorPropertyName;
      colorPropertyName = colorProp;
      return timeline;
    };

    timeline.rowSeparators = function (color) {
      if (!arguments.length) return rowSeparatorsColor;
      rowSeparatorsColor = color;
      return timeline;

    };

    timeline.background = function (color) {
      if (!arguments.length) return backgroundColor;
      backgroundColor = color;
      return timeline;
    };

    timeline.showTimeAxis = function () {
      showTimeAxis = !showTimeAxis;
      return timeline;
    };

    timeline.showAxisTop = function () {
      showAxisTop = !showAxisTop;
      return timeline;
    };

    timeline.showAxisCalendarYear = function () {
      showAxisCalendarYear = !showAxisCalendarYear;
      return timeline;
    };

    timeline.showTimeAxisTick = function () {
      timeAxisTick = !timeAxisTick;
      return timeline;
    };

    timeline.fullLengthBackgrounds = function () {
      fullLengthBackgrounds = !fullLengthBackgrounds;
      return timeline;
    };

    timeline.showTimeAxisTickFormat = function(format) {
      if (!arguments.length) return timeAxisTickFormat;
      timeAxisTickFormat = format;
      return timeline;
    };

    timeline.showAxisHeaderBackground = function(bgColor) {
      showAxisHeaderBackground = !showAxisHeaderBackground;
      if(bgColor) { (axisBgColor = bgColor) };
      return timeline;
    };

    timeline.navigate = function (navigateBackwards, navigateForwards) {
      if (!arguments.length) return [navigateLeft, navigateRight];
      navigateLeft = navigateBackwards;
      navigateRight = navigateForwards;
      showAxisNav = !showAxisNav;
      return timeline;
    };

    return timeline;
  };
})();

function colorSelect(type){
	// Depending on the type of event this function sets the colors
	// of the polygons
	switch(type) {
	    case "bloqueo por DPI":
	    	var color = BLOCKED_DPI;																				
	        break;
	    case "bloqueo por DNS":
	    	var color = BLOCKED_DNS;
	        break;
	    
	    case "bloqueo por IP":
	    	var color = BLOCKED_IP;
	        break;
	    
	    case "Interceptacion de trafico":
	    	var color = TRAFFIC_INTERCEPTION;
	        break;
	        
	    case "falla de dns":
	    	var color = FAILURE_DNS;
	        break;
	        
	    case "Velocidad de internet":
	    	var color = INTERNET_SPEED;
	        break;
	    
	    case "alteracion de trafico por intermediarios":
	    	 var color = TRAFFIC_ALTERATION;
	        break; 
	        
	    default:
	    	var color = OTHERS; 
	        break;
	}
	
	return color
}


function adjustTextLabels(selection) {
	// This function sets the Y labels corresponding to the simplified
	// or complete Gantt graph
//	if(diffDays < 31){
//		var offset = 10;
////		
////		var daysToPixels = (($('.axis .tick:nth-child(2) text')).position().left -
////				($('.axis .tick:nth-child(1) text')).position().left)/2+offset;
//				
//			    selection.selectAll('.axis .tick text')
//			        .attr('transform', 'translate(0,30)');
//	}
//	else {
//		var offset = 10;
//		
//		if(($('.axis .tick:nth-child(2) text')).length ){
//			var daysToPixels = (($('.axis .tick:nth-child(2) text')).position().left -
//					($('.axis .tick:nth-child(1) text')).position().left)/2+offset;
//					
//				    selection.selectAll('.axis .tick text')
//				        .attr('transform', 'translate(' + daysToPixels + ',0)');
//		}else{
//			selection.selectAll('.axis .tick text')
//	        .attr('transform', 'translate(0,30)');
//		}
//		
//	}
    selection.selectAll('.axis .tick text')
    .attr('transform', 'translate(0,30)');
	
   

}

function drawMiniGantts(data,i,label,timelineEnd){
	// This function loads the miniGantts cards if the Gantt has been collapsed 

	$(".subGraphDiv").append('<div class="col-xs-3 hoverOpen" id="subGraph'+ (i) + '" data-toggle="modal" data-target="#modal" data-tooltip >'
			+'<div class="row"><div class="container-fluid col-xs-12" id="twitterDiv"><div class="twitterTweet"></div>'
			+ '<div class="twitterSearchText">'
			+'<div class="twitterSearchTextContent">Resultados de <span>'+ label +'</span><div class="title"></div></div></div></div>'
			+ '<div  class="watermark subGraphDivHover" onClick="ganttModal(All,'+i+')"><p>Haga clic para abrir</p>'
			+ '</div></div>	</div>')

			// Loads the watermark "click to open" to each corresponding card.
	$('.subGraphDivHover').hide();
	
	$("#subGraph"+ (i)).mouseover(function(){
		$("#subGraph"+ (i)).find('.subGraphDivHover').show();	
	}).mouseleave(function(){
		$("#subGraph"+ (i)).find('.subGraphDivHover').hide();
	});
	
	
	
	var testData = data;
	// Save the chart in variable
	var chart = d3.timeline().showTimeAxisTick().stack().ending(timelineEnd);
	
	
	
	var margin = {top: 35, right: 200, bottom: 20, left: 80},
			    width = 270 - (margin.left + margin.right);
				height = 180 - (margin.top + margin.bottom);
				    
				    
	var svg = d3.select("#subGraph"+ (i) + " .twitterTweet" )// container class to make it responsive
					.append("svg").attr("preserveAspectRatio", "xMinYMin meet")	
					
					.attr("width", width + (margin.left + margin.right)-24)
					.attr("height", height )
					   .attr("viewBox", "0 0 " + height + " "
							 + "155"  )
					   
					  .datum(testData).call(chart).call(adjustTextLabels);     // adjusts
																				// text
																				// labels
																				// on
																	// the

	$("#subGraph"+ (i) + " .twitterTweet ").append('<div>Bloqueo: <span class="rhombus" style="background-color: ' + BLOCKED_DPI  + '"> </span><span> DPI</span>'
			+ ', <span class="rhombus" style="background-color: ' + BLOCKED_DNS  + '"> </span><span> DNS</span>, <span class="rhombus" style="background-color: ' + BLOCKED_IP  + '"> </span><span> IP</span></div>');

	$("#subGraph"+ (i) + " .twitterTweet ").append('<div><span class="rhombus" style="background-color: ' + TRAFFIC_INTERCEPTION  + '"> </span> Interceptacion de trafico</div>');
	$("#subGraph"+ (i) + " .twitterTweet ").append('<div><span class="rhombus" style="background-color: ' + FAILURE_DNS  + '"> </span> Falla dns</div>');
	$("#subGraph"+ (i) + " .twitterTweet ").append('<div><span class="rhombus" style="background-color: ' + INTERNET_SPEED  + '"> </span> Velocidad de internet</div>');
	$("#subGraph"+ (i) + " .twitterTweet ").append('<div><span class="rhombus" style="background-color: ' + TRAFFIC_ALTERATION  + '"> </span> Alteracion de trafico por intermediarios</div>');
		  
		  
	$("#subGraph"+ (i) + " .twitterTweet ").css('font-size','13px');	    
	$("#subGraph"+ (i) + " .twitterTweet ").css('padding-left','8px');
	$("#subGraph"+ (i) + " .twitterSearchTextContent ").css('padding-left','8px');
	
	// axis
			
	svg.selectAll(".axis .tick text").html("")

	svg.selectAll(".timeline-label")  // select all the text elements for the
										// yaxis
					          .html(function(d) {
					        	  
					        	  
					        	  // Make first element bold
					        	  $("#subGraph"+ i + "svg > g:first-child").attr('transform','translate(0,0)');
					        	  return ("");
					         });

		$('.axis .tick ').each(function() {
			// make rhombus for the X axis and set the label at the middle
				
			$(this).html($(this).html()+ '<rect x="5" y="5" width="15" height="15" style="fill: #ccc" transform="rotate(45)" />');
		 });
		

		svg.select("#subGraph" + (i) + "svg > g").attr('transform','translate(330,0)')		
		
		
	
}

var timesGroup = [];
var dataResult = [];
var dataLabel = [];
var dataAll = [];
var dataTooltip = [];
var miniGantts = [];
var miniGanttData = [];
var miniGanttsLabel = [];

// This AJAX call corresponds to the request of the JSON data from Pandora
// project API.
$.ajax({
	url : url_data,
	method : "GET",
	dataType : 'json',
	contentType : 'application/json'
}).done(
	function(data) {
	
		var temporal = "";
		// For each element in the JSON we need to collect their
		// values
		for (var i = 0; i < data.length; i++)
			temporal = temporal.concat(data[i]);

		var dataJson = JSON.parse(temporal);
			
					
		$.each(dataJson.events, function(key, value) { // First Level
			// Save the JSON to then use in the tooltip
			dataTooltip[dataTooltip.length]= value;
						
			var isp = value.isp;				
			var target = value.target;
			var domain = "";
			
			
			// The domain or Y labels. If no site exists, then use the
			// URL. If no site name or URL exists use IP
			// in this exontext domain means the target
            domain = eventLabel(target);
            
							
			var type = value.type;
			
			var start_date = (new Date(value.start_date)).getTime();
							
			if( value.end_date != null ) {
				var end_date = (new Date(value.end_date)).getTime();
			}
			else{
				var end_date = (new Date()).getTime();
			}
						
			// This is an element of the Gantt (a polygon). The value will
			// be used later on
			element = { label: ( isp + "-" + type + "-" + domain),times: 
						[ {"color": colorSelect(type), "starting_time": start_date, "ending_time": end_date}]
			};
							
			dataAll[dataAll.length]=element;
				
			// The elements are stored together for a same ISP-TYPE-DOMAIN
			
					
			var exists = 0;
				
			for(var i = 0; i < dataLabel.length ; i++){
				if(dataAll[i].label == (isp + "-" + type + "-" + domain)) {
					exists = 1;
				}
			}
							
			if(exists != 1){
				dataLabel[dataLabel.length]= (isp + "-" + type + "-" + domain)
			}
		});
						
		// If the maximum value of Y elements is smaller than the Y labels
		// elements then load the simplified Gantt (ISP-DOMAIN)
		if(dataLabel.length >  maxYValues){
			collapse = 1;			
			dataLabel = [];
			dataAll = [];
			
			$.each(dataJson.events, function(key, value) { // First Level
						
				var isp = value.isp;
				var target = value.target;
				var domain = eventLabel(target);
								
				var type = value.type;
				
				var start_date = (new Date(value.start_date)).getTime();
									
				if( value.end_date != null ) {
					var end_date = (new Date(value.end_date)).getTime();
				}
				else{
					var end_date = (new Date()).getTime();
				}
				
				
				
				element = { label: ( isp + "-" + " " + "-" + domain),times: 
						[ {"color": colorSelect(type), "starting_time": start_date, "ending_time": end_date}]
				};
									
				dataAll[dataAll.length]=element;
		
				
				// The elements are stored together for a same ISP-TYPE-DOMAIN
								
				var exists = 0;
				
				for(var i = 0; i < dataLabel.length ; i++){
					if(dataAll[i].label == (isp + "-" + " " + "-" + domain)) {
						exists = 1;
					}
				}
									
				if(exists != 1){
					dataLabel[dataLabel.length]= (isp + "-" + " " + "-" + domain)								
				}
				
				// MiniGantts data 
				// This sections saves the miniGantts cards for each corresponding
				// case. The logic is similar to the one from the whole gantt
				// but saves the values separately.
				var name =  domain ;
				var miniLabel =isp + "-" + type + "-" + domain;
				var existsMiniGantt = 0;
				var existsMiniGanttLabel = 0;
				
				for(var i = 0; i < miniGantts.length ; i++){
					if(miniGantts[i] == name) {
						existsMiniGantt = 1;
												
					}
					if(miniGanttsLabel[i] == miniLabel) {
						existsMiniGanttLabel = 1;
												
					}
			
				}
									
				if(existsMiniGantt != 1){
					miniGantts[miniGantts.length] = name;	
					
				}
				if(existsMiniGanttLabel != 1){
					miniGanttsLabel[miniGanttsLabel.length] = miniLabel;	
					
				}
			
				
			});
		}
				
	
		

		for(var i = 0; i < miniGantts.length ; i++){
			var miniGanttResult = [];
			var miniGanttData = [];
			
			$.each(dataJson.events, function(key, value) {
				var isp = value.isp;
				var target = value.target;
				var domain = eventLabel(target);
				
				var element = {};
				
				if(domain==miniGantts[i]){
					
					var type = value.type;
					
			
				
					var start_date = (new Date(value.start_date)).getTime();
					
					if( value.end_date != null ) {
						var end_date = (new Date(value.end_date)).getTime();
					}
					else{
						var end_date = (new Date()).getTime();
					}
					
					
					
					element = { label: ( isp + "-" + type + "-" + domain),times: 
							[ {"color": colorSelect(type), "starting_time": start_date, "ending_time": end_date}]
					};
										
					miniGanttData[miniGanttData.length]=element;
					
					
					
					
				}
				
					
			});
	

			for(var k = 0; k < miniGanttsLabel.length ; k++){
				var times_element = "";
				var element_miniGantt = "";
				var label_element = "";
				var times = [];
				var z = 0;
			
		
			
				for(var j= 0; j < miniGanttData.length ; j++){
					var nameCompare = ((miniGanttData[j].label));
					
					if(nameCompare==miniGanttsLabel[k]) {
			
							times_element =  (miniGanttData[j].times)[0];
							label_element =  (miniGanttData[j].label);
							times[z]= times_element;
							z = z +1;
												
												
					}
											
					
					
					
				}
					
				
					if(label_element !=""){
						
						element_miniGantt = { label: label_element ,times };
						miniGanttResult.push(element_miniGantt);
						
					}
		
				
		
			}
			// Once all the data is loaded, call the function drawMiniGantts 
			// to draw the card gantt 
			if(timelap !="Month" && timelap !="Year" && timelap !="All"){
				drawMiniGantts(miniGanttResult, i, miniGantts[i],new Date());
			}
			
		}
		
		
		
		// The elements must be stored in the same label (ISP-TYPE-DOMAIN), so
		// all the times array of the elements with same label must be saved in
		// a new array time with its corresponding label
		for(var i = 0; i < dataLabel.length ; i++){
			var times_element = "";
			var label_element = "";
			var times = [];
			var z = 0;
				
			for(var j = 0; j < dataAll.length; j++){
									  				
				if(dataAll[j].label==dataLabel[i]) {
						
					times_element =  (dataAll[j].times)[0];
					label_element =  (dataAll[j].label);
					times[z]= times_element;
					z = z +1;
										
										
				}
									
									
			}
								
								
			element = { label: label_element ,times };
			dataResult.push(element);
								
								
		}
			
		var testData = dataResult;
		// Save the chart in variable
		var chart = d3.timeline().showTimeAxisTick().stack().beginning(timelineStart).ending(timelineEnd);


		var heightDynamic = (320/10)*dataLabel.length;
		var margin = {top: 35, right: 200, bottom: 20, left: 80},
				    width = 1024 - (margin.left + margin.right);
					height = heightDynamic - (margin.top + margin.bottom);
					    
					    
		var svg = d3.select("#timeline1")// container class to make it
											// responsive
						.append("svg").attr("preserveAspectRatio", "xMinYMin meet")
						.attr("width", width + (margin.left + margin.right)-24)
						.attr("height", heightDynamic )
						   .attr("viewBox", "0 0 " + ( width - 534 ) + " "
								 +   (height+100))
						   // class to make it responsive
						   .classed("svg-content-responsive", true)
						  .datum(testData).call(chart).call(adjustTextLabels);     // adjusts
																					// text
																					// labels
																					// on
																					// the
																					// axis
				

		$(".svg-container").css('height', '400px');
		svg.selectAll(".timeline-label")  // select all the text elements for
											// the yaxis
						          .html(function(d) {
						        	  
						        	  var labelStrong_first = (($(this).text())).split("-")[0];
						        	 
						        	  var labelStrong_second = (($(this).text())).split("-")[1];
						        	  
						        	  var labelStrong_third = (($(this).text())).split("-")[2];
						        	  
						        	  
						        	  
						        	  // Make first element bold
						        	  $("#timeline1 svg > g:first-child").attr('transform','translate(330,0)');
						        	  if(collapse==0){
						        		  return ("<text stroke='#000000' style='text-transform: uppercase;'>" + labelStrong_first + "</text>" 
							        			  + "<text transform='translate(120,0)'>" + labelStrong_second + ": "+ labelStrong_third +"</text>");
						        	  }
						        	  else{
						        		  return ("<text stroke='#000000' style='text-transform: uppercase;'>" + labelStrong_first + "</text>" 
							        			  + "<text transform='translate(120,0)'> "+ labelStrong_third +"</text>");
						        	  }
						        	 
						        	
						         });

			$('.axis .tick ').each(function() {
				// make rhombus for the X axis and set the label at the middle
					
				$(this).html($(this).html()+ '<rect x="5" y="5" width="15" height="15" style="fill: #ccc" transform="rotate(45)" />');
			 });
			
			$("#timeline1").append('<div class="informationPanelGantt" ><div class="informationPanelState"></div><div class="informationPanelTotalCases"></div></div>')
	
			$(".informationPanelGantt").css('visibility','hidden');
					

			svg.selectAll("polygon").on("mouseover", function(d,i) {  
    		  	
        		var isp =  dataTooltip[i].isp;
        		var start =  (dataTooltip[i].start_date).split("T")[0];
        		
        		
        		var end =  dataTooltip[i].end_date;
        		
        		if( end == null) {
        			end = "Continua"
        		}
        		else{
        			end = end.split("T")[0];
        		}
        		var target = dataTooltip[i].target; 
        		var targetName = "";
        		var url = target.url;
        		
        		var site = target.site; 
        		var ip = target.ip; 
    			
        		
    			if(site != null){
    				targetName = site;
    			}
    			else if(url != null){
    				targetName = url;
    				
    			}
    			else if(ip != null){
    				targetName = ip;
    				
    			}
    			
    			var type = dataTooltip[i].type;

    			
        		$(".informationPanelState").html(isp + " - " +  type + " - " + targetName);
        		
        		$(".informationPanelTotalCases").html("<strong>Target </strong>: " + site + " " + url + " " + domain + "<br> <strong>Start date</strong>: " + start + " <br> <strong>End date</strong>: " + end );
        		var div = $(".informationPanelGantt");
        		
        		div.css("opacity", .9);  
        		var coordinates = d3.mouse(this);
        		mouseX = $(this)[0].getAttribute("x");
				mouseY = parseInt( $(this)[0].getAttribute("y"))+ 60;

				if(mouseX < 0 || mouseX < 280){
					mouseX = 280;
				}
				
				if(mouseX > 700){
					mouseX = 500;
				}

				$('.informationPanelGantt').css({
					top : mouseY + "px",
					left : mouseX + "px"
				});

				$('.informationPanelGantt').css("visibility","visible");
	            })                  
	        .on("mouseout", function(d) {       
	        	var div = $(".informationPanelGantt");
        		
	        	div.css("opacity", 0); 
	        	$('.informationPanelGantt').css({
					top : 0 + "px",
					left : 0 + "px"
				});
	        	$('.informationPanelGantt').css("visibility","hidden");
	        });
			
			
}).fail(function(jqXHR, textStatus, errorThrown) {
					$('#timeline1').closest('.container-fluid').html("<div class='failedService'><img  src='"+ fail_service_img + "' alt='service fail' /><br><p>Failed to load service</p></div>");
					
					$('#twitterDiv').css('padding-right','0');
				});


}





