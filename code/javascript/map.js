/*
* Dewi Mooij
* 10752978
* map.js
* Select data in the right format to make a map
*/

var map;
var paletteScale;
// set default flow to import
var current_flow = "import";

// filter data for the selected year
function mapYear(value_year, import_export_length){
	year_quantities = [];
	for (var year = 0; year < import_export_year.length; year++){
		if (import_export_year[year].YEAR == value_year){
			year_quantities.push(import_export_year[year]);
		};
	}
	mapFlow(year_quantities);
};

// order data in export and import array
function mapFlow(year_quantities){

		// filter data on flow
		var import_array = [];
		var export_array = [];
		for (var flow = 0; flow < year_quantities.length; flow++){
			if (year_quantities[flow].FLOW == "IMPORT"){
				import_array.push(year_quantities[flow]);
			}
			else if (year_quantities[flow].FLOW == "EXPORT"){
				export_array.push(year_quantities[flow]);
			};
		};

	// make map of import or export depending on what is checked in the checkbox
	if (current_flow == "import"){
		mapData(import_array);
	};
	if (current_flow == "export"){
		mapData(export_array);
	};

	// update map when checkbox is changed
	d3.selectAll("input[name='optradio']").on("change", function(){
		var value = this.value;
		if (value == "import"){
			current_flow = "import";
			mapData(import_array);
		};
		if (value == "export" ){
			current_flow = "export";
			mapData(export_array);
		};
	});
};

// convert data to the correct format for the map and add colourscale
function mapData(import_export_array){
		// colour country according to value
		paletteScale = d3.scale.quantize()
			.domain([0, 200000])
			.range(["#bfff80", "#b3ff66", "#99ff33", "#80ff00", "#66cc00", "#4d9900", "#336600", "#1a3300"])

		// convert to data format needed for the map
		var map_data = {};
		for (var place = 0; place < import_export_array.length; place++){
			country = import_export_array[place]["CODE"];
			map_data[country] = {
				YEAR: import_export_array[place]["YEAR"],
				FLOW: import_export_array[place]["FLOW"],
				QUANTITY_TON: parseInt(import_export_array[place]["QUANTITY_TON"]),
				fillColor:paletteScale(import_export_array[place]["QUANTITY_TON"]),
			};
		};

		removeMap();
		makeMap(map_data);

};

// make datamap
function makeMap(map_data){
		map = new Datamap({
				element: document.getElementById("map"),
				setProjection: function(element) {
					 width = 960;
					 height = 600;
					 var projection = d3.geo.mercator()
							 .center([32, 52])
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

						var current_location = geography.id;
						// if (current_location != )
						donutData(current_location, value_year);
						barchart(current_location);
						slider(current_location);

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

		var title = "Avocado import/export (tonnes)"
			 d3.select("h3").text(title);
};

// make legend for the datamap
function makeLegend(){

	var legend_height = 230;
	var legend_width = 300;

	var color_legend = d3.legend.color()
	 .scale(paletteScale)
	 .labelFormat(d3.format(".0f"))
	 .shapePadding(5)
	 .shapeWidth(50)
	 .shapeHeight(20)
	 .labelOffset(12);

	var svg = d3.select("#maplegend")
		.append("svg")
		 .attr("width", legend_width)
		 .attr("height", legend_height)
		.append("g")
		 .attr("transform", "translate(20,20)")
		 .call(color_legend);
};

// remove the datamap
function removeMap(){
	d3.select("#map").select("svg").remove();
}
