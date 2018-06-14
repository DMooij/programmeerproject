// Calendar view
// https://www.crowdanalytix.com/communityBlog/10-steps-to-create-calendar-view-heatmap-in-d3-js

function calendar(location, consumption_2015){
  var data_calendar = [];
  for (var l = 0; l < consumption_2015.length; l++){
    if (location == consumption_2015[l].CODE){
      data_calendar.push(consumption_2015[l]);
    }
  }

  console.log(data_calendar);
  makeCalendar(data_calendar);
}

function makeCalendar(data_calendar){
//   console.log("hallo")
//   var width = 960;
//   var height = 136;
//   var cell_size = 17;
//   var percent = d3.format(".1%")
//   var format = d3.time.format("%Y%m%d")
//
//   var color = d3.scale.quantize()
//     .domain([-0.05, 0.05])
//     .range(["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"])
//
//   var svg = d3.select("#calendar").append("svg")
//     .attr("class", "calendar")
//     .attr("width", width)
//     .attr("height", height)
//     .append("g")
//       .attr("transform", "translate(" + ((width - cell_size * 53) / 2) + "," + (height - cell_size * 7 - 1) + ")");
//
//   svg.append("text")
//     .attr("transform", "translate(-6," + cell_size * 3.5 + ")rotate(-90)")
//     .style("text-anchor", "middle")
//     .text(function(d) { return d; });
//
//   var rect = svg.selectAll(".day")
//     .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
//   .enter().append("rect")
//     .attr("class", "day")
//     .attr("width", cell_size)
//     .attr("height", cell_size)
//     .attr("x", function(d) { return d3.time.weekOfYear(d) * cell_size; })
//     .attr("y", function(d) { return d.getDay() * cell_size; })
//     .datum(format);
//
//   // month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
//
//   console.log("doei")
//
//   svg.selectAll(".month")
//     .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
//   .enter().append("path")
//     .attr("class", "month")
//     .attr("id", function(d, i) {return month[i]})
//     .attr("d", monthPath);
//
//     console.log("nee")
//
//   // legend.append("text")
//   //    .attr("class", function(d,i){ return month[i] })
//   //    .style("text-anchor", "end")
//   //    .attr("dy", "-.25em")
//   //    .text(function(d,i){ return month[i] });
//   //
//   // var data = d3.nest()
//   //   .key(function(d) {return d.PERIOD })
//   //   .map(consumption_2015)
//   //
//   // rect.filter(function(d) { return d in data; })
//   //   .attr("fill", function(d) { return color(data[d])})
// }
//
// function monthPath(t0) {
//   var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
//       d0 = +day(t0), w0 = +week(t0),
//       d1 = +day(t1), w1 = +week(t1);
//   return "M" + (w0 + 1) * cell_size + "," + d0 * cell_size
//       + "H" + w0 * cell_size + "V" + 7 * cell_size
//       + "H" + w1 * cell_size + "V" + (d1 + 1) * cell_size
//       + "H" + (w1 + 1) * cell_size + "V" + 0
//       + "H" + (w0 + 1) * cell_size + "Z";
//
//       console.log("maandpad")
//
// }

var width = 960,
    height = 136,
    cellSize = 17;

var formatPercent = d3.format(".1%");

var color = d3.scale.quantize()
    .domain([-0.05, 0.05])
    .range(["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"]);

var svg = d3.select("#calendar")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

svg.append("text")
    .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .text(function(d) { return d; });

var rect = svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#ccc")
  .selectAll("rect")
  .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("rect")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", function(d) { return d3.timeWeek.count(d3.timeYear(d), d) * cellSize; })
    .attr("y", function(d) { return d.getDay() * cellSize; })
    .datum(d3.time.format("%Y%m"));

svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#000")
  .selectAll("path")
  .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("path")
    .attr("d", pathMonth);

var data = d3.nest()
  .key(function(d) {return d.PERIOD})
  .map(consumption_2015)

  rect.filter(function(d) { return d in data; })
     .attr("fill", function(d) { return color(data.CONSUMPTION_AVO_PP[d]); })
   .append("title")
     .text(function(d) { return d + ": " + formatPercent(data.CONSUMPTION_AVO_PP[d]); });


};


function pathMonth(t0) {
  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = t0.getDay(), w0 = d3.timeWeek.count(d3.timeYear(t0), t0),
      d1 = t1.getDay(), w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
  return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
      + "H" + w0 * cellSize + "V" + 7 * cellSize
      + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
      + "H" + (w1 + 1) * cellSize + "V" + 0
      + "H" + (w0 + 1) * cellSize + "Z";
}
