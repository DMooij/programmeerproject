// Barchart

function barchart(location, consumption_2015){
  var data_calendar = [];
  for (var l = 0; l < consumption_2015.length; l++){
    if (location == consumption_2015[l].CODE){
      data_calendar.push(consumption_2015[l]);
    }
  }

  console.log(data_calendar);
}
