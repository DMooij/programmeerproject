// MAP DATA
// select data for the correct year slider??
var map;

function mapFlow(value_year, import_export_year){
	import_array = [];
	export_array = [];
	for (var flow = 0; flow < import_export_year.length; flow++){
		if (import_export_year[flow].FLOW == "IMPORT"){
			import_array.push(import_export_year[flow])

		}
		else if (import_export_year[flow].FLOW == "EXPORT"){
			export_array.push(import_export_year[flow])
		};
	};
	console.log(import_array)
	var color = mapColor(import_array)
	mapYear(value_year, import_array, color)

	d3.selectAll("input[name='optradio']").on("change", function(){
		var value = this.value;
		if (value == "import"){
			color = mapColor(import_array)
			mapYear(value_year, import_array, color)
		}
		if (value == "export"){
			color = mapColor(export_array)
			mapYear(value_year, export_array, color)
		}
	});
};

function mapColor(import_export_array){
		var quantity = [];
		for (var i = 0; i < import_export_array.length; i++){
			quantity.push(import_export_array[i].QUANTITY_TON)
		};
		var minValue = Math.min.apply(Math, quantity);
		var maxValue = Math.max.apply(Math, quantity);

		var paletteScale = d3.scale.quantize()
			.domain([Math.round(minValue), Math.round(maxValue)])
			.range(colorbrewer.avo[8]);

		return paletteScale
}

function mapYear(value_year, import_export_array, color){
	year_quantities = [];
	for (var year = 0; year < import_export_array.length; year++){
		if (import_export_array[year].YEAR == value_year){
			year_quantities.push(import_export_array[year])
		}
	}
	console.log(year_quantities)
	mapData(year_quantities, color)
};

function mapData(year_quantities, color){

	// var color = mapColor(import_export_array)

	var map_data = {};
		for (var place = 0; place < year_quantities.length; place++){
			country = year_quantities[place]["CODE"];
			map_data[country] = {
				YEAR: year_quantities[place]["YEAR"],
				FLOW: year_quantities[place]["FLOW"],
				QUANTITY_TON: year_quantities[place]["QUANTITY_TON"],
				fillColor: color(year_quantities[place]["QUANTITY_TON"])
			};
		};
		// console.log(map_data)
		removeMap()
		makeMap(color, map_data)
}


			// var minValue = Math.min.apply(Math, quantity);
// 		var maxValue = Math.max.apply(Math, quantity);
//
// 		var paletteScale = d3.scale.quantize()
// 			.domain([Math.round(minValue), Math.round(maxValue)])
// 			.range(colorbrewer.avo[8]);



	// year_quantities = [];
	// for (var year = 0; year < import_export_year.length; year++){
	// 	if (import_export_year[year].YEAR == value_year){
	// 		year_quantities.push(import_export_year[year])
	// 	}
	// }
	// mapData(year_quantities)
// };

// // order data in export and import array
// function mapData(year_quantities){
// 		import_array = [];
// 		export_array = [];
// 		for (var flow = 0; flow < year_quantities.length; flow++){
// 			if (year_quantities[flow].FLOW == "IMPORT"){
// 				import_array.push(year_quantities[flow])
// 			}
// 			else if (year_quantities[flow].FLOW == "EXPORT"){
// 				export_array.push(year_quantities[flow])
// 			};
// 		};
//
// // default map import 2015
// 	mapColor(import_array)
//
// 	d3.selectAll("input[name='optradio']").on("change", function(){
// 		var value = this.value;
// 		if (value == "import"){
// 			mapColor(import_array)
// 		}
// 		if (value == "export"){
// 			mapColor(export_array)
// 		}
// 	});
// };
//
// // colors for countries
// function mapColor(import_export_array){
// 		var quantity = [];
// 		for (var i = 0; i < import_export_array.length; i++){
// 			quantity.push(import_export_array[i].QUANTITY_TON)
// 		};
//
// 		var minValue = Math.min.apply(Math, quantity);
// 		var maxValue = Math.max.apply(Math, quantity);
//
// 		var paletteScale = d3.scale.quantize()
// 			.domain([Math.round(minValue), Math.round(maxValue)])
// 			.range(colorbrewer.avo[8]);
//
// 		var map_data = {};
// 		for (var place = 0; place < import_export_array.length; place++){
// 			country = import_export_array[place]["CODE"];
// 			map_data[country] = {
// 				YEAR: import_export_array[place]["YEAR"],
// 				FLOW: import_export_array[place]["FLOW"],
// 				QUANTITY_TON: import_export_array[place]["QUANTITY_TON"],
// 				fillColor:paletteScale(import_export_array[place]["QUANTITY_TON"]),
// 			};
// 		};
//
// 		removeMap()
// 		makeMap(paletteScale, map_data);
// };
//
// make map
function makeMap(color, map_data){
		map = new Datamap({
				element: document.getElementById("map"),
				setProjection: function(element) {
					 width = 960;
					 height = 600;
					 var projection = d3.geo.mercator()
						   .center([ 13, 52 ])
						   .translate([ width/2, height/2 ])
						   .scale([ width/1.5 ]);
					 var path = d3.geo.path()
		 					 .projection(projection);
					 return {path: path, projection: projection};
	 			},
				fills: {
					defaultFill: "lightgrey"
				},
				data: map_data,
				done: function(datamap){
					datamap.svg.selectAll(".datamaps-subunit").on("click", function(geography){

						var location = geography.id;
						donutData(location, value_year);
						barchart(location);

					});
				},
				geographyConfig: {
						popupTemplate: function(geo, map) {
							if (!map){
								return ['<div class="hoverinfo"><strong>',
												geo.properties.name,
												': no data',
												'</strong></div>'].join('');
							}
								return ['<div class="hoverinfo"><strong>',
												geo.properties.name,
												': ' + map.QUANTITY_TON + ' tonnes ' + map.FLOW + ' in ' + map.YEAR ,
												'</strong></div>'].join('');
						},
						popOnHover: true,
						highlightOnHover: true,
						highlightFillColor: function(geo) {return geo["fillColor"] || "sienna"; },
						highlightBorderColor: "sienna",
						highlightBorderWidth: 3,
						highlightBorderOpacity: 1
					},
			 });

		var svg = d3.select("svg");

		var color_legend = d3.legend.color()
		  .scale(color)
			.shapePadding(5)
			.shapeWidth(50)
			.shapeHeight(20)
			.labelOffset(12);

		svg.append("g")
		  .attr("transform", "translate(20,20)")
			.call(color_legend);

		var title = "Avocado import/export"
			 d3.select("h3").text(title);
};

// TO DO: function update map
function removeMap(){
	d3.select("#map").select("svg").remove()
}

// function updateMap(){
// 	d3.selectAll("input[name='optradio']").on("change", function(){
// 		var value = this.value;
// 		if (value == "import"){
// 			mapColor(import_array)
// 		}
// 		if (value == "export"){
// 			mapColor(export_array)
// 		}
// 	});
// }
