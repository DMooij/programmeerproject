// Load the data

var import_export_year;
var consumption;
var health_2010_2015;
var value_year

window.onload = function(){
queue()
	.defer(d3.json, 'scripts/import_export_year.json')
	.defer(d3.json, 'scripts/consumption_avo_pp_year.json')
  .defer(d3.json, 'scripts/health_2010_2015.json')
	.awaitAll(LoadData);
};

function LoadData(error, response){
  if (error) throw error;

    import_export_year = response[0];
    consumption = response[1];
    health_2010_2015 = response[2];

		mapYear("2015", import_export_year);
		// mapFlow("2015", import_export_year)
		barchart("NLD");
		donutData("NLD", "2015");

		slider()

};
