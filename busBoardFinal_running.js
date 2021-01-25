const readline = require('readline-sync');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
var request = new XMLHttpRequest()

console.log('Please enter a valid postcode:');
const postCode = readline.prompt();
let postCodeRegex = /^[A-Z]{1,2}[0-9]{1,2}?[0-9][A-Z]{2}$/g

// //while (postCode.match(postCodeRegex)==null)

//     { postCode;
//       try
//       { 
//         if (postCode.match(postCodeRegex)==null)
//         {
//           throw 'invalid postcode'
//         }
//       }
//       catch(e)
//       {
//         console.log(postCode);
//       }
//     }

getLongitudeLatitude(postCode);

function getLongitudeLatitude(postCode) 
{
  request.open('GET', `https://api.postcodes.io/postcodes/${postCode}` , false)
  request.onload = function () 
  {
    var postCodeData = JSON.parse(request.responseText);
  
    //console.log(postCodeData)
    var longitude = postCodeData.result.longitude
    var latitude = postCodeData.result.latitude

    console.log('Longitude:',longitude,'and latitude', latitude)
    getStopCode(longitude, latitude)
  } 
  
  request.send()
}


function getStopCode (longitude, latitude) 
{//console.log('Check:  Longitude:',longitude,'and latitude', latitude) //i added this in to check they were being called correctly
  request.open('GET', `https://api.tfl.gov.uk/Stoppoint?lat=${latitude}&lon=${longitude}&stoptypes=NaptanPublicBusCoachTram`, false)
  
  
  request.onload = function () 
  {
    var stopCodeData = JSON.parse(request.responseText);
   
    //console.log(stopCodeData)
  
    var stopCode = stopCodeData['stopPoints'][0]['naptanId']
    

    console.log('This is is the stop code for the nearest bus stop ' + stopCode + '.')

    getBuses(stopCode)
    
  }
  
  request.send()
  }

function busFilter (busData) {
    let busDataFilter = [];
       for (let i = 0; i < busData.length; i++) {
      //converts time to station in seconds to minutes
            let minsToStation = Math.round(busData[i].timeToStation/60)
       //console.log(busData[i].lineId)
       busDataFilter.push({'Bus Number': busData[i].lineId ,  
                          'Time to station in minutes': minsToStation})
       };
       return busDataFilter;
     }

  function getBuses (stopCode) { 
     request.open('GET', `https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals` , false)
     request.onload = function () {
            //the request is returned as a string JSON.parse converts it into an array of objects
       const busData = JSON.parse(request.responseText);

  //console.log(busData)
          
       const nextBuses = busFilter(busData)
      //ensures that the array is no longer than 5 elements i.e. only prints next 5 buses
     nextBuses.length = 5;
     nextBuses.sort(function(a, b){return a['Time to station in minutes'] - b['Time to station in minutes']});
       console.log(nextBuses);
       return nextBuses
  //     // const nextBuses is an array of objects, each object containing the values of the 2 properties
  //     // which we filtered using the busFilter function defined above.
      
     
              
   }
  
  request.send()
  
    }
  
   
  
  