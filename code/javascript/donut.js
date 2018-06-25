/*
* Dewi Mooij
* 10752978
* donut.js
* Select data in the right format to make and update the donut chart
*/

// select data for the right year and gender
function donutData(location, value_year){

    // select data for slider value
    var health_year = [];
    for (var k = 0; k < health_2010_2015.length; k++){
      if (health_2010_2015[k].YEAR == value_year){
        health_year.push(health_2010_2015[k]);
      };
    };

      // filter data according to gender
      var health_year_male = [];
      var health_year_female = [];
      var health_year_total = [];
      for (var l = 0; l < health_year.length; l++){
        if (health_year[l].GENDER == "male"){
          health_year_male.push(health_year[l]);
        };
        if (health_year[l].GENDER == "female"){
          health_year_female.push(health_year[l]);
        };
        if (health_year[l].GENDER == "total"){
          health_year_total.push(health_year[l]);
        };
      };
    donut(location, health_year_total, health_year_male, health_year_female);
};

// select right data according to what is selected in the dropdown
function donut(location, health_total, health_male, health_female){

  // default total
  var data_donut = [];
  for (var loc = 0; loc < health_total.length; loc++){
     if (location == health_total[loc].COU){
       data_donut.push(health_total[loc]);
     };
  }
  updateDonut(data_donut);

  // get correct data on changing the gender in the dropdown
  d3.selectAll(".dropdown-item").on("click", function(){
    var value = this.getAttribute("value");

    if (value == "male"){
      var data_donut = [];
      for (var loc = 0; loc < health_male.length; loc++){
         if (location == health_male[loc].COU){
           data_donut.push(health_male[loc]);
         };
      }';'
    };
    if (value == "female"){
      var data_donut = [];
      for (var loc = 0; loc < health_female.length; loc++){
         if (location == health_female[loc].COU){
           data_donut.push(health_female[loc]);
         };
      };
    };
    if (value == "total"){
      var data_donut = [];
      for (var loc = 0; loc < health_total.length; loc++){
         if (location == health_total[loc].COU){
           data_donut.push(health_total[loc]);
         };
      };
    };
    updateDonut(data_donut);
  });
};

// make default donut with location NLD year 2015 and total gender
function makeDonut(location){

  var health_year = [];
  for (var k = 0; k < health_2010_2015.length; k++){
    if (health_2010_2015[k].YEAR == "2015"){
      health_year.push(health_2010_2015[k]);
    };
  };

  var health_year_total = [];

  for (var l = 0; l < health_year.length; l++){
    if (health_year[l].GENDER == "total"){
      health_year_total.push(health_year[l]);
    };
  };

console.log(health_year_total)

  var data_donut = [];
  for (var loc = 0; loc < health_year_total.length; loc++){
     if (location == health_year_total[loc].COU){
       data_donut.push(health_year_total[loc]);
     };
  };

console.log(data_donut)

    var width_donut = 450;
    var full_width = 620;
    var height_donut = 300;
    var radius = Math.min(width_donut - 10 , height_donut - 10)/2;

    // set colours for the slices
    var color = d3.scale.ordinal()
      .range(["#568203", "#7ebe03", "#bbfc3d"]);

    // set arcs
    var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 80);

    var arcOver = d3.svg.arc()
      .outerRadius(radius + 5)
      .innerRadius(radius - 80);

    var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.VALUE; });

    // make svg element
    var svg = d3.select("#donut")
    .append("svg")
      .attr("width", full_width)
      .attr("height", height_donut)
    .append("g")
      .attr("transform", "translate(" + width_donut / 2 + "," + height_donut / 2 + ")");

    // make donut
    var g = svg.selectAll(".arc")
        .data(pie(data_donut))
        .enter().append("g")
        .attr("class", "arc");
        g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.VARIABLE); })
          .on("mouseover", function (d) {
              d3.select(this).transition()
                .duration(200)
                .attr("d", arcOver)
              })
          .on("mouseout", function (d) {
              d3.select(this).transition()
                .duration(200)
                .attr("d", arc)
              });

    // add text to donut slices
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
           'font-size':'14px',
           'font-weight': 'bold'
       });

       // make legend
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
              return 'translate(160,' + ((i*legend_height)-40) + ')';}

          });

        legend.append("rect")
          .attr({
                width: legend_size,
                height: legend_size,
                rx:18,
                ry:18
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

          // add title
         var title = "Health perception of " + data_donut[0]["GENDER"] + " in " + data_donut[0]["COUNTRY"] + " in " + data_donut[0]["YEAR"];
          d3.select("#donut").select("h4").text(title);
}

// update the donut chart on change of gender or slider value
function updateDonut(data_donut){

  var width_donut = 450;
  var height_donut = 300;
  var radius = Math.min(width_donut - 10 , height_donut - 10)/2;

  var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 80);

  var color = d3.scale.ordinal()
    .range(["#568203", "#7ebe03", "#bbfc3d"]);

  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.VALUE; });

  var svg = d3.select("#donut").select("svg");

  // update donut data and make new slices
  var g = svg.selectAll(".arc")
    .data(pie(data_donut));

  var arcpath = g.enter()
    .append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + width_donut / 2 + "," + height_donut / 2 + ")");

  arcpath.append("path")
    .transition()
    .duration(800)
    .attr("d", arc)
    .style("fill", function(d) { return color(d.data.VARIABLE); });

  g.exit().remove();

  var arcpath = g.select("path")
    .attr("d", arc)
    .style("fill", function(d) { return color(d.data.VARIABLE); });

  // update text
  var text = svg.selectAll("text")
      .data(pie(data_donut))
      .transition()
      .duration(500)
      .attr("transform", function (d) {
          return "translate(" + arc.centroid(d) + ")";
       })
       .attr("dy", ".4em")
       .attr("text-anchor", "middle")
      .text(function(d){
          return d.data.VALUE+"%";
      });

    // update title
    var title = "Health perception of " + data_donut[0]["GENDER"] + " in " + data_donut[0]["COUNTRY"] + " in " + data_donut[0]["YEAR"];
       d3.select("#donut").select("h4").text(title);
};
