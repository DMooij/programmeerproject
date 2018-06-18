// Donut chart
// http://www.adeveloperdiary.com/d3-js/create-a-simple-donut-chart-using-d3-js/
// https://bl.ocks.org/mbostock/3887193
function donutData(location){

  var health_year = [];
  for (var k = 0; k < health_2010_2015.length; k++){
    if (health_2010_2015[k].YEAR == "2015"){
      health_year.push(health_2010_2015[k])
    }
    var health_year_male = [];
    var health_year_female = [];
    var health_year_total = [];
    for (var l = 0; l < health_year.length; l++){
      if (health_year[l].GENDER == "male"){
        health_year_male.push(health_year[l])
      }
      if (health_year[l].GENDER == "female"){
        health_year_female.push(health_year[l])
      }
      if (health_year[l].GENDER == "total"){
        health_year_total.push(health_year[l])
      }
    }
  }
  donut(location, health_year_total, health_year_male, health_year_female);
};

function donut(location, health_total, health_male, health_female){

  var data_donut = [];
  for (var loc = 0; loc < health_total.length; loc++){
     if (location == health_total[loc].COU){
       data_donut.push(health_total[loc])
     }
  }
  removeDonut();
  makeDonut(data_donut);

  d3.selectAll(".dropdown-item").on("click", function(){
    var value = this.getAttribute("value");

    if (value == "male"){
      removeDonut();
      var data_donut = [];
      for (var loc = 0; loc < health_male.length; loc++){
         if (location == health_male[loc].COU){
           data_donut.push(health_male[loc])
         }
      }
      makeDonut(data_donut);
    }
    if (value == "female"){
      removeDonut();
      var data_donut = [];
      for (var loc = 0; loc < health_female.length; loc++){
         if (location == health_female[loc].COU){
           data_donut.push(health_female[loc])
         }
      }
      makeDonut(data_donut);
    }
    if (value == "total"){
      removeDonut();
      var data_donut = [];
      for (var loc = 0; loc < health_total.length; loc++){
         if (location == health_total[loc].COU){
           data_donut.push(health_total[loc])
         }
      }
      makeDonut(data_donut);
    }
  });
}

function makeDonut(data_donut){
  var width_donut = 550;
  var height_donut = 400;
  var radius = Math.min(width_donut, height_donut)/2;

  var color = d3.scale.ordinal()
    .range(["7fc97f","#beaed4", "#fdc086"])

  var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 80);

  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.VALUE; });

  var svg = d3.select("#donut")
  .append("svg")
    .attr("width", width_donut)
    .attr("height", height_donut)
  .append("g")
    .attr("transform", "translate(" + width_donut / 2 + "," + height_donut / 2 + ")");

  var g = svg.selectAll(".arc")
      .data(pie(data_donut))
      .enter().append("g")
      .attr("class", "arc");
      g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.VARIABLE); })
        // .on("mouseover", function (d) {
        //     d3.select(this).transition()
        //       .duration(500)
        //       .attr("d", arc.over)})
        // .on("mouseout", function (d) {
        //     d3.select(this).transition()
        //       .duration(500)
        //       .attr("d", arc)})

  var text = svg.selectAll("text")
    .data(pie(data_donut))
    .enter()
    .append("text")
    .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
     })
     .attr("dy", ".4em")
     .attr("text-anchor", "middle")
     .text(function(d){
         return d.data.VALUE+"%";
     })
     .style({
         fill:"black",
         'font-size':'14px'
     });

     var legend_size = 20;
     var legend_space = 7;
     var legend_height = legend_size + legend_space;

     var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter()
        .append("g")
        .attr({
        class:'legend',
        transform:function(d,i){
            return 'translate(-110,' + ((i*legend_height)-40) + ')';}
        });

      legend.append("rect")
        .attr({
              width: legend_size,
              height: legend_size,
              rx:20,
              ry:20
          })
          .style({
              fill:color,
              stroke:color
          });

        legend.append('text')
          .attr({
              x:30,
              y:15
          })
          .text(function(d){
              return d;
          }).style({
              fill:"black",
              'font-size':'14px'
          });
}

function removeDonut(){
  	d3.select("#donut").select("svg").remove()
}
