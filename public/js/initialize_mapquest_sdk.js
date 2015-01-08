$(document).ready(function() {


var loadInitialMap = function(){
    console.log("Load initial map...")
    MQA.EventUtil.observe(window, 'load', function() {
      // create an object for options
      var options = {
        elt: document.getElementById('map'),           // ID of map element on page
        zoom: 10,                                      // initial zoom level of the map
        latLng: { lat: 37.7577, lng: -122.4376 },  // center of map in latitude/longitude
        mtype: 'map',                                  // map type (map, sat, hyb); defaults to map
        bestFitMargin: 0,                              // margin offset from map viewport when applying a bestfit on shapes
        zoomOnDoubleClick: true                        // enable map to be zoomed in when double-clicking on map
      };
        console.log('setting up options')

      // construct an instance of MQA.TileMap with the options object
      console.log('building map')
      window.map = new MQA.TileMap(options);
      console.log("map loaded!")
    });
}

loadInitialMap();



  var scriptCall = function(scriptUrl){
    $.ajax({
      url: "http://www.mapquestapi.com/sdk/js/v7.2.s/mqa.toolkit.js?key=Fmjtd%7Cluurn10y29%2C72%3Do5-9wywgf",
      dataType: "script"
    }).success(function(data){
      console.log("SDK script has been called")
    });
  }

  // var makeScriptUrl = function(key){
  //   myUrl = "http://www.mapquestapi.com/sdk/js/v7.2.s/mqa.toolkit.js?key="
  //   myUrl += key
  //   console.log('myUrl: ' + myUrl)
  //   return myUrl
  // }

  //move the getKey and makeScript completely to the server/controller side
  // entire Url with key would be returned by the controller. ajax('/getkey').done(loadmap)

  var getKey = function(){
    $.ajax({
      url: '/getkey',
      type: "GET"
    }).done(function(data){
        console.log('boo yah')
        // console.log(typeof data["scriptUrl"])
        console.log('url+key: ' + data["scriptUrl"])
        // var scriptUrl = makeScriptUrl(data["key"])
        // console.log('url generated: ' + scriptUrl)
        // scriptCall(scriptUrl)
        // return data["key"];
        // scriptCall(data["scriptUrl"]);
      })
  }



  var loadMap = function(){
    console.log("Load initial map...")
    MQA.EventUtil.observe(window, 'load', function() {
      // create an object for options
      var options = {
        elt: document.getElementById('map'),           // ID of map element on page
        zoom: 10,                                      // initial zoom level of the map
        latLng: { lat: 39.743943, lng: -105.020089 },  // center of map in latitude/longitude
        mtype: 'map',                                  // map type (map, sat, hyb); defaults to map
        bestFitMargin: 0,                              // margin offset from map viewport when applying a bestfit on shapes
        zoomOnDoubleClick: true                        // enable map to be zoomed in when double-clicking on map
      };
        console.log('setting up options')

      // construct an instance of MQA.TileMap with the options object
      console.log('building map')
      window.map = new MQA.TileMap(options);
      console.log("map loaded!")
    });
  }

});
//   <script src="http://www.mapquestapi.com/sdk/js/v7.2.s/mqa.toolkit.js?key=Fmjtd%7Cluurn10y29%2C72%3Do5-9wywgf"></script>
