/*
* Dewi Mooij
* 10752978
* map.js
* Select data in the right format to make a map
*/

// legend is independent of flow and year
var paletteScale;

// set default flow to import
var currentFlow = "import";

// select mapdata for the selected year
function mapYear(valueYear, importExportYear){
	yearQuantities = [];
	for (var year = 0; year < importExportYear.length; year++){
		if (importExportYear[year].YEAR == valueYear){
			yearQuantities.push(importExportYear[year]);
		};
	}
	mapFlow(yearQuantities);
};

// order data in export and import array
function mapFlow(yearQuantities){

		// filter data on flow
		var importArray = [];
		var exportArray = [];
		for (var flow = 0; flow < yearQuantities.length; flow++){
			if (yearQuantities[flow].FLOW == "IMPORT"){
				importArray.push(yearQuantities[flow]);
			}
			else if (yearQuantities[flow].FLOW == "EXPORT"){
				exportArray.push(yearQuantities[flow]);
			};
		};

	// make map of import or export depending on what is checked in the checkbox
	if (currentFlow == "import"){
		mapData(importArray);
	}
	else if (currentFlow == "export"){
		mapData(exportArray);
	};

	// update map when checkbox is changed
	d3.selectAll("input[name='optradio']").on("change", function(){
		var value = this.value;
		if (value == "import"){
			currentFlow = "import";
			mapData(importArray);
		}
		else if (value == "export" ){
			currentFlow = "export";
			mapData(exportArray);
		};
	});
};

// convert data to the correct format for the map and add colourscale
function mapData(importExportArray){

		// colour country according to import/export value
		paletteScale = d3.scale.quantize()
			.domain([0, 200000])
			.range(["#bfff80", "#b3ff66", "#99ff33", "#80ff00", "#66cc00",
			"#4d9900", "#336600", "#1a3300"])

		// convert to data format needed for the map
		var dataMap = {};
		for (var place = 0; place < importExportArray.length; place++){
			country = importExportArray[place]["CODE"];
			dataMap[country] = {
				YEAR: importExportArray[place]["YEAR"],
				FLOW: importExportArray[place]["FLOW"],
				QUANTITY_TON: parseInt(importExportArray[place]["QUANTITY_TON"]),
				fillColor:paletteScale(importExportArray[place]["QUANTITY_TON"]),
			};
		};

		// remove old map and make new map
		removeMap();
		makeMap(dataMap);

};

// make datamap
function makeMap(dataMap){
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
				data: dataMap,
				done: function(datamap){
					datamap.svg.selectAll(".datamaps-subunit").on("click",
					function(geography){

						// update barchart and donut when a country is clicked
						var currentLocation = geography.id;
						donutData(currentLocation, valueYear);
						barchart(currentLocation);
						slider(currentLocation);

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
												': ' + map.QUANTITY_TON + ' tonnes ' + map.FLOW
												+ ' in ' + map.YEAR ,
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

		// add title to the map
		var title = "Avocado import/export (tonnes)"
			 d3.select("h3").text(title);
};

// make legend for the datamap
function makeLegend(){

	var legendHeight = 230;
	var legendWidth = 300;

	var colorLegend = d3.legend.color()
	 .scale(paletteScale)
	 .labelFormat(d3.format(".0f"))
	 .shapePadding(5)
	 .shapeWidth(50)
	 .shapeHeight(20)
	 .labelOffset(12);

	var svg = d3.select("#maplegend")
		.append("svg")
		 .attr("width", legendWidth)
		 .attr("height", legendHeight)
		.append("g")
		 .attr("transform", "translate(20,20)")
		 .call(colorLegend);
};

// remove the datamap
function removeMap(){
	d3.select("#map").select("svg").remove();
}
