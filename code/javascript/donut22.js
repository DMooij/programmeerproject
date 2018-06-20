// Donut chart
// http://www.adeveloperdiary.com/d3-js/create-a-simple-donut-chart-using-d3-js/
// https://bl.ocks.org/mbostock/3887193
function donutData(location, value_year){
    var health_year = [];
    for (var k = 0; k < health_2010_2015.length; k++){
      if (health_2010_2015[k].YEAR == value_year){
        health_year.push(health_2010_2015[k])
      }
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
      // console.log(health_year_male)
      // console.log(health_year_female)
      // console.log(health_year_total)
    donut(location, health_year_total, health_year_male, health_year_female);
};

function donut(location, health_total, health_male, health_female){
  // console.log(health_total)
  // console.log(health_male)
  // console.log(health_female)

  // console.log(location)

  console.log(health_total)

  var data_donut = [];
  for (var loc = 0; loc < health_total.length; loc++){
     if (location == health_total[loc].COU){
       data_donut.push(health_total[loc])
     }
  }
  // console.log(location)
  //   console.log(data_donut)
  // removeDonut();
  updateDonut(data_donut)
  // makeDonut(data_donut);

  d3.selectAll(".dropdown-item").on("click", function(){
    var value = this.getAttribute("value");

    if (value == "male"){
      // removeDonut();
      var data_donut = [];
      for (var loc = 0; loc < health_male.length; loc++){
         if (location == health_male[loc].COU){
           data_donut.push(health_male[loc])
         }
      }
      updateDonut(data_donut)
      // makeDonut(data_donut);
    }
    if (value == "female"){
      removeDonut();
      var data_donut = [];
      for (var loc = 0; loc < health_female.length; loc++){
         if (location == health_female[loc].COU){
           data_donut.push(health_female[loc])
         }
      }
      updateDonut(data_donut)
      // makeDonut(data_donut);
    }
    if (value == "total"){
      // removeDonut();
      var data_donut = [];
      for (var loc = 0; loc < health_total.length; loc++){
         if (location == health_total[loc].COU){
           data_donut.push(health_total[loc])
         }
      }
        updateDonut(data_donut)
      // makeDonut(data_donut);
    }
  });
}

// function makeDonut(data_donut){

function makeDonut(location){

  // console.log(data_donut)
  var health_year = [];
  for (var k = 0; k < health_2010_2015.length; k++){
    if (health_2010_2015[k].YEAR == "2015"){
      health_year.push(health_2010_2015[k])
    }
  }

  console.log(health_year)

  var health_year_total = [];

  for (var l = 0; l < health_year.length; l++){
    if (health_year[l].GENDER == "total"){
      health_year_total.push(health_year[l])
    }
  }

      console.log(health_year_total)

      console.log(location)

  var data_donut = [];
  for (var loc = 0; loc < health_year_total.length; loc++){
     if (location == health_year_total[loc].COU){
       data_donut.push(health_year_total[loc])
     }
  }

  console.log(data_donut)

    var width_donut = 550;
    var height_donut = 400;
    var radius = Math.min(width_donut - 10 , height_donut - 10)/2;

    var enterAntiClockwise = {
      startAngle: Math.PI * 2,
      endAngle: Math.PI * 2
    }

    var color = d3.scale.ordinal()
      .range(["#568203", "#7ebe03", "#bbfc3d"])

    var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 80);

    var arcOver = d3.svg.arc()
      .outerRadius(radius + 5)
      .innerRadius(radius - 80)

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
          .each(function(d) { this._current = d; })
          .on("mouseover", function (d) {
              d3.select(this).transition()
                .duration(200)
                .attr("d", arcOver)
                // .selectAll("text")
                //   .style({
                //        fill:"black",
                //        'font-size':'18px',
                //        'font-weight': 'bold'
                //    })
              })
          .on("mouseout", function (d) {
              d3.select(this).transition()
                .duration(200)
                .attr("d", arc)
                // .selectAll("text")
                // .style({
                //     fill:"black",
                //     'font-size':'14px'
                // })
              })


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
       })

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
              return 'translate(-109,' + ((i*legend_height)-40) + ')';}
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

         var title = "Health perception of " + data_donut[0]["GENDER"] + " in " + data_donut[0]["COUNTRY"] + " in " + data_donut[0]["YEAR"];
          d3.select("#donut").select("h4").text(title);
}

// function removeDonut(){
//   	d3.select("#donut").select("svg").remove()
// }

// function updateDonut(data_donut){
//
//   var arc = d3.svg.arc()
//     .outerRadius(radius - 10)
//     .innerRadius(radius - 80);
//
//   var pie = d3.layout.pie()
//     .sort(null)
//     .value(function(d) { return d.VALUE; });
//
//   var svg = d3.select("#donut").select("svg")
//
//   var g = svg.selectAll(".arc")
//       .data(pie(data_donut))
//       .enter().append("g")
//       .attr("class", "arc");
//       g.append("path")
//         .transition()
//         .duration(1000)
//         .attr("d", arc)
//         .style("fill", function(d) { return color(d.data.VARIABLE); })
//
//   var text = svg.selectAll("text")
//       .data(pie(data_donut))
//       .text(function(d){
//           return d.data.VALUE+"%";
//       })

function updateDonut(data_donut) {

  var width_donut = 550;
  var height_donut = 400;
  var radius = Math.min(width_donut - 10 , height_donut - 10)/2;

  var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 80);

    var enterAntiClockwise = {
      startAngle: Math.PI * 2,
      endAngle: Math.PI * 2
    }

    var color = d3.scale.ordinal()
      .range(["#568203", "#7ebe03", "#bbfc3d"])

  var svg = d3.select("#donut").select("svg")

	var pie = d3.layout.pie()
		.value(function(d) { return d.VALUE; });

    var g = svg.selectAll(".arc")
          .data(pie(data_donut))
          .enter().append("g")
          .attr("d", "arc");

          g.append("path")

    var path = svg.select("g").select(".arc").select("path")

            // .transition()
            // .duration(1000)
            .style("fill", function(d) { return color(d.data.VARIABLE); })
            .attr("d", arc(enterAntiClockwise))
            .each(function (d) {
              this._current = {
                data: d.data,
                value: d.VALUE,
                startAngle: enterAntiClockwise.startAngle,
                endAngle: enterAntiClockwise.endAngle
              }
            })

      path.transition()
        .duration(750)
        .attrTween("d", arcTweenOut)
        .remove()

      path.transition()
        .duration(1000)
        .attrTween("d", arcTween)

	// path = d3.select("#donut").selectAll("path").data(data_donut); // Compute the new angles
	// path.transition().duration(500).attrTween("d", arcTween)

  var text = svg.selectAll("text")
       .data(pie(data_donut))
       .text(function(d){
           return d.data.VALUE+"%";
       })

}

function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
  return arc(i(t));
  };
}
// Interpolate exiting arcs start and end angles to Math.PI * 2
// so that they 'exit' at the end of the data
function arcTweenOut(a) {
  var i = d3.interpolate(this._current, {startAngle: Math.PI * 2, endAngle: Math.PI * 2, value: 0});
  this._current = i(0);
  return function (t) {
    return arc(i(t));
  };
}

//
// }
