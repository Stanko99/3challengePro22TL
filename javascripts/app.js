// api key: appid=f4d54c4c55da307dc69dfa51e113fe05
// https://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}
//2d: api is http://api.geonames.org/timezoneJSON?


function getWeather() {
    var select = document.getElementById("select");
    var index = select.selectedIndex;
    var cityId = select.options[index].value
    var url1 = "http://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&appid=f4d54c4c55da307dc69dfa51e113fe05"    // Using Get to request data from the weatherApi
    var result = httpGet(url1)
    var item = eval("(" + result + ")");
    var coord = item.city.coord
    var weather = item.list[0].weather[0].main 
    var param = "lat=" + coord.lat + "&lng=" + coord.lon
    var cordinates = coord.lat + "," + coord.lon
    var url2 = "http://api.geonames.org/timezoneJSON?" + param + "&username=javthon"
    var result2 = httpGet(url2)
    var obj2 = eval("(" + result2 + ")"); // Get request for 2d api. I tried to write it without declaring ' final2' and staight eval("("+httpGet(key2api)+")") but it didnt work, I was puzzled why
    var localTime = obj2.time
    var output = ""
    var land = true
    var time = localTime.substring(9, 15) // using substring to extract data from the string with number 9 and 15
    var output2 = ""

    document.getElementById("coordinates").value =cordinates // selecting the values of the input fields from the .innerHTML
    document.getElementById("timeLocal").value = localTime
    document.getElementById("conditions").value = weather
    console.log("weather Conditions:" + weather)
    console.log("list1:" + item.list[0])
    console.log(coord)
    console.log(result2)
    console.log("time:" + time)

    if (parseInt(time) >= 5 && parseInt(time) <= 20) {
        output += "It is still daytime therefore enough visibility "
    } else {
        output += "Dangerous to land right now, due to low visibility. "
        land = false
    }
    document.getElementById("outcome").value = output // output 1 'outcome'  
    if (weather === "Clouds") {  // if weather is clours / rain / clear then display the following
        output2 += "Weather is suitable for landing, minimal threats "
    } else {
        output2 += ""
    }
    if (weather === "Rain") {
        output2 += " Landing there may be challenging "
    } else {
        output2 += ""
    }
    if (weather === "Clear") {
        output2 += "Weather is perfect for landing."
    } else {
        output2 += ""
    }
    document.getElementById("comeout").value = output2  // selecting and targeting 'comeout' to display the output in the value

}
function httpGet(theUrl) {

    var xmlHttp = new XMLHttpRequest();
    
    xmlHttp.open("GET", theUrl, false); 
    xmlHttp.send(null);
    return xmlHttp.responseText;
}