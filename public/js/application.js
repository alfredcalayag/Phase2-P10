$(document).ready(function() {

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
                        //useTraffic: true,
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

// ======= Possibly remove ========
                        // html += '<div id="no_traffic"><h3>Time w/out Traffic:' + timeWithoutTraffic + ' minutes</h3></div>';
                        // html += '<div id="traffic"><h3>Time w/ Traffic:' + timeWithTraffic + ' minutes</h3></div>';
                        // html += '<table><tbody>';
// ================================

                        ajaxSendRequest(timeWithoutTraffic, timeWithTraffic, myOrigin, myDestination)

                        html += '</tbody></table>';
                        document.getElementById('route-results').innerHTML = html;
                        // $('#route-results').html(html);
                    }
                }
            }

            map.addRoute(opt);
            map.bestFit();
        });

    };



var ajaxSendRequest = function(timeWithoutTraffic, timeWithTraffic, origin, destination){
    console.log("Origin: " + origin + ", Destination: " + destination)
    $.ajax({
    url: "/users/:user_id/sms",
    type: "POST",
    data: "time=" + timeWithoutTraffic + "&timeWithTraffic=" + timeWithTraffic
        + "&origin=" + origin
        + "&destination=" + destination
    }).done(function(data){
      console.log('Check your phone')
      // console.log(data["time"])
      $('#no_traffic').html("<h2> No Traffic: " + data["time"] + " min</h2>")
      $('#traffic').html("<h2> With Traffic: " + data["timeWithTraffic"] + " min</h2>")
      $('#address').html("<h2>Your trip from <span id='start_point'>" + data["origin"] + "</span> to <span id='start_point'>" + data["destination"] + "</span>.")
    })
}


});
