// Load the data

var import_export_year;
var consumption;
var health_2010_2015;

window.onload = function(){
queue()
	.defer(d3.json, 'data/import_export_year.json')
	.defer(d3.json, 'data/consumption_avo_pp_year.json')
  .defer(d3.json, 'data/health_2010_2015.json')
	.awaitAll(LoadData);
};

function LoadData(error, response){
  if (error) throw error;

    import_export_year = response[0];
    consumption = response[1];
    health_2010_2015 = response[2];

		sliderDefault("NLD", "2015");

		// DEFAULT
		mapYear("2015", import_export_year);
		makeLegend(paletteScale);
		makeBarchart("NLD");
		makeDonut("NLD");
		donutData("NLD", "2015")
};
