

let numProfileVars = 2;
let numProfilePts = 100;


let numStripVars = 0;
let numStripPts = 0;


let plotsObj = new Object();



plotsObj[0] = new Object();
plotsObj[0]['name'] = 'Reactor Concentrations';
plotsObj[0]['type'] = 'profile';
plotsObj[0]['canvas'] = '#div_PLOTDIV_conc_plot';
plotsObj[0]['numberPoints'] = numProfilePts;

plotsObj[0]['xAxisLabel'] = 'time';
plotsObj[0]['xAxisMin'] = 0;
plotsObj[0]['xAxisMax'] = 100;
plotsObj[0]['xAxisReversed'] = 0; 
plotsObj[0]['yLeftAxisLabel'] = 'concentration';
plotsObj[0]['yLeftAxisMin'] = 0;
plotsObj[0]['yLeftAxisMax'] = 1;
plotsObj[0]['yRightAxisLabel'] = '';
plotsObj[0]['yRightAxisMin'] = 0;
plotsObj[0]['yRightAxisMax'] = 1;
plotsObj[0]['plotLegendShow'] = false; 
plotsObj[0]['plotLegendPosition'] = 'ne';
plotsObj[0]['var'] = new Array();
  plotsObj[0]['var'][0] = 1; 
  plotsObj[0]['var'][1] = 0; 
plotsObj[0]['varLabel'] = new Array();
  plotsObj[0]['varLabel'][0] = 'product';
  plotsObj[0]['varLabel'][1] = 'reactant';
plotsObj[0]['varShow'] = new Array();
  plotsObj[0]['varShow'][0] = 'show'; 
  plotsObj[0]['varShow'][1] = 'show';
plotsObj[0]['varYaxis'] = new Array();
  plotsObj[0]['varYaxis'][0] = 'left'; 
  plotsObj[0]['varYaxis'][1] = 'left';
plotsObj[0]['varYscaleFactor'] = new Array();
  plotsObj[0]['varYscaleFactor'][0] = 1; 
  plotsObj[0]['varYscaleFactor'][1] = 1;


let npl = Object.keys(plotsObj).length; 
let p; 
let plotFlag = [0];
for (p = 1; p < npl; p += 1) {
  plotFlag.push(0);
}

function initPlotData(numVar,numPlotPoints) {
 
  let v;
  let p;
  let plotDataStub = new Array();
  for (v = 0; v < numVar; v += 1) {
    plotDataStub[v] = new Array();
    for (p = 0; p <= numPlotPoints; p += 1) { 
      plotDataStub[v][p] = new Array();
      plotDataStub[v][p][0] = 0;
      plotDataStub[v][p][1] = 0;
    }
  }
  return plotDataStub;
  
} 


let profileData = initPlotData(numProfileVars,numProfilePts); 
let stripData = initPlotData(numStripVars,numStripPts); 
