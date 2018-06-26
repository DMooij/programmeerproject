/*
* Dewi Mooij
* 10752978
* donut.js
* Select data in the right format to make and update the donut chart
*/

// default gender is total
var currentGender = "total"

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
donutGender(location, healthYearTotal, healthYearMale, healthYearFemale);
};

// select correct gender data according to what is selected in the dropdown
function donutGender(location, healthTotal, healthMale, healthFemale){
  if (currentGender == "total"){
      donut(location, healthTotal);
  }
  else if (currentGender == "male"){
    donut(location, healthMale);
  }
  else if (currentGender == "female"){
    donut(location, healthFemale);
  };

  // get correct data on changing the gender in the dropdown
  d3.selectAll(".dropdown-item").on("click", function(){
    var value = this.getAttribute("value");
    if (value == "male"){
      currentGender = "male";
      donut(location, healthMale);
    }
    else if (value == "female"){
      currentGender = "female";
      donut(location, healthFemale);
    }
    else if (value == "total"){
      currentGender = "total";
      donut(location, healthTotal);
    };
  });
};

function donut(location, healthGender){
  var dataDonut = []
  for (var loc = 0; loc < healthGender.length; loc++){
    if (location == healthGender[loc].COU){
      dataDonut.push(healthGender[loc])
    };
  };
  updateDonut(dataDonut);
};

// make default donut with location NLD year 2015 and total gender
function makeDonut(location){
  var healthYear = [];
  for (var k = 0; k < healthYears.length; k++){
    if (healthYears[k].YEAR == "2015"){
      healthYear.push(healthYears[k]);
    };
  };

  var healthYearTotal = [];
  for (var l = 0; l < healthYear.length; l++){
    if (healthYear[l].GENDER == "total"){
      healthYearTotal.push(healthYear[l]);
    };
  };

  var dataDonut = [];
  for (var loc = 0; loc < healthYearTotal.length; loc++){
     if (location == healthYearTotal[loc].COU){
       dataDonut.push(healthYearTotal[loc]);
     };
  };

  var widthDonut = 450;
  var full_width = 620;
  var heightDonut = 300;
  var radius = Math.min(widthDonut - 10 , heightDonut - 10)/2;

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
    .attr("height", heightDonut)
  .append("g")
    .attr("transform", "translate(" + widthDonut / 2 + ","
    + heightDonut / 2 + ")");

  // make donut
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

   // make legend
  var legendSize = 20;
  var legendSpace = 7;
  var heightLegend = legendSize + legendSpace;

  var legend = svg.selectAll(".legend")
      .data(color.domain())
      .enter()
      .append("g")
      .attr({
      class:'legend',
      transform:function(d,i){
          return 'translate(160,' + ((i * heightLegend) - 40) + ')';}

      });

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
    var title = "Health perception of " + dataDonut[0]["GENDER"] + " in "
    + dataDonut[0]["COUNTRY"] + " in " + dataDonut[0]["YEAR"];
    d3.select("#donut").select("h4").text(title);
}

// update the donut chart on change of gender or slider value
function updateDonut(dataDonut){
  if (dataDonut.length != 0){
    var widthDonut = 450;
    var heightDonut = 300;
    var radius = Math.min(widthDonut - 10 , heightDonut - 10)/2;

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

    // update text
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
