var intiLat = 54.076806;
var initLng = 9.962961;

function getSignalWeight($scope, lat, lng, currHoriPixelLen, currVertPixelLen)
{
  return Math.random();
  /*return (($scope.heatMapDataLoopJ / $scope.hResolution)) *10 /*+ $scope.heatMapDataLoopJ) / ($scope.hResolution * $scope.vResolution)*/;
  /*if($scope.heatMapDataLoopJ == 0)
  return 0;
  else 
  return 10;*/
}

function updateMap($scope)
{
  var lat           = 0;
  var lng           = 0;
  
  var currBounds    = $scope.currMap.getBounds();
  
  var leftBotLat    = currBounds.getSouthWest().lat();
  var rightTopLat   = currBounds.getNorthEast().lat();
  var leftBotLng    = currBounds.getSouthWest().lng();
  var rightTopLng   = currBounds.getNorthEast().lng();
  
  var currMapWidth      = Math.abs(rightTopLng - leftBotLng);
  var currMapHeight     = Math.abs(rightTopLat - leftBotLat);
  var currHoriLngDelta  = (currMapWidth / $scope.vResolution);
  var currVertLatDelta  = (currMapHeight / $scope.hResolution);
  var currHoriPixelLen  = (currMapWidth / $scope.vResolution);
  var currVertPixelLen  = (currMapHeight / $scope.hResolution);
  
  var heatmapData   = [];
  
  lat = rightTopLat - (currVertLatDelta / 2);
  for(i=0;i<$scope.hResolution;i++)
  {
    lng = leftBotLng + (currHoriLngDelta / 2);
    for(j=0;j<$scope.vResolution;j++)
    {
      $scope.heatMapDataLoopI = i;
      $scope.heatMapDataLoopJ = j;
      
      var weightedLoc = 
      {
        location: new google.maps.LatLng(lat, lng),
        weight: getSignalWeight($scope, lat, lng, currHoriPixelLen, currVertPixelLen),
      }
      
      heatmapData.push(weightedLoc);
      
      lng += currHoriLngDelta;
    }
    lat -= currVertLatDelta;
  }
   
  if($scope.heatMap != null)
  {  
    $scope.heatMap.setMap(null);   
  }
  $scope.heatMap = new google.maps.visualization.HeatmapLayer(
  {
    data: heatmapData,
    dissipating: true,
    maxIntensity: 1,
    radius: ((($( window ).width() / $scope.hResolution) + ($( window ).height() / $scope.vResolution)) / 1.8),
    opacity: 0.33
  });
  $scope.heatMap.setMap($scope.currMap);
}

function updateMapController($scope)
{
  if(($scope.initDone == false) || ($scope.initDone == undefined))
  {
    $scope.initDone           = true;
    $scope.currQuantas        = null;
    $scope.currMap            = null;
    $scope.heatMap            = null;
    $scope.hResolution        = 16;
    $scope.vResolution        = (($scope.hResolution) * ($( window ).width() / $( window ).height()));
    $scope.heatMapDataLoopI   = 0;
    $scope.heatMapDataLoopJ   = 0;
    
    var mapOptions  = 
    {
      center: { lat: intiLat, lng: initLng},
      zoom: 18
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
