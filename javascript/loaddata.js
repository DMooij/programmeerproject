// Load the data

window.onload = function(){
queue()
	.defer(d3.json, 'scripts/import_export_year.json')
	.defer(d3.json, 'scripts/consumption_avo_pp_year.json')
  .defer(d3.json, 'scripts/health_2010_2015.json')
	.awaitAll(LoadData);
};

function LoadData(error, response){
  if (error) throw error;

    var import_export_year = response[0];
    // console.log(import_export_year);
    var consumption = response[1];
    console.log(consumption);
    var health_2010_2015 = response[2];
    console.log(health_2010_2015);

		// OPTIONAL SLIDER all data select year

		// DONUT CHART DATA
				// donutData(health_2010_2015)
		var health_2015 = [];
		for (var k = 0; k < health_2010_2015.length; k++){
			if (health_2010_2015[k].YEAR == "2015"){
				health_2015.push(health_2010_2015[k])
			}
			var health_2015_male = [];
			var health_2015_female = [];
			var health_2015_total = [];
			for (var l = 0; l < health_2015.length; l++){
				if (health_2015[l].GENDER == "male"){
					health_2015_male.push(health_2015[l])
				}
				if (health_2015[l].GENDER == "female"){
					health_2015_female.push(health_2015[l])
				}
				if (health_2015[l].GENDER == "total"){
					health_2015_total.push(health_2015[l])
				}
			}
		}


		// console.log(health_2015)
		// console.log(health_2015_total)
		// console.log(health_2015_male)
		// console.log(health_2015_female)

		// MAP DATA
		// min and max values import/export

				var quantity_array = [];

				for (var i = 1; i < import_export_year.length; i++){
					quantity_array.push(import_export_year[i].QUANTITY_TON)
				}

				var minValue = Math.min.apply(Math, quantity_array);
				var maxValue = Math.max.apply(Math, quantity_array);

					var paletteScale = d3.scale.quantize()
	  				.domain([minValue, maxValue ])
						.range(colorbrewer.avo[8])

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

				// default map import 2015
				makeMap(paletteScale, map_import, health_2015_total, health_2015_male, health_2015_female, consumption);
				// makeMap(map_import)

				d3.selectAll("input[name='optradio']").on("change", function(){
					var value = this.value;
					if (value == "import"){
						removeMap();
						// makeMap(map_import)
						makeMap(paletteScale, map_import, health_2015_total, health_2015_male, health_2015_female, consumption);
					}
					if (value == "export"){
						removeMap();
						// makeMap(map_export)
						makeMap(paletteScale, map_export, health_2015_total, health_2015_male, health_2015_female, consumption);
					}
				});


}
