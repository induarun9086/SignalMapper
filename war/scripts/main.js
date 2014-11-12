/*---------------------------- Global Constants -------------------------------------------------*/
var drawMap = true;
/*-----------------------------------------------------------------------------------------------*/

/*---------------------------- Update font sizes when a resize ----------------------------------*/
function resizeMe()
{
  /* Standard height, for which the body font size is correct */
  var preferredHeight = 720; 
  var preferredWidth = 1366; 
  var fontsize = 12;

  var displayHeight = $(window).height();
  var displayWidth = $(window).width();
  var percentageH = ((displayHeight) / preferredHeight);
  var percentageW = ((displayWidth) / preferredWidth);
  var percentage  = ((percentageH > percentageW)?(percentageW):(percentageH))
  var newFontSize = Math.floor(fontsize * percentage);
  $("body").css("font-size", newFontSize);
}
/*-----------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------*/
function startResizeControlBar($scope, evtObj)
{
  evtObj.preventDefault();
  $(".transparentCover").css("display", "block");
  $scope.startCtrlBarResize = true;
  $scope.mouseXPos          = evtObj.pageX;
  $("html").css("cursor", "col-resize");
}
/*-----------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------*/
function resizeControlBar($scope, evtObj)
{ 
  if($scope.startCtrlBarResize == true)
  {  
    var changeDelta  = (evtObj.pageX - $scope.mouseXPos) * 0.1;
  
    $scope.mouseXPos = evtObj.pageX;
    
    $scope.ctrlBarWidth += changeDelta;
    
    if($scope.ctrlBarWidth >= 27)
    {
      $scope.ctrlBarWidth = 27;
    }
    else if($scope.ctrlBarWidth <= 15)
    {
      $scope.ctrlBarWidth = 15;
    }
    else
    {
    }
    
    $(".controlBar").css("right", (100 - $scope.ctrlBarWidth) + "%");
    $(".resizeVertSepBar").css("left", ($scope.ctrlBarWidth) + "%");
    $(".resizeVertSepBar").css("right", (99.7 - $scope.ctrlBarWidth) + "%");
    $(".mapContainer").css("left", ($scope.ctrlBarWidth + 0.3) + "%");
  }
}
/*-----------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------*/
function stopResizeControlBar($scope, evtObj)
{
  if($scope.startCtrlBarResize == true)
  {
    $scope.startCtrlBarResize = false;
    $("html").css("cursor", "default");
    $(".transparentCover").css("display", "none");
    google.maps.event.trigger($scope.currMap, 'resize');
  }
}

