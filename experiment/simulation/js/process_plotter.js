
var plot = [];


function getPlotData(plotsObjNum) {


  var v = 0; 
  var p = 0; 
  var n = 0; 
  var sf = 1; 

  var numPlotPoints = plotsObj[plotsObjNum]['numberPoints'];
 
  var varNumbers = plotsObj[plotsObjNum]['var'];
  var numVar = varNumbers.length;
  var plotData = initPlotData(numVar,numPlotPoints)

 
  for (v = 0; v < numVar; v += 1) {
   
    n = varNumbers[v];
    for (p = 0; p <= numPlotPoints; p += 1) {
     
      if (plotsObj[plotsObjNum]['type'] == 'profile') {
        plotData[v][p][0] = profileData[n][p][0];
        plotData[v][p][1] = profileData[n][p][1]; 
      } else {
        plotData[v][p][0] = stripData[n][p][0]; 
        plotData[v][p][1] = stripData[n][p][1];
      }
    }
  }

  for (v = 0; v < numVar; v += 1) {
    sf = plotsObj[plotsObjNum]['varYscaleFactor'][v];
    if (sf != 1) {
      for (p = 0; p <= numPlotPoints; p += 1) {
        plotData[v][p][1] = sf * plotData[v][p][1];
      }
    }
  }

  return plotData;

} 


function plotPlotData(pData,pNumber) {



  var plotList = plotsObj[pNumber]['var'];
 

  var k = 0; 
  var v = 0; 
  var vLabel = []; 
  var yAxis = []; 
  var vShow = []; 
  plotList.forEach(fGetAxisData);
  function fGetAxisData(v,k) {
	  
    yAxis[k] = plotsObj[pNumber]['varYaxis'][k]; 
    vShow[k] = plotsObj[pNumber]['varShow'][k]; 
    vLabel[k] = plotsObj[pNumber]['varLabel'][k];
  }

  var plotCanvasHtmlID = plotsObj[pNumber]['canvas'];

  var dataToPlot = [];
  var numVar = plotList.length;
  var numToShow = 0; 

  for (k = 0; k < numVar; k += 1) {
    let newobj = {};
    if (vShow[k] === 'show') {
      newobj.data = pData[k];
      newobj.label = vLabel[k];
      if (yAxis[k] === 'right') {newobj.yaxis = 1;} else {newobj.yaxis = 2;}
      dataToPlot[k] = newobj;
    } else {
      newobj.data = [plotsObj[pNumber]['xAxisMax'],plotsObj[pNumber]['yLeftAxisMax']];
      newobj.label = vLabel[k];
      if (yAxis[k] === 'right') {newobj.yaxis = 1;} else {newobj.yaxis = 2;}
      dataToPlot[k] = newobj;
    }
  } 

  var xLabel = plotsObj[pNumber]['xAxisLabel'];;
  var xMin= plotsObj[pNumber]['xAxisMin'];
  var xMax = plotsObj[pNumber]['xAxisMax'];
  var yLeftLabel = plotsObj[pNumber]['yLeftAxisLabel'];
  var yLeftMin = plotsObj[pNumber]['yLeftAxisMin'];
  var yLeftMax = plotsObj[pNumber]['yLeftAxisMax'];
  var yRightLabel = plotsObj[pNumber]['yRightAxisLabel'];
  var yRightMin = plotsObj[pNumber]['yRightAxisMin'];
  var yRightMax = plotsObj[pNumber]['yRightAxisMax'];
  var plotLegendShow = plotsObj[pNumber]['plotLegendShow'];
  var plotLegendPosition = plotsObj[pNumber]['plotLegendPosition'];

  var options = {
   
    series: {
      lines: { show: false },
      points: { show: true,
                radius: 2,
                }
    },
    grid: { backgroundColor: 'white' },
    
    colors: ['Red','Blue'],
   
    axisLabels : {show: true},
    xaxes: [ { min: xMin, max: xMax, axisLabel: xLabel } ],
    yaxes: [
      
      {position: 'right', min: yRightMin, max: yRightMax, axisLabel: yRightLabel },
      {position: 'left', min: yLeftMin, max: yLeftMax, axisLabel: yLeftLabel },
    ],
    legend: {
      show: plotLegendShow,
      position: plotLegendPosition }
    };

 
  if (plotsObj[pNumber]['xAxisReversed']) {
    options.xaxis = {
      transform: function (v) { return -v; },
      inverseTransform: function (v) { return -v; }
    }
  }

   if (plotFlag[pNumber] == 0) {
    plotFlag[pNumber] = 1;
    plot[pNumber] = $.plot($(plotCanvasHtmlID), dataToPlot, options);
  } else {
    plot[pNumber].setData(dataToPlot);
    plot[pNumber].draw();
  }

} 
