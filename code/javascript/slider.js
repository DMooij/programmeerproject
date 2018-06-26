/*
* Dewi Mooij
* 10752978
* slider.js
* implementation of slider, ensuring the correct data is matched to the slider value
*/

// global variable to access the year in the files
var valueYear;

// display 2015 as default year, enable updating map and donut gender from default situation
function sliderDefault(location, initYear){
  var slider = d3.select("#slider");
  var output = d3.select("#year");
  output.html(initYear);
  valueYear = initYear;

  // update when slider is used
  slider.on("input", function() {
    valueYear = this.value;
    output.html(valueYear);
    mapYear(valueYear, importExportYear);
    donutData(location, valueYear);
  });
};

// change year of map and donut on sliding
function slider(location){
  var slider = d3.select("#slider");
  var output = d3.select("#year");

  // update map and donut according to slider year
  slider.on("input", function() {
    valueYear = this.value;
    output.html(valueYear);
    mapYear(valueYear, importExportYear);
    donutData(location, valueYear);
  });
};
