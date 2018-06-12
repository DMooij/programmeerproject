// make map

function makeMap(error, map, health_2015_total, health_2015_male, health_2015_female){
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

						var data_donut = [];
						for (var loc = 0; loc < health_2015_total.length; loc++){
							 if (location == health_2015_total[loc].CODE){
								 data_donut.push(health_2015_total[loc])
							 }
						}
						// console.log(data_donut)
						removeDonut();
						makeDonut(data_donut);

						d3.selectAll(".dropdown-item").on("click", function(){
							var value = this.getAttribute("value");

							if (value == "male"){
								removeDonut();
								var data_donut = [];
								for (var loc = 0; loc < health_2015_male.length; loc++){
									 if (location == health_2015_male[loc].CODE){
										 data_donut.push(health_2015_male[loc])
									 }
								}
								// console.log(data_donut)
								makeDonut(data_donut);
							}
							if (value == "female"){
								removeDonut();
								var data_donut = [];
								for (var loc = 0; loc < health_2015_female.length; loc++){
									 if (location == health_2015_female[loc].CODE){
										 data_donut.push(health_2015_female[loc])
									 }
								}
								// console.log(data_donut)
								makeDonut(data_donut);
							}
							if (value == "total"){
								removeDonut();
								var data_donut = [];
								for (var loc = 0; loc < health_2015_total.length; loc++){
									 if (location == health_2015_total[loc].CODE){
										 data_donut.push(health_2015_total[loc])
									 }
								}
								// console.log(data_donut)
								makeDonut(data_donut);
							}
						});
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
	

			//  // resize map when window size is changed
			//  d3.select(window).on('resize', function() {
			// 	 map.resize();
		 // });
	 // });
};

// TO DO: function update map
function removeMap(){
	d3.select("#map").select("svg").remove()
}
