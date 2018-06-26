/*
* Dewi Mooij
* 10752978
* loaddata.js
* load all the data and display default site
*/

var importExportYear;
var consumption;
var healthYears;

window.onload = function(){
queue()
	.defer(d3.json, 'data/import_export_year.json')
	.defer(d3.json, 'data/consumption_avo_pp_year.json')
  .defer(d3.json, 'data/health_2010_2015.json')
	.awaitAll(LoadData);
};

// load all the data
function LoadData(error, response){
  if (error) throw error;

    importExportYear = response[0];
    consumption = response[1];
    healthYears = response[2];

		// enable slider in default situation
		sliderDefault("NLD", "2015");

		// make default map, legend, barchart and donut chart
		mapYear("2015", importExportYear);
		makeLegend();
		makeBarchart("NLD");
		makeDonut("NLD");

		// enable changing the gender in default situation
		donutData("NLD", "2015")

};
