// Donut chart
// http://www.adeveloperdiary.com/d3-js/create-a-simple-donut-chart-using-d3-js/
// https://bl.ocks.org/mbostock/3887193


function donut(location, health_2015_total, health_2015_male, health_2015_female){
  var data_donut = [];
  for (var loc = 0; loc < health_2015_total.length; loc++){
     if (location == health_2015_total[loc].CODE){
       data_donut.push(health_2015_total[loc])
     }
  }
  // console.log(data_donut)
  removeDonut();
  makeDonut(data_donut);

  d3.selectAll(".dropdown-item").on("click", function(){
    var value = this.getAttribute("value");

    if (value == "male"){
      removeDonut();
      var data_donut = [];
      for (var loc = 0; loc < health_2015_male.length; loc++){
         if (location == health_2015_male[loc].CODE){
           data_donut.push(health_2015_male[loc])
         }
      }
      // console.log(data_donut)
      makeDonut(data_donut);
    }
    if (value == "female"){
      removeDonut();
      var data_donut = [];
      for (var loc = 0; loc < health_2015_female.length; loc++){
         if (location == health_2015_female[loc].CODE){
           data_donut.push(health_2015_female[loc])
         }
      }
      // console.log(data_donut)
      makeDonut(data_donut);
    }
    if (value == "total"){
      removeDonut();
      var data_donut = [];
      for (var loc = 0; loc < health_2015_total.length; loc++){
         if (location == health_2015_total[loc].CODE){
           data_donut.push(health_2015_total[loc])
         }
      }
      // console.log(data_donut)
      makeDonut(data_donut);
    }
  });
}

function makeDonut(data_donut){
  var width = 550;
  var height = 400;
  var radius = Math.min(width, height)/2;

  var color = d3.scale.ordinal()
    .range(["7fc97f","#beaed4", "#fdc086"])

  var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 80);

  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.VALUE; });

  var svg = d3.select("#donut").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var g = svg.selectAll(".arc")
      .data(pie(data_donut))
      .enter().append("g")
      .attr("class", "arc");
      g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.VARIABLE); });

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
