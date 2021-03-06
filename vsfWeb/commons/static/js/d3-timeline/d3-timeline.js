var maxYValues = 15; 

function gantt(){// vim: ts=2 sw=2
	
	
	var timelineStart = (new Date($('#hiddenDate').val())).getTime();
	var timelineEnd = (new Date($('#hiddenDateEnd').val())).getTime();
	var dateStart = new Date($('#hiddenDate').val());
	var start = (new Date($('#hiddenDateEnd').val()));
	var timeDiff = Math.abs(timelineEnd- timelineStart);
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
	
	if(diffDays < 3){
		
			var tickFormat = { format: d3.time.format("%d %b"),
			          tickTime: d3.time.days,
			          tickInterval: 1,
			          tickSize: 6,
			          tickValues: null
			        };
			
			
			
		
	}
	else{
		if(diffDays < 7) {
			var tickFormat = { format: d3.time.format("%d %b"),
			          tickTime: d3.time.days,
			          tickInterval: 1,
			          tickSize: 6,
			          tickValues: null
			        };
			
			
			timelineStart = dateStart.setDate(start.getDate() - 7);
		}
		else{
			if(diffDays < 31) {
				var tickFormat = { format: d3.time.format("%d %b"),
				          tickTime: d3.time.days,
				          tickInterval: 2,
				          tickSize: 6,
				          tickValues: null
				        };
				timelineStart = new Date(start.getFullYear(), start.getMonth(), 1);
			}
			else{
				if(diffDays < 365){
					var tickFormat = { format: d3.time.format("%B %Y"),
					          tickTime: d3.time.months,
					          tickInterval: 1,
					          tickSize: 6,
					          tickValues: null
					        };
					
					timelineStart = new Date(start.getFullYear(), 0, 1);
				}
				else{
					var tickFormat = { format: d3.time.format("%B %Y"),
					          tickTime: d3.time.years,
					          tickInterval: 1,
					          tickSize: 6,
					          tickValues: null
					        };
				}
			}
		}
	}
	
	
(function () {
  d3.timeline = function() {
    var DISPLAY_TYPES = ["circle", "rect"];
    
    var hover = function (d,i) { console.log(d); console.log("hol" + i)},
        mouseover = function () {},
        mouseout = function () {},
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
//        tickFormat = { format: d3.time.format("%a %d"),
//		          tickTime: d3.time.days,
//		          tickInterval: 1,
//		          tickSize: 6,
//		          tickValues: null
//        },
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
                originTime = time.starting_time;               //Store the timestamp that will serve as origin
                time.starting_time = 0;                        //Set the origin
                time.ending_time = time.ending_time - originTime;     //Store the relative time (millis)
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

          // issue warning about using id per data set. Ids should be individual to data elements
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
              mouseover(d, i, datum);
            })
            .on("mouseout", function (d, i) {
              mouseout(d, i, datum);
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
          return width +",8 " + (width-8) + ",0 " + (width-8) +
          ",0 " + (width-8) + ",0 8,0 8,0 0,8 8,16 8,16 " + (width-8) + 
          ",16 " + (width-8) + ",16 " + (width-8) + ",16" 
          
//          width + ",16 7,16 0 ,8 7, 0 " + width + ",0" ;
//          550,8 542.001,0 542,0.001 542,0 8,0 8,0 0,8 8,16 8,16 542,16 542,15.999 542.001,16 
//          550,16 7,16 0,8 7,0 550,0 
        }
      
      function getPosition(d, i) {
    	  var x = getXPos(d, i);
   
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
          .style("stroke", lineFormat.color)//"rgb(6,120,155)")
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

	switch(type) {
    case "bloqueo por DPI":
    	var color = "red";																				
        break;
    case "bloqueo por DNS":
    	var color = "green";
        break;
    
    case "bloqueo por IP":
    	var color = "blue";
        break;
    
    case "Interceptacion de trafico":
    	var color = "yellow";
        break;
        
    case "falla de dns":
    	var color = "purple";
        break;
        
    case "Velocidad de internet":
    	var color = "gray";
        break;
    
    case "alteracion de trafico por intermediarios":
    	 var color = "black";
        break; 
        
    default:
    	var color = "white"; 
        break;
	}
	
	return color
}


var timesGroup = [];
//d3-timeline
var dataResult = [];
var dataLabel = [];
var dataAll = [];
var dataTooltip = [];
var testData = [
                {label: "person a",  
                	times: [
                	        {"color":"red", "starting_time": 1355752800000, "ending_time": 1355759900000},
                	       ]
                },                
                {label: "person b", class:"blockedPartial", times: [
                  {"color":"black", "starting_time": 1355759910000, "ending_time": 1355761900000}]},
                {label: "person c", times: [
                  {"color":"green", "starting_time": 1355761910000, "ending_time": 1355763910000},
                  {"color":"black", "starting_time": 1355759910000, "ending_time": 1355761900000}]}
                ];


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
				
		
					
						$.each(dataJson.events, function(key, value) { // First Level
							
							var isp = value.isp;
							
							var target = value.target;
							
							var domain = "";
							
							if(target.site != null){
								domain = target.site 
							}
							else if(target.domain != null){
								domain = target.domain 
							}
							else if(target.ip != null){
								domain = target.ip 
							}
							
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
							
							dataAll[dataAll.length]=element;
							
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
						
						if(dataLabel.length >  maxYValues){
							
							dataLabel = [];
							dataAll = [];
			
							$.each(dataJson.events, function(key, value) { // First Level
								
								var isp = value.isp;
								
								var target = value.target;
								
								var domain = "";
								
								if(target.site != null){
									domain = target.site 
								}
								else if(target.domain != null){
									domain = target.domain 
								}
								else if(target.ip != null){
									domain = target.ip 
								}
								
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
								
								var exists = 0;
								for(var i = 0; i < dataLabel.length ; i++){
									if(dataAll[i].label == (isp + "-" + " " + "-" + domain)) {
										exists = 1;
									}
								}
								
								if(exists != 1){
									dataLabel[dataLabel.length]= (isp + "-" + " " + "-" + domain)
									
								}
							});
							
						}
												
						
							for(var i = 0; i < dataLabel.length ; i++){
								var times_element = ""
								var times = []
								var z = 0;
								for(var j = 0; j < dataAll.length; j++){
									
									if(dataAll[j].label==dataLabel[i]) {
							
										times_element =  (dataAll[j].times)[0]
										
										times[z]= times_element
										z = z +1
									}
									
									
								}
								
								
								
								element = { label: dataAll[i].label ,times };
				
								dataResult.push(element)
								
							}
			
						
						
				
						var testData = dataResult
					
						var chart = d3.timeline().showTimeAxisTick().stack().beginning(timelineStart).ending(timelineEnd);
;

						
						var margin = {top: 35, right: 200, bottom: 20, left: 80},
					    width = 1024 - (margin.left + margin.right);
						height = 220 - (margin.top + margin.bottom);
					    
					    
						var svg = d3.select("#timeline1")//container class to make it responsive
						.append("svg").attr("preserveAspectRatio", "xMinYMin meet")
						.attr("width", width + (margin.left + margin.right))
						.attr("height", height )
						   .attr("viewBox", "0 0 " + height + " "
								 + ( width - 534 )  )
						   //class to make it responsive
						   .classed("svg-content-responsive", true)
						  .datum(testData).call(chart);



						svg.selectAll(".timeline-label")  // select all the text elements for the yaxis
						          .html(function(d) {
						        	  
						        	  var labelStrong_first = (($(this).text())).split("-")[0];
						        	 
						        	  var labelStrong_second = (($(this).text())).split("-")[1];
						        	  
						        	  var labelStrong_third = (($(this).text())).split("-")[2];
						        	  
						        	  
						        	  
						        	  
						        	  $("#timeline1 svg > g:first-child").attr('transform','translate(270,0)');
						        	  return ("<text stroke='#000000'>" + labelStrong_first + "</text>" 
						        			  + "<text transform='translate(90,0)'>" + labelStrong_second + ": "+ labelStrong_third +"</text>");
						         });


	

				}).fail(function(jqXHR, textStatus, errorThrown) {
					$('#timeline1').closest('.container-fluid').html("<div class='failedService'><img  src='"+ fail_service_img + "' alt='service fail' /><br><p>Failed to load service</p></div>");
					
					$('#twitterDiv').css('padding-right','0');
				});
}


