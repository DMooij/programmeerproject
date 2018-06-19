// Barchart

function barchart(location){
  var data_bar = [];
  for (var l = 0; l < consumption.length; l++){
    if (location == consumption[l].CODE){
      data_bar.push(consumption[l]);
    }
  }
  removeBarchart();
  makeBarchart(data_bar)
}

function makeBarchart(data_bar){
  var margin = {top: 30, right: 20, bottom: 50, left: 50};
  var fullwidth = 500;
  var fullheight = 300;
  var bar_width = fullwidth - margin.left - margin.right;
  var bar_height = fullheight - margin.top - margin.bottom;

  // Create SVG element
  var svg = d3.select("#barchart")
    .append("svg")
     // .attr("viewBox", [0, 0, fullwidth, fullheight])
     .attr("width", fullwidth)
     .attr("height", fullheight)
    .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // set x scale
  var xscale = d3.scale.ordinal()
     .domain(d3.range(data_bar.length))
     .rangeRoundBands([0, bar_width], .05);

  // set y scale
  var yscale = d3.scale.linear()
     .domain([0, Math.max.apply(Math, data_bar.map(function(d){return d.AVO_PP_YEAR}))])
     .range([bar_height, margin.top]);

  // create axes
  var xaxis = d3.svg.axis()
      .scale(xscale)
      .orient("bottom")
      .tickFormat(function(d) { return data_bar[d]["YEAR"]; });

  var yaxis = d3.svg.axis()
                    .scale(yscale)
                    .orient("left")
                    .ticks(6);

  svg.append("g")
       .attr("class", "axis")
       .attr("transform", "translate(0," + bar_height + ")")
       .call(xaxis)
       .append("text")
       .attr("text-anchor", "middle");

   // x axis label
   svg.append("text")
   .attr("text-anchor", "end")
   .attr("x", bar_width)
   .attr("y", bar_height + 40)
   .attr("dy", ".71em")
   .text("Year");

  // y axis label
  svg.append("g")
      .attr("class", "axis")
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
       return "<strong>Avocados consumed per inhabitant:  <span style='color:#405d27'>" + d.AVO_PP_YEAR + "</span> </strong>"
    });

  svg.call(tooltip);

  // create bars
  svg.selectAll("rect")
    .data(data_bar)
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
      return bar_height - yscale(d.AVO_PP_YEAR);
    })
    .on("mouseover", tooltip.show)
    .on("mouseout", tooltip.hide);

   // title of bar chart
   svg.append("text")
   .attr("x", -45)
   .attr("y", 0 - (margin.top/2))
   .attr("text-anchor", "start")
   .style("font-size", "18px")
   .text("Avocados consumed per inhabitant in " + data_bar[0].DECLARANT);
};

function removeBarchart(){
d3.select("#barchart").selectAll("svg").remove()
};
