/*
* Dewi Mooij
* 10752978
* donut.js
* Select data in the right format to make and update the donut chart
*/

// global to store what is selected from the dropdown, default gender is total
var currentGender = "total";

// select data for the right year and gender
function donutData(location, valueYear){

  // select data for slider value year
  var healthYear = [];
  for (var k = 0; k < healthYears.length; k++){
    if (healthYears[k].YEAR == valueYear){
      healthYear.push(healthYears[k]);
    };
  };

  // filter data on gender
  var healthYearMale = [];
  var healthYearFemale = [];
  var healthYearTotal = [];
  for (var l = 0; l < healthYear.length; l++){
    if (healthYear[l].GENDER == "male"){
      healthYearMale.push(healthYear[l]);
    }
    else if (healthYear[l].GENDER == "female"){
      healthYearFemale.push(healthYear[l]);
    }
    else if (healthYear[l].GENDER == "total"){
      healthYearTotal.push(healthYear[l]);
    };
  };

  // pass filtered data on
  donutGender(location, healthYearTotal, healthYearMale, healthYearFemale);
};

// select correct gender data according to what is selected in the dropdown
function donutGender(location, healthTotal, healthMale, healthFemale){
  if (currentGender == "total"){
    var dataDonut = donut(location, healthTotal);
    updateDonut(dataDonut);
  }
  else if (currentGender == "male"){
    var dataDonut = donut(location, healthMale);
    updateDonut(dataDonut);
  }
  else if (currentGender == "female"){
    var dataDonut = donut(location, healthFemale);
    updateDonut(dataDonut);
  };

  // get correct data on changing the gender in the dropdown
  // store in currentGender
  d3.selectAll(".dropdown-item").on("click", function(){
    var value = this.getAttribute("value");
    if (value == "male"){
      currentGender = "male";
      var dataDonut = donut(location, healthMale);
      updateDonut(dataDonut);
    }
    else if (value == "female"){
      currentGender = "female";
      var dataDonut = donut(location, healthFemale);
      updateDonut(dataDonut);
    }
    else if (value == "total"){
      currentGender = "total";
      var dataDonut = donut(location, healthTotal);
      updateDonut(dataDonut);
    };
  });
};

// data for making the donut chart
function donut(location, healthGender){
  var dataDonut = [];
  for (var loc = 0; loc < healthGender.length; loc++){
    if (location == healthGender[loc].COU){
      dataDonut.push(healthGender[loc]);
    };
  };
  return dataDonut;
};

// make default donut with location NLD year 2015 and total gender
function makeDonut(location){
  // select data for year 2015
  var healthYear = [];
  for (var k = 0; k < healthYears.length; k++){
    if (healthYears[k].YEAR == "2015"){
      healthYear.push(healthYears[k]);
    };
  };

  // select data for gender total
  var healthYearTotal = [];
  for (var l = 0; l < healthYear.length; l++){
    if (healthYear[l].GENDER == "total"){
      healthYearTotal.push(healthYear[l]);
    };
  };

  // select data for NLD
  var dataDonut = [];
  for (var loc = 0; loc < healthYearTotal.length; loc++){
     if (location == healthYearTotal[loc].COU){
       dataDonut.push(healthYearTotal[loc]);
     };
  };

  // set chart dimensions
  var widthDonut = 450;
  var full_width = 620;
  var heightDonut = 300;
  var radius = Math.min(widthDonut - 10 , heightDonut - 10)/2;

  // set colours for the slices
  var color = d3.scale.ordinal()
    .range(["#568203", "#7ebe03", "#bbfc3d"]);

  // set arc dimensions
  var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 80);

  // set arc dimensions for hover
  var arcOver = d3.svg.arc()
    .outerRadius(radius + 5)
    .innerRadius(radius - 80);

  // transform data to correct format
  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.VALUE; });

  // make svg element
  var svg = d3.select("#donut")
  .append("svg")
    .attr("width", full_width)
    .attr("height", heightDonut)
    .append("g")
    .attr("transform", "translate(" + widthDonut / 2 + ","
    + heightDonut / 2 + ")");

  // draw arcs and make donut
  var g = svg.selectAll(".arc")
      .data(pie(dataDonut))
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
    .data(pie(dataDonut))
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

  // set legend dimensions
  var legendSize = 20;
  var legendSpace = 7;
  var heightLegend = legendSize + legendSpace;

  // add data to legend
  var legend = svg.selectAll(".legend")
      .data(color.domain())
      .enter()
      .append("g")
      .attr({
      class:'legend',
      transform:function(d,i){
          return 'translate(160,' + ((i * heightLegend) - 40) + ')';}

      });

    // draw the legend coloured circles
    legend.append("rect")
        .attr({
            width: legendSize,
            height: legendSize,
            rx:18,
            ry:18
        })
        .style({
            fill:color,
            stroke:color
        });

    // add text to the legend
    legend.append('text')
        .attr({
            x:30,
            y:15
        })
        .text(function(d){
            return d;
        })
        .style({
            fill:"black",
            'font-size':'14px'
        });

    // add title to the chart
    var title = "Health perception of " + dataDonut[0]["GENDER"] + " in "
    + dataDonut[0]["COUNTRY"] + " in " + dataDonut[0]["YEAR"];
    d3.select("#donut").select("h4").text(title);
}

// update the donut chart on change of gender or slider value
function updateDonut(dataDonut){
  if (dataDonut.length != 0){

    // set dimensions
    var widthDonut = 450;
    var heightDonut = 300;
    var radius = Math.min(widthDonut - 10 , heightDonut - 10)/2;

    // set arcs
    var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 80);

    // set colour
    var color = d3.scale.ordinal()
      .range(["#568203", "#7ebe03", "#bbfc3d"]);

    // transform data to correct format
    var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.VALUE; });

    var svg = d3.select("#donut").select("svg");

    // update donut data, draw arcs and make new slices
    var g = svg.selectAll(".arc")
      .data(pie(dataDonut));

    var arcpath = g.enter()
      .append("g")
      .attr("class", "arc")
      .attr("transform", "translate(" + widthDonut / 2 + ","
      + heightDonut / 2 + ")");

    arcpath.append("path")
      .transition()
      .duration(800)
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.VARIABLE); });

    var arcpath = g.select("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.VARIABLE); });

    // update text in slices
    var text = svg.selectAll("text")
        .data(pie(dataDonut))
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
    var title = "Health perception of " + dataDonut[0]["GENDER"] + " in "
    + dataDonut[0]["COUNTRY"] + " in " + dataDonut[0]["YEAR"];
    d3.select("#donut").select("h4").text(title);
  };
};
