//It creates 2 lines chart when user selects sliders value clicks button to draw a custom chart
//var drawChart_onClick_file = require('./draw_chartLines.js'); // include core.js which contains all logic for drawing chart
//var drawChart_onClick_file = require('./core.js');



var toolTip_file = require('./creates_tooltip_array_from_json.js'); // define tooltips for each json point //adding to array tooltips
var drawAxis_file = require('./draw_Vert_Horiz_Axis.js');  //draw horizontal and vertical Axis
var drawXValues_file = require('./draw_X_values_text.js');  //Draw the X value texts, draw text values in horizont axis!!!!!!
var drawYValues_vertical_file = require('./draw_Y_values_vertical.js');  //Draw the X value texts, draw text values in vertical axis!!!!!!
var drawChartLines_file = require('./draw_chartLines.js');  //draw chart lines 
var addDots_file = require('./addHoverable_Dots.js');  //draw hoverable onClick_reDraws, if u hover over them-> tooltip will appear
var showTooltips_file = require('./showTooltip_onMouseOver.js');  //show Tooltips onMouseOver
var switchNightDay_file = require('./switchDayNightMode.js');  //switchDayNightMode

var seekBar_file = require('./Seek_bar_controls/seek_bar_ctr.js');  //display seekbar values in hidden SlidePanel 
var drawChart_onClick_file = require('./core_onClick.js');//draw a chart onClick with custom seekbar values