/*-----------------------------------------------------------------------------------------------*/
function getSignalData($scope)
{
  var ajaxCfg = {method:"post", url:"/getSignalData", params:{numPoints: $scope.locationArray.length}, data:JSON.stringify($scope.locationArray)};
  var ajaxObj = $scope.httpFn(ajaxCfg);
  
  ajaxObj.success(function(data, status, headers, config) 
  { 
    redrawMap($scope, data);
  });
  
  ajaxObj.error(function(data, status, headers, config) 
  { 
    redrawMap($scope, "[]");
  });
}
/*-----------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------*/
function updateMap($scope)
{
  /* Temporary location object */
  var location  = {lat: 0, lng: 0};
  
  /* Calculate the various bounds of the current map view */
  var currBounds        = $scope.currMap.getBounds();
  var leftBotLat        = currBounds.getSouthWest().lat();
  var rightTopLat       = currBounds.getNorthEast().lat();
  var leftBotLng        = currBounds.getSouthWest().lng();
  var rightTopLng       = currBounds.getNorthEast().lng();
  var currMapWidth      = Math.abs(rightTopLng - leftBotLng);
  var currMapHeight     = Math.abs(rightTopLat - leftBotLat);
    
  /* Find distances */
  var currHoriDist = distBetPoints(rightTopLat, rightTopLng, rightTopLat, leftBotLng);
  var currVertDist = distBetPoints(rightTopLat, rightTopLng, leftBotLat, rightTopLng);
  
  /* Find distance delta */
  $scope.distDelta  = (currHoriDist / $scope.hResolution);
  
  /* Find equal vertical resolution */
  $scope.vResolution = Math.round(((currVertDist * $scope.hResolution) / currHoriDist));
  
  /* Find lat lng deltas */
  $scope.currHoriLngDelta  = (currMapWidth / $scope.hResolution);
  $scope.currVertLatDelta  = (currMapHeight / $scope.vResolution);
  
  /* Clear the map */
  clearMap($scope);
  
  /* Build an array of locations in the current map view */
  location.lat = rightTopLat - ($scope.currVertLatDelta / 2);
  for(i=0;i<$scope.vResolution;i++)
  {
    location.lng = leftBotLng + ($scope.currHoriLngDelta / 2);
    for(j=0;j<$scope.hResolution;j++)
    {     
      $scope.locationArray.push({lat: location.lat, lng: location.lng});
  
      location.lng += $scope.currHoriLngDelta;
    }
    location.lat -= $scope.currVertLatDelta;
  }
  
  /* Draw grid lines if required */
  drawGridLines($scope);
  
  /* Get the signal data from the server and update the map in the callback */
  getSignalData($scope);
}
/*-----------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------*/
function drawGridLines($scope, toggle)
{
  /* Toggle the state if required */
  if(toggle == true)
  {
    $scope.drawGrid = !$scope.drawGrid;
  }
  
  /* Only when map is enabled */
  if(drawMap == true)
  {
    /* If tiles are to be drawn */
    if($scope.drawGrid == true)
    {  
      /* Draw from the current location array */
      for(i=0;i<$scope.locationArray.length;i++)
      {         
        /* Create a single tile co-ordinates */
        var tileCoords = [
           new google.maps.LatLng($scope.locationArray[i].lat + ($scope.currVertLatDelta / 2), $scope.locationArray[i].lng - ($scope.currHoriLngDelta / 2)),
           new google.maps.LatLng($scope.locationArray[i].lat + ($scope.currVertLatDelta / 2), $scope.locationArray[i].lng + ($scope.currHoriLngDelta / 2)),
           new google.maps.LatLng($scope.locationArray[i].lat - ($scope.currVertLatDelta / 2), $scope.locationArray[i].lng + ($scope.currHoriLngDelta / 2)),
           new google.maps.LatLng($scope.locationArray[i].lat - ($scope.currVertLatDelta / 2), $scope.locationArray[i].lng - ($scope.currHoriLngDelta / 2)),
           new google.maps.LatLng($scope.locationArray[i].lat + ($scope.currVertLatDelta / 2), $scope.locationArray[i].lng - ($scope.currHoriLngDelta / 2))
          ];
       
        /* Initialize the tile */
        var tile = new google.maps.Polygon({
          paths: tileCoords,
          strokeColor: '#000000',
          strokeOpacity: 0.3,
          strokeWeight: 1,
          fillColor: '#0000FF',
          fillOpacity: 0 /* + (i / ($scope.locationArray.length * 2)) */
        });

        /* Draw the tile in the map */
        tile.setMap($scope.currMap);
        
        /* Save the tile for future use */
        $scope.tiles.push(tile);
      }
    }
    else
    {
      /* Clear Grid lines*/
      for(i=0;i<$scope.tiles.length;i++)
      {
        $scope.tiles[i].setMap(null);
      }
      
      /* Clear grid lines array */
      $scope.tiles                = [];
      $scope.tiles.length         = 0;
    }
  }
}
/*-----------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------*/
function clearMap($scope)
{
  /* Clear Map */
  $scope.heatMap.setData([]);
  
  /* Clear Grid lines*/
  for(i=0;i<$scope.tiles.length;i++)
  {
    $scope.tiles[i].setMap(null);
  }
  
  /* Clear previous location array */
  $scope.locationArray        = [];
  $scope.locationArray.length = 0;
  /* Clear previous heat map array */
  $scope.heatmapData          = [];
  $scope.heatmapData.length   = 0;
  /* Clear grid lines array */
  $scope.tiles                = [];
  $scope.tiles.length         = 0;
}
/*-----------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------*/
function redrawMap($scope, data)
{
  var weightedLoc = null;
  var sigData     = data;
  
  /* Fillup invalid data for the points for which server didn't send data */
  if(sigData.length < $scope.locationArray.length)
  {
    for(i=sigData.length;i<$scope.locationArray.length;i++)
    {
      sigData[i] = Math.random();
    }
  }
  
  /* Create heatmap data from server data */
  for(i=0;i<$scope.locationArray.length;i++)
  {
    weightedLoc = 
    {
      location: new google.maps.LatLng($scope.locationArray[i].lat, $scope.locationArray[i].lng),
      weight: sigData[i],
    }

    $scope.heatmapData.push(weightedLoc);
  }
  
  $scope.heatMap.setData($scope.heatmapData);
}
/*-----------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------*/
function updateMapController($scope, $http)
{ 
  if(($scope.initDone == false) || ($scope.initDone == undefined))
  {
    $scope.intiLat                = 54.076806;
    $scope.initLng                = 9.962961;
    $scope.initZoom               = 18;
    $scope.initDone               = true;
    $scope.currQuantas            = null;
    $scope.currMap                = null;
    $scope.heatMap                = null;
    $scope.hResolution            = 16;
    $scope.vResolution            = 16;
    $scope.heatmapData            = [];
    $scope.locationArray          = [];
    $scope.drawGrid               = false;
    $scope.tiles                  = [];
    $scope.currHoriLngDelta       = 0;
    $scope.currVertLatDelta       = 0;
    $scope.startCtrlBarResize     = false;
    $scope.ctrlBarWidth           = 19;
    
    $scope.drawGridLinesFn        = function (toggle) { drawGridLines($scope, toggle); };
    $scope.updateFilterState      = function (filterId, idx) { updateFilterState($scope, filterId, idx); };    
    $scope.httpFn                 = $http;
      
    $scope.filters      = [{name:"Operators", allFilterActive:true, someFilterActive:false, noFilterActive:false, 
                            items:[{name:'2G', enabled:true}, {name:'3G', enabled:true}, {name:'4G', enabled:true}, {name:'5G', enabled:true}]},
                           {name:"Technologies", allFilterActive:true, someFilterActive:false, noFilterActive:false, 
                            items:[{name:'Cellone', enabled:true}, {name:'Airtel', enabled:true}, {name:'Aircel', enabled:true}, {name:'Idea', enabled:true}]},
                           {name:"Datasets", allFilterActive:true, someFilterActive:false, noFilterActive:false, 
                            items:[{name:'Local', enabled:true}, {name:'Global', enabled:true}]}];

    resizeMe();
    
    $("#controlAndMapSepBar").mousedown(function(evtObj) { startResizeControlBar($scope, evtObj); } );
    $(document).mousemove(function(evtObj) { resizeControlBar($scope, evtObj);      } );    
    $(document).mouseup(function()   { stopResizeControlBar($scope);  } );
  
    if(drawMap == true)
    {
      var mapOptions  = 
      {
        center: { lat: $scope.intiLat, lng: $scope.initLng},
        zoom: $scope.initZoom
      };
      
      $scope.currMap = new google.maps.Map(document.getElementById('map-canvas'),
                                           mapOptions);
                                    
      google.maps.event.addListener($scope.currMap, 'idle', function() { updateMap($scope); } );
      google.maps.event.addListener($scope.currMap, 'zoom_changed', function() { clearMap($scope); } );
      google.maps.event.addListener($scope.currMap, 'dragstart', function() { clearMap($scope); } );
      
      /* Create new Heatmap options */
      $scope.heatMap = new google.maps.visualization.HeatmapLayer(
      {
        data: $scope.heatmapData,
        dissipating: true,
        maxIntensity: 110,
        radius: ((($( window ).width() / $scope.hResolution) + ($( window ).height() / $scope.vResolution)) / 1.8),
        opacity: 0.21
      });
      
      /* Draw haet map in current map */
      $scope.heatMap.setMap($scope.currMap);
      
      /* Draw the grid lines */
      $scope.drawGridLinesFn(false);
    }
  }
  else
  {                
    updateMap($scope);
  }
}
/*-----------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------*/
function distBetPoints(srcLat, srcLng, destLat, destLng)
{
  var piVal           = 3.14159;
  var earthMeanRadius = 6371000;                    /* in kilo meters */
  var srcLatInRad     = srcLat * (piVal / 180);
  var destLatInRad    = destLat * (piVal / 180);
  var latDiffInRad    = ((destLat - srcLat) * (piVal / 180));
  var lngDiffInRad    = ((destLng - srcLng) * (piVal / 180));
  var distance        = 0;
  
  var a = (Math.sin(latDiffInRad/2) * Math.sin(latDiffInRad/2)) + Math.cos(srcLatInRad) * Math.cos(destLatInRad) * (Math.sin(lngDiffInRad/2) * Math.sin(lngDiffInRad/2));
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  distance = earthMeanRadius * c;
  
  return distance;
}
/*-----------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------*/
function updateFilterState($scope, filterId, idx)
{
  $scope.filters[filterId].items[idx].enabled = !$scope.filters[filterId].items[idx].enabled;
  
  $scope.filters[filterId].allFilterActive   = true;
  $scope.filters[filterId].someFilterActive  = false;
  $scope.filters[filterId].noFilterActive    = true;
    
  for(i=0;i<$scope.filters[filterId].items.length;i++)
  {
    if($scope.filters[filterId].items[i].enabled == false)
    {
      $scope.filters[filterId].allFilterActive   = false;
    }
    else
    {
      $scope.filters[filterId].someFilterActive  = true;
      $scope.filters[filterId].noFilterActive    = false;
    }
  }
  
  if($scope.filters[filterId].allFilterActive == true)
  {
    $scope.filters[filterId].someFilterActive = false;
  }
}
/*-----------------------------------------------------------------------------------------------*/
