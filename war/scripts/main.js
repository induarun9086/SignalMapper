var intiLat = 54.076806;
var initLng = 9.962961;

function updateMap($scope)
{
  var lat           = 0;
  var lng           = 0;
  
  var currBounds    = $scope.currMap.getBounds();
  
  var leftBotLat    = currBounds.getSouthWest().lat();
  var rightTopLat   = currBounds.getNorthEast().lat();
  var leftBotLng    = currBounds.getSouthWest().lng();
  var rightTopLng   = currBounds.getNorthEast().lng();
  
  var currMapWidth  = Math.abs(rightTopLng - leftBotLng);
  var currMapHeight = Math.abs(rightTopLat - leftBotLat);
  
  var currPrecision = currMapWidth;
  var heatmapData   = [];
  
  lat = leftBotLat + ((currMapHeight / $scope.resolution) / 2);
  for(i=0;i<$scope.resolution;i++)
  {
    lng = leftBotLng + ((currMapWidth / $scope.resolution) / 2);
    for(j=0;j<$scope.resolution;j++)
    {
      var weightedLoc = 
      {
        location: new google.maps.LatLng(lat, lng),
        weight: Math.random(),
      }
      
      heatmapData.push(weightedLoc);
      
      lng += currMapWidth / $scope.resolution;
    }
    lat += currMapHeight / $scope.resolution;
  }
   
  if($scope.heatMap != null)
  {  
    $scope.heatMap.setMap(null);   
  }
  $scope.heatMap = new google.maps.visualization.HeatmapLayer(
  {
    data: heatmapData,
    dissipating: false,
    radius: 1,
    opacity: 0.27
  });
  $scope.heatMap.setMap($scope.currMap);
}

function updateMapController($scope)
{
  if(($scope.initDone == false) || ($scope.initDone == undefined))
  {
    $scope.initDone    = true;
    $scope.currQuantas = null;
    $scope.currMap     = null;
    $scope.heatMap     = null;
    $scope.resolution  = 50;
    
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

