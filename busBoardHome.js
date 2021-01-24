var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

var request = new XMLHttpRequest()

// This function takes the orginal object an returns an array containing the ID, expected arrival time and time to arrival
function busFilter (busData) {
    var busDataFilter = [];
    for (let i = 0; i < busData.length; i++) {
        //console.log(busData[i].lineId)
        busDataFilter.push([busData[i].lineId, busData[i].expectedArrival, busData[i].timeToStation])
        };
        return busDataFilter;
    }



  //This part of the code makes the request to the API  
    request.open('GET', 'https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals', true)
    request.onload = function () {
        //the requrest is returned as a string JSON.parse converts it into an array of objects
        const busData = JSON.parse(request.responseText);
        //console.log(typeof(busData))
        //console.log(busData)
        
        const nextBuses = busFilter(busData)
    console.log(nextBuses)
    // const nextBuses is an array of arrays, each array containing the values of 3 properties
    //which we filtered using the busFilter function defined above.

    
   
            
}

request.send()