function core_onClick(){
  
 

 
 
 
 
	
//=====================================================

  //creates final jsonX array with X,Y custom values taken from sliders, colors are set manually, date is Unix of today and +1 day for every new iteration
  //in core.js we use the same structired array, but thete it is manually predefind, see example in core.js in {this.json = }
  //final jsonX structure->  jsonX = [ {columns: [{X: 0,Y: 40, date: 'today'}, {X: 2,Y: 130, date: 'today+1'}] ,color:'predefind'},  {obj2}];
  this.createChart_onClickkk = function(){
	  $("#drawChartonClick").click(function() {  
	  
	      
		  
	      //var arr1 = [];
		  //var arr2 = [];
		  
		  var columnArr = [];
		  var columnArr2 = [];
		  
		  var whole_object = {}; //first chart lines
		  var whole_object2 = {}; //second chart lines 
		  
		  
          //getting seekbar values
		  
	      //iteration over seekbars for the 1st chart and pushing values to object {whole_object}
	      for (var i = 0; i < $(".slider").length; i++) {
		      //arr1.push( $("#first_chart" + i).val() ); 
			  var objectX = {}; //creates empty object
			  var dayIncrement; //day in hours(i.e 24, 48, 72...)
			  objectX.X = i; //adds to objectX{X: i}
			  objectX.Y =$("#first_chart" + i).val(); //adds to objectX {Y: current slider value}
			  
			  var day = 24;
			  if(i == 0){
				 dayIncrement = day; 
			  } else if(i == 1){
				  dayIncrement = day * 2;
			  } else {
			     dayIncrement = day * i; //alert(dayIncrement);
			  }
			  
			  //objectX.date = Math.round(+new Date(new Date().getTime() + (24 * 60 * 60 * 1000)/1000)); //gets today Unixstamp  in 1st iteration and +1 day in every iteration 
			  objectX.date = Math.floor((Date.now() + /*24*/dayIncrement * 60 * 60 * 1000) / 1000);
			  columnArr.push(objectX); 
			  
			  //colors: '#3DC23F';
	      }
		  whole_object.columns = columnArr; //adds to whole_object{} key {columns} value columnArr
		  whole_object.colors = '#3DC23F'; //green
		  whole_object.names = 'namesX';
		  //arr1.push(whole_object);
	
	    //console.log(arr1);
		 
		 
	
	
	
	     //iteration over seekbars for the 2nd chart and pushing values to object {whole_object2}
	     for (var j = 0; j < $(".slider2").length; j++) {
		     //arr2.push( $("#second_chart" + j).val() );
              var objectX= {};  //creates empty object
			  var dayIncrement; //day in hours(i.e 24, 48, 72...)
			  objectX.X = j;  //adds to objectX{X: j}
			  objectX.Y =  $("#second_chart" + j).val();  //adds to objectX {Y: current slider value}
			  var day = 24;
			  if(j == 0){
				 dayIncrement = day; 
			  } else if(j == 1){
				  dayIncrement = day * 2;
			  } else {
			     dayIncrement = day * j; //alert(dayIncrement);
			  }
			  //objectX.date = Math.round(+new Date(new Date().getTime() + (dayIncrement * 60 * 60 * 1000)/1000)); //gets today Unixstamp  in 1st iteration and +1 day in every next iteration 
			  objectX.date = Math.floor((Date.now() + /*24*/dayIncrement * 60 * 60 * 1000) / 1000);
			  columnArr2.push(objectX);; 			 
	     }
	     //alert(arr2);
		  
		 whole_object2.columns = columnArr2;
		 whole_object2.colors = '#F34C44',  //red
		 whole_object2.names = 'namesX2';
	     //arr1.push(whole_object);
		 
		 
		 var jsonX = []; //final json array
	  jsonX.push(whole_object, whole_object2); //puts chart1 and chart2 objects to one array {jsonX}
		 console.log(jsonX);
		 exports.jsonnn = jsonX; //EXPORT VARIABLE, exports copy of jsonX(i.e to {draw_Vert_Horiz_Axis} Module)
		 
		document.getElementById("mySidepanel").style.width = "0"; //hides the slide panel
		 
		  //MODULE
		  //var coreZZ = new drawChart_onClick_file();
	      //coreZZ.draw_lines(jsonX);
		  //coreZZ.createChart();
		  
		  
		  //Init the drawing the chart with gotten {jsonX} as an arg
		  var coreIn = new onClick_reDraw();
		  coreIn.do_onClickkk(jsonX);
		  
		  
	});
	  
	  // **                                                                                  **
      // **************************************************************************************
      // **************************************************************************************
	  
   } //end this.CreateChart
   
   

   
 
 
 
    
	
//=====================================================================================================================================================	
	
	
	
	
	
	
	
    //actual copy from core.js with minimal edits, like {cc.clearRect(0, 0, graph.width, graph.height);} or {json} instead of (this.json)
    function onClick_reDraw(){
	
        this.do_onClickkk = function(jsonArg){
			
			
			//---------------------------------
	  var json, c, offsetX, offsetY, tipCanvas_2,tipCtx; //EXPORTS
	  exports.json = this.jsonArg; //exports json array (i.e to getMaxX Module)
  
  
	  
	  //alert(this.json[0].names);
	  //canvas with chart
      var graph = document.getElementById("graph");
      exports.c = graph.getContext("2d"); //EXPORT VARIABLE (i.e to {draw_Vert_Horiz_Axis} Module)
	  
	  //Mega Fix-> clears prev Canvas chart lines before onClick redrawing
	  const cc = graph.getContext("2d");
	  cc.clearRect(0, 0, graph.width, graph.height);
      //END Mega Fix-> clears prev Canvas chart lines before onClick redrawing
	  
	  
      //IF NOT IN Mobile, i.e on large screen, use special canvas width recalculation, on mobile left it as was (300x150).
      //U may not use it, but on desktop canvas chart will be too small, only 300x150
      if(screen.width >= 640){ 
          graph.width = window.innerWidth - 320; 
	      graph.height = window.innerHeight - 320;
      }

      

      //canvas with tooltips onClick_reDraw
      var tipCanvas = document.getElementById("tip");
      exports.tipCtx = tipCanvas.getContext("2d"); //EXPORT VARIABLE (i.e to {showTooltip_onMouseOver} Module)
	  
	  var canvasOffset = $("#graph").offset(); 
	  
      exports.offsetX = canvasOffset.left; //EXPORT VARIABLE (i.e to {showTooltip_onMouseOver} Module)
      exports.offsetY = canvasOffset.top;  //EXPORT VARIABLE (i.e to {showTooltip_onMouseOver} Module)
	  exports.tipCanvas_2 = tipCanvas;     //EXPORT VARIABLE (i.e to {showTooltip_onMouseOver} Module)

      var graph;
	  //var xPadding;
      exports.xPadding = 30; //left padding of scales axis  //EXPORT VARIABLE (i.e to {getXPixel} Module)
      /*var*/ exports.yPadding = 30; //EXPORT VARIABLE (i.e to {getYPixel} Module)
	  
	  
	  
	  
	  //MODULES Part----------
     // **************************************************************************************
     // **************************************************************************************
     //                                                                                     **  
	  
	  // define tooltips for each json point //adding to array tooltips
	  var createTooltipArray = new toolTip_file();
	  var tooltipResult = createTooltipArray.createArray(jsonArg); //tooltipResult =>tooltips array
	  console.log(tooltipResult);
	 

	  //draw horizontal and vertical Axis
	   var drawAxis = new drawAxis_file();
	   drawAxis.draw_XY_Axis();
	   
	  
	   //draw the X value texts, draw text values in horizont axis!!!!!!
	   var draw_X_text = new drawXValues_file();
	   draw_X_text.draw_X_value_text(tooltipResult); //the only way to pass var tooltips to this module //tooltipResult =>tooltips array
	   
	   //draw the Y value texts, draw text values invertical axis!!!!!!
	   var draw_Y_text = new drawYValues_vertical_file();
	   draw_Y_text.draw_Y_value_text(); //the only way to pass var tooltips to this module
	   
	   // Draw the CHART graph Lines
	    var draw_chartLines = new drawChartLines_file();
	    draw_chartLines.draw_lines(jsonArg); 
		
		
		//draw hoverable dots, if u hover over them-> tooltip will appear
	    var draw_dots = new addDots_file();
	    draw_dots.addHoverableDots(jsonArg);
		
		//showTooltip_onMouseOver
	    var showTooltips = new showTooltips_file();
	    showTooltips.dispalyTooltips(tooltipResult); //tooltipResult =>tooltips array
		
		
		// Switch day/night mode
	    var switchMode = new switchNightDay_file();
	    switchMode.switchMode(); 
		
		
		//display seekbar values in hidden SlidePanel
	    var seekBar_control = new seekBar_file();
	    seekBar_control.getSBar_values(); 
		
		
		//draw a chart onClick with custom seekbar values
	    //var drawChartonClickk = new drawChart_onClick_file();
	    //drawChartonClickk.createChart_onClickkk(); 
			
			//---------------------------------
		}
	}
   
   
   
   
   
} //end function ALL

module.exports = core_onClick;