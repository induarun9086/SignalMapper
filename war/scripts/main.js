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
  var currHoriLngDelta  = (currMapWidth / $scope.vResolution);
  var currVertLatDelta  = (currMapHeight / $scope.hResolution);
  
  /* Clear existing map */
  if($scope.heatMap != null)
  {  
    $scope.heatMap.setMap(null);
  }
  
  /* Clear previous location array */
  locationArray = [];
  
  /* Build an array of locations in the current map view */
  location.lat = rightTopLat - (currVertLatDelta / 2);
  for(i=0;i<$scope.hResolution;i++)
  {
    location.lng = leftBotLng + (currHoriLngDelta / 2);
    for(j=0;j<$scope.vResolution;j++)
    {
      $scope.heatMapDataLoopI = i;
      $scope.heatMapDataLoopJ = j;
      
      $scope.locationArray.push({lat: location.lat, lng: location.lng});
      
      location.lng += currHoriLngDelta;
    }
    location.lat -= currVertLatDelta;
  }
  
  /* Get the signal data from the server and update the map in the callback */
  getSignalData($scope); 
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
    $scope.vResolution            = (($scope.hResolution) * ($( window ).width() / $( window ).height()));
    $scope.heatMapDataLoopI       = 0;
    $scope.heatMapDataLoopJ       = 0;
    $scope.pixelArea              = 0;
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
                                  
    google.maps.event.addListener($scope.currMap, 'bounds_changed', function() { updateMap($scope); });   
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

/*return Math.random();*/
/*return (($scope.heatMapDataLoopJ / $scope.hResolution)) *10 /*+ $scope.heatMapDataLoopJ) / ($scope.hResolution * $scope.vResolution)*/;
/*if($scope.heatMapDataLoopJ == 0)
return 0;
else 
return 10;*/