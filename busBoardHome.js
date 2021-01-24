var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

var request = new XMLHttpRequest()

function busFilter (busData) {
    var busDataFilter = [];
    for (let i = 0; i < busData.length; i++) {
        //console.log(busData[i].lineId)
        busDataFilter.push([busData[i].lineId, busData[i].expectedArrival])
        };
        console.log(busDataFilter)
    }

request.open('GET', 'https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals', true)
request.onload = function () {
    const busData = JSON.parse(request.responseText);
    //console.log(typeof(busData))
    //console.log(busData)

    busFilter(busData);
   
            
}

request.send()





