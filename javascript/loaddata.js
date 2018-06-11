// Load the data

window.onload = function(){
queue()
	.defer(d3.json, 'scripts/import_export_year.json')
	.defer(d3.json, 'scripts/consumption_2010_2015.json')
  .defer(d3.json, 'scripts/health_2010_2015.json')
	.awaitAll(LoadData);
};

function LoadData(error, response){
  if (error) throw error;
	console.log("Hello")

    var import_export_year = response[0];
    console.log(import_export_year);
    var consumption = response[1];
    console.log(consumption);
    var health_perception = response[2];
    console.log(health_perception);

		// all data select year
		// data map select import/export from checkbox

		// min and max values labourforce
		var minValue = 0;
		var maxValue = 200000;

	// create color palette
		var paletteScale = d3.scale.linear()
			.domain([minValue, maxValue])
			.range(["#99ff99", "#008000"]);

		// import 2015
		var map_import = {};
		var start = 6;
		for (var countries_2015_import = start; countries_2015_import < import_export_year.length; countries_2015_import++){
				country_2015_import = import_export_year[countries_2015_import]["CODE"];
				map_import[country_2015_import] = {
					YEAR: import_export_year[countries_2015_import]["YEAR"],
					FLOW: import_export_year[countries_2015_import]["FLOW"],
					QUANTITY_TON: import_export_year[countries_2015_import]["QUANTITY_TON"],
					fillColor:paletteScale(import_export_year[countries_2015_import]["QUANTITY_TON"]),
				};
				countries_2015_import = (countries_2015_import + 11)
		};

		// export 2015
		map_export = {};
		var start = 12;
		for (var countries_2015_export = start; countries_2015_export < import_export_year.length; countries_2015_export++){
				country_2015_export = import_export_year[countries_2015_export]["CODE"];
				map_export[country_2015_export] = {
					YEAR: import_export_year[countries_2015_export]["YEAR"],
					FLOW: import_export_year[countries_2015_export]["FLOW"],
					QUANTITY_TON: import_export_year[countries_2015_export]["QUANTITY_TON"],
					fillColor:paletteScale(import_export_year[countries_2015_export]["QUANTITY_TON"]),
				};
				countries_2015_export = (countries_2015_export + 11)
		};

		console.log(map_import);
		console.log(map_export);

		d3.selectAll("input[name='optradio']").on("change", function(){
			var map;
			var value = this.value;
			console.log(value)
			if (value == "import"){
				map = map_import
			}
			if (value == "export"){
				map = map_export
			}
		});

		makeMap(error, map_import, health_perception);
}
