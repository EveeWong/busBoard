var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

var request = new XMLHttpRequest()

request.open('GET', 'https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals', true)
request.onload = function () {
    const busData = JSON.parse(request.responseText);
    console.log(typeof(busData))
    console.log(busData)
}

request.send()


