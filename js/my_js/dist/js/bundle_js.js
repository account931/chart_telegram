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



},{"./modules/core.js":4,"./modules/test.js":16}],2:[function(require,module,exports){
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
},{"./core.js":4,"./getXPixel.js":12,"./getYPixel.js":13}],3:[function(require,module,exports){
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
},{"./core.js":4}],4:[function(require,module,exports){
var toolTip_file = require('./creates_tooltip_array_from_json.js'); // define tooltips for each json point //adding to array tooltips
var drawAxis_file = require('./draw_Vert_Horiz_Axis.js');  //draw horizontal and vertical Axis
var drawXValues_file = require('./draw_X_values_text.js');  //Draw the X value texts, draw text values in horizont axis!!!!!!
var drawYValues_vertical_file = require('./draw_Y_values_vertical.js');  //Draw the X value texts, draw text values in vertical axis!!!!!!
var drawChartLines_file = require('./draw_chartLines.js');  //draw chart lines 
var addDots_file = require('./addHoverable_Dots.js');  //draw hoverable dots, if u hover over them-> tooltip will appear
var showTooltips_file = require('./showTooltip_onMouseOver.js');  //show Tooltips onMouseOver
var switchNightDay_file = require('./switchDayNightMode.js');  //switchDayNightMode


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
	  
	  // **                                                                                  **
      // **************************************************************************************
      // **************************************************************************************
	  
   } //end this.CreateChart
   
   

   
   
   
   
   
   
   
} //end function ALL

