// slider
var value_year;

function sliderDefault(location){
  var slider = d3.select("#slider");
  var output = d3.select("#year");
  output.html(2015)

  slider.on("input", function() {
    value_year = this.value
    output.html(value_year);
    mapYear(value_year, import_export_year)
    donutData(location, value_year)

  });
}

function slider(location){
  var slider = d3.select("#slider");
  var output = d3.select("#year");

  slider.on("input", function() {
    value_year = this.value
    output.html(value_year);
    mapYear(value_year, import_export_year)
    donutData(location, value_year)

  });
}
