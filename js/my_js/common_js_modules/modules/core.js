//Contains all logic for drawing the whole chart(lines, dots, axis, tooltips). Runs on load based on predifined here json[] array.

var toolTip_file = require('./creates_tooltip_array_from_json.js'); // define tooltips for each json point //adding to array tooltips
var drawAxis_file = require('./draw_Vert_Horiz_Axis.js');  //draw horizontal and vertical Axis
var drawXValues_file = require('./draw_X_values_text.js');  //Draw the X value texts, draw text values in horizont axis!!!!!!
var drawYValues_vertical_file = require('./draw_Y_values_vertical.js');  //Draw the X value texts, draw text values in vertical axis!!!!!!
var drawChartLines_file = require('./draw_chartLines.js');  //draw chart lines 
var addDots_file = require('./addHoverable_Dots.js');  //draw hoverable dots, if u hover over them-> tooltip will appear
var showTooltips_file = require('./showTooltip_onMouseOver.js');  //show Tooltips onMouseOver
var switchNightDay_file = require('./switchDayNightMode.js');  //switchDayNightMode

var seekBar_file = require('./Seek_bar_controls/seek_bar_ctr.js');  //display seekbar values in hidden SlidePanel 
var drawChart_onClick_file = require('./core_onClick.js');//draw a chart onClick with custom seekbar values


function core(){
	
	
	
  
  //Json data array
  this.json =	[
    { //chart 1
      columns: [  {X: 0,Y: 40, date: 1551398400 /*i.e 1.03.2019*/}, {X: 2,Y: 130, date: 1551484800}, {X: 3,Y: 244, date: 1551571200}, {X: 4,Y: 120, date: 1551657600}, {X: 5,Y: 60, date: 1551744000/*5.03.19*/}, {X: 6,Y: 120, date: 1551830400}, {X: 7,Y: 69, date: 1551916800}],
	  types: 'line',
	  colors: '#3DC23F',  //green
	  names: 'namesX'
	},
	
	{ //chart 2
      columns: [  {X: 0,Y: 28, date: 1551398400 /*i.e 1.03.2019*/}, {X: 2,Y: 70, date: 1551484800}, {X: 3,Y: 88, date: 1551571200}, {X: 4,Y: 62, date: 1551657600}, {X: 5,Y: 45, date: 1551744000/*5.03.19*/}, {X: 6,Y: 40, date: 1551830400}, {X: 7,Y:40, date: 1551916800}],
	  types: 'line',
	  colors: '#F34C44',  //red
	  names: 'namesX2'
	},
  ],

	
//=====================================================

	
  this.createChart = function(){
	  
	var json, c, offsetX, offsetY, tipCanvas_2,tipCtx; //EXPORTS
	exports.json = this.json; //exports json array (i.e to getMaxX Module)
  
  
	  
	  //alert(this.json[0].names);
	  //canvas with chart
      var graph = document.getElementById("graph");
      exports.c = graph.getContext("2d"); //EXPORT VARIABLE (i.e to {draw_Vert_Horiz_Axis} Module)

      //IF NOT IN Mobile, i.e on large screen, use special canvas width recalculation, on mobile left it as was (300x150).
      //U may not use it, but on desktop canvas chart will be too small, only 300x150
      if(screen.width >= 640){ 
          graph.width = window.innerWidth - 320; 
	      graph.height = window.innerHeight - 320;
      }

      

      //canvas with tooltips dot
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
	  var tooltipResult = createTooltipArray.createArray(this.json); //tooltipResult =>tooltips array
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
	    draw_chartLines.draw_lines(this.json); 
		
		
		//draw hoverable dots, if u hover over them-> tooltip will appear
	    var draw_dots = new addDots_file();
	    draw_dots.addHoverableDots(this.json);
		
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
	    var drawChartonClickk = new drawChart_onClick_file();
	    drawChartonClickk.createChart_onClickkk(); 
	  
	  // **                                                                                  **
      // **************************************************************************************
      // **************************************************************************************
	  
   } //end this.CreateChart
   
   

   
   
   
   
   
   
   
} //end function ALL

module.exports = core;