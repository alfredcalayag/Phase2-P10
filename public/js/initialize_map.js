$(document).ready(function() {

  function loadMap2(){
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

      // construct an instance of MQA.TileMap with the options object
      window.map = new MQA.TileMap(options);
    });
  }


  // loadMap();

})

//   <script src="http://www.mapquestapi.com/sdk/js/v7.2.s/mqa.toolkit.js?key=Fmjtd%7Cluurn10y29%2C72%3Do5-9wywgf"></script>
