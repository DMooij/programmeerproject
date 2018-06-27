/*
* Dewi Mooij
* 10752978
* barchart.js
* Select data in the right format to make and update barchart
*/

// select correct data for the barchart
function barData(location){
  var dataBar = [];
  for (var l = 0; l < consumption.length; l++){
    if (location == consumption[l].CODE){
      dataBar.push(consumption[l]);
    };
  };
  return dataBar;
}

// make default barchart of location NLD
function makeBarchart(location){

    var dataBar = barData(location);

    // set height and width
    var margin = {top: 30, right: 20, bottom: 50, left: 50};
    var fullwidth = 500;
    var fullheight = 300;
    var barWidth = fullwidth - margin.left - margin.right;
    var barHeight = fullheight - margin.top - margin.bottom;

    // Create SVG element
    var svg = d3.select("#barchart")
      .append("svg")
       .attr("width", fullwidth)
       .attr("height", fullheight)
       .append("g")
       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // set x scale
    var xscale = d3.scale.ordinal()
       .domain(d3.range(dataBar.length))
       .rangeRoundBands([0, barWidth], .05);

    // set y scale
    var yscale = d3.scale.linear()
       .domain([0, Math.max.apply(Math, dataBar.map(function(d)
         {return d.AVO_PP_YEAR}))])
       .range([barHeight, margin.top]);

    // create axes
    var xaxis = d3.svg.axis()
        .scale(xscale)
        .orient("bottom")
        .tickFormat(function(d) { return dataBar[d]["YEAR"]; });

    var yaxis = d3.svg.axis()
                      .scale(yscale)
                      .orient("left")
                      .ticks(6);

    // x axis
    svg.append("g")
         .attr("class", "x_axis")
         .attr("transform", "translate(0," + barHeight + ")")
         .call(xaxis)
         .append("text")
         .attr("text-anchor", "middle");

     // x axis label
     svg.append("text")
     .attr("text-anchor", "end")
     .attr("x", barWidth)
     .attr("y", barHeight + 40)
     .attr("dy", ".71em")
     .text("Year");

    // y axis label
    svg.append("g")
        .attr("class", "y_axis")
        .call(yaxis)
      .append("text")
        .text("Avocados per inhabitant")
        .style("text-anchor", "end")
        .attr("y", -45)
        .attr("dy", ".71em")
        .attr("transform", "rotate(-90)");

    // create the tooltip
    var tooltip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html(function(d){
         return "<strong>Avocados consumed per inhabitant:  <span style='color:#405d27'>"
         + d.AVO_PP_YEAR + "</span> </strong>"
      });

    svg.call(tooltip);

    // create bars
    svg.selectAll("rect")
      .data(dataBar)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d, i){
        return xscale(i);
      })
      .attr("y", function (d){
        return yscale(d.AVO_PP_YEAR);
      })
      .attr("width", xscale.rangeBand())
      .attr("height", function (d){
        return barHeight - yscale(d.AVO_PP_YEAR);
      })
      .on("mouseover", tooltip.show)
      .on("mouseout", tooltip.hide);

     // title of bar chart
    svg.append("text")
     .attr("class", "title")
     .attr("x", -45)
     .attr("y", 0 - (margin.top/2))
     .attr("text-anchor", "start")
     .style("font-size", "18px")
     .text("Avocados consumed per inhabitant in " + dataBar[0].DECLARANT);

     // add info text
     d3.select("#info_bar")
       .append("text")
       .text("The barchart shows avocado consumption in the time period \
       2010-2015. Use the slider to update the year of the donut chart \
       and see if people feel healthier when more avocados are eaten. \
       Use the button to change the gender and discover whether there is \
       a difference in health perception between males and females.")
      .style("font-style", "italic");
};

// update barchart on change of location
function updateBarchart(dataBar){
  if (dataBar.length != 0){

    // set height and width
    var margin = {top: 30, right: 20, bottom: 50, left: 50};
    var fullwidth = 500;
    var fullheight = 300;
    var barWidth = fullwidth - margin.left - margin.right;
    var barHeight = fullheight - margin.top - margin.bottom;

    // find max value for y axis
    var maxY = Math.max.apply(Math, dataBar.map(function(d){return d.AVO_PP_YEAR}));

    // update y scale
    var yscale = d3.scale.linear()
       .domain([0, maxY])
       .range([barHeight, margin.top]);

    var svg = d3.select("#barchart").select("svg");

    // update title
    svg.select(".title")
     .text("Avocados consumed per inhabitant in " + dataBar[0].DECLARANT);

    // update bars
    svg.selectAll("rect")
      .data(dataBar)
      .transition()
      .duration(1000)
      .attr("y", function (d){
        return yscale(d.AVO_PP_YEAR);
      })
      .attr("height", function (d){
        return barHeight - yscale(d.AVO_PP_YEAR);
      });

    // update axis
    var yaxis = d3.svg.axis()
                .scale(yscale)
                .orient("left")
                .ticks(6);

    svg.select(".y_axis")
      .transition()
      .duration(1000)
      .call(yaxis);
  };
};
