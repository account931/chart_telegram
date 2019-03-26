//It creates 2 lines chart when user selects sliders value clicks button to draw a custom chart
//var drawChart_onClick_file = require('./draw_chartLines.js'); // include core.js which contains all logic for drawing chart
//var drawChart_onClick_file = require('./core.js');



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




function core_onClick(){
  
 

	
//=====================================================

	
  this.createChart_onClickkk = function(){
	  $("#drawChartonClick").click(function() {  
	  
	      
		  
	      //var arr1 = [];
		  //var arr2 = [];
		  
		  var columnArr = [];
		  var columnArr2 = [];
		  
		  var whole_object = {};
		  var whole_object2 = {};
          //getting seekbar values
		  
	      //iteration over seekbars for the 1st chart
	      for (var i = 0; i < $(".slider").length; i++) {
		      //arr1.push( $("#first_chart" + i).val() ); 
			  var objectX = {}; //creates empty object
			  objectX.X = i; //adds to objectX{X: i}
			  objectX.Y =$("#first_chart" + i).val(); //adds to objectX{Y: slider value}
			  objectX.date = Math.round(+new Date(new Date().getTime() + (24 * 60 * 60 * 1000)/1000)); //gets today Unixstamp  in 1st iteration and +1 day in every iteration 
			  columnArr.push(objectX); 
			  
			  //colors: '#3DC23F';
	      }
		  whole_object.columns = columnArr;
		  whole_object.colors = '#3DC23F'; //green
		  whole_object.names = 'namesX';
		  //arr1.push(whole_object);
	
	    //console.log(arr1);
		 
		 
	
	     //iteration over seekbars for the 2nd chart
	     for (var j = 0; j < $(".slider2").length; j++) {
		     //arr2.push( $("#second_chart" + j).val() );
              var objectX= {};
			  objectX.X = j;
			  objectX.Y =  $("#second_chart" + j).val();
			  objectX.date = Math.round(+new Date(new Date().getTime() + (24 * 60 * 60 * 1000)/1000)); //gets today Unixstamp  in 1st iteration and +1 day in every iteration 
			  columnArr2.push(objectX);; 			 
	     }
	     //alert(arr2);
		  
		 whole_object2.columns = columnArr2;
		 whole_object2.colors = '#F34C44',  //red
		 whole_object2.names = 'namesX2';
	     //arr1.push(whole_object);
		 
		 
		 var jsonX = [];
		 jsonX.push(whole_object, whole_object2);
		 console.log(jsonX);
		 exports.jsonnn = jsonX; //EXPORT VARIABLE (i.e to {draw_Vert_Horiz_Axis} Module)
		 
		document.getElementById("mySidepanel").style.width = "0"; //hides the slide panel
		 
		  //MODULE
		  //var coreZZ = new drawChart_onClick_file();
	      //coreZZ.draw_lines(jsonX);
		  //coreZZ.createChart();
		  
		  var coreIn = new doT();
		  coreIn.do_onClickkk(jsonX);
		  
		  
	});
	  
	  // **                                                                                  **
      // **************************************************************************************
      // **************************************************************************************
	  
   } //end this.CreateChart
   
   

   
 
 
 
    
	
	
	
	
	
	
	
	
	
	
    function doT(){
	
        this.do_onClickkk = function(json){
			
			
			//---------------------------------
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
	  var tooltipResult = createTooltipArray.createArray(json); //tooltipResult =>tooltips array
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
	    draw_chartLines.draw_lines(json); 
		
		
		//draw hoverable dots, if u hover over them-> tooltip will appear
	    var draw_dots = new addDots_file();
	    draw_dots.addHoverableDots(json);
		
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