// make map
function makeMap(paletteScale, map, health_2015_total, health_2015_male, health_2015_female, consumption){
// function makeMap(map){
	// if (error) throw error;

		var map = new Datamap({
				element: document.getElementById("map"),
				setProjection: function(element) {
					 width = 1000;
					 height = 600;
					 var projection = d3.geo.mercator()
						   .center([ 13, 52 ])
							 // .center([32, 47])
						   .translate([ width/2, height/2 ])
						   .scale([ width/1.5 ]);
					 var path = d3.geo.path()
		 					 .projection(projection);
					 return {path: path, projection: projection};
	 			},
				fills: {
					defaultFill: "lightgrey"
				},
				data: map,
				// responsive: true,
				done: function(datamap){
					datamap.svg.selectAll(".datamaps-subunit").on("click", function(geography){

						var location = geography.id;
						donut(location, health_2015_total, health_2015_male, health_2015_female);
						barchart(location, consumption);

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

			 // add legend to datamap
		var svg = d3.select("svg");

		var color_legend = d3.legend.color()
		  .scale(paletteScale)
			.shapePadding(5)
			.shapeWidth(50)
			.shapeHeight(20)
			.labelOffset(12);

		svg.append("g")
		  .attr("transform", "translate(20,20)")
			.call(color_legend);

			 // resize map when window size is changed
			 // d3.select(window).on('resize', function() {
				//  map.resize();


		 // });
	 // });
};

// TO DO: function update map
function removeMap(){
	d3.select("#map").select("svg").remove()
}
