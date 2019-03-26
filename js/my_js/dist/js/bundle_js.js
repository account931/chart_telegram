(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

var test_file = require('./modules/test.js');
var core_file = require('./modules/core.js');





$(document).ready(function(){

    //var test = new test_file();
	//test.loadExampleCoordinates();
	
	var main = new core_file();
	main.createChart();
	

	
	
	
	
	
	
	




// END READY
});



},{"./modules/core.js":5,"./modules/test.js":18}],2:[function(require,module,exports){
//it detects changes over sliders for chart1 and chart2 and html() <span> with relevant sliders values
//var json_var = require('./core.js'); //IMPORT VARIABLE {json}

function seek_bar_ctr(){
	
  //this.coordinatesSet =	"it is test, CommonJS works",

	
  this.getSBar_values = function(){ 
  
    //iteration over seekbars for the 1st chart
	for (var i = 0; i < $(".slider").length; i++) {
		(function(ix) { //shooters
	        $("#first_chart" + ix).change(function(){  		
                $("#first_demo" + ix).html(this.value);  //var t = $("#demo" + i); alert(t);
            });
		})(i); //end shooters
	}
	
	
	
	  //iteration over seekbars for the 2nd chart
	for (var j = 0; j < $(".slider2").length; j++) {
		(function(ix) { //shooters
	        $("#second_chart" + ix).change(function(){  		
                $("#second_demo" + ix).html(this.value);  //var t = $("#demo" + i); alert(t);
            });
		})(j); //end shooters
	}
	
	
	
	
	
  }    
}

module.exports = seek_bar_ctr;
},{}],3:[function(require,module,exports){
var core_var = require('./core.js'); //IMPORT VARIABLES {c, xPadding,yPadding} from core.js
//var getMaxY_file = require('./getMaxY.js');
//var convertDate_file = require('./convertDateStamp.js');
var getYPixel_file = require('./getYPixel.js'); // Return the Y pixel for a graph point->function getXPixel(){
var getXPixel_file = require('./getXPixel.js'); // Return the X pixel for a graph point->function getXPixel(){


//draw hoverable dots, if u hover over them-> tooltip will appear
function addHoverable_Dots(){
	


    this.addHoverableDots = function(json){ 
	
      //start import Vars from core.js************
      var c = core_var.c; //IMPORT VAR {c} fom core.js
	  //var xPadding = core_var.xPadding; //IMPORT VAR {xPAdding} from core.js
	  //END  import Vars from core.js*************
	  
      c.fillStyle = '#333'; //grey

      for (var i = 0; i < json.length; i++) {
	     for (var j = 0; j < json[i].columns.length; j++) {
            c.beginPath();
            c.arc(new getXPixel_file().getXPixel3(json[i].columns[j].X), new getYPixel_file().getYPixel3(json[i].columns[j].Y), 8/*Radius*/, 0, Math.PI * 2, true);
            c.fill();
	     }
      }


  }    
}

module.exports = addHoverable_Dots;
},{"./core.js":5,"./getXPixel.js":14,"./getYPixel.js":15}],4:[function(require,module,exports){
var core_var = require('./core.js'); //IMPORT VARIABLES {c, xPadding,yPadding} from core.js
//var getMaxX_file = require('./getMaxX.js');


//converts Unix to normal. To use one same function we use the 2nd arg {tag}, if it is set in calling function, function returns short date, i.e {1.03}
function convertDateStampt(){
	

 
  this.funct_convert_dateStamp = function(dateStampp, tag){   //arg(UnixStamp, true/false)
  
      //start import Vars from core.js
      var c = core_var.c; //IMPORT VAR {c} fom core.js
	  //var xPadding = core_var.xPadding; //IMPORT VAR {xPAdding} fom core.js
	  var yPadding = core_var.yPadding; //IMPORT VAR {yPAdding} fom core.js
	  //END  import Vars from core.js
	  
	  
  var n;
  var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  var dateTime =  new Date(dateStampp*1000);//Mega Error, must be {dateStampp*1000}, was without *1000
  var curr_date = dateTime.getDate(); //gets the date
  var curr_month = dateTime.getMonth();// gets month //+ 1;  
  var curr_year = dateTime.getFullYear();
  var dayOfWeek = weekdays[dateTime.getDay()]; //day of the week
  
  //if 2nd arg isset, when calling the function, rerurns short date, i.e {1.03}. Used in Y axis
  if(tag){
	  curr_month = curr_month + 1;  //month + 1
	  if(curr_month.toString().length == 1){ //if month int is of one length, add "0"
		 curr_month = "0" + curr_month; //i.e "03"
	  }
	  n = curr_date + "." + curr_month; //returns 1.03
	  
  //if 2nd arg is NOT set, returns full date, i.e  {Sat, 3 March}. Used in tooltips
  } else {
      n = dayOfWeek + ", " + monthList[curr_month] + " " + curr_date/* + "-" + curr_year*/; //returns Sat, 3 March
  }

  return n;
	  

  }    
}

module.exports = convertDateStampt;
},{"./core.js":5}],5:[function(require,module,exports){
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
},{"./Seek_bar_controls/seek_bar_ctr.js":2,"./addHoverable_Dots.js":3,"./core_onClick.js":6,"./creates_tooltip_array_from_json.js":7,"./draw_Vert_Horiz_Axis.js":8,"./draw_X_values_text.js":9,"./draw_Y_values_vertical.js":10,"./draw_chartLines.js":11,"./showTooltip_onMouseOver.js":16,"./switchDayNightMode.js":17}],6:[function(require,module,exports){
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
},{"./Seek_bar_controls/seek_bar_ctr.js":2,"./addHoverable_Dots.js":3,"./core_onClick.js":6,"./creates_tooltip_array_from_json.js":7,"./draw_Vert_Horiz_Axis.js":8,"./draw_X_values_text.js":9,"./draw_Y_values_vertical.js":10,"./draw_chartLines.js":11,"./showTooltip_onMouseOver.js":16,"./switchDayNightMode.js":17}],7:[function(require,module,exports){
var getXPixel_file = require('./getXPixel.js');
var getYPixel_file = require('./getYPixel.js');

function creates_tooltip_array_from_json(){


	
  this.createArray = function(json){
	  var getXPixel_file2 = new getXPixel_file(); //Module
	  var getYPixel_file2 = new getYPixel_file(); //Module
	  
	  //var cv; var g = "ggg";
	  //exports.cv = g ;
	  //alert(g);
      //define tooltips for each json point //adding to array tooltips
	  
      var tooltips = [];
	  //var tooltips4;
	  //exports.tooltips4 = [4,4]; //tooltips;
	  

      //it works, creates an array with objects for tooltips, creates in format [{x:$, y:$, rXr;$, tip:$}, {x:$, y:$, rXr;$, tip:$}]
      //(90% copied from variant for 1 chart, just added additional inner for loop {for (var j = 0; j < json[i].columns.length; j++)}
      for (var i = 0; i < json.length; i++) {
	     for (var j = 0; j < json[i].columns.length; j++) {
	         var statusX;
			 //define value for status
	         if(i % 2 !=0){
				 statusX = "Left";
			 } else {
			     statusX ="Joined";
			 } 
	  
             tooltips.push({
                 x: getXPixel_file2.getXPixel3(json[i].columns[j].X),
                 y: getYPixel_file2.getYPixel3(json[i].columns[j].Y),
                 r: 4,
                 rXr: 16,
                 colors: "red", //NOT USED???
                 tip: json[i].columns[j].Y,  //"#text" + (i + 1)  //Mega error was here //text of tooltip,
		         dateZ: json[i].columns[j].date, //
		         status: statusX // 1st or 2nd chart. Joined/Left
             });
			 
	      }
      }
      //console.log(tooltips);
	  return tooltips;
   }
}

module.exports = creates_tooltip_array_from_json;
},{"./getXPixel.js":14,"./getYPixel.js":15}],8:[function(require,module,exports){
var core_var = require('./core.js'); //IMPORT VARIABLES {c, xPadding,yPadding} from core.js


function draw_Vert_Horiz_Axis(){
	

	
  this.draw_XY_Axis = function(){ 
      //start import Vars from core.js
      var c = core_var.c; //IMPORT VAR {c} fom core.js
	  var xPadding = core_var.xPadding; //IMPORT VAR {xPAdding} fom core.js
	  var yPadding = core_var.yPadding; //IMPORT VAR {yPAdding} fom core.js
	  //END  import Vars from core.js
	  
	  c.lineWidth = 2; //width of XY axis scale
      c.strokeStyle = '#333';
      c.font = 'italic 8pt sans-serif';
      c.textAlign = "center";

     // Draw the axises scales
     c.beginPath();
     c.moveTo(xPadding, 0);
     c.lineTo(xPadding, graph.height - yPadding);
     c.lineTo(graph.width, graph.height - yPadding);
     c.stroke();

  }    
}

module.exports = draw_Vert_Horiz_Axis;
},{"./core.js":5}],9:[function(require,module,exports){
var core_var = require('./core.js'); //IMPORT VARIABLES {c, xPadding,yPadding} from core.js
var getMaxX_file = require('./getMaxX.js');
var convertDate_file = require('./convertDateStamp.js');
var getXPixel_file = require('./getXPixel.js'); // Return the X pixel for a graph point->function getXPixel(){
var tooltip_var = require('./creates_tooltip_array_from_json.js'); //IMPORT VARIABLES {tooltips } from creates_tooltip_array_from_json.js


 //Draw the X value texts, draw text values in horizont axis!!!!!!
function draw_X_values_text(){
	

 
  this.draw_X_value_text = function(tooltips){ 
  
      //start import Vars from core.js
      var c = core_var.c; //IMPORT VAR {c} fom core.js
	  //var xPadding = core_var.xPadding; //IMPORT VAR {xPAdding} from core.js
	  var yPadding = core_var.yPadding; //IMPORT VAR {yPAdding} from core.js
	  //var tooltips = tooltip_var.tooltips4; //IMPORT VAR {tooltip} from creates_tooltip_array_from_json.js
	  //alert("tool " + tooltip_var.cv);
	  //END  import Vars from core.js
	  
	
	  var maxXValue = new getMaxX_file().getMaxX(); 
      for (var i = 0; i <= maxXValue -1; i++) { //was originally (var i = 0; i <= maxXValue; i++), use -1 strictly for cases with dates
        // uses json.values[i].X
	    //To use one same function{funct_convert_dateStamp} to reurn diff values,we use the 2nd arg {tag(true)}, if it is set in calling function, function returns short date, i.e {1.03}
        c.fillText(/*i*/ new convertDate_file().funct_convert_dateStamp(tooltips[i].dateZ, true) , new getXPixel_file().getXPixel3(i), graph.height - yPadding + 20);
      }
  }    
}

module.exports = draw_X_values_text;
},{"./convertDateStamp.js":4,"./core.js":5,"./creates_tooltip_array_from_json.js":7,"./getMaxX.js":12,"./getXPixel.js":14}],10:[function(require,module,exports){
var core_var = require('./core.js'); //IMPORT VARIABLES {c, xPadding,yPadding} from core.js
var getMaxY_file = require('./getMaxY.js');
//var convertDate_file = require('./convertDateStamp.js');
var getYPixel_file = require('./getYPixel.js'); // Return the Y pixel for a graph point->function getXPixel(){



// Draw the Y value texts, text in vertical axis
function draw_Y_values_vertical(){
	


  this.draw_Y_value_text = function(tooltips){ 
  
      //start import Vars from core.js
      var c = core_var.c; //IMPORT VAR {c} fom core.js
	  var xPadding = core_var.xPadding; //IMPORT VAR {xPAdding} from core.js
	  //END  import Vars from core.js
	  
	
	  c.textAlign = "right"
      c.textBaseline = "middle";

      for (var i = 0; i < (new getMaxY_file().getMaxY2() + 50); i += 50) { //my add {+50}
         c.fillText(i, xPadding - 10, new getYPixel_file().getYPixel3(i)); //do not change 10
      }

      c.strokeStyle = '#f00';

  }    
}

module.exports = draw_Y_values_vertical;
},{"./core.js":5,"./getMaxY.js":13,"./getYPixel.js":15}],11:[function(require,module,exports){
//it draws chart lines 

var core_var = require('./core.js'); //IMPORT VARIABLES {c, xPadding,yPadding} from core.js
var getMaxY_file = require('./getMaxY.js');
//var convertDate_file = require('./convertDateStamp.js');
var getYPixel_file = require('./getYPixel.js'); // Return the Y pixel for a graph point->function getXPixel(){
var getXPixel_file = require('./getXPixel.js'); // Return the X pixel for a graph point->function getXPixel(){


// Draw t
function draw_chartLines(){
	


    this.draw_lines = function(json){
		
      //start import Vars from core.js*********
      var c = core_var.c; //IMPORT VAR {c} fom core.js
	  //var xPadding = core_var.xPadding; //IMPORT VAR {xPAdding} from core.js
	  //END  import Vars from core.js*********
	  
	  c.beginPath();
	  for (var i = 0; i < json.length; i++) { // was i=1

      //(function(iZ) {  //shooters, or u can just use {let i = 1} in loop instead of shooters
      //alert("iZ-> " + iZ);
    
          for (var j = 0; j < json[i].columns.length; j++) {
	        (function(ix, p) {  //shooters, or u can just use {let i = 1} in loop instead of shooters //ix is {i}, p is {j} //SHOOTER is a must otherwise it jumps to last i at once
	           setTimeout(function() {
	         
			     //alert("ix-> " + ix + " j-> " + p);
			 
			     //Mega Fix, sets the path to start position, out of for loop it was not working
			     //sets the path to start position in a very first iteration 
			     if(p == 0 ){ 
					 c.beginPath(); //mega fix to draw different colorss lines
				     c.moveTo(new getXPixel_file().getXPixel3(json[ix].columns[0].X), new getYPixel_file().getYPixel3(json[ix].columns[0].Y));
			     }
			 
			 
	             //alert(ix);
		         //alert(json.values[ix].X + "  and " +  json.values[ix].Y + " i->" + ix);
			 
			     //all other iterations starting from 2nd, draw lines with {c.lineTo}
				 
		         c.lineTo(new getXPixel_file().getXPixel3(json[ix].columns[p].X), new getYPixel_file().getYPixel3(json[ix].columns[p].Y)); 
				 c.strokeStyle = json[ix].colors ;
				 
		         c.stroke(); //stroke() method to actually draw the path on the canvas.
				 
		         //c.clearRect(0,0,graph.width,graph.height);
		         //drawChart();
		         //setTimeout(getDrawer(i), 1000);
		         //setTimeout(getDrawer(i), 1000);
		     
			 
			     //timeX = ix * p;
			 
	        }, /*ix*/1 * 500);
	    })(i, j); // end shooters 


        //c.lineTo(getXPixel(json.values[i].X), getYPixel(json.values[i].Y));
        }
     //})(i); // end shooters 
    }

	//draw "Followers text"
    c.font = "20px Georgia";
    c.fillText("Followers", 130, 20);
  }    
  
  

}

module.exports = draw_chartLines;
},{"./core.js":5,"./getMaxY.js":13,"./getXPixel.js":14,"./getYPixel.js":15}],12:[function(require,module,exports){
var json_var = require('./core.js'); //IMPORT VARIABLE {json}

function getMaxX(){
	
  //this.coordinatesSet =	"it is test, CommonJS works",

	
  this.getMaxX = function(){
	  // Returns the max X value in our json list!
	 var json = json_var.json;
      var max = 0;
      for (var i = 0; i < json.length; i++) {
		 for (var j = 0; j < json[i].columns.length; j++) {
              if (json[i].columns[j].X > max) {
                  max = json[i].columns[j].X;
              }
          }
	  }
    // omited
    //max += 10 - max % 10;
	//alert("max " + max)
    return max;

  }    
}

module.exports = getMaxX;
},{"./core.js":5}],13:[function(require,module,exports){
var json_var = require('./core.js'); //IMPORT VARIABLE {json}

function getMaxY(){
	
  //this.coordinatesSet =	"it is test, CommonJS works",

	
  this.getMaxY2 = function(){
	  var max = 0;
	  var json = json_var.json;
      for (var i = 0; i < json.length; i++) {
	    for (var j = 0; j < json[i].columns.length; j++) {
            if (json[i].columns[j].Y > max) {
                max = json[i].columns[j].Y;
            }
	    }
    }
	//alert("max-> " + max);
    max += 10 - max % 10;
    return max;
  }    
}

module.exports = getMaxY;
},{"./core.js":5}],14:[function(require,module,exports){
var getMaxX_file = require('./getMaxX.js');
var XP_var = require('./core.js'); //IMPORT VARIABLE {xPadding}

// Return the X pixel for a graph point
function getXPixel(){
	
  //this.coordinatesSet =	"it is test, CommonJS works",

  this.getXPixel3 = function(val){
	  var getMaxX = new getMaxX_file(); //Module
	  
     // Return the x pixel for a graph point
    // uses the getMaxX() function
    return ((graph.width - XP_var.xPadding) / (getMaxX.getMaxX() + 1)) * val + (XP_var.xPadding * 1.5);
    // was
    //return ((graph.width - xPadding) / getMaxX()) * val + (xPadding * 1.5);
  }
}
module.exports = getXPixel;
},{"./core.js":5,"./getMaxX.js":12}],15:[function(require,module,exports){
var getMaxY_file = require('./getMaxY.js');
var XP_var = require('./core.js'); //IMPORT VARIABLE {xPadding}
//import {xPadding} from './core';

// Return the y pixel for a graph point
function getYPixel(){
	

  this.getYPixel3 = function(val){
      var getMaxY = new getMaxY_file(); //Module
	  
      // uses the getMaxX() function
      return graph.height - (((graph.height - XP_var.yPadding) / (getMaxY.getMaxY2() + 50)) * val) - XP_var.yPadding; //my add {+50}
    
  }
}
module.exports = getYPixel;
},{"./core.js":5,"./getMaxY.js":13}],16:[function(require,module,exports){
var core_var = require('./core.js'); //IMPORT VARIABLES {c, xPadding,yPadding} from core.js
//var getMaxY_file = require('./getMaxY.js');
//var convertDate_file = require('./convertDateStamp.js');
var getYPixel_file = require('./getYPixel.js'); // Return the Y pixel for a graph point->function getXPixel(){
var getXPixel_file = require('./getXPixel.js'); // Return the X pixel for a graph point->function getXPixel(){
var convertDate_file = require('./convertDateStamp.js');


//shows tooltip onMouse over
function showTooltip_onMouseOver(){
//----------------------------------------------------------------------------------------------------------------------------	


    this.dispalyTooltips = function(toolz){   //args(tooplips array)
      // request mousemove events
      $("#graph").mousemove(function (e) {
		  var onMouseOver_file = new onMouseOver();//uses other module in this very file
          onMouseOver_file.handleMouseMoveAction(e, toolz); //args(mouse event, tooplips array)
      });

  }  
}

//----------------------------------------------------------------------------------------------------------------------------
  
  
function onMouseOver(){
	
    this.handleMouseMoveAction = function(e, tooltips){ //args(mouse event, tooplips array)
		
	     //start import Vars from core.js************
         var c = core_var.c; //IMPORT VAR {c} fom core.js
	     var offsetX = core_var.offsetX; //IMPORT VAR {offsetX} from core.js
		 var offsetY = core_var.offsetY; //IMPORT VAR {offsetX} from core.js
		 var tipCanvas = core_var.tipCanvas_2; //IMPORT VAR {tipCanvas.} from core.js
		 var tipCtx = core_var.tipCtx; //IMPORT VAR {tipCanvas.} from core.js
	     //END  import Vars from core.js*************
		 
		 //alert("off " + offsetY);
		 mouseX = parseInt(e.clientX - offsetX);
         mouseY = parseInt(e.clientY - offsetY); 

    // Put your mousemove stuff here
    var hit = false;
    for (var i = 0; i < tooltips.length; i++) { //alert(tooltips.length);
        var dot = tooltips[i];
        var dx = mouseX - dot.x;
        var dy = mouseY - dot.y; 
		//alert(dx * dx + dy * dy);
        if (dx * dx + dy * dy < tooltips[i].rXr) {
			
			//Mine
			$("#tip").show(300); //show tooltip, by default in css: display: none. Is made to fix overlaping an empty tooltip
			
            tipCanvas.style.left = (tooltips[i].x) + "px"; //tooltip margin left
            tipCanvas.style.top = (tooltips[i].y - 40) + "px";  //tooltip margin bottom
            tipCtx.clearRect(0, 0, tipCanvas.width, tipCanvas.height ); //clearRect(marginLeft, width, height)
            //                  tipCtx.rect(0,0,tipCanvas.width,tipCanvas.height);
			
			//define tooltip text
			var toolTipText_date = new convertDate_file().funct_convert_dateStamp(tooltips[i].dateZ) ; //converts dateUnix to normal
			//alert(toolTipText_date);
            var toolTipText_text = tooltips[i].tip + " " + tooltips[i].status ;  //defines tip + status, i.e "40 Left"
            if(tooltips[i].status == "Joined"){
				textcolors = "green";
			} else {
				textcolors = "red";
			}				
			
			tipCtx.fillStyle = "black"; //set initial text colors to black
			
			//in mobile only. Here we specify fonr-size and text paddings for mobile devices
			if(screen.width <= 640){ 
			    tipCtx.font = "45px Arial"; //set font size
				tipCtx.textAlign = "center"; //set text to center, in order to center horiz, there must be 150 in .fillText(text, 150, paddingTop) // 150 is the anchor point
				tipCtx.fillText(/*$(dot.tip).val()*/toolTipText_date, 150, 65); //(text, paddingLeft, paddingTop)  // Tooltip Date
				//tipCtx.fillText("______", 25, 75);
				tipCtx.fillStyle = textcolors; //set text colors
				tipCtx.font = "60px Arial"; //set font size
				tipCtx.fillText(toolTipText_text, 150, 135);  //Tooltip text, i.e "40 Left"
			} else {
				//desktop
				tipCtx.font = "40px Arial"; //set font size
				tipCtx.textAlign = "center"; //set text to center, in order to center horiz, there must be 150 in .fillText(text, 150, paddingTop) // 150 is the anchor point
                tipCtx.fillText(/*$(dot.tip).val()*/toolTipText_date, 159, 45); //(text, paddingLeft, paddingTop)(was 45, 45)
				//tipCtx.fillText("____________________", 1, 50);
				tipCtx.fillStyle = textcolors; //set text colors
				tipCtx.fillText(toolTipText_text, 150, 105); //Tooltip text, i.e "40 Left" (was 70, 105)
			}
            hit = true;
        } /*else {
			$("#tip").hide(800);
		}*/
    }
    if (!hit) {
        tipCanvas.style.left = "-1000px";  //was 200px, this solution fixes bug when tooltip appears in left empty if not mouse overed
    }
	}




  
}

module.exports = showTooltip_onMouseOver;
},{"./convertDateStamp.js":4,"./core.js":5,"./getXPixel.js":14,"./getYPixel.js":15}],17:[function(require,module,exports){
//var core_var = require('./core.js'); //IMPORT VARIABLES {c, xPadding,yPadding} from core.js
//var getMaxY_file = require('./getMaxY.js');
//var convertDate_file = require('./convertDateStamp.js');
//var getYPixel_file = require('./getYPixel.js'); // Return the Y pixel for a graph point->function getXPixel(){
//var getXPixel_file = require('./getXPixel.js'); // Return the X pixel for a graph point->function getXPixel(){


// Draw the Y value texts, text in vertical axis
function switchDayNightMode(){
	


    this.switchMode = function(){ 
      //start import Vars from core.js
      //var c = core_var.c; //IMPORT VAR {c} fom core.js
	  //var xPadding = core_var.xPadding; //IMPORT VAR {xPAdding} from core.js
	  //END  import Vars from core.js
	  
	  $("#changeMode").click(function() { 

        if($("#changeMode").html() == "Night mode"){
		  $("#changeMode").html("Day mode");
		  $("body").css("background-color", "grey");
	    } else {
		  $("#changeMode").html("Night mode");
		  $("body").css("background-color", "white");
	    }
     });


  }    
}

module.exports = switchDayNightMode;
},{}],18:[function(require,module,exports){
function test(){
	
  this.coordinatesSet =	"it is test, CommonJS works",

	
  this.loadExampleCoordinates = function(){
	  //$("#coordsInput").val(this.coordinatesSet); //  was \n  in the  end 
	  alert(this.coordinatesSet);
   }
}

module.exports = test;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tYWluLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9TZWVrX2Jhcl9jb250cm9scy9zZWVrX2Jhcl9jdHIuanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tb2R1bGVzL2FkZEhvdmVyYWJsZV9Eb3RzLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9jb252ZXJ0RGF0ZVN0YW1wLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9jb3JlLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9jb3JlX29uQ2xpY2suanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tb2R1bGVzL2NyZWF0ZXNfdG9vbHRpcF9hcnJheV9mcm9tX2pzb24uanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tb2R1bGVzL2RyYXdfVmVydF9Ib3Jpel9BeGlzLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9kcmF3X1hfdmFsdWVzX3RleHQuanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tb2R1bGVzL2RyYXdfWV92YWx1ZXNfdmVydGljYWwuanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tb2R1bGVzL2RyYXdfY2hhcnRMaW5lcy5qcyIsImpzL215X2pzL2NvbW1vbl9qc19tb2R1bGVzL21vZHVsZXMvZ2V0TWF4WC5qcyIsImpzL215X2pzL2NvbW1vbl9qc19tb2R1bGVzL21vZHVsZXMvZ2V0TWF4WS5qcyIsImpzL215X2pzL2NvbW1vbl9qc19tb2R1bGVzL21vZHVsZXMvZ2V0WFBpeGVsLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9nZXRZUGl4ZWwuanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tb2R1bGVzL3Nob3dUb29sdGlwX29uTW91c2VPdmVyLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9zd2l0Y2hEYXlOaWdodE1vZGUuanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tb2R1bGVzL3Rlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25PQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXHJcbnZhciB0ZXN0X2ZpbGUgPSByZXF1aXJlKCcuL21vZHVsZXMvdGVzdC5qcycpO1xyXG52YXIgY29yZV9maWxlID0gcmVxdWlyZSgnLi9tb2R1bGVzL2NvcmUuanMnKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAgIC8vdmFyIHRlc3QgPSBuZXcgdGVzdF9maWxlKCk7XHJcblx0Ly90ZXN0LmxvYWRFeGFtcGxlQ29vcmRpbmF0ZXMoKTtcclxuXHRcclxuXHR2YXIgbWFpbiA9IG5ldyBjb3JlX2ZpbGUoKTtcclxuXHRtYWluLmNyZWF0ZUNoYXJ0KCk7XHJcblx0XHJcblxyXG5cdFxyXG5cdFxyXG5cdFxyXG5cdFxyXG5cdFxyXG5cdFxyXG5cdFxyXG5cclxuXHJcblxyXG5cclxuLy8gRU5EIFJFQURZXHJcbn0pO1xyXG5cclxuXHJcbiIsIi8vaXQgZGV0ZWN0cyBjaGFuZ2VzIG92ZXIgc2xpZGVycyBmb3IgY2hhcnQxIGFuZCBjaGFydDIgYW5kIGh0bWwoKSA8c3Bhbj4gd2l0aCByZWxldmFudCBzbGlkZXJzIHZhbHVlc1xyXG4vL3ZhciBqc29uX3ZhciA9IHJlcXVpcmUoJy4vY29yZS5qcycpOyAvL0lNUE9SVCBWQVJJQUJMRSB7anNvbn1cclxuXHJcbmZ1bmN0aW9uIHNlZWtfYmFyX2N0cigpe1xyXG5cdFxyXG4gIC8vdGhpcy5jb29yZGluYXRlc1NldCA9XHRcIml0IGlzIHRlc3QsIENvbW1vbkpTIHdvcmtzXCIsXHJcblxyXG5cdFxyXG4gIHRoaXMuZ2V0U0Jhcl92YWx1ZXMgPSBmdW5jdGlvbigpeyBcclxuICBcclxuICAgIC8vaXRlcmF0aW9uIG92ZXIgc2Vla2JhcnMgZm9yIHRoZSAxc3QgY2hhcnRcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8ICQoXCIuc2xpZGVyXCIpLmxlbmd0aDsgaSsrKSB7XHJcblx0XHQoZnVuY3Rpb24oaXgpIHsgLy9zaG9vdGVyc1xyXG5cdCAgICAgICAgJChcIiNmaXJzdF9jaGFydFwiICsgaXgpLmNoYW5nZShmdW5jdGlvbigpeyAgXHRcdFxyXG4gICAgICAgICAgICAgICAgJChcIiNmaXJzdF9kZW1vXCIgKyBpeCkuaHRtbCh0aGlzLnZhbHVlKTsgIC8vdmFyIHQgPSAkKFwiI2RlbW9cIiArIGkpOyBhbGVydCh0KTtcclxuICAgICAgICAgICAgfSk7XHJcblx0XHR9KShpKTsgLy9lbmQgc2hvb3RlcnNcclxuXHR9XHJcblx0XHJcblx0XHJcblx0XHJcblx0ICAvL2l0ZXJhdGlvbiBvdmVyIHNlZWtiYXJzIGZvciB0aGUgMm5kIGNoYXJ0XHJcblx0Zm9yICh2YXIgaiA9IDA7IGogPCAkKFwiLnNsaWRlcjJcIikubGVuZ3RoOyBqKyspIHtcclxuXHRcdChmdW5jdGlvbihpeCkgeyAvL3Nob290ZXJzXHJcblx0ICAgICAgICAkKFwiI3NlY29uZF9jaGFydFwiICsgaXgpLmNoYW5nZShmdW5jdGlvbigpeyAgXHRcdFxyXG4gICAgICAgICAgICAgICAgJChcIiNzZWNvbmRfZGVtb1wiICsgaXgpLmh0bWwodGhpcy52YWx1ZSk7ICAvL3ZhciB0ID0gJChcIiNkZW1vXCIgKyBpKTsgYWxlcnQodCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cdFx0fSkoaik7IC8vZW5kIHNob290ZXJzXHJcblx0fVxyXG5cdFxyXG5cdFxyXG5cdFxyXG5cdFxyXG5cdFxyXG4gIH0gICAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc2Vla19iYXJfY3RyOyIsInZhciBjb3JlX3ZhciA9IHJlcXVpcmUoJy4vY29yZS5qcycpOyAvL0lNUE9SVCBWQVJJQUJMRVMge2MsIHhQYWRkaW5nLHlQYWRkaW5nfSBmcm9tIGNvcmUuanNcclxuLy92YXIgZ2V0TWF4WV9maWxlID0gcmVxdWlyZSgnLi9nZXRNYXhZLmpzJyk7XHJcbi8vdmFyIGNvbnZlcnREYXRlX2ZpbGUgPSByZXF1aXJlKCcuL2NvbnZlcnREYXRlU3RhbXAuanMnKTtcclxudmFyIGdldFlQaXhlbF9maWxlID0gcmVxdWlyZSgnLi9nZXRZUGl4ZWwuanMnKTsgLy8gUmV0dXJuIHRoZSBZIHBpeGVsIGZvciBhIGdyYXBoIHBvaW50LT5mdW5jdGlvbiBnZXRYUGl4ZWwoKXtcclxudmFyIGdldFhQaXhlbF9maWxlID0gcmVxdWlyZSgnLi9nZXRYUGl4ZWwuanMnKTsgLy8gUmV0dXJuIHRoZSBYIHBpeGVsIGZvciBhIGdyYXBoIHBvaW50LT5mdW5jdGlvbiBnZXRYUGl4ZWwoKXtcclxuXHJcblxyXG4vL2RyYXcgaG92ZXJhYmxlIGRvdHMsIGlmIHUgaG92ZXIgb3ZlciB0aGVtLT4gdG9vbHRpcCB3aWxsIGFwcGVhclxyXG5mdW5jdGlvbiBhZGRIb3ZlcmFibGVfRG90cygpe1xyXG5cdFxyXG5cclxuXHJcbiAgICB0aGlzLmFkZEhvdmVyYWJsZURvdHMgPSBmdW5jdGlvbihqc29uKXsgXHJcblx0XHJcbiAgICAgIC8vc3RhcnQgaW1wb3J0IFZhcnMgZnJvbSBjb3JlLmpzKioqKioqKioqKioqXHJcbiAgICAgIHZhciBjID0gY29yZV92YXIuYzsgLy9JTVBPUlQgVkFSIHtjfSBmb20gY29yZS5qc1xyXG5cdCAgLy92YXIgeFBhZGRpbmcgPSBjb3JlX3Zhci54UGFkZGluZzsgLy9JTVBPUlQgVkFSIHt4UEFkZGluZ30gZnJvbSBjb3JlLmpzXHJcblx0ICAvL0VORCAgaW1wb3J0IFZhcnMgZnJvbSBjb3JlLmpzKioqKioqKioqKioqKlxyXG5cdCAgXHJcbiAgICAgIGMuZmlsbFN0eWxlID0gJyMzMzMnOyAvL2dyZXlcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwganNvbi5sZW5ndGg7IGkrKykge1xyXG5cdCAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBqc29uW2ldLmNvbHVtbnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgYy5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgYy5hcmMobmV3IGdldFhQaXhlbF9maWxlKCkuZ2V0WFBpeGVsMyhqc29uW2ldLmNvbHVtbnNbal0uWCksIG5ldyBnZXRZUGl4ZWxfZmlsZSgpLmdldFlQaXhlbDMoanNvbltpXS5jb2x1bW5zW2pdLlkpLCA4LypSYWRpdXMqLywgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xyXG4gICAgICAgICAgICBjLmZpbGwoKTtcclxuXHQgICAgIH1cclxuICAgICAgfVxyXG5cclxuXHJcbiAgfSAgICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhZGRIb3ZlcmFibGVfRG90czsiLCJ2YXIgY29yZV92YXIgPSByZXF1aXJlKCcuL2NvcmUuanMnKTsgLy9JTVBPUlQgVkFSSUFCTEVTIHtjLCB4UGFkZGluZyx5UGFkZGluZ30gZnJvbSBjb3JlLmpzXHJcbi8vdmFyIGdldE1heFhfZmlsZSA9IHJlcXVpcmUoJy4vZ2V0TWF4WC5qcycpO1xyXG5cclxuXHJcbi8vY29udmVydHMgVW5peCB0byBub3JtYWwuIFRvIHVzZSBvbmUgc2FtZSBmdW5jdGlvbiB3ZSB1c2UgdGhlIDJuZCBhcmcge3RhZ30sIGlmIGl0IGlzIHNldCBpbiBjYWxsaW5nIGZ1bmN0aW9uLCBmdW5jdGlvbiByZXR1cm5zIHNob3J0IGRhdGUsIGkuZSB7MS4wM31cclxuZnVuY3Rpb24gY29udmVydERhdGVTdGFtcHQoKXtcclxuXHRcclxuXHJcbiBcclxuICB0aGlzLmZ1bmN0X2NvbnZlcnRfZGF0ZVN0YW1wID0gZnVuY3Rpb24oZGF0ZVN0YW1wcCwgdGFnKXsgICAvL2FyZyhVbml4U3RhbXAsIHRydWUvZmFsc2UpXHJcbiAgXHJcbiAgICAgIC8vc3RhcnQgaW1wb3J0IFZhcnMgZnJvbSBjb3JlLmpzXHJcbiAgICAgIHZhciBjID0gY29yZV92YXIuYzsgLy9JTVBPUlQgVkFSIHtjfSBmb20gY29yZS5qc1xyXG5cdCAgLy92YXIgeFBhZGRpbmcgPSBjb3JlX3Zhci54UGFkZGluZzsgLy9JTVBPUlQgVkFSIHt4UEFkZGluZ30gZm9tIGNvcmUuanNcclxuXHQgIHZhciB5UGFkZGluZyA9IGNvcmVfdmFyLnlQYWRkaW5nOyAvL0lNUE9SVCBWQVIge3lQQWRkaW5nfSBmb20gY29yZS5qc1xyXG5cdCAgLy9FTkQgIGltcG9ydCBWYXJzIGZyb20gY29yZS5qc1xyXG5cdCAgXHJcblx0ICBcclxuICB2YXIgbjtcclxuICB2YXIgd2Vla2RheXMgPSBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHVyJywgJ0ZyaScsICdTYXQnXTtcclxuICB2YXIgbW9udGhMaXN0ID0gW1wiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWF5XCIsIFwiSnVuXCIsIFwiSnVsXCIsIFwiQXVnXCIsIFwiU2VwXCIsIFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCJdO1xyXG4gIFxyXG4gIHZhciBkYXRlVGltZSA9ICBuZXcgRGF0ZShkYXRlU3RhbXBwKjEwMDApOy8vTWVnYSBFcnJvciwgbXVzdCBiZSB7ZGF0ZVN0YW1wcCoxMDAwfSwgd2FzIHdpdGhvdXQgKjEwMDBcclxuICB2YXIgY3Vycl9kYXRlID0gZGF0ZVRpbWUuZ2V0RGF0ZSgpOyAvL2dldHMgdGhlIGRhdGVcclxuICB2YXIgY3Vycl9tb250aCA9IGRhdGVUaW1lLmdldE1vbnRoKCk7Ly8gZ2V0cyBtb250aCAvLysgMTsgIFxyXG4gIHZhciBjdXJyX3llYXIgPSBkYXRlVGltZS5nZXRGdWxsWWVhcigpO1xyXG4gIHZhciBkYXlPZldlZWsgPSB3ZWVrZGF5c1tkYXRlVGltZS5nZXREYXkoKV07IC8vZGF5IG9mIHRoZSB3ZWVrXHJcbiAgXHJcbiAgLy9pZiAybmQgYXJnIGlzc2V0LCB3aGVuIGNhbGxpbmcgdGhlIGZ1bmN0aW9uLCByZXJ1cm5zIHNob3J0IGRhdGUsIGkuZSB7MS4wM30uIFVzZWQgaW4gWSBheGlzXHJcbiAgaWYodGFnKXtcclxuXHQgIGN1cnJfbW9udGggPSBjdXJyX21vbnRoICsgMTsgIC8vbW9udGggKyAxXHJcblx0ICBpZihjdXJyX21vbnRoLnRvU3RyaW5nKCkubGVuZ3RoID09IDEpeyAvL2lmIG1vbnRoIGludCBpcyBvZiBvbmUgbGVuZ3RoLCBhZGQgXCIwXCJcclxuXHRcdCBjdXJyX21vbnRoID0gXCIwXCIgKyBjdXJyX21vbnRoOyAvL2kuZSBcIjAzXCJcclxuXHQgIH1cclxuXHQgIG4gPSBjdXJyX2RhdGUgKyBcIi5cIiArIGN1cnJfbW9udGg7IC8vcmV0dXJucyAxLjAzXHJcblx0ICBcclxuICAvL2lmIDJuZCBhcmcgaXMgTk9UIHNldCwgcmV0dXJucyBmdWxsIGRhdGUsIGkuZSAge1NhdCwgMyBNYXJjaH0uIFVzZWQgaW4gdG9vbHRpcHNcclxuICB9IGVsc2Uge1xyXG4gICAgICBuID0gZGF5T2ZXZWVrICsgXCIsIFwiICsgbW9udGhMaXN0W2N1cnJfbW9udGhdICsgXCIgXCIgKyBjdXJyX2RhdGUvKiArIFwiLVwiICsgY3Vycl95ZWFyKi87IC8vcmV0dXJucyBTYXQsIDMgTWFyY2hcclxuICB9XHJcblxyXG4gIHJldHVybiBuO1xyXG5cdCAgXHJcblxyXG4gIH0gICAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY29udmVydERhdGVTdGFtcHQ7IiwiLy9Db250YWlucyBhbGwgbG9naWMgZm9yIGRyYXdpbmcgdGhlIHdob2xlIGNoYXJ0KGxpbmVzLCBkb3RzLCBheGlzLCB0b29sdGlwcykuIFJ1bnMgb24gbG9hZCBiYXNlZCBvbiBwcmVkaWZpbmVkIGhlcmUganNvbltdIGFycmF5LlxyXG5cclxudmFyIHRvb2xUaXBfZmlsZSA9IHJlcXVpcmUoJy4vY3JlYXRlc190b29sdGlwX2FycmF5X2Zyb21fanNvbi5qcycpOyAvLyBkZWZpbmUgdG9vbHRpcHMgZm9yIGVhY2gganNvbiBwb2ludCAvL2FkZGluZyB0byBhcnJheSB0b29sdGlwc1xyXG52YXIgZHJhd0F4aXNfZmlsZSA9IHJlcXVpcmUoJy4vZHJhd19WZXJ0X0hvcml6X0F4aXMuanMnKTsgIC8vZHJhdyBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBBeGlzXHJcbnZhciBkcmF3WFZhbHVlc19maWxlID0gcmVxdWlyZSgnLi9kcmF3X1hfdmFsdWVzX3RleHQuanMnKTsgIC8vRHJhdyB0aGUgWCB2YWx1ZSB0ZXh0cywgZHJhdyB0ZXh0IHZhbHVlcyBpbiBob3Jpem9udCBheGlzISEhISEhXHJcbnZhciBkcmF3WVZhbHVlc192ZXJ0aWNhbF9maWxlID0gcmVxdWlyZSgnLi9kcmF3X1lfdmFsdWVzX3ZlcnRpY2FsLmpzJyk7ICAvL0RyYXcgdGhlIFggdmFsdWUgdGV4dHMsIGRyYXcgdGV4dCB2YWx1ZXMgaW4gdmVydGljYWwgYXhpcyEhISEhIVxyXG52YXIgZHJhd0NoYXJ0TGluZXNfZmlsZSA9IHJlcXVpcmUoJy4vZHJhd19jaGFydExpbmVzLmpzJyk7ICAvL2RyYXcgY2hhcnQgbGluZXMgXHJcbnZhciBhZGREb3RzX2ZpbGUgPSByZXF1aXJlKCcuL2FkZEhvdmVyYWJsZV9Eb3RzLmpzJyk7ICAvL2RyYXcgaG92ZXJhYmxlIGRvdHMsIGlmIHUgaG92ZXIgb3ZlciB0aGVtLT4gdG9vbHRpcCB3aWxsIGFwcGVhclxyXG52YXIgc2hvd1Rvb2x0aXBzX2ZpbGUgPSByZXF1aXJlKCcuL3Nob3dUb29sdGlwX29uTW91c2VPdmVyLmpzJyk7ICAvL3Nob3cgVG9vbHRpcHMgb25Nb3VzZU92ZXJcclxudmFyIHN3aXRjaE5pZ2h0RGF5X2ZpbGUgPSByZXF1aXJlKCcuL3N3aXRjaERheU5pZ2h0TW9kZS5qcycpOyAgLy9zd2l0Y2hEYXlOaWdodE1vZGVcclxuXHJcbnZhciBzZWVrQmFyX2ZpbGUgPSByZXF1aXJlKCcuL1NlZWtfYmFyX2NvbnRyb2xzL3NlZWtfYmFyX2N0ci5qcycpOyAgLy9kaXNwbGF5IHNlZWtiYXIgdmFsdWVzIGluIGhpZGRlbiBTbGlkZVBhbmVsIFxyXG52YXIgZHJhd0NoYXJ0X29uQ2xpY2tfZmlsZSA9IHJlcXVpcmUoJy4vY29yZV9vbkNsaWNrLmpzJyk7Ly9kcmF3IGEgY2hhcnQgb25DbGljayB3aXRoIGN1c3RvbSBzZWVrYmFyIHZhbHVlc1xyXG5cclxuXHJcbmZ1bmN0aW9uIGNvcmUoKXtcclxuXHRcclxuXHRcclxuXHRcclxuICBcclxuICAvL0pzb24gZGF0YSBhcnJheVxyXG4gIHRoaXMuanNvbiA9XHRbXHJcbiAgICB7IC8vY2hhcnQgMVxyXG4gICAgICBjb2x1bW5zOiBbICB7WDogMCxZOiA0MCwgZGF0ZTogMTU1MTM5ODQwMCAvKmkuZSAxLjAzLjIwMTkqL30sIHtYOiAyLFk6IDEzMCwgZGF0ZTogMTU1MTQ4NDgwMH0sIHtYOiAzLFk6IDI0NCwgZGF0ZTogMTU1MTU3MTIwMH0sIHtYOiA0LFk6IDEyMCwgZGF0ZTogMTU1MTY1NzYwMH0sIHtYOiA1LFk6IDYwLCBkYXRlOiAxNTUxNzQ0MDAwLyo1LjAzLjE5Ki99LCB7WDogNixZOiAxMjAsIGRhdGU6IDE1NTE4MzA0MDB9LCB7WDogNyxZOiA2OSwgZGF0ZTogMTU1MTkxNjgwMH1dLFxyXG5cdCAgdHlwZXM6ICdsaW5lJyxcclxuXHQgIGNvbG9yczogJyMzREMyM0YnLCAgLy9ncmVlblxyXG5cdCAgbmFtZXM6ICduYW1lc1gnXHJcblx0fSxcclxuXHRcclxuXHR7IC8vY2hhcnQgMlxyXG4gICAgICBjb2x1bW5zOiBbICB7WDogMCxZOiAyOCwgZGF0ZTogMTU1MTM5ODQwMCAvKmkuZSAxLjAzLjIwMTkqL30sIHtYOiAyLFk6IDcwLCBkYXRlOiAxNTUxNDg0ODAwfSwge1g6IDMsWTogODgsIGRhdGU6IDE1NTE1NzEyMDB9LCB7WDogNCxZOiA2MiwgZGF0ZTogMTU1MTY1NzYwMH0sIHtYOiA1LFk6IDQ1LCBkYXRlOiAxNTUxNzQ0MDAwLyo1LjAzLjE5Ki99LCB7WDogNixZOiA0MCwgZGF0ZTogMTU1MTgzMDQwMH0sIHtYOiA3LFk6NDAsIGRhdGU6IDE1NTE5MTY4MDB9XSxcclxuXHQgIHR5cGVzOiAnbGluZScsXHJcblx0ICBjb2xvcnM6ICcjRjM0QzQ0JywgIC8vcmVkXHJcblx0ICBuYW1lczogJ25hbWVzWDInXHJcblx0fSxcclxuICBdLFxyXG5cclxuXHRcclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRcclxuICB0aGlzLmNyZWF0ZUNoYXJ0ID0gZnVuY3Rpb24oKXtcclxuXHQgIFxyXG5cdHZhciBqc29uLCBjLCBvZmZzZXRYLCBvZmZzZXRZLCB0aXBDYW52YXNfMix0aXBDdHg7IC8vRVhQT1JUU1xyXG5cdGV4cG9ydHMuanNvbiA9IHRoaXMuanNvbjsgLy9leHBvcnRzIGpzb24gYXJyYXkgKGkuZSB0byBnZXRNYXhYIE1vZHVsZSlcclxuICBcclxuICBcclxuXHQgIFxyXG5cdCAgLy9hbGVydCh0aGlzLmpzb25bMF0ubmFtZXMpO1xyXG5cdCAgLy9jYW52YXMgd2l0aCBjaGFydFxyXG4gICAgICB2YXIgZ3JhcGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdyYXBoXCIpO1xyXG4gICAgICBleHBvcnRzLmMgPSBncmFwaC5nZXRDb250ZXh0KFwiMmRcIik7IC8vRVhQT1JUIFZBUklBQkxFIChpLmUgdG8ge2RyYXdfVmVydF9Ib3Jpel9BeGlzfSBNb2R1bGUpXHJcblxyXG4gICAgICAvL0lGIE5PVCBJTiBNb2JpbGUsIGkuZSBvbiBsYXJnZSBzY3JlZW4sIHVzZSBzcGVjaWFsIGNhbnZhcyB3aWR0aCByZWNhbGN1bGF0aW9uLCBvbiBtb2JpbGUgbGVmdCBpdCBhcyB3YXMgKDMwMHgxNTApLlxyXG4gICAgICAvL1UgbWF5IG5vdCB1c2UgaXQsIGJ1dCBvbiBkZXNrdG9wIGNhbnZhcyBjaGFydCB3aWxsIGJlIHRvbyBzbWFsbCwgb25seSAzMDB4MTUwXHJcbiAgICAgIGlmKHNjcmVlbi53aWR0aCA+PSA2NDApeyBcclxuICAgICAgICAgIGdyYXBoLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSAzMjA7IFxyXG5cdCAgICAgIGdyYXBoLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDMyMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgXHJcblxyXG4gICAgICAvL2NhbnZhcyB3aXRoIHRvb2x0aXBzIGRvdFxyXG4gICAgICB2YXIgdGlwQ2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXBcIik7XHJcbiAgICAgIGV4cG9ydHMudGlwQ3R4ID0gdGlwQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKTsgLy9FWFBPUlQgVkFSSUFCTEUgKGkuZSB0byB7c2hvd1Rvb2x0aXBfb25Nb3VzZU92ZXJ9IE1vZHVsZSlcclxuXHQgIFxyXG5cdCAgdmFyIGNhbnZhc09mZnNldCA9ICQoXCIjZ3JhcGhcIikub2Zmc2V0KCk7IFxyXG5cdCAgXHJcbiAgICAgIGV4cG9ydHMub2Zmc2V0WCA9IGNhbnZhc09mZnNldC5sZWZ0OyAvL0VYUE9SVCBWQVJJQUJMRSAoaS5lIHRvIHtzaG93VG9vbHRpcF9vbk1vdXNlT3Zlcn0gTW9kdWxlKVxyXG4gICAgICBleHBvcnRzLm9mZnNldFkgPSBjYW52YXNPZmZzZXQudG9wOyAgLy9FWFBPUlQgVkFSSUFCTEUgKGkuZSB0byB7c2hvd1Rvb2x0aXBfb25Nb3VzZU92ZXJ9IE1vZHVsZSlcclxuXHQgIGV4cG9ydHMudGlwQ2FudmFzXzIgPSB0aXBDYW52YXM7ICAgICAvL0VYUE9SVCBWQVJJQUJMRSAoaS5lIHRvIHtzaG93VG9vbHRpcF9vbk1vdXNlT3Zlcn0gTW9kdWxlKVxyXG5cclxuICAgICAgdmFyIGdyYXBoO1xyXG5cdCAgLy92YXIgeFBhZGRpbmc7XHJcbiAgICAgIGV4cG9ydHMueFBhZGRpbmcgPSAzMDsgLy9sZWZ0IHBhZGRpbmcgb2Ygc2NhbGVzIGF4aXMgIC8vRVhQT1JUIFZBUklBQkxFIChpLmUgdG8ge2dldFhQaXhlbH0gTW9kdWxlKVxyXG4gICAgICAvKnZhciovIGV4cG9ydHMueVBhZGRpbmcgPSAzMDsgLy9FWFBPUlQgVkFSSUFCTEUgKGkuZSB0byB7Z2V0WVBpeGVsfSBNb2R1bGUpXHJcblx0ICBcclxuXHQgIFxyXG5cdCAgXHJcblx0ICBcclxuXHQgIC8vTU9EVUxFUyBQYXJ0LS0tLS0tLS0tLVxyXG4gICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqKiAgXHJcblx0ICBcclxuXHQgIC8vIGRlZmluZSB0b29sdGlwcyBmb3IgZWFjaCBqc29uIHBvaW50IC8vYWRkaW5nIHRvIGFycmF5IHRvb2x0aXBzXHJcblx0ICB2YXIgY3JlYXRlVG9vbHRpcEFycmF5ID0gbmV3IHRvb2xUaXBfZmlsZSgpO1xyXG5cdCAgdmFyIHRvb2x0aXBSZXN1bHQgPSBjcmVhdGVUb29sdGlwQXJyYXkuY3JlYXRlQXJyYXkodGhpcy5qc29uKTsgLy90b29sdGlwUmVzdWx0ID0+dG9vbHRpcHMgYXJyYXlcclxuXHQgIGNvbnNvbGUubG9nKHRvb2x0aXBSZXN1bHQpO1xyXG5cdCBcclxuXHJcblx0ICAvL2RyYXcgaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgQXhpc1xyXG5cdCAgIHZhciBkcmF3QXhpcyA9IG5ldyBkcmF3QXhpc19maWxlKCk7XHJcblx0ICAgZHJhd0F4aXMuZHJhd19YWV9BeGlzKCk7XHJcblx0ICAgXHJcblx0ICBcclxuXHQgICAvL2RyYXcgdGhlIFggdmFsdWUgdGV4dHMsIGRyYXcgdGV4dCB2YWx1ZXMgaW4gaG9yaXpvbnQgYXhpcyEhISEhIVxyXG5cdCAgIHZhciBkcmF3X1hfdGV4dCA9IG5ldyBkcmF3WFZhbHVlc19maWxlKCk7XHJcblx0ICAgZHJhd19YX3RleHQuZHJhd19YX3ZhbHVlX3RleHQodG9vbHRpcFJlc3VsdCk7IC8vdGhlIG9ubHkgd2F5IHRvIHBhc3MgdmFyIHRvb2x0aXBzIHRvIHRoaXMgbW9kdWxlIC8vdG9vbHRpcFJlc3VsdCA9PnRvb2x0aXBzIGFycmF5XHJcblx0ICAgXHJcblx0ICAgLy9kcmF3IHRoZSBZIHZhbHVlIHRleHRzLCBkcmF3IHRleHQgdmFsdWVzIGludmVydGljYWwgYXhpcyEhISEhIVxyXG5cdCAgIHZhciBkcmF3X1lfdGV4dCA9IG5ldyBkcmF3WVZhbHVlc192ZXJ0aWNhbF9maWxlKCk7XHJcblx0ICAgZHJhd19ZX3RleHQuZHJhd19ZX3ZhbHVlX3RleHQoKTsgLy90aGUgb25seSB3YXkgdG8gcGFzcyB2YXIgdG9vbHRpcHMgdG8gdGhpcyBtb2R1bGVcclxuXHQgICBcclxuXHQgICAvLyBEcmF3IHRoZSBDSEFSVCBncmFwaCBMaW5lc1xyXG5cdCAgICB2YXIgZHJhd19jaGFydExpbmVzID0gbmV3IGRyYXdDaGFydExpbmVzX2ZpbGUoKTtcclxuXHQgICAgZHJhd19jaGFydExpbmVzLmRyYXdfbGluZXModGhpcy5qc29uKTsgXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0Ly9kcmF3IGhvdmVyYWJsZSBkb3RzLCBpZiB1IGhvdmVyIG92ZXIgdGhlbS0+IHRvb2x0aXAgd2lsbCBhcHBlYXJcclxuXHQgICAgdmFyIGRyYXdfZG90cyA9IG5ldyBhZGREb3RzX2ZpbGUoKTtcclxuXHQgICAgZHJhd19kb3RzLmFkZEhvdmVyYWJsZURvdHModGhpcy5qc29uKTtcclxuXHRcdFxyXG5cdFx0Ly9zaG93VG9vbHRpcF9vbk1vdXNlT3ZlclxyXG5cdCAgICB2YXIgc2hvd1Rvb2x0aXBzID0gbmV3IHNob3dUb29sdGlwc19maWxlKCk7XHJcblx0ICAgIHNob3dUb29sdGlwcy5kaXNwYWx5VG9vbHRpcHModG9vbHRpcFJlc3VsdCk7IC8vdG9vbHRpcFJlc3VsdCA9PnRvb2x0aXBzIGFycmF5XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0Ly8gU3dpdGNoIGRheS9uaWdodCBtb2RlXHJcblx0ICAgIHZhciBzd2l0Y2hNb2RlID0gbmV3IHN3aXRjaE5pZ2h0RGF5X2ZpbGUoKTtcclxuXHQgICAgc3dpdGNoTW9kZS5zd2l0Y2hNb2RlKCk7IFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8vZGlzcGxheSBzZWVrYmFyIHZhbHVlcyBpbiBoaWRkZW4gU2xpZGVQYW5lbFxyXG5cdCAgICB2YXIgc2Vla0Jhcl9jb250cm9sID0gbmV3IHNlZWtCYXJfZmlsZSgpO1xyXG5cdCAgICBzZWVrQmFyX2NvbnRyb2wuZ2V0U0Jhcl92YWx1ZXMoKTsgXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0Ly9kcmF3IGEgY2hhcnQgb25DbGljayB3aXRoIGN1c3RvbSBzZWVrYmFyIHZhbHVlc1xyXG5cdCAgICB2YXIgZHJhd0NoYXJ0b25DbGlja2sgPSBuZXcgZHJhd0NoYXJ0X29uQ2xpY2tfZmlsZSgpO1xyXG5cdCAgICBkcmF3Q2hhcnRvbkNsaWNray5jcmVhdGVDaGFydF9vbkNsaWNra2soKTsgXHJcblx0ICBcclxuXHQgIC8vICoqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICoqXHJcbiAgICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0ICBcclxuICAgfSAvL2VuZCB0aGlzLkNyZWF0ZUNoYXJ0XHJcbiAgIFxyXG4gICBcclxuXHJcbiAgIFxyXG4gICBcclxuICAgXHJcbiAgIFxyXG4gICBcclxuICAgXHJcbiAgIFxyXG59IC8vZW5kIGZ1bmN0aW9uIEFMTFxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjb3JlOyIsIi8vSXQgY3JlYXRlcyAyIGxpbmVzIGNoYXJ0IHdoZW4gdXNlciBzZWxlY3RzIHNsaWRlcnMgdmFsdWUgY2xpY2tzIGJ1dHRvbiB0byBkcmF3IGEgY3VzdG9tIGNoYXJ0XHJcbi8vdmFyIGRyYXdDaGFydF9vbkNsaWNrX2ZpbGUgPSByZXF1aXJlKCcuL2RyYXdfY2hhcnRMaW5lcy5qcycpOyAvLyBpbmNsdWRlIGNvcmUuanMgd2hpY2ggY29udGFpbnMgYWxsIGxvZ2ljIGZvciBkcmF3aW5nIGNoYXJ0XHJcbi8vdmFyIGRyYXdDaGFydF9vbkNsaWNrX2ZpbGUgPSByZXF1aXJlKCcuL2NvcmUuanMnKTtcclxuXHJcblxyXG5cclxudmFyIHRvb2xUaXBfZmlsZSA9IHJlcXVpcmUoJy4vY3JlYXRlc190b29sdGlwX2FycmF5X2Zyb21fanNvbi5qcycpOyAvLyBkZWZpbmUgdG9vbHRpcHMgZm9yIGVhY2gganNvbiBwb2ludCAvL2FkZGluZyB0byBhcnJheSB0b29sdGlwc1xyXG52YXIgZHJhd0F4aXNfZmlsZSA9IHJlcXVpcmUoJy4vZHJhd19WZXJ0X0hvcml6X0F4aXMuanMnKTsgIC8vZHJhdyBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBBeGlzXHJcbnZhciBkcmF3WFZhbHVlc19maWxlID0gcmVxdWlyZSgnLi9kcmF3X1hfdmFsdWVzX3RleHQuanMnKTsgIC8vRHJhdyB0aGUgWCB2YWx1ZSB0ZXh0cywgZHJhdyB0ZXh0IHZhbHVlcyBpbiBob3Jpem9udCBheGlzISEhISEhXHJcbnZhciBkcmF3WVZhbHVlc192ZXJ0aWNhbF9maWxlID0gcmVxdWlyZSgnLi9kcmF3X1lfdmFsdWVzX3ZlcnRpY2FsLmpzJyk7ICAvL0RyYXcgdGhlIFggdmFsdWUgdGV4dHMsIGRyYXcgdGV4dCB2YWx1ZXMgaW4gdmVydGljYWwgYXhpcyEhISEhIVxyXG52YXIgZHJhd0NoYXJ0TGluZXNfZmlsZSA9IHJlcXVpcmUoJy4vZHJhd19jaGFydExpbmVzLmpzJyk7ICAvL2RyYXcgY2hhcnQgbGluZXMgXHJcbnZhciBhZGREb3RzX2ZpbGUgPSByZXF1aXJlKCcuL2FkZEhvdmVyYWJsZV9Eb3RzLmpzJyk7ICAvL2RyYXcgaG92ZXJhYmxlIGRvdHMsIGlmIHUgaG92ZXIgb3ZlciB0aGVtLT4gdG9vbHRpcCB3aWxsIGFwcGVhclxyXG52YXIgc2hvd1Rvb2x0aXBzX2ZpbGUgPSByZXF1aXJlKCcuL3Nob3dUb29sdGlwX29uTW91c2VPdmVyLmpzJyk7ICAvL3Nob3cgVG9vbHRpcHMgb25Nb3VzZU92ZXJcclxudmFyIHN3aXRjaE5pZ2h0RGF5X2ZpbGUgPSByZXF1aXJlKCcuL3N3aXRjaERheU5pZ2h0TW9kZS5qcycpOyAgLy9zd2l0Y2hEYXlOaWdodE1vZGVcclxuXHJcbnZhciBzZWVrQmFyX2ZpbGUgPSByZXF1aXJlKCcuL1NlZWtfYmFyX2NvbnRyb2xzL3NlZWtfYmFyX2N0ci5qcycpOyAgLy9kaXNwbGF5IHNlZWtiYXIgdmFsdWVzIGluIGhpZGRlbiBTbGlkZVBhbmVsIFxyXG52YXIgZHJhd0NoYXJ0X29uQ2xpY2tfZmlsZSA9IHJlcXVpcmUoJy4vY29yZV9vbkNsaWNrLmpzJyk7Ly9kcmF3IGEgY2hhcnQgb25DbGljayB3aXRoIGN1c3RvbSBzZWVrYmFyIHZhbHVlc1xyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gY29yZV9vbkNsaWNrKCl7XHJcbiAgXHJcbiBcclxuXHJcblx0XHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0XHJcbiAgdGhpcy5jcmVhdGVDaGFydF9vbkNsaWNra2sgPSBmdW5jdGlvbigpe1xyXG5cdCAgJChcIiNkcmF3Q2hhcnRvbkNsaWNrXCIpLmNsaWNrKGZ1bmN0aW9uKCkgeyAgXHJcblx0ICBcclxuXHQgICAgICBcclxuXHRcdCAgXHJcblx0ICAgICAgLy92YXIgYXJyMSA9IFtdO1xyXG5cdFx0ICAvL3ZhciBhcnIyID0gW107XHJcblx0XHQgIFxyXG5cdFx0ICB2YXIgY29sdW1uQXJyID0gW107XHJcblx0XHQgIHZhciBjb2x1bW5BcnIyID0gW107XHJcblx0XHQgIFxyXG5cdFx0ICB2YXIgd2hvbGVfb2JqZWN0ID0ge307XHJcblx0XHQgIHZhciB3aG9sZV9vYmplY3QyID0ge307XHJcbiAgICAgICAgICAvL2dldHRpbmcgc2Vla2JhciB2YWx1ZXNcclxuXHRcdCAgXHJcblx0ICAgICAgLy9pdGVyYXRpb24gb3ZlciBzZWVrYmFycyBmb3IgdGhlIDFzdCBjaGFydFxyXG5cdCAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJChcIi5zbGlkZXJcIikubGVuZ3RoOyBpKyspIHtcclxuXHRcdCAgICAgIC8vYXJyMS5wdXNoKCAkKFwiI2ZpcnN0X2NoYXJ0XCIgKyBpKS52YWwoKSApOyBcclxuXHRcdFx0ICB2YXIgb2JqZWN0WCA9IHt9OyAvL2NyZWF0ZXMgZW1wdHkgb2JqZWN0XHJcblx0XHRcdCAgb2JqZWN0WC5YID0gaTsgLy9hZGRzIHRvIG9iamVjdFh7WDogaX1cclxuXHRcdFx0ICBvYmplY3RYLlkgPSQoXCIjZmlyc3RfY2hhcnRcIiArIGkpLnZhbCgpOyAvL2FkZHMgdG8gb2JqZWN0WHtZOiBzbGlkZXIgdmFsdWV9XHJcblx0XHRcdCAgb2JqZWN0WC5kYXRlID0gTWF0aC5yb3VuZCgrbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoMjQgKiA2MCAqIDYwICogMTAwMCkvMTAwMCkpOyAvL2dldHMgdG9kYXkgVW5peHN0YW1wICBpbiAxc3QgaXRlcmF0aW9uIGFuZCArMSBkYXkgaW4gZXZlcnkgaXRlcmF0aW9uIFxyXG5cdFx0XHQgIGNvbHVtbkFyci5wdXNoKG9iamVjdFgpOyBcclxuXHRcdFx0ICBcclxuXHRcdFx0ICAvL2NvbG9yczogJyMzREMyM0YnO1xyXG5cdCAgICAgIH1cclxuXHRcdCAgd2hvbGVfb2JqZWN0LmNvbHVtbnMgPSBjb2x1bW5BcnI7XHJcblx0XHQgIHdob2xlX29iamVjdC5jb2xvcnMgPSAnIzNEQzIzRic7IC8vZ3JlZW5cclxuXHRcdCAgd2hvbGVfb2JqZWN0Lm5hbWVzID0gJ25hbWVzWCc7XHJcblx0XHQgIC8vYXJyMS5wdXNoKHdob2xlX29iamVjdCk7XHJcblx0XHJcblx0ICAgIC8vY29uc29sZS5sb2coYXJyMSk7XHJcblx0XHQgXHJcblx0XHQgXHJcblx0XHJcblx0ICAgICAvL2l0ZXJhdGlvbiBvdmVyIHNlZWtiYXJzIGZvciB0aGUgMm5kIGNoYXJ0XHJcblx0ICAgICBmb3IgKHZhciBqID0gMDsgaiA8ICQoXCIuc2xpZGVyMlwiKS5sZW5ndGg7IGorKykge1xyXG5cdFx0ICAgICAvL2FycjIucHVzaCggJChcIiNzZWNvbmRfY2hhcnRcIiArIGopLnZhbCgpICk7XHJcbiAgICAgICAgICAgICAgdmFyIG9iamVjdFg9IHt9O1xyXG5cdFx0XHQgIG9iamVjdFguWCA9IGo7XHJcblx0XHRcdCAgb2JqZWN0WC5ZID0gICQoXCIjc2Vjb25kX2NoYXJ0XCIgKyBqKS52YWwoKTtcclxuXHRcdFx0ICBvYmplY3RYLmRhdGUgPSBNYXRoLnJvdW5kKCtuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArICgyNCAqIDYwICogNjAgKiAxMDAwKS8xMDAwKSk7IC8vZ2V0cyB0b2RheSBVbml4c3RhbXAgIGluIDFzdCBpdGVyYXRpb24gYW5kICsxIGRheSBpbiBldmVyeSBpdGVyYXRpb24gXHJcblx0XHRcdCAgY29sdW1uQXJyMi5wdXNoKG9iamVjdFgpOzsgXHRcdFx0IFxyXG5cdCAgICAgfVxyXG5cdCAgICAgLy9hbGVydChhcnIyKTtcclxuXHRcdCAgXHJcblx0XHQgd2hvbGVfb2JqZWN0Mi5jb2x1bW5zID0gY29sdW1uQXJyMjtcclxuXHRcdCB3aG9sZV9vYmplY3QyLmNvbG9ycyA9ICcjRjM0QzQ0JywgIC8vcmVkXHJcblx0XHQgd2hvbGVfb2JqZWN0Mi5uYW1lcyA9ICduYW1lc1gyJztcclxuXHQgICAgIC8vYXJyMS5wdXNoKHdob2xlX29iamVjdCk7XHJcblx0XHQgXHJcblx0XHQgXHJcblx0XHQgdmFyIGpzb25YID0gW107XHJcblx0XHQganNvblgucHVzaCh3aG9sZV9vYmplY3QsIHdob2xlX29iamVjdDIpO1xyXG5cdFx0IGNvbnNvbGUubG9nKGpzb25YKTtcclxuXHRcdCBleHBvcnRzLmpzb25ubiA9IGpzb25YOyAvL0VYUE9SVCBWQVJJQUJMRSAoaS5lIHRvIHtkcmF3X1ZlcnRfSG9yaXpfQXhpc30gTW9kdWxlKVxyXG5cdFx0IFxyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteVNpZGVwYW5lbFwiKS5zdHlsZS53aWR0aCA9IFwiMFwiOyAvL2hpZGVzIHRoZSBzbGlkZSBwYW5lbFxyXG5cdFx0IFxyXG5cdFx0ICAvL01PRFVMRVxyXG5cdFx0ICAvL3ZhciBjb3JlWlogPSBuZXcgZHJhd0NoYXJ0X29uQ2xpY2tfZmlsZSgpO1xyXG5cdCAgICAgIC8vY29yZVpaLmRyYXdfbGluZXMoanNvblgpO1xyXG5cdFx0ICAvL2NvcmVaWi5jcmVhdGVDaGFydCgpO1xyXG5cdFx0ICBcclxuXHRcdCAgdmFyIGNvcmVJbiA9IG5ldyBkb1QoKTtcclxuXHRcdCAgY29yZUluLmRvX29uQ2xpY2trayhqc29uWCk7XHJcblx0XHQgIFxyXG5cdFx0ICBcclxuXHR9KTtcclxuXHQgIFxyXG5cdCAgLy8gKiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKipcclxuICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHQgIFxyXG4gICB9IC8vZW5kIHRoaXMuQ3JlYXRlQ2hhcnRcclxuICAgXHJcbiAgIFxyXG5cclxuICAgXHJcbiBcclxuIFxyXG4gXHJcbiAgICBcclxuXHRcclxuXHRcclxuXHRcclxuXHRcclxuXHRcclxuXHRcclxuXHRcclxuXHRcclxuXHRcclxuXHRcclxuICAgIGZ1bmN0aW9uIGRvVCgpe1xyXG5cdFxyXG4gICAgICAgIHRoaXMuZG9fb25DbGlja2trID0gZnVuY3Rpb24oanNvbil7XHJcblx0XHRcdFxyXG5cdFx0XHRcclxuXHRcdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQgIHZhciBqc29uLCBjLCBvZmZzZXRYLCBvZmZzZXRZLCB0aXBDYW52YXNfMix0aXBDdHg7IC8vRVhQT1JUU1xyXG5cdCAgZXhwb3J0cy5qc29uID0gdGhpcy5qc29uOyAvL2V4cG9ydHMganNvbiBhcnJheSAoaS5lIHRvIGdldE1heFggTW9kdWxlKVxyXG4gIFxyXG4gIFxyXG5cdCAgXHJcblx0ICAvL2FsZXJ0KHRoaXMuanNvblswXS5uYW1lcyk7XHJcblx0ICAvL2NhbnZhcyB3aXRoIGNoYXJ0XHJcbiAgICAgIHZhciBncmFwaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3JhcGhcIik7XHJcbiAgICAgIGV4cG9ydHMuYyA9IGdyYXBoLmdldENvbnRleHQoXCIyZFwiKTsgLy9FWFBPUlQgVkFSSUFCTEUgKGkuZSB0byB7ZHJhd19WZXJ0X0hvcml6X0F4aXN9IE1vZHVsZSlcclxuXHJcbiAgICAgIC8vSUYgTk9UIElOIE1vYmlsZSwgaS5lIG9uIGxhcmdlIHNjcmVlbiwgdXNlIHNwZWNpYWwgY2FudmFzIHdpZHRoIHJlY2FsY3VsYXRpb24sIG9uIG1vYmlsZSBsZWZ0IGl0IGFzIHdhcyAoMzAweDE1MCkuXHJcbiAgICAgIC8vVSBtYXkgbm90IHVzZSBpdCwgYnV0IG9uIGRlc2t0b3AgY2FudmFzIGNoYXJ0IHdpbGwgYmUgdG9vIHNtYWxsLCBvbmx5IDMwMHgxNTBcclxuICAgICAgaWYoc2NyZWVuLndpZHRoID49IDY0MCl7IFxyXG4gICAgICAgICAgZ3JhcGgud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAtIDMyMDsgXHJcblx0ICAgICAgZ3JhcGguaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gMzIwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBcclxuXHJcbiAgICAgIC8vY2FudmFzIHdpdGggdG9vbHRpcHMgZG90XHJcbiAgICAgIHZhciB0aXBDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpcFwiKTtcclxuICAgICAgZXhwb3J0cy50aXBDdHggPSB0aXBDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpOyAvL0VYUE9SVCBWQVJJQUJMRSAoaS5lIHRvIHtzaG93VG9vbHRpcF9vbk1vdXNlT3Zlcn0gTW9kdWxlKVxyXG5cdCAgXHJcblx0ICB2YXIgY2FudmFzT2Zmc2V0ID0gJChcIiNncmFwaFwiKS5vZmZzZXQoKTsgXHJcblx0ICBcclxuICAgICAgZXhwb3J0cy5vZmZzZXRYID0gY2FudmFzT2Zmc2V0LmxlZnQ7IC8vRVhQT1JUIFZBUklBQkxFIChpLmUgdG8ge3Nob3dUb29sdGlwX29uTW91c2VPdmVyfSBNb2R1bGUpXHJcbiAgICAgIGV4cG9ydHMub2Zmc2V0WSA9IGNhbnZhc09mZnNldC50b3A7ICAvL0VYUE9SVCBWQVJJQUJMRSAoaS5lIHRvIHtzaG93VG9vbHRpcF9vbk1vdXNlT3Zlcn0gTW9kdWxlKVxyXG5cdCAgZXhwb3J0cy50aXBDYW52YXNfMiA9IHRpcENhbnZhczsgICAgIC8vRVhQT1JUIFZBUklBQkxFIChpLmUgdG8ge3Nob3dUb29sdGlwX29uTW91c2VPdmVyfSBNb2R1bGUpXHJcblxyXG4gICAgICB2YXIgZ3JhcGg7XHJcblx0ICAvL3ZhciB4UGFkZGluZztcclxuICAgICAgZXhwb3J0cy54UGFkZGluZyA9IDMwOyAvL2xlZnQgcGFkZGluZyBvZiBzY2FsZXMgYXhpcyAgLy9FWFBPUlQgVkFSSUFCTEUgKGkuZSB0byB7Z2V0WFBpeGVsfSBNb2R1bGUpXHJcbiAgICAgIC8qdmFyKi8gZXhwb3J0cy55UGFkZGluZyA9IDMwOyAvL0VYUE9SVCBWQVJJQUJMRSAoaS5lIHRvIHtnZXRZUGl4ZWx9IE1vZHVsZSlcclxuXHQgIFxyXG5cdCAgXHJcblx0ICBcclxuXHQgIFxyXG5cdCAgLy9NT0RVTEVTIFBhcnQtLS0tLS0tLS0tXHJcbiAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICoqICBcclxuXHQgIFxyXG5cdCAgLy8gZGVmaW5lIHRvb2x0aXBzIGZvciBlYWNoIGpzb24gcG9pbnQgLy9hZGRpbmcgdG8gYXJyYXkgdG9vbHRpcHNcclxuXHQgIHZhciBjcmVhdGVUb29sdGlwQXJyYXkgPSBuZXcgdG9vbFRpcF9maWxlKCk7XHJcblx0ICB2YXIgdG9vbHRpcFJlc3VsdCA9IGNyZWF0ZVRvb2x0aXBBcnJheS5jcmVhdGVBcnJheShqc29uKTsgLy90b29sdGlwUmVzdWx0ID0+dG9vbHRpcHMgYXJyYXlcclxuXHQgIGNvbnNvbGUubG9nKHRvb2x0aXBSZXN1bHQpO1xyXG5cdCBcclxuXHJcblx0ICAvL2RyYXcgaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgQXhpc1xyXG5cdCAgIHZhciBkcmF3QXhpcyA9IG5ldyBkcmF3QXhpc19maWxlKCk7XHJcblx0ICAgZHJhd0F4aXMuZHJhd19YWV9BeGlzKCk7XHJcblx0ICAgXHJcblx0ICBcclxuXHQgICAvL2RyYXcgdGhlIFggdmFsdWUgdGV4dHMsIGRyYXcgdGV4dCB2YWx1ZXMgaW4gaG9yaXpvbnQgYXhpcyEhISEhIVxyXG5cdCAgIHZhciBkcmF3X1hfdGV4dCA9IG5ldyBkcmF3WFZhbHVlc19maWxlKCk7XHJcblx0ICAgZHJhd19YX3RleHQuZHJhd19YX3ZhbHVlX3RleHQodG9vbHRpcFJlc3VsdCk7IC8vdGhlIG9ubHkgd2F5IHRvIHBhc3MgdmFyIHRvb2x0aXBzIHRvIHRoaXMgbW9kdWxlIC8vdG9vbHRpcFJlc3VsdCA9PnRvb2x0aXBzIGFycmF5XHJcblx0ICAgXHJcblx0ICAgLy9kcmF3IHRoZSBZIHZhbHVlIHRleHRzLCBkcmF3IHRleHQgdmFsdWVzIGludmVydGljYWwgYXhpcyEhISEhIVxyXG5cdCAgIHZhciBkcmF3X1lfdGV4dCA9IG5ldyBkcmF3WVZhbHVlc192ZXJ0aWNhbF9maWxlKCk7XHJcblx0ICAgZHJhd19ZX3RleHQuZHJhd19ZX3ZhbHVlX3RleHQoKTsgLy90aGUgb25seSB3YXkgdG8gcGFzcyB2YXIgdG9vbHRpcHMgdG8gdGhpcyBtb2R1bGVcclxuXHQgICBcclxuXHQgICAvLyBEcmF3IHRoZSBDSEFSVCBncmFwaCBMaW5lc1xyXG5cdCAgICB2YXIgZHJhd19jaGFydExpbmVzID0gbmV3IGRyYXdDaGFydExpbmVzX2ZpbGUoKTtcclxuXHQgICAgZHJhd19jaGFydExpbmVzLmRyYXdfbGluZXMoanNvbik7IFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8vZHJhdyBob3ZlcmFibGUgZG90cywgaWYgdSBob3ZlciBvdmVyIHRoZW0tPiB0b29sdGlwIHdpbGwgYXBwZWFyXHJcblx0ICAgIHZhciBkcmF3X2RvdHMgPSBuZXcgYWRkRG90c19maWxlKCk7XHJcblx0ICAgIGRyYXdfZG90cy5hZGRIb3ZlcmFibGVEb3RzKGpzb24pO1xyXG5cdFx0XHJcblx0XHQvL3Nob3dUb29sdGlwX29uTW91c2VPdmVyXHJcblx0ICAgIHZhciBzaG93VG9vbHRpcHMgPSBuZXcgc2hvd1Rvb2x0aXBzX2ZpbGUoKTtcclxuXHQgICAgc2hvd1Rvb2x0aXBzLmRpc3BhbHlUb29sdGlwcyh0b29sdGlwUmVzdWx0KTsgLy90b29sdGlwUmVzdWx0ID0+dG9vbHRpcHMgYXJyYXlcclxuXHRcdFxyXG5cdFx0XHJcblx0XHQvLyBTd2l0Y2ggZGF5L25pZ2h0IG1vZGVcclxuXHQgICAgdmFyIHN3aXRjaE1vZGUgPSBuZXcgc3dpdGNoTmlnaHREYXlfZmlsZSgpO1xyXG5cdCAgICBzd2l0Y2hNb2RlLnN3aXRjaE1vZGUoKTsgXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0Ly9kaXNwbGF5IHNlZWtiYXIgdmFsdWVzIGluIGhpZGRlbiBTbGlkZVBhbmVsXHJcblx0ICAgIHZhciBzZWVrQmFyX2NvbnRyb2wgPSBuZXcgc2Vla0Jhcl9maWxlKCk7XHJcblx0ICAgIHNlZWtCYXJfY29udHJvbC5nZXRTQmFyX3ZhbHVlcygpOyBcclxuXHRcdFxyXG5cdFx0XHJcblx0XHQvL2RyYXcgYSBjaGFydCBvbkNsaWNrIHdpdGggY3VzdG9tIHNlZWtiYXIgdmFsdWVzXHJcblx0ICAgIC8vdmFyIGRyYXdDaGFydG9uQ2xpY2trID0gbmV3IGRyYXdDaGFydF9vbkNsaWNrX2ZpbGUoKTtcclxuXHQgICAgLy9kcmF3Q2hhcnRvbkNsaWNray5jcmVhdGVDaGFydF9vbkNsaWNra2soKTsgXHJcblx0XHRcdFxyXG5cdFx0XHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0fVxyXG5cdH1cclxuICAgXHJcbiAgIFxyXG4gICBcclxuICAgXHJcbiAgIFxyXG59IC8vZW5kIGZ1bmN0aW9uIEFMTFxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjb3JlX29uQ2xpY2s7IiwidmFyIGdldFhQaXhlbF9maWxlID0gcmVxdWlyZSgnLi9nZXRYUGl4ZWwuanMnKTtcclxudmFyIGdldFlQaXhlbF9maWxlID0gcmVxdWlyZSgnLi9nZXRZUGl4ZWwuanMnKTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZXNfdG9vbHRpcF9hcnJheV9mcm9tX2pzb24oKXtcclxuXHJcblxyXG5cdFxyXG4gIHRoaXMuY3JlYXRlQXJyYXkgPSBmdW5jdGlvbihqc29uKXtcclxuXHQgIHZhciBnZXRYUGl4ZWxfZmlsZTIgPSBuZXcgZ2V0WFBpeGVsX2ZpbGUoKTsgLy9Nb2R1bGVcclxuXHQgIHZhciBnZXRZUGl4ZWxfZmlsZTIgPSBuZXcgZ2V0WVBpeGVsX2ZpbGUoKTsgLy9Nb2R1bGVcclxuXHQgIFxyXG5cdCAgLy92YXIgY3Y7IHZhciBnID0gXCJnZ2dcIjtcclxuXHQgIC8vZXhwb3J0cy5jdiA9IGcgO1xyXG5cdCAgLy9hbGVydChnKTtcclxuICAgICAgLy9kZWZpbmUgdG9vbHRpcHMgZm9yIGVhY2gganNvbiBwb2ludCAvL2FkZGluZyB0byBhcnJheSB0b29sdGlwc1xyXG5cdCAgXHJcbiAgICAgIHZhciB0b29sdGlwcyA9IFtdO1xyXG5cdCAgLy92YXIgdG9vbHRpcHM0O1xyXG5cdCAgLy9leHBvcnRzLnRvb2x0aXBzNCA9IFs0LDRdOyAvL3Rvb2x0aXBzO1xyXG5cdCAgXHJcblxyXG4gICAgICAvL2l0IHdvcmtzLCBjcmVhdGVzIGFuIGFycmF5IHdpdGggb2JqZWN0cyBmb3IgdG9vbHRpcHMsIGNyZWF0ZXMgaW4gZm9ybWF0IFt7eDokLCB5OiQsIHJYcjskLCB0aXA6JH0sIHt4OiQsIHk6JCwgclhyOyQsIHRpcDokfV1cclxuICAgICAgLy8oOTAlIGNvcGllZCBmcm9tIHZhcmlhbnQgZm9yIDEgY2hhcnQsIGp1c3QgYWRkZWQgYWRkaXRpb25hbCBpbm5lciBmb3IgbG9vcCB7Zm9yICh2YXIgaiA9IDA7IGogPCBqc29uW2ldLmNvbHVtbnMubGVuZ3RoOyBqKyspfVxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGpzb24ubGVuZ3RoOyBpKyspIHtcclxuXHQgICAgIGZvciAodmFyIGogPSAwOyBqIDwganNvbltpXS5jb2x1bW5zLmxlbmd0aDsgaisrKSB7XHJcblx0ICAgICAgICAgdmFyIHN0YXR1c1g7XHJcblx0XHRcdCAvL2RlZmluZSB2YWx1ZSBmb3Igc3RhdHVzXHJcblx0ICAgICAgICAgaWYoaSAlIDIgIT0wKXtcclxuXHRcdFx0XHQgc3RhdHVzWCA9IFwiTGVmdFwiO1xyXG5cdFx0XHQgfSBlbHNlIHtcclxuXHRcdFx0ICAgICBzdGF0dXNYID1cIkpvaW5lZFwiO1xyXG5cdFx0XHQgfSBcclxuXHQgIFxyXG4gICAgICAgICAgICAgdG9vbHRpcHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgeDogZ2V0WFBpeGVsX2ZpbGUyLmdldFhQaXhlbDMoanNvbltpXS5jb2x1bW5zW2pdLlgpLFxyXG4gICAgICAgICAgICAgICAgIHk6IGdldFlQaXhlbF9maWxlMi5nZXRZUGl4ZWwzKGpzb25baV0uY29sdW1uc1tqXS5ZKSxcclxuICAgICAgICAgICAgICAgICByOiA0LFxyXG4gICAgICAgICAgICAgICAgIHJYcjogMTYsXHJcbiAgICAgICAgICAgICAgICAgY29sb3JzOiBcInJlZFwiLCAvL05PVCBVU0VEPz8/XHJcbiAgICAgICAgICAgICAgICAgdGlwOiBqc29uW2ldLmNvbHVtbnNbal0uWSwgIC8vXCIjdGV4dFwiICsgKGkgKyAxKSAgLy9NZWdhIGVycm9yIHdhcyBoZXJlIC8vdGV4dCBvZiB0b29sdGlwLFxyXG5cdFx0ICAgICAgICAgZGF0ZVo6IGpzb25baV0uY29sdW1uc1tqXS5kYXRlLCAvL1xyXG5cdFx0ICAgICAgICAgc3RhdHVzOiBzdGF0dXNYIC8vIDFzdCBvciAybmQgY2hhcnQuIEpvaW5lZC9MZWZ0XHJcbiAgICAgICAgICAgICB9KTtcclxuXHRcdFx0IFxyXG5cdCAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvL2NvbnNvbGUubG9nKHRvb2x0aXBzKTtcclxuXHQgIHJldHVybiB0b29sdGlwcztcclxuICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZXNfdG9vbHRpcF9hcnJheV9mcm9tX2pzb247IiwidmFyIGNvcmVfdmFyID0gcmVxdWlyZSgnLi9jb3JlLmpzJyk7IC8vSU1QT1JUIFZBUklBQkxFUyB7YywgeFBhZGRpbmcseVBhZGRpbmd9IGZyb20gY29yZS5qc1xyXG5cclxuXHJcbmZ1bmN0aW9uIGRyYXdfVmVydF9Ib3Jpel9BeGlzKCl7XHJcblx0XHJcblxyXG5cdFxyXG4gIHRoaXMuZHJhd19YWV9BeGlzID0gZnVuY3Rpb24oKXsgXHJcbiAgICAgIC8vc3RhcnQgaW1wb3J0IFZhcnMgZnJvbSBjb3JlLmpzXHJcbiAgICAgIHZhciBjID0gY29yZV92YXIuYzsgLy9JTVBPUlQgVkFSIHtjfSBmb20gY29yZS5qc1xyXG5cdCAgdmFyIHhQYWRkaW5nID0gY29yZV92YXIueFBhZGRpbmc7IC8vSU1QT1JUIFZBUiB7eFBBZGRpbmd9IGZvbSBjb3JlLmpzXHJcblx0ICB2YXIgeVBhZGRpbmcgPSBjb3JlX3Zhci55UGFkZGluZzsgLy9JTVBPUlQgVkFSIHt5UEFkZGluZ30gZm9tIGNvcmUuanNcclxuXHQgIC8vRU5EICBpbXBvcnQgVmFycyBmcm9tIGNvcmUuanNcclxuXHQgIFxyXG5cdCAgYy5saW5lV2lkdGggPSAyOyAvL3dpZHRoIG9mIFhZIGF4aXMgc2NhbGVcclxuICAgICAgYy5zdHJva2VTdHlsZSA9ICcjMzMzJztcclxuICAgICAgYy5mb250ID0gJ2l0YWxpYyA4cHQgc2Fucy1zZXJpZic7XHJcbiAgICAgIGMudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuXHJcbiAgICAgLy8gRHJhdyB0aGUgYXhpc2VzIHNjYWxlc1xyXG4gICAgIGMuYmVnaW5QYXRoKCk7XHJcbiAgICAgYy5tb3ZlVG8oeFBhZGRpbmcsIDApO1xyXG4gICAgIGMubGluZVRvKHhQYWRkaW5nLCBncmFwaC5oZWlnaHQgLSB5UGFkZGluZyk7XHJcbiAgICAgYy5saW5lVG8oZ3JhcGgud2lkdGgsIGdyYXBoLmhlaWdodCAtIHlQYWRkaW5nKTtcclxuICAgICBjLnN0cm9rZSgpO1xyXG5cclxuICB9ICAgIFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRyYXdfVmVydF9Ib3Jpel9BeGlzOyIsInZhciBjb3JlX3ZhciA9IHJlcXVpcmUoJy4vY29yZS5qcycpOyAvL0lNUE9SVCBWQVJJQUJMRVMge2MsIHhQYWRkaW5nLHlQYWRkaW5nfSBmcm9tIGNvcmUuanNcclxudmFyIGdldE1heFhfZmlsZSA9IHJlcXVpcmUoJy4vZ2V0TWF4WC5qcycpO1xyXG52YXIgY29udmVydERhdGVfZmlsZSA9IHJlcXVpcmUoJy4vY29udmVydERhdGVTdGFtcC5qcycpO1xyXG52YXIgZ2V0WFBpeGVsX2ZpbGUgPSByZXF1aXJlKCcuL2dldFhQaXhlbC5qcycpOyAvLyBSZXR1cm4gdGhlIFggcGl4ZWwgZm9yIGEgZ3JhcGggcG9pbnQtPmZ1bmN0aW9uIGdldFhQaXhlbCgpe1xyXG52YXIgdG9vbHRpcF92YXIgPSByZXF1aXJlKCcuL2NyZWF0ZXNfdG9vbHRpcF9hcnJheV9mcm9tX2pzb24uanMnKTsgLy9JTVBPUlQgVkFSSUFCTEVTIHt0b29sdGlwcyB9IGZyb20gY3JlYXRlc190b29sdGlwX2FycmF5X2Zyb21fanNvbi5qc1xyXG5cclxuXHJcbiAvL0RyYXcgdGhlIFggdmFsdWUgdGV4dHMsIGRyYXcgdGV4dCB2YWx1ZXMgaW4gaG9yaXpvbnQgYXhpcyEhISEhIVxyXG5mdW5jdGlvbiBkcmF3X1hfdmFsdWVzX3RleHQoKXtcclxuXHRcclxuXHJcbiBcclxuICB0aGlzLmRyYXdfWF92YWx1ZV90ZXh0ID0gZnVuY3Rpb24odG9vbHRpcHMpeyBcclxuICBcclxuICAgICAgLy9zdGFydCBpbXBvcnQgVmFycyBmcm9tIGNvcmUuanNcclxuICAgICAgdmFyIGMgPSBjb3JlX3Zhci5jOyAvL0lNUE9SVCBWQVIge2N9IGZvbSBjb3JlLmpzXHJcblx0ICAvL3ZhciB4UGFkZGluZyA9IGNvcmVfdmFyLnhQYWRkaW5nOyAvL0lNUE9SVCBWQVIge3hQQWRkaW5nfSBmcm9tIGNvcmUuanNcclxuXHQgIHZhciB5UGFkZGluZyA9IGNvcmVfdmFyLnlQYWRkaW5nOyAvL0lNUE9SVCBWQVIge3lQQWRkaW5nfSBmcm9tIGNvcmUuanNcclxuXHQgIC8vdmFyIHRvb2x0aXBzID0gdG9vbHRpcF92YXIudG9vbHRpcHM0OyAvL0lNUE9SVCBWQVIge3Rvb2x0aXB9IGZyb20gY3JlYXRlc190b29sdGlwX2FycmF5X2Zyb21fanNvbi5qc1xyXG5cdCAgLy9hbGVydChcInRvb2wgXCIgKyB0b29sdGlwX3Zhci5jdik7XHJcblx0ICAvL0VORCAgaW1wb3J0IFZhcnMgZnJvbSBjb3JlLmpzXHJcblx0ICBcclxuXHRcclxuXHQgIHZhciBtYXhYVmFsdWUgPSBuZXcgZ2V0TWF4WF9maWxlKCkuZ2V0TWF4WCgpOyBcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gbWF4WFZhbHVlIC0xOyBpKyspIHsgLy93YXMgb3JpZ2luYWxseSAodmFyIGkgPSAwOyBpIDw9IG1heFhWYWx1ZTsgaSsrKSwgdXNlIC0xIHN0cmljdGx5IGZvciBjYXNlcyB3aXRoIGRhdGVzXHJcbiAgICAgICAgLy8gdXNlcyBqc29uLnZhbHVlc1tpXS5YXHJcblx0ICAgIC8vVG8gdXNlIG9uZSBzYW1lIGZ1bmN0aW9ue2Z1bmN0X2NvbnZlcnRfZGF0ZVN0YW1wfSB0byByZXVybiBkaWZmIHZhbHVlcyx3ZSB1c2UgdGhlIDJuZCBhcmcge3RhZyh0cnVlKX0sIGlmIGl0IGlzIHNldCBpbiBjYWxsaW5nIGZ1bmN0aW9uLCBmdW5jdGlvbiByZXR1cm5zIHNob3J0IGRhdGUsIGkuZSB7MS4wM31cclxuICAgICAgICBjLmZpbGxUZXh0KC8qaSovIG5ldyBjb252ZXJ0RGF0ZV9maWxlKCkuZnVuY3RfY29udmVydF9kYXRlU3RhbXAodG9vbHRpcHNbaV0uZGF0ZVosIHRydWUpICwgbmV3IGdldFhQaXhlbF9maWxlKCkuZ2V0WFBpeGVsMyhpKSwgZ3JhcGguaGVpZ2h0IC0geVBhZGRpbmcgKyAyMCk7XHJcbiAgICAgIH1cclxuICB9ICAgIFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRyYXdfWF92YWx1ZXNfdGV4dDsiLCJ2YXIgY29yZV92YXIgPSByZXF1aXJlKCcuL2NvcmUuanMnKTsgLy9JTVBPUlQgVkFSSUFCTEVTIHtjLCB4UGFkZGluZyx5UGFkZGluZ30gZnJvbSBjb3JlLmpzXHJcbnZhciBnZXRNYXhZX2ZpbGUgPSByZXF1aXJlKCcuL2dldE1heFkuanMnKTtcclxuLy92YXIgY29udmVydERhdGVfZmlsZSA9IHJlcXVpcmUoJy4vY29udmVydERhdGVTdGFtcC5qcycpO1xyXG52YXIgZ2V0WVBpeGVsX2ZpbGUgPSByZXF1aXJlKCcuL2dldFlQaXhlbC5qcycpOyAvLyBSZXR1cm4gdGhlIFkgcGl4ZWwgZm9yIGEgZ3JhcGggcG9pbnQtPmZ1bmN0aW9uIGdldFhQaXhlbCgpe1xyXG5cclxuXHJcblxyXG4vLyBEcmF3IHRoZSBZIHZhbHVlIHRleHRzLCB0ZXh0IGluIHZlcnRpY2FsIGF4aXNcclxuZnVuY3Rpb24gZHJhd19ZX3ZhbHVlc192ZXJ0aWNhbCgpe1xyXG5cdFxyXG5cclxuXHJcbiAgdGhpcy5kcmF3X1lfdmFsdWVfdGV4dCA9IGZ1bmN0aW9uKHRvb2x0aXBzKXsgXHJcbiAgXHJcbiAgICAgIC8vc3RhcnQgaW1wb3J0IFZhcnMgZnJvbSBjb3JlLmpzXHJcbiAgICAgIHZhciBjID0gY29yZV92YXIuYzsgLy9JTVBPUlQgVkFSIHtjfSBmb20gY29yZS5qc1xyXG5cdCAgdmFyIHhQYWRkaW5nID0gY29yZV92YXIueFBhZGRpbmc7IC8vSU1QT1JUIFZBUiB7eFBBZGRpbmd9IGZyb20gY29yZS5qc1xyXG5cdCAgLy9FTkQgIGltcG9ydCBWYXJzIGZyb20gY29yZS5qc1xyXG5cdCAgXHJcblx0XHJcblx0ICBjLnRleHRBbGlnbiA9IFwicmlnaHRcIlxyXG4gICAgICBjLnRleHRCYXNlbGluZSA9IFwibWlkZGxlXCI7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IChuZXcgZ2V0TWF4WV9maWxlKCkuZ2V0TWF4WTIoKSArIDUwKTsgaSArPSA1MCkgeyAvL215IGFkZCB7KzUwfVxyXG4gICAgICAgICBjLmZpbGxUZXh0KGksIHhQYWRkaW5nIC0gMTAsIG5ldyBnZXRZUGl4ZWxfZmlsZSgpLmdldFlQaXhlbDMoaSkpOyAvL2RvIG5vdCBjaGFuZ2UgMTBcclxuICAgICAgfVxyXG5cclxuICAgICAgYy5zdHJva2VTdHlsZSA9ICcjZjAwJztcclxuXHJcbiAgfSAgICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkcmF3X1lfdmFsdWVzX3ZlcnRpY2FsOyIsIi8vaXQgZHJhd3MgY2hhcnQgbGluZXMgXHJcblxyXG52YXIgY29yZV92YXIgPSByZXF1aXJlKCcuL2NvcmUuanMnKTsgLy9JTVBPUlQgVkFSSUFCTEVTIHtjLCB4UGFkZGluZyx5UGFkZGluZ30gZnJvbSBjb3JlLmpzXHJcbnZhciBnZXRNYXhZX2ZpbGUgPSByZXF1aXJlKCcuL2dldE1heFkuanMnKTtcclxuLy92YXIgY29udmVydERhdGVfZmlsZSA9IHJlcXVpcmUoJy4vY29udmVydERhdGVTdGFtcC5qcycpO1xyXG52YXIgZ2V0WVBpeGVsX2ZpbGUgPSByZXF1aXJlKCcuL2dldFlQaXhlbC5qcycpOyAvLyBSZXR1cm4gdGhlIFkgcGl4ZWwgZm9yIGEgZ3JhcGggcG9pbnQtPmZ1bmN0aW9uIGdldFhQaXhlbCgpe1xyXG52YXIgZ2V0WFBpeGVsX2ZpbGUgPSByZXF1aXJlKCcuL2dldFhQaXhlbC5qcycpOyAvLyBSZXR1cm4gdGhlIFggcGl4ZWwgZm9yIGEgZ3JhcGggcG9pbnQtPmZ1bmN0aW9uIGdldFhQaXhlbCgpe1xyXG5cclxuXHJcbi8vIERyYXcgdFxyXG5mdW5jdGlvbiBkcmF3X2NoYXJ0TGluZXMoKXtcclxuXHRcclxuXHJcblxyXG4gICAgdGhpcy5kcmF3X2xpbmVzID0gZnVuY3Rpb24oanNvbil7XHJcblx0XHRcclxuICAgICAgLy9zdGFydCBpbXBvcnQgVmFycyBmcm9tIGNvcmUuanMqKioqKioqKipcclxuICAgICAgdmFyIGMgPSBjb3JlX3Zhci5jOyAvL0lNUE9SVCBWQVIge2N9IGZvbSBjb3JlLmpzXHJcblx0ICAvL3ZhciB4UGFkZGluZyA9IGNvcmVfdmFyLnhQYWRkaW5nOyAvL0lNUE9SVCBWQVIge3hQQWRkaW5nfSBmcm9tIGNvcmUuanNcclxuXHQgIC8vRU5EICBpbXBvcnQgVmFycyBmcm9tIGNvcmUuanMqKioqKioqKipcclxuXHQgIFxyXG5cdCAgYy5iZWdpblBhdGgoKTtcclxuXHQgIGZvciAodmFyIGkgPSAwOyBpIDwganNvbi5sZW5ndGg7IGkrKykgeyAvLyB3YXMgaT0xXHJcblxyXG4gICAgICAvLyhmdW5jdGlvbihpWikgeyAgLy9zaG9vdGVycywgb3IgdSBjYW4ganVzdCB1c2Uge2xldCBpID0gMX0gaW4gbG9vcCBpbnN0ZWFkIG9mIHNob290ZXJzXHJcbiAgICAgIC8vYWxlcnQoXCJpWi0+IFwiICsgaVopO1xyXG4gICAgXHJcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGpzb25baV0uY29sdW1ucy5sZW5ndGg7IGorKykge1xyXG5cdCAgICAgICAgKGZ1bmN0aW9uKGl4LCBwKSB7ICAvL3Nob290ZXJzLCBvciB1IGNhbiBqdXN0IHVzZSB7bGV0IGkgPSAxfSBpbiBsb29wIGluc3RlYWQgb2Ygc2hvb3RlcnMgLy9peCBpcyB7aX0sIHAgaXMge2p9IC8vU0hPT1RFUiBpcyBhIG11c3Qgb3RoZXJ3aXNlIGl0IGp1bXBzIHRvIGxhc3QgaSBhdCBvbmNlXHJcblx0ICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdCAgICAgICAgIFxyXG5cdFx0XHQgICAgIC8vYWxlcnQoXCJpeC0+IFwiICsgaXggKyBcIiBqLT4gXCIgKyBwKTtcclxuXHRcdFx0IFxyXG5cdFx0XHQgICAgIC8vTWVnYSBGaXgsIHNldHMgdGhlIHBhdGggdG8gc3RhcnQgcG9zaXRpb24sIG91dCBvZiBmb3IgbG9vcCBpdCB3YXMgbm90IHdvcmtpbmdcclxuXHRcdFx0ICAgICAvL3NldHMgdGhlIHBhdGggdG8gc3RhcnQgcG9zaXRpb24gaW4gYSB2ZXJ5IGZpcnN0IGl0ZXJhdGlvbiBcclxuXHRcdFx0ICAgICBpZihwID09IDAgKXsgXHJcblx0XHRcdFx0XHQgYy5iZWdpblBhdGgoKTsgLy9tZWdhIGZpeCB0byBkcmF3IGRpZmZlcmVudCBjb2xvcnNzIGxpbmVzXHJcblx0XHRcdFx0ICAgICBjLm1vdmVUbyhuZXcgZ2V0WFBpeGVsX2ZpbGUoKS5nZXRYUGl4ZWwzKGpzb25baXhdLmNvbHVtbnNbMF0uWCksIG5ldyBnZXRZUGl4ZWxfZmlsZSgpLmdldFlQaXhlbDMoanNvbltpeF0uY29sdW1uc1swXS5ZKSk7XHJcblx0XHRcdCAgICAgfVxyXG5cdFx0XHQgXHJcblx0XHRcdCBcclxuXHQgICAgICAgICAgICAgLy9hbGVydChpeCk7XHJcblx0XHQgICAgICAgICAvL2FsZXJ0KGpzb24udmFsdWVzW2l4XS5YICsgXCIgIGFuZCBcIiArICBqc29uLnZhbHVlc1tpeF0uWSArIFwiIGktPlwiICsgaXgpO1xyXG5cdFx0XHQgXHJcblx0XHRcdCAgICAgLy9hbGwgb3RoZXIgaXRlcmF0aW9ucyBzdGFydGluZyBmcm9tIDJuZCwgZHJhdyBsaW5lcyB3aXRoIHtjLmxpbmVUb31cclxuXHRcdFx0XHQgXHJcblx0XHQgICAgICAgICBjLmxpbmVUbyhuZXcgZ2V0WFBpeGVsX2ZpbGUoKS5nZXRYUGl4ZWwzKGpzb25baXhdLmNvbHVtbnNbcF0uWCksIG5ldyBnZXRZUGl4ZWxfZmlsZSgpLmdldFlQaXhlbDMoanNvbltpeF0uY29sdW1uc1twXS5ZKSk7IFxyXG5cdFx0XHRcdCBjLnN0cm9rZVN0eWxlID0ganNvbltpeF0uY29sb3JzIDtcclxuXHRcdFx0XHQgXHJcblx0XHQgICAgICAgICBjLnN0cm9rZSgpOyAvL3N0cm9rZSgpIG1ldGhvZCB0byBhY3R1YWxseSBkcmF3IHRoZSBwYXRoIG9uIHRoZSBjYW52YXMuXHJcblx0XHRcdFx0IFxyXG5cdFx0ICAgICAgICAgLy9jLmNsZWFyUmVjdCgwLDAsZ3JhcGgud2lkdGgsZ3JhcGguaGVpZ2h0KTtcclxuXHRcdCAgICAgICAgIC8vZHJhd0NoYXJ0KCk7XHJcblx0XHQgICAgICAgICAvL3NldFRpbWVvdXQoZ2V0RHJhd2VyKGkpLCAxMDAwKTtcclxuXHRcdCAgICAgICAgIC8vc2V0VGltZW91dChnZXREcmF3ZXIoaSksIDEwMDApO1xyXG5cdFx0ICAgICBcclxuXHRcdFx0IFxyXG5cdFx0XHQgICAgIC8vdGltZVggPSBpeCAqIHA7XHJcblx0XHRcdCBcclxuXHQgICAgICAgIH0sIC8qaXgqLzEgKiA1MDApO1xyXG5cdCAgICB9KShpLCBqKTsgLy8gZW5kIHNob290ZXJzIFxyXG5cclxuXHJcbiAgICAgICAgLy9jLmxpbmVUbyhnZXRYUGl4ZWwoanNvbi52YWx1ZXNbaV0uWCksIGdldFlQaXhlbChqc29uLnZhbHVlc1tpXS5ZKSk7XHJcbiAgICAgICAgfVxyXG4gICAgIC8vfSkoaSk7IC8vIGVuZCBzaG9vdGVycyBcclxuICAgIH1cclxuXHJcblx0Ly9kcmF3IFwiRm9sbG93ZXJzIHRleHRcIlxyXG4gICAgYy5mb250ID0gXCIyMHB4IEdlb3JnaWFcIjtcclxuICAgIGMuZmlsbFRleHQoXCJGb2xsb3dlcnNcIiwgMTMwLCAyMCk7XHJcbiAgfSAgICBcclxuICBcclxuICBcclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZHJhd19jaGFydExpbmVzOyIsInZhciBqc29uX3ZhciA9IHJlcXVpcmUoJy4vY29yZS5qcycpOyAvL0lNUE9SVCBWQVJJQUJMRSB7anNvbn1cclxuXHJcbmZ1bmN0aW9uIGdldE1heFgoKXtcclxuXHRcclxuICAvL3RoaXMuY29vcmRpbmF0ZXNTZXQgPVx0XCJpdCBpcyB0ZXN0LCBDb21tb25KUyB3b3Jrc1wiLFxyXG5cclxuXHRcclxuICB0aGlzLmdldE1heFggPSBmdW5jdGlvbigpe1xyXG5cdCAgLy8gUmV0dXJucyB0aGUgbWF4IFggdmFsdWUgaW4gb3VyIGpzb24gbGlzdCFcclxuXHQgdmFyIGpzb24gPSBqc29uX3Zhci5qc29uO1xyXG4gICAgICB2YXIgbWF4ID0gMDtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBqc29uLmxlbmd0aDsgaSsrKSB7XHJcblx0XHQgZm9yICh2YXIgaiA9IDA7IGogPCBqc29uW2ldLmNvbHVtbnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICBpZiAoanNvbltpXS5jb2x1bW5zW2pdLlggPiBtYXgpIHtcclxuICAgICAgICAgICAgICAgICAgbWF4ID0ganNvbltpXS5jb2x1bW5zW2pdLlg7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cdCAgfVxyXG4gICAgLy8gb21pdGVkXHJcbiAgICAvL21heCArPSAxMCAtIG1heCAlIDEwO1xyXG5cdC8vYWxlcnQoXCJtYXggXCIgKyBtYXgpXHJcbiAgICByZXR1cm4gbWF4O1xyXG5cclxuICB9ICAgIFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGdldE1heFg7IiwidmFyIGpzb25fdmFyID0gcmVxdWlyZSgnLi9jb3JlLmpzJyk7IC8vSU1QT1JUIFZBUklBQkxFIHtqc29ufVxyXG5cclxuZnVuY3Rpb24gZ2V0TWF4WSgpe1xyXG5cdFxyXG4gIC8vdGhpcy5jb29yZGluYXRlc1NldCA9XHRcIml0IGlzIHRlc3QsIENvbW1vbkpTIHdvcmtzXCIsXHJcblxyXG5cdFxyXG4gIHRoaXMuZ2V0TWF4WTIgPSBmdW5jdGlvbigpe1xyXG5cdCAgdmFyIG1heCA9IDA7XHJcblx0ICB2YXIganNvbiA9IGpzb25fdmFyLmpzb247XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwganNvbi5sZW5ndGg7IGkrKykge1xyXG5cdCAgICBmb3IgKHZhciBqID0gMDsgaiA8IGpzb25baV0uY29sdW1ucy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBpZiAoanNvbltpXS5jb2x1bW5zW2pdLlkgPiBtYXgpIHtcclxuICAgICAgICAgICAgICAgIG1heCA9IGpzb25baV0uY29sdW1uc1tqXS5ZO1xyXG4gICAgICAgICAgICB9XHJcblx0ICAgIH1cclxuICAgIH1cclxuXHQvL2FsZXJ0KFwibWF4LT4gXCIgKyBtYXgpO1xyXG4gICAgbWF4ICs9IDEwIC0gbWF4ICUgMTA7XHJcbiAgICByZXR1cm4gbWF4O1xyXG4gIH0gICAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2V0TWF4WTsiLCJ2YXIgZ2V0TWF4WF9maWxlID0gcmVxdWlyZSgnLi9nZXRNYXhYLmpzJyk7XHJcbnZhciBYUF92YXIgPSByZXF1aXJlKCcuL2NvcmUuanMnKTsgLy9JTVBPUlQgVkFSSUFCTEUge3hQYWRkaW5nfVxyXG5cclxuLy8gUmV0dXJuIHRoZSBYIHBpeGVsIGZvciBhIGdyYXBoIHBvaW50XHJcbmZ1bmN0aW9uIGdldFhQaXhlbCgpe1xyXG5cdFxyXG4gIC8vdGhpcy5jb29yZGluYXRlc1NldCA9XHRcIml0IGlzIHRlc3QsIENvbW1vbkpTIHdvcmtzXCIsXHJcblxyXG4gIHRoaXMuZ2V0WFBpeGVsMyA9IGZ1bmN0aW9uKHZhbCl7XHJcblx0ICB2YXIgZ2V0TWF4WCA9IG5ldyBnZXRNYXhYX2ZpbGUoKTsgLy9Nb2R1bGVcclxuXHQgIFxyXG4gICAgIC8vIFJldHVybiB0aGUgeCBwaXhlbCBmb3IgYSBncmFwaCBwb2ludFxyXG4gICAgLy8gdXNlcyB0aGUgZ2V0TWF4WCgpIGZ1bmN0aW9uXHJcbiAgICByZXR1cm4gKChncmFwaC53aWR0aCAtIFhQX3Zhci54UGFkZGluZykgLyAoZ2V0TWF4WC5nZXRNYXhYKCkgKyAxKSkgKiB2YWwgKyAoWFBfdmFyLnhQYWRkaW5nICogMS41KTtcclxuICAgIC8vIHdhc1xyXG4gICAgLy9yZXR1cm4gKChncmFwaC53aWR0aCAtIHhQYWRkaW5nKSAvIGdldE1heFgoKSkgKiB2YWwgKyAoeFBhZGRpbmcgKiAxLjUpO1xyXG4gIH1cclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGdldFhQaXhlbDsiLCJ2YXIgZ2V0TWF4WV9maWxlID0gcmVxdWlyZSgnLi9nZXRNYXhZLmpzJyk7XHJcbnZhciBYUF92YXIgPSByZXF1aXJlKCcuL2NvcmUuanMnKTsgLy9JTVBPUlQgVkFSSUFCTEUge3hQYWRkaW5nfVxyXG4vL2ltcG9ydCB7eFBhZGRpbmd9IGZyb20gJy4vY29yZSc7XHJcblxyXG4vLyBSZXR1cm4gdGhlIHkgcGl4ZWwgZm9yIGEgZ3JhcGggcG9pbnRcclxuZnVuY3Rpb24gZ2V0WVBpeGVsKCl7XHJcblx0XHJcblxyXG4gIHRoaXMuZ2V0WVBpeGVsMyA9IGZ1bmN0aW9uKHZhbCl7XHJcbiAgICAgIHZhciBnZXRNYXhZID0gbmV3IGdldE1heFlfZmlsZSgpOyAvL01vZHVsZVxyXG5cdCAgXHJcbiAgICAgIC8vIHVzZXMgdGhlIGdldE1heFgoKSBmdW5jdGlvblxyXG4gICAgICByZXR1cm4gZ3JhcGguaGVpZ2h0IC0gKCgoZ3JhcGguaGVpZ2h0IC0gWFBfdmFyLnlQYWRkaW5nKSAvIChnZXRNYXhZLmdldE1heFkyKCkgKyA1MCkpICogdmFsKSAtIFhQX3Zhci55UGFkZGluZzsgLy9teSBhZGQgeys1MH1cclxuICAgIFxyXG4gIH1cclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGdldFlQaXhlbDsiLCJ2YXIgY29yZV92YXIgPSByZXF1aXJlKCcuL2NvcmUuanMnKTsgLy9JTVBPUlQgVkFSSUFCTEVTIHtjLCB4UGFkZGluZyx5UGFkZGluZ30gZnJvbSBjb3JlLmpzXHJcbi8vdmFyIGdldE1heFlfZmlsZSA9IHJlcXVpcmUoJy4vZ2V0TWF4WS5qcycpO1xyXG4vL3ZhciBjb252ZXJ0RGF0ZV9maWxlID0gcmVxdWlyZSgnLi9jb252ZXJ0RGF0ZVN0YW1wLmpzJyk7XHJcbnZhciBnZXRZUGl4ZWxfZmlsZSA9IHJlcXVpcmUoJy4vZ2V0WVBpeGVsLmpzJyk7IC8vIFJldHVybiB0aGUgWSBwaXhlbCBmb3IgYSBncmFwaCBwb2ludC0+ZnVuY3Rpb24gZ2V0WFBpeGVsKCl7XHJcbnZhciBnZXRYUGl4ZWxfZmlsZSA9IHJlcXVpcmUoJy4vZ2V0WFBpeGVsLmpzJyk7IC8vIFJldHVybiB0aGUgWCBwaXhlbCBmb3IgYSBncmFwaCBwb2ludC0+ZnVuY3Rpb24gZ2V0WFBpeGVsKCl7XHJcbnZhciBjb252ZXJ0RGF0ZV9maWxlID0gcmVxdWlyZSgnLi9jb252ZXJ0RGF0ZVN0YW1wLmpzJyk7XHJcblxyXG5cclxuLy9zaG93cyB0b29sdGlwIG9uTW91c2Ugb3ZlclxyXG5mdW5jdGlvbiBzaG93VG9vbHRpcF9vbk1vdXNlT3Zlcigpe1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cdFxyXG5cclxuXHJcbiAgICB0aGlzLmRpc3BhbHlUb29sdGlwcyA9IGZ1bmN0aW9uKHRvb2x6KXsgICAvL2FyZ3ModG9vcGxpcHMgYXJyYXkpXHJcbiAgICAgIC8vIHJlcXVlc3QgbW91c2Vtb3ZlIGV2ZW50c1xyXG4gICAgICAkKFwiI2dyYXBoXCIpLm1vdXNlbW92ZShmdW5jdGlvbiAoZSkge1xyXG5cdFx0ICB2YXIgb25Nb3VzZU92ZXJfZmlsZSA9IG5ldyBvbk1vdXNlT3ZlcigpOy8vdXNlcyBvdGhlciBtb2R1bGUgaW4gdGhpcyB2ZXJ5IGZpbGVcclxuICAgICAgICAgIG9uTW91c2VPdmVyX2ZpbGUuaGFuZGxlTW91c2VNb3ZlQWN0aW9uKGUsIHRvb2x6KTsgLy9hcmdzKG1vdXNlIGV2ZW50LCB0b29wbGlwcyBhcnJheSlcclxuICAgICAgfSk7XHJcblxyXG4gIH0gIFxyXG59XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBcclxuICBcclxuZnVuY3Rpb24gb25Nb3VzZU92ZXIoKXtcclxuXHRcclxuICAgIHRoaXMuaGFuZGxlTW91c2VNb3ZlQWN0aW9uID0gZnVuY3Rpb24oZSwgdG9vbHRpcHMpeyAvL2FyZ3MobW91c2UgZXZlbnQsIHRvb3BsaXBzIGFycmF5KVxyXG5cdFx0XHJcblx0ICAgICAvL3N0YXJ0IGltcG9ydCBWYXJzIGZyb20gY29yZS5qcyoqKioqKioqKioqKlxyXG4gICAgICAgICB2YXIgYyA9IGNvcmVfdmFyLmM7IC8vSU1QT1JUIFZBUiB7Y30gZm9tIGNvcmUuanNcclxuXHQgICAgIHZhciBvZmZzZXRYID0gY29yZV92YXIub2Zmc2V0WDsgLy9JTVBPUlQgVkFSIHtvZmZzZXRYfSBmcm9tIGNvcmUuanNcclxuXHRcdCB2YXIgb2Zmc2V0WSA9IGNvcmVfdmFyLm9mZnNldFk7IC8vSU1QT1JUIFZBUiB7b2Zmc2V0WH0gZnJvbSBjb3JlLmpzXHJcblx0XHQgdmFyIHRpcENhbnZhcyA9IGNvcmVfdmFyLnRpcENhbnZhc18yOyAvL0lNUE9SVCBWQVIge3RpcENhbnZhcy59IGZyb20gY29yZS5qc1xyXG5cdFx0IHZhciB0aXBDdHggPSBjb3JlX3Zhci50aXBDdHg7IC8vSU1QT1JUIFZBUiB7dGlwQ2FudmFzLn0gZnJvbSBjb3JlLmpzXHJcblx0ICAgICAvL0VORCAgaW1wb3J0IFZhcnMgZnJvbSBjb3JlLmpzKioqKioqKioqKioqKlxyXG5cdFx0IFxyXG5cdFx0IC8vYWxlcnQoXCJvZmYgXCIgKyBvZmZzZXRZKTtcclxuXHRcdCBtb3VzZVggPSBwYXJzZUludChlLmNsaWVudFggLSBvZmZzZXRYKTtcclxuICAgICAgICAgbW91c2VZID0gcGFyc2VJbnQoZS5jbGllbnRZIC0gb2Zmc2V0WSk7IFxyXG5cclxuICAgIC8vIFB1dCB5b3VyIG1vdXNlbW92ZSBzdHVmZiBoZXJlXHJcbiAgICB2YXIgaGl0ID0gZmFsc2U7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvb2x0aXBzLmxlbmd0aDsgaSsrKSB7IC8vYWxlcnQodG9vbHRpcHMubGVuZ3RoKTtcclxuICAgICAgICB2YXIgZG90ID0gdG9vbHRpcHNbaV07XHJcbiAgICAgICAgdmFyIGR4ID0gbW91c2VYIC0gZG90Lng7XHJcbiAgICAgICAgdmFyIGR5ID0gbW91c2VZIC0gZG90Lnk7IFxyXG5cdFx0Ly9hbGVydChkeCAqIGR4ICsgZHkgKiBkeSk7XHJcbiAgICAgICAgaWYgKGR4ICogZHggKyBkeSAqIGR5IDwgdG9vbHRpcHNbaV0uclhyKSB7XHJcblx0XHRcdFxyXG5cdFx0XHQvL01pbmVcclxuXHRcdFx0JChcIiN0aXBcIikuc2hvdygzMDApOyAvL3Nob3cgdG9vbHRpcCwgYnkgZGVmYXVsdCBpbiBjc3M6IGRpc3BsYXk6IG5vbmUuIElzIG1hZGUgdG8gZml4IG92ZXJsYXBpbmcgYW4gZW1wdHkgdG9vbHRpcFxyXG5cdFx0XHRcclxuICAgICAgICAgICAgdGlwQ2FudmFzLnN0eWxlLmxlZnQgPSAodG9vbHRpcHNbaV0ueCkgKyBcInB4XCI7IC8vdG9vbHRpcCBtYXJnaW4gbGVmdFxyXG4gICAgICAgICAgICB0aXBDYW52YXMuc3R5bGUudG9wID0gKHRvb2x0aXBzW2ldLnkgLSA0MCkgKyBcInB4XCI7ICAvL3Rvb2x0aXAgbWFyZ2luIGJvdHRvbVxyXG4gICAgICAgICAgICB0aXBDdHguY2xlYXJSZWN0KDAsIDAsIHRpcENhbnZhcy53aWR0aCwgdGlwQ2FudmFzLmhlaWdodCApOyAvL2NsZWFyUmVjdChtYXJnaW5MZWZ0LCB3aWR0aCwgaGVpZ2h0KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgIHRpcEN0eC5yZWN0KDAsMCx0aXBDYW52YXMud2lkdGgsdGlwQ2FudmFzLmhlaWdodCk7XHJcblx0XHRcdFxyXG5cdFx0XHQvL2RlZmluZSB0b29sdGlwIHRleHRcclxuXHRcdFx0dmFyIHRvb2xUaXBUZXh0X2RhdGUgPSBuZXcgY29udmVydERhdGVfZmlsZSgpLmZ1bmN0X2NvbnZlcnRfZGF0ZVN0YW1wKHRvb2x0aXBzW2ldLmRhdGVaKSA7IC8vY29udmVydHMgZGF0ZVVuaXggdG8gbm9ybWFsXHJcblx0XHRcdC8vYWxlcnQodG9vbFRpcFRleHRfZGF0ZSk7XHJcbiAgICAgICAgICAgIHZhciB0b29sVGlwVGV4dF90ZXh0ID0gdG9vbHRpcHNbaV0udGlwICsgXCIgXCIgKyB0b29sdGlwc1tpXS5zdGF0dXMgOyAgLy9kZWZpbmVzIHRpcCArIHN0YXR1cywgaS5lIFwiNDAgTGVmdFwiXHJcbiAgICAgICAgICAgIGlmKHRvb2x0aXBzW2ldLnN0YXR1cyA9PSBcIkpvaW5lZFwiKXtcclxuXHRcdFx0XHR0ZXh0Y29sb3JzID0gXCJncmVlblwiO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRleHRjb2xvcnMgPSBcInJlZFwiO1xyXG5cdFx0XHR9XHRcdFx0XHRcclxuXHRcdFx0XHJcblx0XHRcdHRpcEN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7IC8vc2V0IGluaXRpYWwgdGV4dCBjb2xvcnMgdG8gYmxhY2tcclxuXHRcdFx0XHJcblx0XHRcdC8vaW4gbW9iaWxlIG9ubHkuIEhlcmUgd2Ugc3BlY2lmeSBmb25yLXNpemUgYW5kIHRleHQgcGFkZGluZ3MgZm9yIG1vYmlsZSBkZXZpY2VzXHJcblx0XHRcdGlmKHNjcmVlbi53aWR0aCA8PSA2NDApeyBcclxuXHRcdFx0ICAgIHRpcEN0eC5mb250ID0gXCI0NXB4IEFyaWFsXCI7IC8vc2V0IGZvbnQgc2l6ZVxyXG5cdFx0XHRcdHRpcEN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiOyAvL3NldCB0ZXh0IHRvIGNlbnRlciwgaW4gb3JkZXIgdG8gY2VudGVyIGhvcml6LCB0aGVyZSBtdXN0IGJlIDE1MCBpbiAuZmlsbFRleHQodGV4dCwgMTUwLCBwYWRkaW5nVG9wKSAvLyAxNTAgaXMgdGhlIGFuY2hvciBwb2ludFxyXG5cdFx0XHRcdHRpcEN0eC5maWxsVGV4dCgvKiQoZG90LnRpcCkudmFsKCkqL3Rvb2xUaXBUZXh0X2RhdGUsIDE1MCwgNjUpOyAvLyh0ZXh0LCBwYWRkaW5nTGVmdCwgcGFkZGluZ1RvcCkgIC8vIFRvb2x0aXAgRGF0ZVxyXG5cdFx0XHRcdC8vdGlwQ3R4LmZpbGxUZXh0KFwiX19fX19fXCIsIDI1LCA3NSk7XHJcblx0XHRcdFx0dGlwQ3R4LmZpbGxTdHlsZSA9IHRleHRjb2xvcnM7IC8vc2V0IHRleHQgY29sb3JzXHJcblx0XHRcdFx0dGlwQ3R4LmZvbnQgPSBcIjYwcHggQXJpYWxcIjsgLy9zZXQgZm9udCBzaXplXHJcblx0XHRcdFx0dGlwQ3R4LmZpbGxUZXh0KHRvb2xUaXBUZXh0X3RleHQsIDE1MCwgMTM1KTsgIC8vVG9vbHRpcCB0ZXh0LCBpLmUgXCI0MCBMZWZ0XCJcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvL2Rlc2t0b3BcclxuXHRcdFx0XHR0aXBDdHguZm9udCA9IFwiNDBweCBBcmlhbFwiOyAvL3NldCBmb250IHNpemVcclxuXHRcdFx0XHR0aXBDdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjsgLy9zZXQgdGV4dCB0byBjZW50ZXIsIGluIG9yZGVyIHRvIGNlbnRlciBob3JpeiwgdGhlcmUgbXVzdCBiZSAxNTAgaW4gLmZpbGxUZXh0KHRleHQsIDE1MCwgcGFkZGluZ1RvcCkgLy8gMTUwIGlzIHRoZSBhbmNob3IgcG9pbnRcclxuICAgICAgICAgICAgICAgIHRpcEN0eC5maWxsVGV4dCgvKiQoZG90LnRpcCkudmFsKCkqL3Rvb2xUaXBUZXh0X2RhdGUsIDE1OSwgNDUpOyAvLyh0ZXh0LCBwYWRkaW5nTGVmdCwgcGFkZGluZ1RvcCkod2FzIDQ1LCA0NSlcclxuXHRcdFx0XHQvL3RpcEN0eC5maWxsVGV4dChcIl9fX19fX19fX19fX19fX19fX19fXCIsIDEsIDUwKTtcclxuXHRcdFx0XHR0aXBDdHguZmlsbFN0eWxlID0gdGV4dGNvbG9yczsgLy9zZXQgdGV4dCBjb2xvcnNcclxuXHRcdFx0XHR0aXBDdHguZmlsbFRleHQodG9vbFRpcFRleHRfdGV4dCwgMTUwLCAxMDUpOyAvL1Rvb2x0aXAgdGV4dCwgaS5lIFwiNDAgTGVmdFwiICh3YXMgNzAsIDEwNSlcclxuXHRcdFx0fVxyXG4gICAgICAgICAgICBoaXQgPSB0cnVlO1xyXG4gICAgICAgIH0gLyplbHNlIHtcclxuXHRcdFx0JChcIiN0aXBcIikuaGlkZSg4MDApO1xyXG5cdFx0fSovXHJcbiAgICB9XHJcbiAgICBpZiAoIWhpdCkge1xyXG4gICAgICAgIHRpcENhbnZhcy5zdHlsZS5sZWZ0ID0gXCItMTAwMHB4XCI7ICAvL3dhcyAyMDBweCwgdGhpcyBzb2x1dGlvbiBmaXhlcyBidWcgd2hlbiB0b29sdGlwIGFwcGVhcnMgaW4gbGVmdCBlbXB0eSBpZiBub3QgbW91c2Ugb3ZlcmVkXHJcbiAgICB9XHJcblx0fVxyXG5cclxuXHJcblxyXG5cclxuICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzaG93VG9vbHRpcF9vbk1vdXNlT3ZlcjsiLCIvL3ZhciBjb3JlX3ZhciA9IHJlcXVpcmUoJy4vY29yZS5qcycpOyAvL0lNUE9SVCBWQVJJQUJMRVMge2MsIHhQYWRkaW5nLHlQYWRkaW5nfSBmcm9tIGNvcmUuanNcclxuLy92YXIgZ2V0TWF4WV9maWxlID0gcmVxdWlyZSgnLi9nZXRNYXhZLmpzJyk7XHJcbi8vdmFyIGNvbnZlcnREYXRlX2ZpbGUgPSByZXF1aXJlKCcuL2NvbnZlcnREYXRlU3RhbXAuanMnKTtcclxuLy92YXIgZ2V0WVBpeGVsX2ZpbGUgPSByZXF1aXJlKCcuL2dldFlQaXhlbC5qcycpOyAvLyBSZXR1cm4gdGhlIFkgcGl4ZWwgZm9yIGEgZ3JhcGggcG9pbnQtPmZ1bmN0aW9uIGdldFhQaXhlbCgpe1xyXG4vL3ZhciBnZXRYUGl4ZWxfZmlsZSA9IHJlcXVpcmUoJy4vZ2V0WFBpeGVsLmpzJyk7IC8vIFJldHVybiB0aGUgWCBwaXhlbCBmb3IgYSBncmFwaCBwb2ludC0+ZnVuY3Rpb24gZ2V0WFBpeGVsKCl7XHJcblxyXG5cclxuLy8gRHJhdyB0aGUgWSB2YWx1ZSB0ZXh0cywgdGV4dCBpbiB2ZXJ0aWNhbCBheGlzXHJcbmZ1bmN0aW9uIHN3aXRjaERheU5pZ2h0TW9kZSgpe1xyXG5cdFxyXG5cclxuXHJcbiAgICB0aGlzLnN3aXRjaE1vZGUgPSBmdW5jdGlvbigpeyBcclxuICAgICAgLy9zdGFydCBpbXBvcnQgVmFycyBmcm9tIGNvcmUuanNcclxuICAgICAgLy92YXIgYyA9IGNvcmVfdmFyLmM7IC8vSU1QT1JUIFZBUiB7Y30gZm9tIGNvcmUuanNcclxuXHQgIC8vdmFyIHhQYWRkaW5nID0gY29yZV92YXIueFBhZGRpbmc7IC8vSU1QT1JUIFZBUiB7eFBBZGRpbmd9IGZyb20gY29yZS5qc1xyXG5cdCAgLy9FTkQgIGltcG9ydCBWYXJzIGZyb20gY29yZS5qc1xyXG5cdCAgXHJcblx0ICAkKFwiI2NoYW5nZU1vZGVcIikuY2xpY2soZnVuY3Rpb24oKSB7IFxyXG5cclxuICAgICAgICBpZigkKFwiI2NoYW5nZU1vZGVcIikuaHRtbCgpID09IFwiTmlnaHQgbW9kZVwiKXtcclxuXHRcdCAgJChcIiNjaGFuZ2VNb2RlXCIpLmh0bWwoXCJEYXkgbW9kZVwiKTtcclxuXHRcdCAgJChcImJvZHlcIikuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcImdyZXlcIik7XHJcblx0ICAgIH0gZWxzZSB7XHJcblx0XHQgICQoXCIjY2hhbmdlTW9kZVwiKS5odG1sKFwiTmlnaHQgbW9kZVwiKTtcclxuXHRcdCAgJChcImJvZHlcIikuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIndoaXRlXCIpO1xyXG5cdCAgICB9XHJcbiAgICAgfSk7XHJcblxyXG5cclxuICB9ICAgIFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHN3aXRjaERheU5pZ2h0TW9kZTsiLCJmdW5jdGlvbiB0ZXN0KCl7XHJcblx0XHJcbiAgdGhpcy5jb29yZGluYXRlc1NldCA9XHRcIml0IGlzIHRlc3QsIENvbW1vbkpTIHdvcmtzXCIsXHJcblxyXG5cdFxyXG4gIHRoaXMubG9hZEV4YW1wbGVDb29yZGluYXRlcyA9IGZ1bmN0aW9uKCl7XHJcblx0ICAvLyQoXCIjY29vcmRzSW5wdXRcIikudmFsKHRoaXMuY29vcmRpbmF0ZXNTZXQpOyAvLyAgd2FzIFxcbiAgaW4gdGhlICBlbmQgXHJcblx0ICBhbGVydCh0aGlzLmNvb3JkaW5hdGVzU2V0KTtcclxuICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHRlc3Q7Il19
