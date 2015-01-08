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
        // $('.map_container').css("z-index", "99999")

        $('.map_container').css("opacity", "1.0")
        $('.map_container').css("display", "block")
    }

    var dfd = $.Deferred();
    dfd.done( getMap(origin, destination) )
    .done( darkenPage() )
    .done( revealMap() )

    // getMap(origin, destination);
})


var $mapRemove = $('.map_container')
$mapRemove.on("click", function(){
    $(this).css("display", "none");
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

                        timeWithTraffic = (Math.ceil(parseInt(data.route.realTime) / 60)).toString();
                        timeWithoutTraffic = (Math.ceil(parseInt(data.route.time) / 60)).toString();


                        html += '<h2>Time w/out Traffic:' + timeWithoutTraffic + ' minutes</h2>';
                        html += '<h2>Time w/ Traffic:' + timeWithTraffic + ' minutes</h2>';
                        html += '<table><tbody>';

                        ajaxSendRequest(timeWithoutTraffic, timeWithTraffic, myOrigin, myDestination)

                        html += '</tbody></table>';
                        document.getElementById('route-results').innerHTML = html;
                        // $('#route-results').html(html);
                    }
                }
            }

            map.addRoute(opt);

            // map.addControl(new MQA.SmallZoom());
            // map.enableMouseWheelZoom();
            map.bestFit();
        });

    };



var ajaxSendRequest = function(timeWithoutTraffic, timeWithTraffic, origin, destination){
    console.log("Origin: " + origin + ", Destination: " + destination)
    $.ajax({
    url: "/test",
    type: "POST",
    data: "time=" + timeWithoutTraffic + "&timeWithTraffic=" + timeWithTraffic
        + "&origin=" + origin
        + "&destination=" + destination
    }).done(function(data){
      console.log('Check your phone')
    })
}


});

// Mapquest Test only ============
  // var $sendTextButton = $("button")
  // $sendTextButton.on("click", function(event) {
  //   event.preventDefault()
  //   console.log(timeWithTraffic)
  //   console.log(timeWithoutTraffic)

  //   $.ajax({
  //   url: "/test",
  //   type: "POST",
  //   data: $('form').serialize() + "&time=" + timeWithoutTraffic + "&timeWithTraffic=" + timeWithTraffic
  //   }).done(function(data){
  //     console.log('Check your phone')
  //   })
  // })
// ======================

