// slider
var value_year;

function sliderDefault(location, init_year){
  var slider = d3.select("#slider");
  var output = d3.select("#year");
  output.html(init_year);
  value_year = init_year;

  slider.on("input", function() {
    value_year = this.value;
    output.html(value_year);
    mapYear(value_year, import_export_year);
    donutData(location, value_year);
  });
};

function slider(location){
  var slider = d3.select("#slider");
  var output = d3.select("#year");

  slider.on("input", function() {
    value_year = this.value;
    output.html(value_year);
    mapYear(value_year, import_export_year);
    donutData(location, value_year);
  });
};
