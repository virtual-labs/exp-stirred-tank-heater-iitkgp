
let reactor = {

  updateDisplayTimingMs : 100,
  reactantConcInitial : 1,
  reactImgCounter : 0,
  reactTimeSteps : 0,
  Trxr : 0,
  RateConst : 0,
  currentImage: '', 
  stateFlag : 1,

  

  openThisLab : function() {

    let el = document.querySelector("#div_PLOTDIV_reactor_contents");
    el.style.top = "129px";
    el.style.height = "70px";
    el.style.backgroundColor = "rgb(0,0,255)";

    reactor.fInitializePlot();

  }, 

  fInitializePlot : function() {


    let x = 0;
    let k = 0;
    for (k=0; k<=numProfilePts; k+=1) {

     
      x = 100 * k/numProfilePts;
      profileData[0][k][0] = x;
      profileData[1][k][0] = x;

      
      profileData[0][k][1] = -1;
      
      profileData[1][k][1] = -1;
    }

    reactor.fUpdatePlot();

  }, 
  fUpdatePlot : function() {
    
    let npl = Object.keys(plotsObj).length; 
    let p; 
    let data;
    for (p = 0; p < npl; p += 1) {
      data = getPlotData(p);
      plotPlotData(data,p);
    }
  }, 

  fChangeImage : function(imgName) {
    
    let tImage = document.querySelector("#image_reactor_fill");
    tImage.style.visibility = "hidden";
    tImage = document.querySelector("#image_reactor_mix_00");
    tImage.style.visibility = "hidden";
    tImage = document.querySelector("#image_reactor_mix_01");
    tImage.style.visibility = "hidden";
    tImage = document.querySelector("#image_reactor_empty");
    tImage.style.visibility = "hidden";
   
    tImage = document.querySelector(imgName);
    tImage.style.visibility = "visible";
    reactor.currentImage = imgName; 
  }, 

  fillReactor : function() {

    
    if (reactor.stateFlag !=5 && reactor.stateFlag !=6) {
      return;
    }
    reactor.stateFlag = 6;

    startDate = new Date(); 
    startMs = startDate.getTime();

    if (reactor.currentImage != "#image_reactor_fill") {
      reactor.fChangeImage("#image_reactor_fill");
    }

    let el = document.querySelector("#div_PLOTDIV_reactor_contents");
    
    let top = parseFloat(el.style.top); 
    let height = parseFloat(el.style.height); 
    
    if (height >= 70) {
      reactor.stateFlag = 1;
      reactor.fChangeImage("#image_reactor_mix_00");
      
      return;
    }

  
    reactor.reactantConc = reactor.reactantConcInitial;

     
    el.style.backgroundColor = "rgb(0, 0, 255)"; 

    el.style.top = top - 2 + 'px';
    height = height + 2;
    el.style.height = height + 'px';

    let thisDate = new Date();
    let currentMs = thisDate.getTime();
    let elapsedMs = currentMs - startMs;
    let updateMs = reactor.updateDisplayTimingMs - elapsedMs;
    setTimeout(reactor.fillReactor, updateMs);  

  }, 
  emptyReactor : function() {

   

    if (reactor.stateFlag == 1 || reactor.stateFlag == 3 || reactor.stateFlag == 4) {
      
    } else {
     
      return;
    }
    reactor.stateFlag = 4;

    startDate = new Date(); 
    startMs = startDate.getTime();

    if (reactor.currentImage != "#image_reactor_empty") {
      reactor.fChangeImage("#image_reactor_empty");
    }

    let el = document.querySelector("#div_PLOTDIV_reactor_contents");
  
    let top = parseFloat(el.style.top); 
    let height = parseFloat(el.style.height); 

    if (height > 2) {
     
    } else {
     
      reactor.stateFlag = 5;
      return;
    }

    el.style.top = top + 2 + 'px';
    height = height - 2;
    el.style.height = height + 'px';

    let thisDate = new Date();
    let currentMs = thisDate.getTime();
    let elapsedMs = currentMs - startMs;
    let updateMs = reactor.updateDisplayTimingMs - elapsedMs;
    setTimeout(reactor.emptyReactor, updateMs); 

  }, 

  fGetTrxr : function() {
    let varInputID = 'input_field_Trxr';
    if (reactor.stateFlag == 2) {
      
      document.getElementById(varInputID).value = reactor.Trxr;
      return;
    }
    let varValueOLD = reactor.Trxr; 
    let varValue = 0; 
    let varMin = 300;
    let varMax = 340;
    let varInitial = 320;
    if (document.getElementById(varInputID)) {
     
      varValue = document.getElementById(varInputID).value;
      varValue = Number(varValue); 
      if (isNaN(varValue)) {varValue = varInitial;} 
      if (varValue < varMin) {varValue = varMin;}
      if (varValue > varMax) {varValue = varMax;}
      document.getElementById(varInputID).value = varValue;
    } else {
    
      varValue = varInitial;
    }

    if (varValue == varValueOLD) {
      
    } else {
      reactor.fInitializePlot();
    }
   
    return(varValue);
  },

  runLoggerURL : "../webAppRunLog.lc",

  updateRunCount : function() {
   
    $.post(reactor.runLoggerURL,{webAppNumber: "home_reactor"})
      .done(
        function(data) {
          
        } 
      ) 
  }, 

  reactReactor : function() {

       
    if (reactor.stateFlag != 1) {
      
      return;
    }
   
    reactor.updateRunCount();
    reactor.Trxr = reactor.fGetTrxr();
    reactor.fInitializePlot();

    reactor.stateFlag = 2;
    reactor.reactantConc = reactor.reactantConcInitial;
    reactor.reactTimeSteps = 0;
    reactor.updateRunCount();

    profileData[0][0][1] = reactor.reactantConc;
    
    profileData[1][0][1] = 0;

    reactor.fUpdatePlot();

    
    let Rg = 8.31446e-3; 
    let Ea = 34; 
    let EaOverRg = Ea / Rg;
    let EaOverRg300 = EaOverRg / 300;
    let Kf300 = 0.15;
    reactor.RateConst = Kf300 * Math.exp(EaOverRg300 - EaOverRg/reactor.Trxr);

    reactor.reactReactorContinue();
  },

  reactReactorContinue : function() {

   
    if (reactor.stateFlag != 2) {
      
      return;
    }

   
    startDate = new Date();
    startMs = startDate.getTime();

   if (reactor.reactImgCounter < 2) {
      reactor.fChangeImage("#image_reactor_mix_00");
      reactor.reactImgCounter = reactor.reactImgCounter + 1;
    } else {
      reactor.fChangeImage("#image_reactor_mix_01");
      reactor.reactImgCounter = 0;
    }

    if (reactor.reactTimeSteps >= numProfilePts) {
      reactor.fChangeImage("#image_reactor_mix_00");
      reactor.stateFlag = 3;
     
      return;
    }

    let el = document.querySelector("#div_PLOTDIV_reactor_contents");
    
    reactor.reactTimeSteps = reactor.reactTimeSteps + 1;
    let dt = 0.075;
    reactor.reactantConc = reactor.reactantConc - reactor.RateConst * reactor.reactantConc * dt;

    let B = Math.round(255*reactor.reactantConc/reactor.reactantConcInitial); 
    let R = 255 - B; 
    let colorString = "rgb(" + R + ", 0, " + B + ")";

    el.style.backgroundColor = colorString; 

    profileData[0][reactor.reactTimeSteps][1] = reactor.reactantConc;
   
    profileData[1][reactor.reactTimeSteps][1] = reactor.reactantConcInitial - reactor.reactantConc;

    reactor.fUpdatePlot();

    let thisDate = new Date();
    let currentMs = thisDate.getTime();
    let elapsedMs = currentMs - startMs;
    let updateMs = reactor.updateDisplayTimingMs - elapsedMs;
    setTimeout(reactor.reactReactorContinue, updateMs); 

  } 
} 
