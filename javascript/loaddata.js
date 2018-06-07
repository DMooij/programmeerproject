// Load the data

window.onload = function(){
queue()
	.defer(d3.json, 'scripts/2015_import_export.json')
	.defer(d3.json, 'scripts/2015_consumption.json')
  .defer(d3.json, 'scripts/2015_health.json')
	.awaitAll(LoadData);
};

function LoadData(error, response){
  if (error) throw error;

    var import_export = response[0];
    console.log(import_export);
    var consumption = response[1];
    console.log(consumption);
    var health_perception = response[2];
    console.log(health_perception);

		makeMap();
}

function makeMap(error, data){
	if (error) throw error;

		var map = new Datamap({
				 element: document.getElementById("map"),
				 setProjection: function(element) {
					 width = 800;
					 height = 600;
					 var projection = d3.geo.mercator()
						   .center([ 13, 52 ])
						   .translate([ width/2, height/2 ])
						   .scale([ width/1.5 ]);
					var path = d3.geo.path()
		 					 .projection(projection);
					return {path: path, projection: projection};
	 			}
		});
};
