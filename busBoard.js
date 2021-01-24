var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
var request = new XMLHttpRequest()
var resultText = XMLHttpRequest.responseText;


request.open('GET', 'https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals', true)
request.onload = function () {
    console.log(request.responseText)
    var busData = JSON.parse(request.responseText)
    console.log(busData)
    console.log(typeof(request.responseText))
    console.log(typeof(busData))
}

request.send()

//console.log(typeof(resultText))

//console.log(typeof(request))

