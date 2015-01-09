$(document).ready(function() {

var userId = $('#user_id').text();
var userName = $('#user_name').text();
console.log( "userId: " + userId + "username: " + userName)

var darkenPage = function(){
    $('#dark_page').css("display", "block");
}

var lightenPage = function(){
    $('#dark_page').css("display", "none");
}

var $sendButton = $('.trip_details')
$sendButton.on("click", "input[type='button']", function(event){
    event.preventDefault();
    origin = $(this).parent().find($('.origin')).text();
    destination = $(this).parent().find($('.destination')).text()
    console.log(origin)
    console.log(destination)


    var revealMap = function(){
        $('.map_container').css("opacity", "1.0")
        $('.map_container').css("display", "block")
    }

    var dfd = $.Deferred();
    dfd.done( getMap(origin, destination) )
    .done( darkenPage() )
    .done( revealMap() )
})


var $mapRemove = $('.map_container')
$mapRemove.on("click", function(){
    $(this).css("display", "none");
    lightenPage()
})


var $mapRemove2 = $('#dark_page')
$mapRemove2.on("click", function(){
    $('.map_container').css("display", "none");
    lightenPage()
})


var getMap = function(myOrigin, myDestination){
    console.log('Wabbit')
    // testing this line
    console.log("Load initial map...")

        // download the modules
        MQA.withModule('new-route', 'smallzoom', 'mousewheel', function() {

            var opt = {
                request: {
                    // locations: [ 'Foster City, CA', '633 Folsom St., San Francisco, CA' ],
                    locations: [myOrigin, myDestination],

                    options: {
                        avoids: [],
                        avoidTimedConditions: false,
                        doReverseGeocode: false,
                        shapeFormat: 'raw',
                        generalize: 0,
                        routeType: 'fastest',
                        timeType: 1,
                        locale: 'en_US',
                        unit: 'm',
                        enhancedNarrative: false,
                        drivingStyle: 2,
                        highwayEfficiency: 21.0
                    }
                },

                display: {
                    color: '#800000',
                    borderWidth: 10
                },

                // on success, display the route narrative
                success: function displayNarrative(data) {

                    if (data.route) {
                        html='';

// TODO: Move converter logic to controller
                        timeWithTraffic = (Math.ceil(parseInt(data.route.realTime) / 60)).toString();
                        timeWithoutTraffic = (Math.ceil(parseInt(data.route.time) / 60)).toString();

                        ajaxSendRequest(timeWithoutTraffic, timeWithTraffic, myOrigin, myDestination)

                        html += '</tbody></table>';
                        document.getElementById('route-results').innerHTML = html;
                    }
                }
            }

            map.addRoute(opt);
            map.bestFit();
        });

    };


var timeTemplate = function(data){
    travelTime = "<h2>" + data["trafficCondition"] + ": " + data["time"] + " minutes</h2>";
    return travelTime;
}

var ajaxSendRequest = function(timeWithoutTraffic, timeWithTraffic, origin, destination){
    console.log("Origin: " + origin + ", Destination: " + destination)

    $.ajax({
    url: "/users/"+ userId + "/sms",
    type: "POST",
    data: "time=" + timeWithoutTraffic + "&timeWithTraffic=" + timeWithTraffic
        + "&origin=" + origin
        + "&destination=" + destination
    }).done(function(data){
      console.log('Check your phone')
      // console.log(data["time"])
      // $('#no_traffic').html("<h2> No Traffic: " + data["time"] + " min</h2>")
      $('#no_traffic').html(timeTemplate(
        {   trafficCondition: "No Traffic",
            time: data["time"]
        }))
      $('#traffic').html("<h2> With Traffic: " + data["timeWithTraffic"] + " min</h2>")
      $('#address').html("<h2>Your trip from <span id='start_point'>" + data["origin"] + "</span> to <span id='start_point'>" + data["destination"] + "</span>.")
    })
}


});
