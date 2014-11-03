function getSignalData($scope)
{
  var ajaxCfg = {method:"get", url:"/getSignalData", params:{numPoints: $scope.locationArray.length}};
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
  
  /* */
  var currHoriDist = distBetPoints(rightTopLat, rightTopLng, rightTopLat, leftBotLng);
  var currVertDist = distBetPoints(rightTopLat, rightTopLng, leftBotLat, rightTopLng);
  
  /* Find distance delta */
  $scope.distDelta  = (currHoriDist / $scope.hResolution);
  
  /* Find equal vertical resolution */
  $scope.vResolution = ((currVertDist * $scope.hResolution) / currHoriDist);
  
  /* Find lat lng deltas */
  var currHoriLngDelta  = (currMapWidth / $scope.vResolution);
  var currVertLatDelta  = (currMapHeight / $scope.hResolution);
  
  /* Clear the map */
  clearMap($scope);
  
  /* Build an array of locations in the current map view */
  location.lat = rightTopLat - (currVertLatDelta / 2);
  for(i=0;i<$scope.hResolution;i++)
  {
    location.lng = leftBotLng + (currHoriLngDelta / 2);
    for(j=0;j<$scope.vResolution;j++)
    {     
      $scope.locationArray.push({lat: location.lat, lng: location.lng});
      
      location.lng += currHoriLngDelta;
    }
    location.lat -= currVertLatDelta;
  }
  
  /* Get the signal data from the server and update the map in the callback */
  getSignalData($scope); 
}

function clearMap($scope)
{
  /* Clear previous location array */
  $scope.locationArray = [];
  $scope.locationArray.length = 0;
  /* Clear previous heat map array */
  $scope.heatmapData = [];
  $scope.heatmapData.length = 0;
  $scope.heatMap.setData([]);
}

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
    
    $scope.httpFn                 = $http;
    
    var mapOptions  = 
    {
      center: { lat: $scope.intiLat, lng: $scope.initLng},
      zoom: $scope.initZoom
    };
    
    $scope.currMap = new google.maps.Map(document.getElementById('map-canvas'),
                                         mapOptions);
                                  
    google.maps.event.addListener($scope.currMap, 'idle', function() { updateMap($scope); });
    google.maps.event.addListener($scope.currMap, 'zoom_changed', function() { clearMap($scope); });
    google.maps.event.addListener($scope.currMap, 'dragstart', function() { clearMap($scope); });
    
    /* Create new Heatmap options */
    $scope.heatMap = new google.maps.visualization.HeatmapLayer(
    {
      data: $scope.heatmapData,
      dissipating: true,
      maxIntensity: 110,
      radius: ((($( window ).width() / $scope.hResolution) + ($( window ).height() / $scope.vResolution)) / 1.8),
      opacity: 0.33
    });
    
    /* Draw haet map in current map */
    $scope.heatMap.setMap($scope.currMap);
  }
  else
  {                
    updateMap($scope);
  }
}

function selectOptionsController($scope)
{
  $scope.technologies = [{name:'2G'}, {name:'3G'}, {name:'4G'}, {name:'5G'}, {name:'All'}];
  $scope.operators = [{name:'Cellone'}, {name:'Airtel'}, {name:'Aircel'}, {name:'Idea'}, {name:'All'}];
  $scope.datasets = [{name:'Local'}, {name:'Global'}, {name:'All'}];
}

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