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

var $createButton = $('.create_button')
$createButton.on("click", function(event){
    event.preventDefault()
    console.log("create!")
    darkenPage()
    $('form').css("display", "block")
})

// var newTrip = function(){
//     this.trip_details = $('.trip_template')
// }

var $submitFormButton = $('.submit_form')
$submitFormButton.on("click", function(event){
    event.preventDefault()

    $.ajax({
        url: "/users/" + userId + "/trips2",
        type: "POST",
        data: $('form').serialize()
    }).done(function(data){
        console.log(data)
        var $newTrip = $('.trip_template')
        $newTrip.find(".name_value").text("Trip Name: " + data["trip_name"])
        $newTrip.find(".origin").text("Origin: " + data["origin"])
        $newTrip.find(".destination").text("Destination: " + data["destination"])
        $newTrip.find(".departure").text("Departure Date & Time: " + data["depart_time"])
        $newTrip.find(".reminder").text("Text will be sent at: " + data["reminder_time"])
        $newTrip.find(".minutes").text(" Reminder set to: " + data["reminder_minutes"] + " minutes prior to departure")
        $newTrip.removeClass('trip_template')
        $newTrip.addClass('trip_details')
        $newTrip.find("input").on("click", function(event){
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



        $('main').append($newTrip)
        $('form').css("display", "none")
        lightenPage()
    })

    // when done add
    // $('main').append(new trip)
    // $('.form').css("display", "none")
    // lightenPage()
})

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

      $('#no_traffic').html(timeTemplate(
        {   trafficCondition: "No Traffic",
            time: data["time"]
        }))

      $('#traffic').html(timeTemplate(
        {   trafficCondition: "In Traffic",
            time: data["timeWithTraffic"]
        }))

      $('#address').html("<h2>Your trip from <span id='start_point'>" + data["origin"] + "</span> to <span id='start_point'>" + data["destination"] + "</span>.")
    })
}


});