module.exports = core;
},{"./addHoverable_Dots.js":2,"./creates_tooltip_array_from_json.js":5,"./draw_Vert_Horiz_Axis.js":6,"./draw_X_values_text.js":7,"./draw_Y_values_vertical.js":8,"./draw_chartLines.js":9,"./showTooltip_onMouseOver.js":14,"./switchDayNightMode.js":15}],5:[function(require,module,exports){
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
},{"./getXPixel.js":12,"./getYPixel.js":13}],6:[function(require,module,exports){
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
},{"./core.js":4}],7:[function(require,module,exports){
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
},{"./convertDateStamp.js":3,"./core.js":4,"./creates_tooltip_array_from_json.js":5,"./getMaxX.js":10,"./getXPixel.js":12}],8:[function(require,module,exports){
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
},{"./core.js":4,"./getMaxY.js":11,"./getYPixel.js":13}],9:[function(require,module,exports){
var core_var = require('./core.js'); //IMPORT VARIABLES {c, xPadding,yPadding} from core.js
var getMaxY_file = require('./getMaxY.js');
//var convertDate_file = require('./convertDateStamp.js');
var getYPixel_file = require('./getYPixel.js'); // Return the Y pixel for a graph point->function getXPixel(){
var getXPixel_file = require('./getXPixel.js'); // Return the X pixel for a graph point->function getXPixel(){


// Draw the Y value texts, text in vertical axis
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
},{"./core.js":4,"./getMaxY.js":11,"./getXPixel.js":12,"./getYPixel.js":13}],10:[function(require,module,exports){
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
},{"./core.js":4}],11:[function(require,module,exports){
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
},{"./core.js":4}],12:[function(require,module,exports){
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
},{"./core.js":4,"./getMaxX.js":10}],13:[function(require,module,exports){
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
},{"./core.js":4,"./getMaxY.js":11}],14:[function(require,module,exports){
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
},{"./convertDateStamp.js":3,"./core.js":4,"./getXPixel.js":12,"./getYPixel.js":13}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
function test(){
	
  this.coordinatesSet =	"it is test, CommonJS works",

	
  this.loadExampleCoordinates = function(){
	  //$("#coordsInput").val(this.coordinatesSet); //  was \n  in the  end 
	  alert(this.coordinatesSet);
   }
}

module.exports = test;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tYWluLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9hZGRIb3ZlcmFibGVfRG90cy5qcyIsImpzL215X2pzL2NvbW1vbl9qc19tb2R1bGVzL21vZHVsZXMvY29udmVydERhdGVTdGFtcC5qcyIsImpzL215X2pzL2NvbW1vbl9qc19tb2R1bGVzL21vZHVsZXMvY29yZS5qcyIsImpzL215X2pzL2NvbW1vbl9qc19tb2R1bGVzL21vZHVsZXMvY3JlYXRlc190b29sdGlwX2FycmF5X2Zyb21fanNvbi5qcyIsImpzL215X2pzL2NvbW1vbl9qc19tb2R1bGVzL21vZHVsZXMvZHJhd19WZXJ0X0hvcml6X0F4aXMuanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tb2R1bGVzL2RyYXdfWF92YWx1ZXNfdGV4dC5qcyIsImpzL215X2pzL2NvbW1vbl9qc19tb2R1bGVzL21vZHVsZXMvZHJhd19ZX3ZhbHVlc192ZXJ0aWNhbC5qcyIsImpzL215X2pzL2NvbW1vbl9qc19tb2R1bGVzL21vZHVsZXMvZHJhd19jaGFydExpbmVzLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9nZXRNYXhYLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9nZXRNYXhZLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9nZXRYUGl4ZWwuanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tb2R1bGVzL2dldFlQaXhlbC5qcyIsImpzL215X2pzL2NvbW1vbl9qc19tb2R1bGVzL21vZHVsZXMvc2hvd1Rvb2x0aXBfb25Nb3VzZU92ZXIuanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tb2R1bGVzL3N3aXRjaERheU5pZ2h0TW9kZS5qcyIsImpzL215X2pzL2NvbW1vbl9qc19tb2R1bGVzL21vZHVsZXMvdGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcclxudmFyIHRlc3RfZmlsZSA9IHJlcXVpcmUoJy4vbW9kdWxlcy90ZXN0LmpzJyk7XHJcbnZhciBjb3JlX2ZpbGUgPSByZXF1aXJlKCcuL21vZHVsZXMvY29yZS5qcycpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgLy92YXIgdGVzdCA9IG5ldyB0ZXN0X2ZpbGUoKTtcclxuXHQvL3Rlc3QubG9hZEV4YW1wbGVDb29yZGluYXRlcygpO1xyXG5cdFxyXG5cdHZhciBtYWluID0gbmV3IGNvcmVfZmlsZSgpO1xyXG5cdG1haW4uY3JlYXRlQ2hhcnQoKTtcclxuXHRcclxuXHJcblx0XHJcblx0XHJcblx0XHJcblx0XHJcblx0XHJcblx0XHJcblx0XHJcblxyXG5cclxuXHJcblxyXG4vLyBFTkQgUkVBRFlcclxufSk7XHJcblxyXG5cclxuIiwidmFyIGNvcmVfdmFyID0gcmVxdWlyZSgnLi9jb3JlLmpzJyk7IC8vSU1QT1JUIFZBUklBQkxFUyB7YywgeFBhZGRpbmcseVBhZGRpbmd9IGZyb20gY29yZS5qc1xyXG4vL3ZhciBnZXRNYXhZX2ZpbGUgPSByZXF1aXJlKCcuL2dldE1heFkuanMnKTtcclxuLy92YXIgY29udmVydERhdGVfZmlsZSA9IHJlcXVpcmUoJy4vY29udmVydERhdGVTdGFtcC5qcycpO1xyXG52YXIgZ2V0WVBpeGVsX2ZpbGUgPSByZXF1aXJlKCcuL2dldFlQaXhlbC5qcycpOyAvLyBSZXR1cm4gdGhlIFkgcGl4ZWwgZm9yIGEgZ3JhcGggcG9pbnQtPmZ1bmN0aW9uIGdldFhQaXhlbCgpe1xyXG52YXIgZ2V0WFBpeGVsX2ZpbGUgPSByZXF1aXJlKCcuL2dldFhQaXhlbC5qcycpOyAvLyBSZXR1cm4gdGhlIFggcGl4ZWwgZm9yIGEgZ3JhcGggcG9pbnQtPmZ1bmN0aW9uIGdldFhQaXhlbCgpe1xyXG5cclxuXHJcbi8vZHJhdyBob3ZlcmFibGUgZG90cywgaWYgdSBob3ZlciBvdmVyIHRoZW0tPiB0b29sdGlwIHdpbGwgYXBwZWFyXHJcbmZ1bmN0aW9uIGFkZEhvdmVyYWJsZV9Eb3RzKCl7XHJcblx0XHJcblxyXG5cclxuICAgIHRoaXMuYWRkSG92ZXJhYmxlRG90cyA9IGZ1bmN0aW9uKGpzb24peyBcclxuXHRcclxuICAgICAgLy9zdGFydCBpbXBvcnQgVmFycyBmcm9tIGNvcmUuanMqKioqKioqKioqKipcclxuICAgICAgdmFyIGMgPSBjb3JlX3Zhci5jOyAvL0lNUE9SVCBWQVIge2N9IGZvbSBjb3JlLmpzXHJcblx0ICAvL3ZhciB4UGFkZGluZyA9IGNvcmVfdmFyLnhQYWRkaW5nOyAvL0lNUE9SVCBWQVIge3hQQWRkaW5nfSBmcm9tIGNvcmUuanNcclxuXHQgIC8vRU5EICBpbXBvcnQgVmFycyBmcm9tIGNvcmUuanMqKioqKioqKioqKioqXHJcblx0ICBcclxuICAgICAgYy5maWxsU3R5bGUgPSAnIzMzMyc7IC8vZ3JleVxyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBqc29uLmxlbmd0aDsgaSsrKSB7XHJcblx0ICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGpzb25baV0uY29sdW1ucy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBjLmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjLmFyYyhuZXcgZ2V0WFBpeGVsX2ZpbGUoKS5nZXRYUGl4ZWwzKGpzb25baV0uY29sdW1uc1tqXS5YKSwgbmV3IGdldFlQaXhlbF9maWxlKCkuZ2V0WVBpeGVsMyhqc29uW2ldLmNvbHVtbnNbal0uWSksIDgvKlJhZGl1cyovLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGMuZmlsbCgpO1xyXG5cdCAgICAgfVxyXG4gICAgICB9XHJcblxyXG5cclxuICB9ICAgIFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFkZEhvdmVyYWJsZV9Eb3RzOyIsInZhciBjb3JlX3ZhciA9IHJlcXVpcmUoJy4vY29yZS5qcycpOyAvL0lNUE9SVCBWQVJJQUJMRVMge2MsIHhQYWRkaW5nLHlQYWRkaW5nfSBmcm9tIGNvcmUuanNcclxuLy92YXIgZ2V0TWF4WF9maWxlID0gcmVxdWlyZSgnLi9nZXRNYXhYLmpzJyk7XHJcblxyXG5cclxuLy9jb252ZXJ0cyBVbml4IHRvIG5vcm1hbC4gVG8gdXNlIG9uZSBzYW1lIGZ1bmN0aW9uIHdlIHVzZSB0aGUgMm5kIGFyZyB7dGFnfSwgaWYgaXQgaXMgc2V0IGluIGNhbGxpbmcgZnVuY3Rpb24sIGZ1bmN0aW9uIHJldHVybnMgc2hvcnQgZGF0ZSwgaS5lIHsxLjAzfVxyXG5mdW5jdGlvbiBjb252ZXJ0RGF0ZVN0YW1wdCgpe1xyXG5cdFxyXG5cclxuIFxyXG4gIHRoaXMuZnVuY3RfY29udmVydF9kYXRlU3RhbXAgPSBmdW5jdGlvbihkYXRlU3RhbXBwLCB0YWcpeyAgIC8vYXJnKFVuaXhTdGFtcCwgdHJ1ZS9mYWxzZSlcclxuICBcclxuICAgICAgLy9zdGFydCBpbXBvcnQgVmFycyBmcm9tIGNvcmUuanNcclxuICAgICAgdmFyIGMgPSBjb3JlX3Zhci5jOyAvL0lNUE9SVCBWQVIge2N9IGZvbSBjb3JlLmpzXHJcblx0ICAvL3ZhciB4UGFkZGluZyA9IGNvcmVfdmFyLnhQYWRkaW5nOyAvL0lNUE9SVCBWQVIge3hQQWRkaW5nfSBmb20gY29yZS5qc1xyXG5cdCAgdmFyIHlQYWRkaW5nID0gY29yZV92YXIueVBhZGRpbmc7IC8vSU1QT1JUIFZBUiB7eVBBZGRpbmd9IGZvbSBjb3JlLmpzXHJcblx0ICAvL0VORCAgaW1wb3J0IFZhcnMgZnJvbSBjb3JlLmpzXHJcblx0ICBcclxuXHQgIFxyXG4gIHZhciBuO1xyXG4gIHZhciB3ZWVrZGF5cyA9IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodXInLCAnRnJpJywgJ1NhdCddO1xyXG4gIHZhciBtb250aExpc3QgPSBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIl07XHJcbiAgXHJcbiAgdmFyIGRhdGVUaW1lID0gIG5ldyBEYXRlKGRhdGVTdGFtcHAqMTAwMCk7Ly9NZWdhIEVycm9yLCBtdXN0IGJlIHtkYXRlU3RhbXBwKjEwMDB9LCB3YXMgd2l0aG91dCAqMTAwMFxyXG4gIHZhciBjdXJyX2RhdGUgPSBkYXRlVGltZS5nZXREYXRlKCk7IC8vZ2V0cyB0aGUgZGF0ZVxyXG4gIHZhciBjdXJyX21vbnRoID0gZGF0ZVRpbWUuZ2V0TW9udGgoKTsvLyBnZXRzIG1vbnRoIC8vKyAxOyAgXHJcbiAgdmFyIGN1cnJfeWVhciA9IGRhdGVUaW1lLmdldEZ1bGxZZWFyKCk7XHJcbiAgdmFyIGRheU9mV2VlayA9IHdlZWtkYXlzW2RhdGVUaW1lLmdldERheSgpXTsgLy9kYXkgb2YgdGhlIHdlZWtcclxuICBcclxuICAvL2lmIDJuZCBhcmcgaXNzZXQsIHdoZW4gY2FsbGluZyB0aGUgZnVuY3Rpb24sIHJlcnVybnMgc2hvcnQgZGF0ZSwgaS5lIHsxLjAzfS4gVXNlZCBpbiBZIGF4aXNcclxuICBpZih0YWcpe1xyXG5cdCAgY3Vycl9tb250aCA9IGN1cnJfbW9udGggKyAxOyAgLy9tb250aCArIDFcclxuXHQgIGlmKGN1cnJfbW9udGgudG9TdHJpbmcoKS5sZW5ndGggPT0gMSl7IC8vaWYgbW9udGggaW50IGlzIG9mIG9uZSBsZW5ndGgsIGFkZCBcIjBcIlxyXG5cdFx0IGN1cnJfbW9udGggPSBcIjBcIiArIGN1cnJfbW9udGg7IC8vaS5lIFwiMDNcIlxyXG5cdCAgfVxyXG5cdCAgbiA9IGN1cnJfZGF0ZSArIFwiLlwiICsgY3Vycl9tb250aDsgLy9yZXR1cm5zIDEuMDNcclxuXHQgIFxyXG4gIC8vaWYgMm5kIGFyZyBpcyBOT1Qgc2V0LCByZXR1cm5zIGZ1bGwgZGF0ZSwgaS5lICB7U2F0LCAzIE1hcmNofS4gVXNlZCBpbiB0b29sdGlwc1xyXG4gIH0gZWxzZSB7XHJcbiAgICAgIG4gPSBkYXlPZldlZWsgKyBcIiwgXCIgKyBtb250aExpc3RbY3Vycl9tb250aF0gKyBcIiBcIiArIGN1cnJfZGF0ZS8qICsgXCItXCIgKyBjdXJyX3llYXIqLzsgLy9yZXR1cm5zIFNhdCwgMyBNYXJjaFxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG47XHJcblx0ICBcclxuXHJcbiAgfSAgICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjb252ZXJ0RGF0ZVN0YW1wdDsiLCJ2YXIgdG9vbFRpcF9maWxlID0gcmVxdWlyZSgnLi9jcmVhdGVzX3Rvb2x0aXBfYXJyYXlfZnJvbV9qc29uLmpzJyk7IC8vIGRlZmluZSB0b29sdGlwcyBmb3IgZWFjaCBqc29uIHBvaW50IC8vYWRkaW5nIHRvIGFycmF5IHRvb2x0aXBzXHJcbnZhciBkcmF3QXhpc19maWxlID0gcmVxdWlyZSgnLi9kcmF3X1ZlcnRfSG9yaXpfQXhpcy5qcycpOyAgLy9kcmF3IGhvcml6b250YWwgYW5kIHZlcnRpY2FsIEF4aXNcclxudmFyIGRyYXdYVmFsdWVzX2ZpbGUgPSByZXF1aXJlKCcuL2RyYXdfWF92YWx1ZXNfdGV4dC5qcycpOyAgLy9EcmF3IHRoZSBYIHZhbHVlIHRleHRzLCBkcmF3IHRleHQgdmFsdWVzIGluIGhvcml6b250IGF4aXMhISEhISFcclxudmFyIGRyYXdZVmFsdWVzX3ZlcnRpY2FsX2ZpbGUgPSByZXF1aXJlKCcuL2RyYXdfWV92YWx1ZXNfdmVydGljYWwuanMnKTsgIC8vRHJhdyB0aGUgWCB2YWx1ZSB0ZXh0cywgZHJhdyB0ZXh0IHZhbHVlcyBpbiB2ZXJ0aWNhbCBheGlzISEhISEhXHJcbnZhciBkcmF3Q2hhcnRMaW5lc19maWxlID0gcmVxdWlyZSgnLi9kcmF3X2NoYXJ0TGluZXMuanMnKTsgIC8vZHJhdyBjaGFydCBsaW5lcyBcclxudmFyIGFkZERvdHNfZmlsZSA9IHJlcXVpcmUoJy4vYWRkSG92ZXJhYmxlX0RvdHMuanMnKTsgIC8vZHJhdyBob3ZlcmFibGUgZG90cywgaWYgdSBob3ZlciBvdmVyIHRoZW0tPiB0b29sdGlwIHdpbGwgYXBwZWFyXHJcbnZhciBzaG93VG9vbHRpcHNfZmlsZSA9IHJlcXVpcmUoJy4vc2hvd1Rvb2x0aXBfb25Nb3VzZU92ZXIuanMnKTsgIC8vc2hvdyBUb29sdGlwcyBvbk1vdXNlT3ZlclxyXG52YXIgc3dpdGNoTmlnaHREYXlfZmlsZSA9IHJlcXVpcmUoJy4vc3dpdGNoRGF5TmlnaHRNb2RlLmpzJyk7ICAvL3N3aXRjaERheU5pZ2h0TW9kZVxyXG5cclxuXHJcbmZ1bmN0aW9uIGNvcmUoKXtcclxuICBcclxuICAvL0pzb24gZGF0YSBhcnJheVxyXG4gIHRoaXMuanNvbiA9XHRbXHJcbiAgICB7IC8vY2hhcnQgMVxyXG4gICAgICBjb2x1bW5zOiBbICB7WDogMCxZOiA0MCwgZGF0ZTogMTU1MTM5ODQwMCAvKmkuZSAxLjAzLjIwMTkqL30sIHtYOiAyLFk6IDEzMCwgZGF0ZTogMTU1MTQ4NDgwMH0sIHtYOiAzLFk6IDI0NCwgZGF0ZTogMTU1MTU3MTIwMH0sIHtYOiA0LFk6IDEyMCwgZGF0ZTogMTU1MTY1NzYwMH0sIHtYOiA1LFk6IDYwLCBkYXRlOiAxNTUxNzQ0MDAwLyo1LjAzLjE5Ki99LCB7WDogNixZOiAxMjAsIGRhdGU6IDE1NTE4MzA0MDB9LCB7WDogNyxZOiA2OSwgZGF0ZTogMTU1MTkxNjgwMH1dLFxyXG5cdCAgdHlwZXM6ICdsaW5lJyxcclxuXHQgIGNvbG9yczogJyMzREMyM0YnLCAgLy9ncmVlblxyXG5cdCAgbmFtZXM6ICduYW1lc1gnXHJcblx0fSxcclxuXHRcclxuXHR7IC8vY2hhcnQgMlxyXG4gICAgICBjb2x1bW5zOiBbICB7WDogMCxZOiAyOCwgZGF0ZTogMTU1MTM5ODQwMCAvKmkuZSAxLjAzLjIwMTkqL30sIHtYOiAyLFk6IDcwLCBkYXRlOiAxNTUxNDg0ODAwfSwge1g6IDMsWTogODgsIGRhdGU6IDE1NTE1NzEyMDB9LCB7WDogNCxZOiA2MiwgZGF0ZTogMTU1MTY1NzYwMH0sIHtYOiA1LFk6IDQ1LCBkYXRlOiAxNTUxNzQ0MDAwLyo1LjAzLjE5Ki99LCB7WDogNixZOiA0MCwgZGF0ZTogMTU1MTgzMDQwMH0sIHtYOiA3LFk6NDAsIGRhdGU6IDE1NTE5MTY4MDB9XSxcclxuXHQgIHR5cGVzOiAnbGluZScsXHJcblx0ICBjb2xvcnM6ICcjRjM0QzQ0JywgIC8vcmVkXHJcblx0ICBuYW1lczogJ25hbWVzWDInXHJcblx0fSxcclxuICBdLFxyXG5cclxuXHRcclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRcclxuICB0aGlzLmNyZWF0ZUNoYXJ0ID0gZnVuY3Rpb24oKXtcclxuXHQgIFxyXG5cdHZhciBqc29uLCBjLCBvZmZzZXRYLCBvZmZzZXRZLCB0aXBDYW52YXNfMix0aXBDdHg7IC8vRVhQT1JUU1xyXG5cdGV4cG9ydHMuanNvbiA9IHRoaXMuanNvbjsgLy9leHBvcnRzIGpzb24gYXJyYXkgKGkuZSB0byBnZXRNYXhYIE1vZHVsZSlcclxuICBcclxuICBcclxuXHQgIFxyXG5cdCAgLy9hbGVydCh0aGlzLmpzb25bMF0ubmFtZXMpO1xyXG5cdCAgLy9jYW52YXMgd2l0aCBjaGFydFxyXG4gICAgICB2YXIgZ3JhcGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdyYXBoXCIpO1xyXG4gICAgICBleHBvcnRzLmMgPSBncmFwaC5nZXRDb250ZXh0KFwiMmRcIik7IC8vRVhQT1JUIFZBUklBQkxFIChpLmUgdG8ge2RyYXdfVmVydF9Ib3Jpel9BeGlzfSBNb2R1bGUpXHJcblxyXG4gICAgICAvL0lGIE5PVCBJTiBNb2JpbGUsIGkuZSBvbiBsYXJnZSBzY3JlZW4sIHVzZSBzcGVjaWFsIGNhbnZhcyB3aWR0aCByZWNhbGN1bGF0aW9uLCBvbiBtb2JpbGUgbGVmdCBpdCBhcyB3YXMgKDMwMHgxNTApLlxyXG4gICAgICAvL1UgbWF5IG5vdCB1c2UgaXQsIGJ1dCBvbiBkZXNrdG9wIGNhbnZhcyBjaGFydCB3aWxsIGJlIHRvbyBzbWFsbCwgb25seSAzMDB4MTUwXHJcbiAgICAgIGlmKHNjcmVlbi53aWR0aCA+PSA2NDApeyBcclxuICAgICAgICAgIGdyYXBoLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSAzMjA7IFxyXG5cdCAgICAgIGdyYXBoLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDMyMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgXHJcblxyXG4gICAgICAvL2NhbnZhcyB3aXRoIHRvb2x0aXBzIGRvdFxyXG4gICAgICB2YXIgdGlwQ2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXBcIik7XHJcbiAgICAgIGV4cG9ydHMudGlwQ3R4ID0gdGlwQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKTsgLy9FWFBPUlQgVkFSSUFCTEUgKGkuZSB0byB7c2hvd1Rvb2x0aXBfb25Nb3VzZU92ZXJ9IE1vZHVsZSlcclxuXHQgIFxyXG5cdCAgdmFyIGNhbnZhc09mZnNldCA9ICQoXCIjZ3JhcGhcIikub2Zmc2V0KCk7IFxyXG5cdCAgXHJcbiAgICAgIGV4cG9ydHMub2Zmc2V0WCA9IGNhbnZhc09mZnNldC5sZWZ0OyAvL0VYUE9SVCBWQVJJQUJMRSAoaS5lIHRvIHtzaG93VG9vbHRpcF9vbk1vdXNlT3Zlcn0gTW9kdWxlKVxyXG4gICAgICBleHBvcnRzLm9mZnNldFkgPSBjYW52YXNPZmZzZXQudG9wOyAgLy9FWFBPUlQgVkFSSUFCTEUgKGkuZSB0byB7c2hvd1Rvb2x0aXBfb25Nb3VzZU92ZXJ9IE1vZHVsZSlcclxuXHQgIGV4cG9ydHMudGlwQ2FudmFzXzIgPSB0aXBDYW52YXM7ICAgICAvL0VYUE9SVCBWQVJJQUJMRSAoaS5lIHRvIHtzaG93VG9vbHRpcF9vbk1vdXNlT3Zlcn0gTW9kdWxlKVxyXG5cclxuICAgICAgdmFyIGdyYXBoO1xyXG5cdCAgLy92YXIgeFBhZGRpbmc7XHJcbiAgICAgIGV4cG9ydHMueFBhZGRpbmcgPSAzMDsgLy9sZWZ0IHBhZGRpbmcgb2Ygc2NhbGVzIGF4aXMgIC8vRVhQT1JUIFZBUklBQkxFIChpLmUgdG8ge2dldFhQaXhlbH0gTW9kdWxlKVxyXG4gICAgICAvKnZhciovIGV4cG9ydHMueVBhZGRpbmcgPSAzMDsgLy9FWFBPUlQgVkFSSUFCTEUgKGkuZSB0byB7Z2V0WVBpeGVsfSBNb2R1bGUpXHJcblx0ICBcclxuXHQgIFxyXG5cdCAgXHJcblx0ICBcclxuXHQgIC8vTU9EVUxFUyBQYXJ0LS0tLS0tLS0tLVxyXG4gICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqKiAgXHJcblx0ICBcclxuXHQgIC8vIGRlZmluZSB0b29sdGlwcyBmb3IgZWFjaCBqc29uIHBvaW50IC8vYWRkaW5nIHRvIGFycmF5IHRvb2x0aXBzXHJcblx0ICB2YXIgY3JlYXRlVG9vbHRpcEFycmF5ID0gbmV3IHRvb2xUaXBfZmlsZSgpO1xyXG5cdCAgdmFyIHRvb2x0aXBSZXN1bHQgPSBjcmVhdGVUb29sdGlwQXJyYXkuY3JlYXRlQXJyYXkodGhpcy5qc29uKTsgLy90b29sdGlwUmVzdWx0ID0+dG9vbHRpcHMgYXJyYXlcclxuXHQgIGNvbnNvbGUubG9nKHRvb2x0aXBSZXN1bHQpO1xyXG5cdCBcclxuXHJcblx0ICAvL2RyYXcgaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgQXhpc1xyXG5cdCAgIHZhciBkcmF3QXhpcyA9IG5ldyBkcmF3QXhpc19maWxlKCk7XHJcblx0ICAgZHJhd0F4aXMuZHJhd19YWV9BeGlzKCk7XHJcblx0ICAgXHJcblx0ICBcclxuXHQgICAvL2RyYXcgdGhlIFggdmFsdWUgdGV4dHMsIGRyYXcgdGV4dCB2YWx1ZXMgaW4gaG9yaXpvbnQgYXhpcyEhISEhIVxyXG5cdCAgIHZhciBkcmF3X1hfdGV4dCA9IG5ldyBkcmF3WFZhbHVlc19maWxlKCk7XHJcblx0ICAgZHJhd19YX3RleHQuZHJhd19YX3ZhbHVlX3RleHQodG9vbHRpcFJlc3VsdCk7IC8vdGhlIG9ubHkgd2F5IHRvIHBhc3MgdmFyIHRvb2x0aXBzIHRvIHRoaXMgbW9kdWxlIC8vdG9vbHRpcFJlc3VsdCA9PnRvb2x0aXBzIGFycmF5XHJcblx0ICAgXHJcblx0ICAgLy9kcmF3IHRoZSBZIHZhbHVlIHRleHRzLCBkcmF3IHRleHQgdmFsdWVzIGludmVydGljYWwgYXhpcyEhISEhIVxyXG5cdCAgIHZhciBkcmF3X1lfdGV4dCA9IG5ldyBkcmF3WVZhbHVlc192ZXJ0aWNhbF9maWxlKCk7XHJcblx0ICAgZHJhd19ZX3RleHQuZHJhd19ZX3ZhbHVlX3RleHQoKTsgLy90aGUgb25seSB3YXkgdG8gcGFzcyB2YXIgdG9vbHRpcHMgdG8gdGhpcyBtb2R1bGVcclxuXHQgICBcclxuXHQgICAvLyBEcmF3IHRoZSBDSEFSVCBncmFwaCBMaW5lc1xyXG5cdCAgICB2YXIgZHJhd19jaGFydExpbmVzID0gbmV3IGRyYXdDaGFydExpbmVzX2ZpbGUoKTtcclxuXHQgICAgZHJhd19jaGFydExpbmVzLmRyYXdfbGluZXModGhpcy5qc29uKTsgXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0Ly9kcmF3IGhvdmVyYWJsZSBkb3RzLCBpZiB1IGhvdmVyIG92ZXIgdGhlbS0+IHRvb2x0aXAgd2lsbCBhcHBlYXJcclxuXHQgICAgdmFyIGRyYXdfZG90cyA9IG5ldyBhZGREb3RzX2ZpbGUoKTtcclxuXHQgICAgZHJhd19kb3RzLmFkZEhvdmVyYWJsZURvdHModGhpcy5qc29uKTtcclxuXHRcdFxyXG5cdFx0Ly9zaG93VG9vbHRpcF9vbk1vdXNlT3ZlclxyXG5cdCAgICB2YXIgc2hvd1Rvb2x0aXBzID0gbmV3IHNob3dUb29sdGlwc19maWxlKCk7XHJcblx0ICAgIHNob3dUb29sdGlwcy5kaXNwYWx5VG9vbHRpcHModG9vbHRpcFJlc3VsdCk7IC8vdG9vbHRpcFJlc3VsdCA9PnRvb2x0aXBzIGFycmF5XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0Ly8gU3dpdGNoIGRheS9uaWdodCBtb2RlXHJcblx0ICAgIHZhciBzd2l0Y2hNb2RlID0gbmV3IHN3aXRjaE5pZ2h0RGF5X2ZpbGUoKTtcclxuXHQgICAgc3dpdGNoTW9kZS5zd2l0Y2hNb2RlKCk7IFxyXG5cdCAgXHJcblx0ICAvLyAqKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqKlxyXG4gICAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cdCAgXHJcbiAgIH0gLy9lbmQgdGhpcy5DcmVhdGVDaGFydFxyXG4gICBcclxuICAgXHJcblxyXG4gICBcclxuICAgXHJcbiAgIFxyXG4gICBcclxuICAgXHJcbiAgIFxyXG4gICBcclxufSAvL2VuZCBmdW5jdGlvbiBBTExcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY29yZTsiLCJ2YXIgZ2V0WFBpeGVsX2ZpbGUgPSByZXF1aXJlKCcuL2dldFhQaXhlbC5qcycpO1xyXG52YXIgZ2V0WVBpeGVsX2ZpbGUgPSByZXF1aXJlKCcuL2dldFlQaXhlbC5qcycpO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlc190b29sdGlwX2FycmF5X2Zyb21fanNvbigpe1xyXG5cclxuXHJcblx0XHJcbiAgdGhpcy5jcmVhdGVBcnJheSA9IGZ1bmN0aW9uKGpzb24pe1xyXG5cdCAgdmFyIGdldFhQaXhlbF9maWxlMiA9IG5ldyBnZXRYUGl4ZWxfZmlsZSgpOyAvL01vZHVsZVxyXG5cdCAgdmFyIGdldFlQaXhlbF9maWxlMiA9IG5ldyBnZXRZUGl4ZWxfZmlsZSgpOyAvL01vZHVsZVxyXG5cdCAgXHJcblx0ICAvL3ZhciBjdjsgdmFyIGcgPSBcImdnZ1wiO1xyXG5cdCAgLy9leHBvcnRzLmN2ID0gZyA7XHJcblx0ICAvL2FsZXJ0KGcpO1xyXG4gICAgICAvL2RlZmluZSB0b29sdGlwcyBmb3IgZWFjaCBqc29uIHBvaW50IC8vYWRkaW5nIHRvIGFycmF5IHRvb2x0aXBzXHJcblx0ICBcclxuICAgICAgdmFyIHRvb2x0aXBzID0gW107XHJcblx0ICAvL3ZhciB0b29sdGlwczQ7XHJcblx0ICAvL2V4cG9ydHMudG9vbHRpcHM0ID0gWzQsNF07IC8vdG9vbHRpcHM7XHJcblx0ICBcclxuXHJcbiAgICAgIC8vaXQgd29ya3MsIGNyZWF0ZXMgYW4gYXJyYXkgd2l0aCBvYmplY3RzIGZvciB0b29sdGlwcywgY3JlYXRlcyBpbiBmb3JtYXQgW3t4OiQsIHk6JCwgclhyOyQsIHRpcDokfSwge3g6JCwgeTokLCByWHI7JCwgdGlwOiR9XVxyXG4gICAgICAvLyg5MCUgY29waWVkIGZyb20gdmFyaWFudCBmb3IgMSBjaGFydCwganVzdCBhZGRlZCBhZGRpdGlvbmFsIGlubmVyIGZvciBsb29wIHtmb3IgKHZhciBqID0gMDsgaiA8IGpzb25baV0uY29sdW1ucy5sZW5ndGg7IGorKyl9XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwganNvbi5sZW5ndGg7IGkrKykge1xyXG5cdCAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBqc29uW2ldLmNvbHVtbnMubGVuZ3RoOyBqKyspIHtcclxuXHQgICAgICAgICB2YXIgc3RhdHVzWDtcclxuXHRcdFx0IC8vZGVmaW5lIHZhbHVlIGZvciBzdGF0dXNcclxuXHQgICAgICAgICBpZihpICUgMiAhPTApe1xyXG5cdFx0XHRcdCBzdGF0dXNYID0gXCJMZWZ0XCI7XHJcblx0XHRcdCB9IGVsc2Uge1xyXG5cdFx0XHQgICAgIHN0YXR1c1ggPVwiSm9pbmVkXCI7XHJcblx0XHRcdCB9IFxyXG5cdCAgXHJcbiAgICAgICAgICAgICB0b29sdGlwcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICB4OiBnZXRYUGl4ZWxfZmlsZTIuZ2V0WFBpeGVsMyhqc29uW2ldLmNvbHVtbnNbal0uWCksXHJcbiAgICAgICAgICAgICAgICAgeTogZ2V0WVBpeGVsX2ZpbGUyLmdldFlQaXhlbDMoanNvbltpXS5jb2x1bW5zW2pdLlkpLFxyXG4gICAgICAgICAgICAgICAgIHI6IDQsXHJcbiAgICAgICAgICAgICAgICAgclhyOiAxNixcclxuICAgICAgICAgICAgICAgICBjb2xvcnM6IFwicmVkXCIsIC8vTk9UIFVTRUQ/Pz9cclxuICAgICAgICAgICAgICAgICB0aXA6IGpzb25baV0uY29sdW1uc1tqXS5ZLCAgLy9cIiN0ZXh0XCIgKyAoaSArIDEpICAvL01lZ2EgZXJyb3Igd2FzIGhlcmUgLy90ZXh0IG9mIHRvb2x0aXAsXHJcblx0XHQgICAgICAgICBkYXRlWjoganNvbltpXS5jb2x1bW5zW2pdLmRhdGUsIC8vXHJcblx0XHQgICAgICAgICBzdGF0dXM6IHN0YXR1c1ggLy8gMXN0IG9yIDJuZCBjaGFydC4gSm9pbmVkL0xlZnRcclxuICAgICAgICAgICAgIH0pO1xyXG5cdFx0XHQgXHJcblx0ICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vY29uc29sZS5sb2codG9vbHRpcHMpO1xyXG5cdCAgcmV0dXJuIHRvb2x0aXBzO1xyXG4gICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlc190b29sdGlwX2FycmF5X2Zyb21fanNvbjsiLCJ2YXIgY29yZV92YXIgPSByZXF1aXJlKCcuL2NvcmUuanMnKTsgLy9JTVBPUlQgVkFSSUFCTEVTIHtjLCB4UGFkZGluZyx5UGFkZGluZ30gZnJvbSBjb3JlLmpzXHJcblxyXG5cclxuZnVuY3Rpb24gZHJhd19WZXJ0X0hvcml6X0F4aXMoKXtcclxuXHRcclxuXHJcblx0XHJcbiAgdGhpcy5kcmF3X1hZX0F4aXMgPSBmdW5jdGlvbigpeyBcclxuICAgICAgLy9zdGFydCBpbXBvcnQgVmFycyBmcm9tIGNvcmUuanNcclxuICAgICAgdmFyIGMgPSBjb3JlX3Zhci5jOyAvL0lNUE9SVCBWQVIge2N9IGZvbSBjb3JlLmpzXHJcblx0ICB2YXIgeFBhZGRpbmcgPSBjb3JlX3Zhci54UGFkZGluZzsgLy9JTVBPUlQgVkFSIHt4UEFkZGluZ30gZm9tIGNvcmUuanNcclxuXHQgIHZhciB5UGFkZGluZyA9IGNvcmVfdmFyLnlQYWRkaW5nOyAvL0lNUE9SVCBWQVIge3lQQWRkaW5nfSBmb20gY29yZS5qc1xyXG5cdCAgLy9FTkQgIGltcG9ydCBWYXJzIGZyb20gY29yZS5qc1xyXG5cdCAgXHJcblx0ICBjLmxpbmVXaWR0aCA9IDI7IC8vd2lkdGggb2YgWFkgYXhpcyBzY2FsZVxyXG4gICAgICBjLnN0cm9rZVN0eWxlID0gJyMzMzMnO1xyXG4gICAgICBjLmZvbnQgPSAnaXRhbGljIDhwdCBzYW5zLXNlcmlmJztcclxuICAgICAgYy50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG5cclxuICAgICAvLyBEcmF3IHRoZSBheGlzZXMgc2NhbGVzXHJcbiAgICAgYy5iZWdpblBhdGgoKTtcclxuICAgICBjLm1vdmVUbyh4UGFkZGluZywgMCk7XHJcbiAgICAgYy5saW5lVG8oeFBhZGRpbmcsIGdyYXBoLmhlaWdodCAtIHlQYWRkaW5nKTtcclxuICAgICBjLmxpbmVUbyhncmFwaC53aWR0aCwgZ3JhcGguaGVpZ2h0IC0geVBhZGRpbmcpO1xyXG4gICAgIGMuc3Ryb2tlKCk7XHJcblxyXG4gIH0gICAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZHJhd19WZXJ0X0hvcml6X0F4aXM7IiwidmFyIGNvcmVfdmFyID0gcmVxdWlyZSgnLi9jb3JlLmpzJyk7IC8vSU1QT1JUIFZBUklBQkxFUyB7YywgeFBhZGRpbmcseVBhZGRpbmd9IGZyb20gY29yZS5qc1xyXG52YXIgZ2V0TWF4WF9maWxlID0gcmVxdWlyZSgnLi9nZXRNYXhYLmpzJyk7XHJcbnZhciBjb252ZXJ0RGF0ZV9maWxlID0gcmVxdWlyZSgnLi9jb252ZXJ0RGF0ZVN0YW1wLmpzJyk7XHJcbnZhciBnZXRYUGl4ZWxfZmlsZSA9IHJlcXVpcmUoJy4vZ2V0WFBpeGVsLmpzJyk7IC8vIFJldHVybiB0aGUgWCBwaXhlbCBmb3IgYSBncmFwaCBwb2ludC0+ZnVuY3Rpb24gZ2V0WFBpeGVsKCl7XHJcbnZhciB0b29sdGlwX3ZhciA9IHJlcXVpcmUoJy4vY3JlYXRlc190b29sdGlwX2FycmF5X2Zyb21fanNvbi5qcycpOyAvL0lNUE9SVCBWQVJJQUJMRVMge3Rvb2x0aXBzIH0gZnJvbSBjcmVhdGVzX3Rvb2x0aXBfYXJyYXlfZnJvbV9qc29uLmpzXHJcblxyXG5cclxuIC8vRHJhdyB0aGUgWCB2YWx1ZSB0ZXh0cywgZHJhdyB0ZXh0IHZhbHVlcyBpbiBob3Jpem9udCBheGlzISEhISEhXHJcbmZ1bmN0aW9uIGRyYXdfWF92YWx1ZXNfdGV4dCgpe1xyXG5cdFxyXG5cclxuIFxyXG4gIHRoaXMuZHJhd19YX3ZhbHVlX3RleHQgPSBmdW5jdGlvbih0b29sdGlwcyl7IFxyXG4gIFxyXG4gICAgICAvL3N0YXJ0IGltcG9ydCBWYXJzIGZyb20gY29yZS5qc1xyXG4gICAgICB2YXIgYyA9IGNvcmVfdmFyLmM7IC8vSU1QT1JUIFZBUiB7Y30gZm9tIGNvcmUuanNcclxuXHQgIC8vdmFyIHhQYWRkaW5nID0gY29yZV92YXIueFBhZGRpbmc7IC8vSU1QT1JUIFZBUiB7eFBBZGRpbmd9IGZyb20gY29yZS5qc1xyXG5cdCAgdmFyIHlQYWRkaW5nID0gY29yZV92YXIueVBhZGRpbmc7IC8vSU1QT1JUIFZBUiB7eVBBZGRpbmd9IGZyb20gY29yZS5qc1xyXG5cdCAgLy92YXIgdG9vbHRpcHMgPSB0b29sdGlwX3Zhci50b29sdGlwczQ7IC8vSU1QT1JUIFZBUiB7dG9vbHRpcH0gZnJvbSBjcmVhdGVzX3Rvb2x0aXBfYXJyYXlfZnJvbV9qc29uLmpzXHJcblx0ICAvL2FsZXJ0KFwidG9vbCBcIiArIHRvb2x0aXBfdmFyLmN2KTtcclxuXHQgIC8vRU5EICBpbXBvcnQgVmFycyBmcm9tIGNvcmUuanNcclxuXHQgIFxyXG5cdFxyXG5cdCAgdmFyIG1heFhWYWx1ZSA9IG5ldyBnZXRNYXhYX2ZpbGUoKS5nZXRNYXhYKCk7IFxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBtYXhYVmFsdWUgLTE7IGkrKykgeyAvL3dhcyBvcmlnaW5hbGx5ICh2YXIgaSA9IDA7IGkgPD0gbWF4WFZhbHVlOyBpKyspLCB1c2UgLTEgc3RyaWN0bHkgZm9yIGNhc2VzIHdpdGggZGF0ZXNcclxuICAgICAgICAvLyB1c2VzIGpzb24udmFsdWVzW2ldLlhcclxuXHQgICAgLy9UbyB1c2Ugb25lIHNhbWUgZnVuY3Rpb257ZnVuY3RfY29udmVydF9kYXRlU3RhbXB9IHRvIHJldXJuIGRpZmYgdmFsdWVzLHdlIHVzZSB0aGUgMm5kIGFyZyB7dGFnKHRydWUpfSwgaWYgaXQgaXMgc2V0IGluIGNhbGxpbmcgZnVuY3Rpb24sIGZ1bmN0aW9uIHJldHVybnMgc2hvcnQgZGF0ZSwgaS5lIHsxLjAzfVxyXG4gICAgICAgIGMuZmlsbFRleHQoLyppKi8gbmV3IGNvbnZlcnREYXRlX2ZpbGUoKS5mdW5jdF9jb252ZXJ0X2RhdGVTdGFtcCh0b29sdGlwc1tpXS5kYXRlWiwgdHJ1ZSkgLCBuZXcgZ2V0WFBpeGVsX2ZpbGUoKS5nZXRYUGl4ZWwzKGkpLCBncmFwaC5oZWlnaHQgLSB5UGFkZGluZyArIDIwKTtcclxuICAgICAgfVxyXG4gIH0gICAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZHJhd19YX3ZhbHVlc190ZXh0OyIsInZhciBjb3JlX3ZhciA9IHJlcXVpcmUoJy4vY29yZS5qcycpOyAvL0lNUE9SVCBWQVJJQUJMRVMge2MsIHhQYWRkaW5nLHlQYWRkaW5nfSBmcm9tIGNvcmUuanNcclxudmFyIGdldE1heFlfZmlsZSA9IHJlcXVpcmUoJy4vZ2V0TWF4WS5qcycpO1xyXG4vL3ZhciBjb252ZXJ0RGF0ZV9maWxlID0gcmVxdWlyZSgnLi9jb252ZXJ0RGF0ZVN0YW1wLmpzJyk7XHJcbnZhciBnZXRZUGl4ZWxfZmlsZSA9IHJlcXVpcmUoJy4vZ2V0WVBpeGVsLmpzJyk7IC8vIFJldHVybiB0aGUgWSBwaXhlbCBmb3IgYSBncmFwaCBwb2ludC0+ZnVuY3Rpb24gZ2V0WFBpeGVsKCl7XHJcblxyXG5cclxuXHJcbi8vIERyYXcgdGhlIFkgdmFsdWUgdGV4dHMsIHRleHQgaW4gdmVydGljYWwgYXhpc1xyXG5mdW5jdGlvbiBkcmF3X1lfdmFsdWVzX3ZlcnRpY2FsKCl7XHJcblx0XHJcblxyXG5cclxuICB0aGlzLmRyYXdfWV92YWx1ZV90ZXh0ID0gZnVuY3Rpb24odG9vbHRpcHMpeyBcclxuICAgICAgLy9zdGFydCBpbXBvcnQgVmFycyBmcm9tIGNvcmUuanNcclxuICAgICAgdmFyIGMgPSBjb3JlX3Zhci5jOyAvL0lNUE9SVCBWQVIge2N9IGZvbSBjb3JlLmpzXHJcblx0ICB2YXIgeFBhZGRpbmcgPSBjb3JlX3Zhci54UGFkZGluZzsgLy9JTVBPUlQgVkFSIHt4UEFkZGluZ30gZnJvbSBjb3JlLmpzXHJcblx0ICBcclxuXHQgIC8vRU5EICBpbXBvcnQgVmFycyBmcm9tIGNvcmUuanNcclxuXHQgIFxyXG5cdFxyXG5cdCAgYy50ZXh0QWxpZ24gPSBcInJpZ2h0XCJcclxuICAgICAgYy50ZXh0QmFzZWxpbmUgPSBcIm1pZGRsZVwiO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAobmV3IGdldE1heFlfZmlsZSgpLmdldE1heFkyKCkgKyA1MCk7IGkgKz0gNTApIHsgLy9teSBhZGQgeys1MH1cclxuICAgICAgICAgYy5maWxsVGV4dChpLCB4UGFkZGluZyAtIDEwLCBuZXcgZ2V0WVBpeGVsX2ZpbGUoKS5nZXRZUGl4ZWwzKGkpKTsgLy9kbyBub3QgY2hhbmdlIDEwXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGMuc3Ryb2tlU3R5bGUgPSAnI2YwMCc7XHJcblxyXG4gIH0gICAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZHJhd19ZX3ZhbHVlc192ZXJ0aWNhbDsiLCJ2YXIgY29yZV92YXIgPSByZXF1aXJlKCcuL2NvcmUuanMnKTsgLy9JTVBPUlQgVkFSSUFCTEVTIHtjLCB4UGFkZGluZyx5UGFkZGluZ30gZnJvbSBjb3JlLmpzXHJcbnZhciBnZXRNYXhZX2ZpbGUgPSByZXF1aXJlKCcuL2dldE1heFkuanMnKTtcclxuLy92YXIgY29udmVydERhdGVfZmlsZSA9IHJlcXVpcmUoJy4vY29udmVydERhdGVTdGFtcC5qcycpO1xyXG52YXIgZ2V0WVBpeGVsX2ZpbGUgPSByZXF1aXJlKCcuL2dldFlQaXhlbC5qcycpOyAvLyBSZXR1cm4gdGhlIFkgcGl4ZWwgZm9yIGEgZ3JhcGggcG9pbnQtPmZ1bmN0aW9uIGdldFhQaXhlbCgpe1xyXG52YXIgZ2V0WFBpeGVsX2ZpbGUgPSByZXF1aXJlKCcuL2dldFhQaXhlbC5qcycpOyAvLyBSZXR1cm4gdGhlIFggcGl4ZWwgZm9yIGEgZ3JhcGggcG9pbnQtPmZ1bmN0aW9uIGdldFhQaXhlbCgpe1xyXG5cclxuXHJcbi8vIERyYXcgdGhlIFkgdmFsdWUgdGV4dHMsIHRleHQgaW4gdmVydGljYWwgYXhpc1xyXG5mdW5jdGlvbiBkcmF3X2NoYXJ0TGluZXMoKXtcclxuXHRcclxuXHJcblxyXG4gICAgdGhpcy5kcmF3X2xpbmVzID0gZnVuY3Rpb24oanNvbil7XHJcblx0XHRcclxuICAgICAgLy9zdGFydCBpbXBvcnQgVmFycyBmcm9tIGNvcmUuanMqKioqKioqKipcclxuICAgICAgdmFyIGMgPSBjb3JlX3Zhci5jOyAvL0lNUE9SVCBWQVIge2N9IGZvbSBjb3JlLmpzXHJcblx0ICAvL3ZhciB4UGFkZGluZyA9IGNvcmVfdmFyLnhQYWRkaW5nOyAvL0lNUE9SVCBWQVIge3hQQWRkaW5nfSBmcm9tIGNvcmUuanNcclxuXHQgIC8vRU5EICBpbXBvcnQgVmFycyBmcm9tIGNvcmUuanMqKioqKioqKipcclxuXHQgIFxyXG5cdCAgYy5iZWdpblBhdGgoKTtcclxuXHQgIGZvciAodmFyIGkgPSAwOyBpIDwganNvbi5sZW5ndGg7IGkrKykgeyAvLyB3YXMgaT0xXHJcblxyXG4gICAgICAvLyhmdW5jdGlvbihpWikgeyAgLy9zaG9vdGVycywgb3IgdSBjYW4ganVzdCB1c2Uge2xldCBpID0gMX0gaW4gbG9vcCBpbnN0ZWFkIG9mIHNob290ZXJzXHJcbiAgICAgIC8vYWxlcnQoXCJpWi0+IFwiICsgaVopO1xyXG4gICAgXHJcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGpzb25baV0uY29sdW1ucy5sZW5ndGg7IGorKykge1xyXG5cdCAgICAgICAgKGZ1bmN0aW9uKGl4LCBwKSB7ICAvL3Nob290ZXJzLCBvciB1IGNhbiBqdXN0IHVzZSB7bGV0IGkgPSAxfSBpbiBsb29wIGluc3RlYWQgb2Ygc2hvb3RlcnMgLy9peCBpcyB7aX0sIHAgaXMge2p9IC8vU0hPT1RFUiBpcyBhIG11c3Qgb3RoZXJ3aXNlIGl0IGp1bXBzIHRvIGxhc3QgaSBhdCBvbmNlXHJcblx0ICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdCAgICAgICAgIFxyXG5cdFx0XHQgICAgIC8vYWxlcnQoXCJpeC0+IFwiICsgaXggKyBcIiBqLT4gXCIgKyBwKTtcclxuXHRcdFx0IFxyXG5cdFx0XHQgICAgIC8vTWVnYSBGaXgsIHNldHMgdGhlIHBhdGggdG8gc3RhcnQgcG9zaXRpb24sIG91dCBvZiBmb3IgbG9vcCBpdCB3YXMgbm90IHdvcmtpbmdcclxuXHRcdFx0ICAgICAvL3NldHMgdGhlIHBhdGggdG8gc3RhcnQgcG9zaXRpb24gaW4gYSB2ZXJ5IGZpcnN0IGl0ZXJhdGlvbiBcclxuXHRcdFx0ICAgICBpZihwID09IDAgKXsgXHJcblx0XHRcdFx0XHQgYy5iZWdpblBhdGgoKTsgLy9tZWdhIGZpeCB0byBkcmF3IGRpZmZlcmVudCBjb2xvcnNzIGxpbmVzXHJcblx0XHRcdFx0ICAgICBjLm1vdmVUbyhuZXcgZ2V0WFBpeGVsX2ZpbGUoKS5nZXRYUGl4ZWwzKGpzb25baXhdLmNvbHVtbnNbMF0uWCksIG5ldyBnZXRZUGl4ZWxfZmlsZSgpLmdldFlQaXhlbDMoanNvbltpeF0uY29sdW1uc1swXS5ZKSk7XHJcblx0XHRcdCAgICAgfVxyXG5cdFx0XHQgXHJcblx0XHRcdCBcclxuXHQgICAgICAgICAgICAgLy9hbGVydChpeCk7XHJcblx0XHQgICAgICAgICAvL2FsZXJ0KGpzb24udmFsdWVzW2l4XS5YICsgXCIgIGFuZCBcIiArICBqc29uLnZhbHVlc1tpeF0uWSArIFwiIGktPlwiICsgaXgpO1xyXG5cdFx0XHQgXHJcblx0XHRcdCAgICAgLy9hbGwgb3RoZXIgaXRlcmF0aW9ucyBzdGFydGluZyBmcm9tIDJuZCwgZHJhdyBsaW5lcyB3aXRoIHtjLmxpbmVUb31cclxuXHRcdFx0XHQgXHJcblx0XHQgICAgICAgICBjLmxpbmVUbyhuZXcgZ2V0WFBpeGVsX2ZpbGUoKS5nZXRYUGl4ZWwzKGpzb25baXhdLmNvbHVtbnNbcF0uWCksIG5ldyBnZXRZUGl4ZWxfZmlsZSgpLmdldFlQaXhlbDMoanNvbltpeF0uY29sdW1uc1twXS5ZKSk7IFxyXG5cdFx0XHRcdCBjLnN0cm9rZVN0eWxlID0ganNvbltpeF0uY29sb3JzIDtcclxuXHRcdFx0XHQgXHJcblx0XHQgICAgICAgICBjLnN0cm9rZSgpOyAvL3N0cm9rZSgpIG1ldGhvZCB0byBhY3R1YWxseSBkcmF3IHRoZSBwYXRoIG9uIHRoZSBjYW52YXMuXHJcblx0XHRcdFx0IFxyXG5cdFx0ICAgICAgICAgLy9jLmNsZWFyUmVjdCgwLDAsZ3JhcGgud2lkdGgsZ3JhcGguaGVpZ2h0KTtcclxuXHRcdCAgICAgICAgIC8vZHJhd0NoYXJ0KCk7XHJcblx0XHQgICAgICAgICAvL3NldFRpbWVvdXQoZ2V0RHJhd2VyKGkpLCAxMDAwKTtcclxuXHRcdCAgICAgICAgIC8vc2V0VGltZW91dChnZXREcmF3ZXIoaSksIDEwMDApO1xyXG5cdFx0ICAgICBcclxuXHRcdFx0IFxyXG5cdFx0XHQgICAgIC8vdGltZVggPSBpeCAqIHA7XHJcblx0XHRcdCBcclxuXHQgICAgICAgIH0sIC8qaXgqLzEgKiA1MDApO1xyXG5cdCAgICB9KShpLCBqKTsgLy8gZW5kIHNob290ZXJzIFxyXG5cclxuXHJcbiAgICAgICAgLy9jLmxpbmVUbyhnZXRYUGl4ZWwoanNvbi52YWx1ZXNbaV0uWCksIGdldFlQaXhlbChqc29uLnZhbHVlc1tpXS5ZKSk7XHJcbiAgICAgICAgfVxyXG4gICAgIC8vfSkoaSk7IC8vIGVuZCBzaG9vdGVycyBcclxuICAgIH1cclxuXHJcblx0Ly9kcmF3IFwiRm9sbG93ZXJzIHRleHRcIlxyXG4gICAgYy5mb250ID0gXCIyMHB4IEdlb3JnaWFcIjtcclxuICAgIGMuZmlsbFRleHQoXCJGb2xsb3dlcnNcIiwgMTMwLCAyMCk7XHJcbiAgfSAgICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkcmF3X2NoYXJ0TGluZXM7IiwidmFyIGpzb25fdmFyID0gcmVxdWlyZSgnLi9jb3JlLmpzJyk7IC8vSU1QT1JUIFZBUklBQkxFIHtqc29ufVxyXG5cclxuZnVuY3Rpb24gZ2V0TWF4WCgpe1xyXG5cdFxyXG4gIC8vdGhpcy5jb29yZGluYXRlc1NldCA9XHRcIml0IGlzIHRlc3QsIENvbW1vbkpTIHdvcmtzXCIsXHJcblxyXG5cdFxyXG4gIHRoaXMuZ2V0TWF4WCA9IGZ1bmN0aW9uKCl7XHJcblx0ICAvLyBSZXR1cm5zIHRoZSBtYXggWCB2YWx1ZSBpbiBvdXIganNvbiBsaXN0IVxyXG5cdCB2YXIganNvbiA9IGpzb25fdmFyLmpzb247XHJcbiAgICAgIHZhciBtYXggPSAwO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGpzb24ubGVuZ3RoOyBpKyspIHtcclxuXHRcdCBmb3IgKHZhciBqID0gMDsgaiA8IGpzb25baV0uY29sdW1ucy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgIGlmIChqc29uW2ldLmNvbHVtbnNbal0uWCA+IG1heCkge1xyXG4gICAgICAgICAgICAgICAgICBtYXggPSBqc29uW2ldLmNvbHVtbnNbal0uWDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblx0ICB9XHJcbiAgICAvLyBvbWl0ZWRcclxuICAgIC8vbWF4ICs9IDEwIC0gbWF4ICUgMTA7XHJcblx0Ly9hbGVydChcIm1heCBcIiArIG1heClcclxuICAgIHJldHVybiBtYXg7XHJcblxyXG4gIH0gICAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2V0TWF4WDsiLCJ2YXIganNvbl92YXIgPSByZXF1aXJlKCcuL2NvcmUuanMnKTsgLy9JTVBPUlQgVkFSSUFCTEUge2pzb259XHJcblxyXG5mdW5jdGlvbiBnZXRNYXhZKCl7XHJcblx0XHJcbiAgLy90aGlzLmNvb3JkaW5hdGVzU2V0ID1cdFwiaXQgaXMgdGVzdCwgQ29tbW9uSlMgd29ya3NcIixcclxuXHJcblx0XHJcbiAgdGhpcy5nZXRNYXhZMiA9IGZ1bmN0aW9uKCl7XHJcblx0ICB2YXIgbWF4ID0gMDtcclxuXHQgIHZhciBqc29uID0ganNvbl92YXIuanNvbjtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBqc29uLmxlbmd0aDsgaSsrKSB7XHJcblx0ICAgIGZvciAodmFyIGogPSAwOyBqIDwganNvbltpXS5jb2x1bW5zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGlmIChqc29uW2ldLmNvbHVtbnNbal0uWSA+IG1heCkge1xyXG4gICAgICAgICAgICAgICAgbWF4ID0ganNvbltpXS5jb2x1bW5zW2pdLlk7XHJcbiAgICAgICAgICAgIH1cclxuXHQgICAgfVxyXG4gICAgfVxyXG5cdC8vYWxlcnQoXCJtYXgtPiBcIiArIG1heCk7XHJcbiAgICBtYXggKz0gMTAgLSBtYXggJSAxMDtcclxuICAgIHJldHVybiBtYXg7XHJcbiAgfSAgICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnZXRNYXhZOyIsInZhciBnZXRNYXhYX2ZpbGUgPSByZXF1aXJlKCcuL2dldE1heFguanMnKTtcclxudmFyIFhQX3ZhciA9IHJlcXVpcmUoJy4vY29yZS5qcycpOyAvL0lNUE9SVCBWQVJJQUJMRSB7eFBhZGRpbmd9XHJcblxyXG4vLyBSZXR1cm4gdGhlIFggcGl4ZWwgZm9yIGEgZ3JhcGggcG9pbnRcclxuZnVuY3Rpb24gZ2V0WFBpeGVsKCl7XHJcblx0XHJcbiAgLy90aGlzLmNvb3JkaW5hdGVzU2V0ID1cdFwiaXQgaXMgdGVzdCwgQ29tbW9uSlMgd29ya3NcIixcclxuXHJcbiAgdGhpcy5nZXRYUGl4ZWwzID0gZnVuY3Rpb24odmFsKXtcclxuXHQgIHZhciBnZXRNYXhYID0gbmV3IGdldE1heFhfZmlsZSgpOyAvL01vZHVsZVxyXG5cdCAgXHJcbiAgICAgLy8gUmV0dXJuIHRoZSB4IHBpeGVsIGZvciBhIGdyYXBoIHBvaW50XHJcbiAgICAvLyB1c2VzIHRoZSBnZXRNYXhYKCkgZnVuY3Rpb25cclxuICAgIHJldHVybiAoKGdyYXBoLndpZHRoIC0gWFBfdmFyLnhQYWRkaW5nKSAvIChnZXRNYXhYLmdldE1heFgoKSArIDEpKSAqIHZhbCArIChYUF92YXIueFBhZGRpbmcgKiAxLjUpO1xyXG4gICAgLy8gd2FzXHJcbiAgICAvL3JldHVybiAoKGdyYXBoLndpZHRoIC0geFBhZGRpbmcpIC8gZ2V0TWF4WCgpKSAqIHZhbCArICh4UGFkZGluZyAqIDEuNSk7XHJcbiAgfVxyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gZ2V0WFBpeGVsOyIsInZhciBnZXRNYXhZX2ZpbGUgPSByZXF1aXJlKCcuL2dldE1heFkuanMnKTtcclxudmFyIFhQX3ZhciA9IHJlcXVpcmUoJy4vY29yZS5qcycpOyAvL0lNUE9SVCBWQVJJQUJMRSB7eFBhZGRpbmd9XHJcbi8vaW1wb3J0IHt4UGFkZGluZ30gZnJvbSAnLi9jb3JlJztcclxuXHJcbi8vIFJldHVybiB0aGUgeSBwaXhlbCBmb3IgYSBncmFwaCBwb2ludFxyXG5mdW5jdGlvbiBnZXRZUGl4ZWwoKXtcclxuXHRcclxuXHJcbiAgdGhpcy5nZXRZUGl4ZWwzID0gZnVuY3Rpb24odmFsKXtcclxuICAgICAgdmFyIGdldE1heFkgPSBuZXcgZ2V0TWF4WV9maWxlKCk7IC8vTW9kdWxlXHJcblx0ICBcclxuICAgICAgLy8gdXNlcyB0aGUgZ2V0TWF4WCgpIGZ1bmN0aW9uXHJcbiAgICAgIHJldHVybiBncmFwaC5oZWlnaHQgLSAoKChncmFwaC5oZWlnaHQgLSBYUF92YXIueVBhZGRpbmcpIC8gKGdldE1heFkuZ2V0TWF4WTIoKSArIDUwKSkgKiB2YWwpIC0gWFBfdmFyLnlQYWRkaW5nOyAvL215IGFkZCB7KzUwfVxyXG4gICAgXHJcbiAgfVxyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gZ2V0WVBpeGVsOyIsInZhciBjb3JlX3ZhciA9IHJlcXVpcmUoJy4vY29yZS5qcycpOyAvL0lNUE9SVCBWQVJJQUJMRVMge2MsIHhQYWRkaW5nLHlQYWRkaW5nfSBmcm9tIGNvcmUuanNcclxuLy92YXIgZ2V0TWF4WV9maWxlID0gcmVxdWlyZSgnLi9nZXRNYXhZLmpzJyk7XHJcbi8vdmFyIGNvbnZlcnREYXRlX2ZpbGUgPSByZXF1aXJlKCcuL2NvbnZlcnREYXRlU3RhbXAuanMnKTtcclxudmFyIGdldFlQaXhlbF9maWxlID0gcmVxdWlyZSgnLi9nZXRZUGl4ZWwuanMnKTsgLy8gUmV0dXJuIHRoZSBZIHBpeGVsIGZvciBhIGdyYXBoIHBvaW50LT5mdW5jdGlvbiBnZXRYUGl4ZWwoKXtcclxudmFyIGdldFhQaXhlbF9maWxlID0gcmVxdWlyZSgnLi9nZXRYUGl4ZWwuanMnKTsgLy8gUmV0dXJuIHRoZSBYIHBpeGVsIGZvciBhIGdyYXBoIHBvaW50LT5mdW5jdGlvbiBnZXRYUGl4ZWwoKXtcclxudmFyIGNvbnZlcnREYXRlX2ZpbGUgPSByZXF1aXJlKCcuL2NvbnZlcnREYXRlU3RhbXAuanMnKTtcclxuXHJcblxyXG4vL3Nob3dzIHRvb2x0aXAgb25Nb3VzZSBvdmVyXHJcbmZ1bmN0aW9uIHNob3dUb29sdGlwX29uTW91c2VPdmVyKCl7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVx0XHJcblxyXG5cclxuICAgIHRoaXMuZGlzcGFseVRvb2x0aXBzID0gZnVuY3Rpb24odG9vbHopeyAgIC8vYXJncyh0b29wbGlwcyBhcnJheSlcclxuICAgICAgLy8gcmVxdWVzdCBtb3VzZW1vdmUgZXZlbnRzXHJcbiAgICAgICQoXCIjZ3JhcGhcIikubW91c2Vtb3ZlKGZ1bmN0aW9uIChlKSB7XHJcblx0XHQgIHZhciBvbk1vdXNlT3Zlcl9maWxlID0gbmV3IG9uTW91c2VPdmVyKCk7Ly91c2VzIG90aGVyIG1vZHVsZSBpbiB0aGlzIHZlcnkgZmlsZVxyXG4gICAgICAgICAgb25Nb3VzZU92ZXJfZmlsZS5oYW5kbGVNb3VzZU1vdmVBY3Rpb24oZSwgdG9vbHopOyAvL2FyZ3MobW91c2UgZXZlbnQsIHRvb3BsaXBzIGFycmF5KVxyXG4gICAgICB9KTtcclxuXHJcbiAgfSAgXHJcbn1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIFxyXG4gIFxyXG5mdW5jdGlvbiBvbk1vdXNlT3Zlcigpe1xyXG5cdFxyXG4gICAgdGhpcy5oYW5kbGVNb3VzZU1vdmVBY3Rpb24gPSBmdW5jdGlvbihlLCB0b29sdGlwcyl7IC8vYXJncyhtb3VzZSBldmVudCwgdG9vcGxpcHMgYXJyYXkpXHJcblx0XHRcclxuXHQgICAgIC8vc3RhcnQgaW1wb3J0IFZhcnMgZnJvbSBjb3JlLmpzKioqKioqKioqKioqXHJcbiAgICAgICAgIHZhciBjID0gY29yZV92YXIuYzsgLy9JTVBPUlQgVkFSIHtjfSBmb20gY29yZS5qc1xyXG5cdCAgICAgdmFyIG9mZnNldFggPSBjb3JlX3Zhci5vZmZzZXRYOyAvL0lNUE9SVCBWQVIge29mZnNldFh9IGZyb20gY29yZS5qc1xyXG5cdFx0IHZhciBvZmZzZXRZID0gY29yZV92YXIub2Zmc2V0WTsgLy9JTVBPUlQgVkFSIHtvZmZzZXRYfSBmcm9tIGNvcmUuanNcclxuXHRcdCB2YXIgdGlwQ2FudmFzID0gY29yZV92YXIudGlwQ2FudmFzXzI7IC8vSU1QT1JUIFZBUiB7dGlwQ2FudmFzLn0gZnJvbSBjb3JlLmpzXHJcblx0XHQgdmFyIHRpcEN0eCA9IGNvcmVfdmFyLnRpcEN0eDsgLy9JTVBPUlQgVkFSIHt0aXBDYW52YXMufSBmcm9tIGNvcmUuanNcclxuXHQgICAgIC8vRU5EICBpbXBvcnQgVmFycyBmcm9tIGNvcmUuanMqKioqKioqKioqKioqXHJcblx0XHQgXHJcblx0XHQgLy9hbGVydChcIm9mZiBcIiArIG9mZnNldFkpO1xyXG5cdFx0IG1vdXNlWCA9IHBhcnNlSW50KGUuY2xpZW50WCAtIG9mZnNldFgpO1xyXG4gICAgICAgICBtb3VzZVkgPSBwYXJzZUludChlLmNsaWVudFkgLSBvZmZzZXRZKTsgXHJcblxyXG4gICAgLy8gUHV0IHlvdXIgbW91c2Vtb3ZlIHN0dWZmIGhlcmVcclxuICAgIHZhciBoaXQgPSBmYWxzZTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9vbHRpcHMubGVuZ3RoOyBpKyspIHsgLy9hbGVydCh0b29sdGlwcy5sZW5ndGgpO1xyXG4gICAgICAgIHZhciBkb3QgPSB0b29sdGlwc1tpXTtcclxuICAgICAgICB2YXIgZHggPSBtb3VzZVggLSBkb3QueDtcclxuICAgICAgICB2YXIgZHkgPSBtb3VzZVkgLSBkb3QueTsgXHJcblx0XHQvL2FsZXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcclxuICAgICAgICBpZiAoZHggKiBkeCArIGR5ICogZHkgPCB0b29sdGlwc1tpXS5yWHIpIHtcclxuXHRcdFx0XHJcblx0XHRcdC8vTWluZVxyXG5cdFx0XHQkKFwiI3RpcFwiKS5zaG93KDMwMCk7IC8vc2hvdyB0b29sdGlwLCBieSBkZWZhdWx0IGluIGNzczogZGlzcGxheTogbm9uZS4gSXMgbWFkZSB0byBmaXggb3ZlcmxhcGluZyBhbiBlbXB0eSB0b29sdGlwXHJcblx0XHRcdFxyXG4gICAgICAgICAgICB0aXBDYW52YXMuc3R5bGUubGVmdCA9ICh0b29sdGlwc1tpXS54KSArIFwicHhcIjsgLy90b29sdGlwIG1hcmdpbiBsZWZ0XHJcbiAgICAgICAgICAgIHRpcENhbnZhcy5zdHlsZS50b3AgPSAodG9vbHRpcHNbaV0ueSAtIDQwKSArIFwicHhcIjsgIC8vdG9vbHRpcCBtYXJnaW4gYm90dG9tXHJcbiAgICAgICAgICAgIHRpcEN0eC5jbGVhclJlY3QoMCwgMCwgdGlwQ2FudmFzLndpZHRoLCB0aXBDYW52YXMuaGVpZ2h0ICk7IC8vY2xlYXJSZWN0KG1hcmdpbkxlZnQsIHdpZHRoLCBoZWlnaHQpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgdGlwQ3R4LnJlY3QoMCwwLHRpcENhbnZhcy53aWR0aCx0aXBDYW52YXMuaGVpZ2h0KTtcclxuXHRcdFx0XHJcblx0XHRcdC8vZGVmaW5lIHRvb2x0aXAgdGV4dFxyXG5cdFx0XHR2YXIgdG9vbFRpcFRleHRfZGF0ZSA9IG5ldyBjb252ZXJ0RGF0ZV9maWxlKCkuZnVuY3RfY29udmVydF9kYXRlU3RhbXAodG9vbHRpcHNbaV0uZGF0ZVopIDsgLy9jb252ZXJ0cyBkYXRlVW5peCB0byBub3JtYWxcclxuXHRcdFx0Ly9hbGVydCh0b29sVGlwVGV4dF9kYXRlKTtcclxuICAgICAgICAgICAgdmFyIHRvb2xUaXBUZXh0X3RleHQgPSB0b29sdGlwc1tpXS50aXAgKyBcIiBcIiArIHRvb2x0aXBzW2ldLnN0YXR1cyA7ICAvL2RlZmluZXMgdGlwICsgc3RhdHVzLCBpLmUgXCI0MCBMZWZ0XCJcclxuICAgICAgICAgICAgaWYodG9vbHRpcHNbaV0uc3RhdHVzID09IFwiSm9pbmVkXCIpe1xyXG5cdFx0XHRcdHRleHRjb2xvcnMgPSBcImdyZWVuXCI7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGV4dGNvbG9ycyA9IFwicmVkXCI7XHJcblx0XHRcdH1cdFx0XHRcdFxyXG5cdFx0XHRcclxuXHRcdFx0dGlwQ3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjsgLy9zZXQgaW5pdGlhbCB0ZXh0IGNvbG9ycyB0byBibGFja1xyXG5cdFx0XHRcclxuXHRcdFx0Ly9pbiBtb2JpbGUgb25seS4gSGVyZSB3ZSBzcGVjaWZ5IGZvbnItc2l6ZSBhbmQgdGV4dCBwYWRkaW5ncyBmb3IgbW9iaWxlIGRldmljZXNcclxuXHRcdFx0aWYoc2NyZWVuLndpZHRoIDw9IDY0MCl7IFxyXG5cdFx0XHQgICAgdGlwQ3R4LmZvbnQgPSBcIjQ1cHggQXJpYWxcIjsgLy9zZXQgZm9udCBzaXplXHJcblx0XHRcdFx0dGlwQ3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7IC8vc2V0IHRleHQgdG8gY2VudGVyLCBpbiBvcmRlciB0byBjZW50ZXIgaG9yaXosIHRoZXJlIG11c3QgYmUgMTUwIGluIC5maWxsVGV4dCh0ZXh0LCAxNTAsIHBhZGRpbmdUb3ApIC8vIDE1MCBpcyB0aGUgYW5jaG9yIHBvaW50XHJcblx0XHRcdFx0dGlwQ3R4LmZpbGxUZXh0KC8qJChkb3QudGlwKS52YWwoKSovdG9vbFRpcFRleHRfZGF0ZSwgMTUwLCA2NSk7IC8vKHRleHQsIHBhZGRpbmdMZWZ0LCBwYWRkaW5nVG9wKSAgLy8gVG9vbHRpcCBEYXRlXHJcblx0XHRcdFx0Ly90aXBDdHguZmlsbFRleHQoXCJfX19fX19cIiwgMjUsIDc1KTtcclxuXHRcdFx0XHR0aXBDdHguZmlsbFN0eWxlID0gdGV4dGNvbG9yczsgLy9zZXQgdGV4dCBjb2xvcnNcclxuXHRcdFx0XHR0aXBDdHguZm9udCA9IFwiNjBweCBBcmlhbFwiOyAvL3NldCBmb250IHNpemVcclxuXHRcdFx0XHR0aXBDdHguZmlsbFRleHQodG9vbFRpcFRleHRfdGV4dCwgMTUwLCAxMzUpOyAgLy9Ub29sdGlwIHRleHQsIGkuZSBcIjQwIExlZnRcIlxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vZGVza3RvcFxyXG5cdFx0XHRcdHRpcEN0eC5mb250ID0gXCI0MHB4IEFyaWFsXCI7IC8vc2V0IGZvbnQgc2l6ZVxyXG5cdFx0XHRcdHRpcEN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiOyAvL3NldCB0ZXh0IHRvIGNlbnRlciwgaW4gb3JkZXIgdG8gY2VudGVyIGhvcml6LCB0aGVyZSBtdXN0IGJlIDE1MCBpbiAuZmlsbFRleHQodGV4dCwgMTUwLCBwYWRkaW5nVG9wKSAvLyAxNTAgaXMgdGhlIGFuY2hvciBwb2ludFxyXG4gICAgICAgICAgICAgICAgdGlwQ3R4LmZpbGxUZXh0KC8qJChkb3QudGlwKS52YWwoKSovdG9vbFRpcFRleHRfZGF0ZSwgMTU5LCA0NSk7IC8vKHRleHQsIHBhZGRpbmdMZWZ0LCBwYWRkaW5nVG9wKSh3YXMgNDUsIDQ1KVxyXG5cdFx0XHRcdC8vdGlwQ3R4LmZpbGxUZXh0KFwiX19fX19fX19fX19fX19fX19fX19cIiwgMSwgNTApO1xyXG5cdFx0XHRcdHRpcEN0eC5maWxsU3R5bGUgPSB0ZXh0Y29sb3JzOyAvL3NldCB0ZXh0IGNvbG9yc1xyXG5cdFx0XHRcdHRpcEN0eC5maWxsVGV4dCh0b29sVGlwVGV4dF90ZXh0LCAxNTAsIDEwNSk7IC8vVG9vbHRpcCB0ZXh0LCBpLmUgXCI0MCBMZWZ0XCIgKHdhcyA3MCwgMTA1KVxyXG5cdFx0XHR9XHJcbiAgICAgICAgICAgIGhpdCA9IHRydWU7XHJcbiAgICAgICAgfSAvKmVsc2Uge1xyXG5cdFx0XHQkKFwiI3RpcFwiKS5oaWRlKDgwMCk7XHJcblx0XHR9Ki9cclxuICAgIH1cclxuICAgIGlmICghaGl0KSB7XHJcbiAgICAgICAgdGlwQ2FudmFzLnN0eWxlLmxlZnQgPSBcIi0xMDAwcHhcIjsgIC8vd2FzIDIwMHB4LCB0aGlzIHNvbHV0aW9uIGZpeGVzIGJ1ZyB3aGVuIHRvb2x0aXAgYXBwZWFycyBpbiBsZWZ0IGVtcHR5IGlmIG5vdCBtb3VzZSBvdmVyZWRcclxuICAgIH1cclxuXHR9XHJcblxyXG5cclxuXHJcblxyXG4gIFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHNob3dUb29sdGlwX29uTW91c2VPdmVyOyIsIi8vdmFyIGNvcmVfdmFyID0gcmVxdWlyZSgnLi9jb3JlLmpzJyk7IC8vSU1QT1JUIFZBUklBQkxFUyB7YywgeFBhZGRpbmcseVBhZGRpbmd9IGZyb20gY29yZS5qc1xyXG4vL3ZhciBnZXRNYXhZX2ZpbGUgPSByZXF1aXJlKCcuL2dldE1heFkuanMnKTtcclxuLy92YXIgY29udmVydERhdGVfZmlsZSA9IHJlcXVpcmUoJy4vY29udmVydERhdGVTdGFtcC5qcycpO1xyXG4vL3ZhciBnZXRZUGl4ZWxfZmlsZSA9IHJlcXVpcmUoJy4vZ2V0WVBpeGVsLmpzJyk7IC8vIFJldHVybiB0aGUgWSBwaXhlbCBmb3IgYSBncmFwaCBwb2ludC0+ZnVuY3Rpb24gZ2V0WFBpeGVsKCl7XHJcbi8vdmFyIGdldFhQaXhlbF9maWxlID0gcmVxdWlyZSgnLi9nZXRYUGl4ZWwuanMnKTsgLy8gUmV0dXJuIHRoZSBYIHBpeGVsIGZvciBhIGdyYXBoIHBvaW50LT5mdW5jdGlvbiBnZXRYUGl4ZWwoKXtcclxuXHJcblxyXG4vLyBEcmF3IHRoZSBZIHZhbHVlIHRleHRzLCB0ZXh0IGluIHZlcnRpY2FsIGF4aXNcclxuZnVuY3Rpb24gc3dpdGNoRGF5TmlnaHRNb2RlKCl7XHJcblx0XHJcblxyXG5cclxuICAgIHRoaXMuc3dpdGNoTW9kZSA9IGZ1bmN0aW9uKCl7IFxyXG4gICAgICAvL3N0YXJ0IGltcG9ydCBWYXJzIGZyb20gY29yZS5qc1xyXG4gICAgICAvL3ZhciBjID0gY29yZV92YXIuYzsgLy9JTVBPUlQgVkFSIHtjfSBmb20gY29yZS5qc1xyXG5cdCAgLy92YXIgeFBhZGRpbmcgPSBjb3JlX3Zhci54UGFkZGluZzsgLy9JTVBPUlQgVkFSIHt4UEFkZGluZ30gZnJvbSBjb3JlLmpzXHJcblx0ICAvL0VORCAgaW1wb3J0IFZhcnMgZnJvbSBjb3JlLmpzXHJcblx0ICBcclxuXHQgICQoXCIjY2hhbmdlTW9kZVwiKS5jbGljayhmdW5jdGlvbigpIHsgXHJcblxyXG4gICAgICAgIGlmKCQoXCIjY2hhbmdlTW9kZVwiKS5odG1sKCkgPT0gXCJOaWdodCBtb2RlXCIpe1xyXG5cdFx0ICAkKFwiI2NoYW5nZU1vZGVcIikuaHRtbChcIkRheSBtb2RlXCIpO1xyXG5cdFx0ICAkKFwiYm9keVwiKS5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiZ3JleVwiKTtcclxuXHQgICAgfSBlbHNlIHtcclxuXHRcdCAgJChcIiNjaGFuZ2VNb2RlXCIpLmh0bWwoXCJOaWdodCBtb2RlXCIpO1xyXG5cdFx0ICAkKFwiYm9keVwiKS5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwid2hpdGVcIik7XHJcblx0ICAgIH1cclxuICAgICB9KTtcclxuXHJcblxyXG4gIH0gICAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc3dpdGNoRGF5TmlnaHRNb2RlOyIsImZ1bmN0aW9uIHRlc3QoKXtcclxuXHRcclxuICB0aGlzLmNvb3JkaW5hdGVzU2V0ID1cdFwiaXQgaXMgdGVzdCwgQ29tbW9uSlMgd29ya3NcIixcclxuXHJcblx0XHJcbiAgdGhpcy5sb2FkRXhhbXBsZUNvb3JkaW5hdGVzID0gZnVuY3Rpb24oKXtcclxuXHQgIC8vJChcIiNjb29yZHNJbnB1dFwiKS52YWwodGhpcy5jb29yZGluYXRlc1NldCk7IC8vICB3YXMgXFxuICBpbiB0aGUgIGVuZCBcclxuXHQgIGFsZXJ0KHRoaXMuY29vcmRpbmF0ZXNTZXQpO1xyXG4gICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdGVzdDsiXX0=
