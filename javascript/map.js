// make map

function makeMap(error, map, health_perception){
	if (error) throw error;

		var map = new Datamap({
				element: document.getElementById("map"),
				setProjection: function(element) {
					 width = 1000;
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
				data: map,
				// responsive: true,
				done: function(datamap){
					datamap.svg.selectAll(".datamaps-subunit").on("click", function(geography){
						var location = geography.id;
						for (var loc = 0; loc < health_perception.length; loc++){
							 if (location == health_perception[loc]["CODE"]){
								 // make donut
								 // make calendar
							 }
						}
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
			 var leg = {
				 defaultFillName: "no data available for this country:",
			 };

			 map.legend(leg);

			//  // resize map when window size is changed
			//  d3.select(window).on('resize', function() {
			// 	 map.resize();
		 // });
	 // });
};
