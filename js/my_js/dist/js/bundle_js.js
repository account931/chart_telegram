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
var drawChart_onClick_file = require('./core.js');


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
		 
		 
		document.getElementById("mySidepanel").style.width = "0"; //hides the slide panel
		 
		  //MODULE
		  var coreZZ = new drawChart_onClick_file();
	      //coreZZ.draw_lines(jsonX);
		  coreZZ.createChart();
	});
	  
	  // **                                                                                  **
      // **************************************************************************************
      // **************************************************************************************
	  
   } //end this.CreateChart
   
   

   
   
   
   
   
   
   
} //end function ALL

module.exports = core_onClick;
},{"./core.js":5}],7:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tYWluLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9TZWVrX2Jhcl9jb250cm9scy9zZWVrX2Jhcl9jdHIuanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tb2R1bGVzL2FkZEhvdmVyYWJsZV9Eb3RzLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9jb252ZXJ0RGF0ZVN0YW1wLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9jb3JlLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9jb3JlX29uQ2xpY2suanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tb2R1bGVzL2NyZWF0ZXNfdG9vbHRpcF9hcnJheV9mcm9tX2pzb24uanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tb2R1bGVzL2RyYXdfVmVydF9Ib3Jpel9BeGlzLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9kcmF3X1hfdmFsdWVzX3RleHQuanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tb2R1bGVzL2RyYXdfWV92YWx1ZXNfdmVydGljYWwuanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tb2R1bGVzL2RyYXdfY2hhcnRMaW5lcy5qcyIsImpzL215X2pzL2NvbW1vbl9qc19tb2R1bGVzL21vZHVsZXMvZ2V0TWF4WC5qcyIsImpzL215X2pzL2NvbW1vbl9qc19tb2R1bGVzL21vZHVsZXMvZ2V0TWF4WS5qcyIsImpzL215X2pzL2NvbW1vbl9qc19tb2R1bGVzL21vZHVsZXMvZ2V0WFBpeGVsLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9nZXRZUGl4ZWwuanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tb2R1bGVzL3Nob3dUb29sdGlwX29uTW91c2VPdmVyLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9zd2l0Y2hEYXlOaWdodE1vZGUuanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tb2R1bGVzL3Rlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXHJcbnZhciB0ZXN0X2ZpbGUgPSByZXF1aXJlKCcuL21vZHVsZXMvdGVzdC5qcycpO1xyXG52YXIgY29yZV9maWxlID0gcmVxdWlyZSgnLi9tb2R1bGVzL2NvcmUuanMnKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAgIC8vdmFyIHRlc3QgPSBuZXcgdGVzdF9maWxlKCk7XHJcblx0Ly90ZXN0LmxvYWRFeGFtcGxlQ29vcmRpbmF0ZXMoKTtcclxuXHRcclxuXHR2YXIgbWFpbiA9IG5ldyBjb3JlX2ZpbGUoKTtcclxuXHRtYWluLmNyZWF0ZUNoYXJ0KCk7XHJcblx0XHJcblxyXG5cdFxyXG5cdFxyXG5cdFxyXG5cdFxyXG5cdFxyXG5cdFxyXG5cdFxyXG5cclxuXHJcblxyXG5cclxuLy8gRU5EIFJFQURZXHJcbn0pO1xyXG5cclxuXHJcbiIsIi8vaXQgZGV0ZWN0cyBjaGFuZ2VzIG92ZXIgc2xpZGVycyBmb3IgY2hhcnQxIGFuZCBjaGFydDIgYW5kIGh0bWwoKSA8c3Bhbj4gd2l0aCByZWxldmFudCBzbGlkZXJzIHZhbHVlc1xyXG4vL3ZhciBqc29uX3ZhciA9IHJlcXVpcmUoJy4vY29yZS5qcycpOyAvL0lNUE9SVCBWQVJJQUJMRSB7anNvbn1cclxuXHJcbmZ1bmN0aW9uIHNlZWtfYmFyX2N0cigpe1xyXG5cdFxyXG4gIC8vdGhpcy5jb29yZGluYXRlc1NldCA9XHRcIml0IGlzIHRlc3QsIENvbW1vbkpTIHdvcmtzXCIsXHJcblxyXG5cdFxyXG4gIHRoaXMuZ2V0U0Jhcl92YWx1ZXMgPSBmdW5jdGlvbigpeyBcclxuICBcclxuICAgIC8vaXRlcmF0aW9uIG92ZXIgc2Vla2JhcnMgZm9yIHRoZSAxc3QgY2hhcnRcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8ICQoXCIuc2xpZGVyXCIpLmxlbmd0aDsgaSsrKSB7XHJcblx0XHQoZnVuY3Rpb24oaXgpIHsgLy9zaG9vdGVyc1xyXG5cdCAgICAgICAgJChcIiNmaXJzdF9jaGFydFwiICsgaXgpLmNoYW5nZShmdW5jdGlvbigpeyAgXHRcdFxyXG4gICAgICAgICAgICAgICAgJChcIiNmaXJzdF9kZW1vXCIgKyBpeCkuaHRtbCh0aGlzLnZhbHVlKTsgIC8vdmFyIHQgPSAkKFwiI2RlbW9cIiArIGkpOyBhbGVydCh0KTtcclxuICAgICAgICAgICAgfSk7XHJcblx0XHR9KShpKTsgLy9lbmQgc2hvb3RlcnNcclxuXHR9XHJcblx0XHJcblx0XHJcblx0XHJcblx0ICAvL2l0ZXJhdGlvbiBvdmVyIHNlZWtiYXJzIGZvciB0aGUgMm5kIGNoYXJ0XHJcblx0Zm9yICh2YXIgaiA9IDA7IGogPCAkKFwiLnNsaWRlcjJcIikubGVuZ3RoOyBqKyspIHtcclxuXHRcdChmdW5jdGlvbihpeCkgeyAvL3Nob290ZXJzXHJcblx0ICAgICAgICAkKFwiI3NlY29uZF9jaGFydFwiICsgaXgpLmNoYW5nZShmdW5jdGlvbigpeyAgXHRcdFxyXG4gICAgICAgICAgICAgICAgJChcIiNzZWNvbmRfZGVtb1wiICsgaXgpLmh0bWwodGhpcy52YWx1ZSk7ICAvL3ZhciB0ID0gJChcIiNkZW1vXCIgKyBpKTsgYWxlcnQodCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cdFx0fSkoaik7IC8vZW5kIHNob290ZXJzXHJcblx0fVxyXG5cdFxyXG5cdFxyXG5cdFxyXG5cdFxyXG5cdFxyXG4gIH0gICAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc2Vla19iYXJfY3RyOyIsInZhciBjb3JlX3ZhciA9IHJlcXVpcmUoJy4vY29yZS5qcycpOyAvL0lNUE9SVCBWQVJJQUJMRVMge2MsIHhQYWRkaW5nLHlQYWRkaW5nfSBmcm9tIGNvcmUuanNcclxuLy92YXIgZ2V0TWF4WV9maWxlID0gcmVxdWlyZSgnLi9nZXRNYXhZLmpzJyk7XHJcbi8vdmFyIGNvbnZlcnREYXRlX2ZpbGUgPSByZXF1aXJlKCcuL2NvbnZlcnREYXRlU3RhbXAuanMnKTtcclxudmFyIGdldFlQaXhlbF9maWxlID0gcmVxdWlyZSgnLi9nZXRZUGl4ZWwuanMnKTsgLy8gUmV0dXJuIHRoZSBZIHBpeGVsIGZvciBhIGdyYXBoIHBvaW50LT5mdW5jdGlvbiBnZXRYUGl4ZWwoKXtcclxudmFyIGdldFhQaXhlbF9maWxlID0gcmVxdWlyZSgnLi9nZXRYUGl4ZWwuanMnKTsgLy8gUmV0dXJuIHRoZSBYIHBpeGVsIGZvciBhIGdyYXBoIHBvaW50LT5mdW5jdGlvbiBnZXRYUGl4ZWwoKXtcclxuXHJcblxyXG4vL2RyYXcgaG92ZXJhYmxlIGRvdHMsIGlmIHUgaG92ZXIgb3ZlciB0aGVtLT4gdG9vbHRpcCB3aWxsIGFwcGVhclxyXG5mdW5jdGlvbiBhZGRIb3ZlcmFibGVfRG90cygpe1xyXG5cdFxyXG5cclxuXHJcbiAgICB0aGlzLmFkZEhvdmVyYWJsZURvdHMgPSBmdW5jdGlvbihqc29uKXsgXHJcblx0XHJcbiAgICAgIC8vc3RhcnQgaW1wb3J0IFZhcnMgZnJvbSBjb3JlLmpzKioqKioqKioqKioqXHJcbiAgICAgIHZhciBjID0gY29yZV92YXIuYzsgLy9JTVBPUlQgVkFSIHtjfSBmb20gY29yZS5qc1xyXG5cdCAgLy92YXIgeFBhZGRpbmcgPSBjb3JlX3Zhci54UGFkZGluZzsgLy9JTVBPUlQgVkFSIHt4UEFkZGluZ30gZnJvbSBjb3JlLmpzXHJcblx0ICAvL0VORCAgaW1wb3J0IFZhcnMgZnJvbSBjb3JlLmpzKioqKioqKioqKioqKlxyXG5cdCAgXHJcbiAgICAgIGMuZmlsbFN0eWxlID0gJyMzMzMnOyAvL2dyZXlcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwganNvbi5sZW5ndGg7IGkrKykge1xyXG5cdCAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBqc29uW2ldLmNvbHVtbnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgYy5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgYy5hcmMobmV3IGdldFhQaXhlbF9maWxlKCkuZ2V0WFBpeGVsMyhqc29uW2ldLmNvbHVtbnNbal0uWCksIG5ldyBnZXRZUGl4ZWxfZmlsZSgpLmdldFlQaXhlbDMoanNvbltpXS5jb2x1bW5zW2pdLlkpLCA4LypSYWRpdXMqLywgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xyXG4gICAgICAgICAgICBjLmZpbGwoKTtcclxuXHQgICAgIH1cclxuICAgICAgfVxyXG5cclxuXHJcbiAgfSAgICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhZGRIb3ZlcmFibGVfRG90czsiLCJ2YXIgY29yZV92YXIgPSByZXF1aXJlKCcuL2NvcmUuanMnKTsgLy9JTVBPUlQgVkFSSUFCTEVTIHtjLCB4UGFkZGluZyx5UGFkZGluZ30gZnJvbSBjb3JlLmpzXHJcbi8vdmFyIGdldE1heFhfZmlsZSA9IHJlcXVpcmUoJy4vZ2V0TWF4WC5qcycpO1xyXG5cclxuXHJcbi8vY29udmVydHMgVW5peCB0byBub3JtYWwuIFRvIHVzZSBvbmUgc2FtZSBmdW5jdGlvbiB3ZSB1c2UgdGhlIDJuZCBhcmcge3RhZ30sIGlmIGl0IGlzIHNldCBpbiBjYWxsaW5nIGZ1bmN0aW9uLCBmdW5jdGlvbiByZXR1cm5zIHNob3J0IGRhdGUsIGkuZSB7MS4wM31cclxuZnVuY3Rpb24gY29udmVydERhdGVTdGFtcHQoKXtcclxuXHRcclxuXHJcbiBcclxuICB0aGlzLmZ1bmN0X2NvbnZlcnRfZGF0ZVN0YW1wID0gZnVuY3Rpb24oZGF0ZVN0YW1wcCwgdGFnKXsgICAvL2FyZyhVbml4U3RhbXAsIHRydWUvZmFsc2UpXHJcbiAgXHJcbiAgICAgIC8vc3RhcnQgaW1wb3J0IFZhcnMgZnJvbSBjb3JlLmpzXHJcbiAgICAgIHZhciBjID0gY29yZV92YXIuYzsgLy9JTVBPUlQgVkFSIHtjfSBmb20gY29yZS5qc1xyXG5cdCAgLy92YXIgeFBhZGRpbmcgPSBjb3JlX3Zhci54UGFkZGluZzsgLy9JTVBPUlQgVkFSIHt4UEFkZGluZ30gZm9tIGNvcmUuanNcclxuXHQgIHZhciB5UGFkZGluZyA9IGNvcmVfdmFyLnlQYWRkaW5nOyAvL0lNUE9SVCBWQVIge3lQQWRkaW5nfSBmb20gY29yZS5qc1xyXG5cdCAgLy9FTkQgIGltcG9ydCBWYXJzIGZyb20gY29yZS5qc1xyXG5cdCAgXHJcblx0ICBcclxuICB2YXIgbjtcclxuICB2YXIgd2Vla2RheXMgPSBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHVyJywgJ0ZyaScsICdTYXQnXTtcclxuICB2YXIgbW9udGhMaXN0ID0gW1wiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWF5XCIsIFwiSnVuXCIsIFwiSnVsXCIsIFwiQXVnXCIsIFwiU2VwXCIsIFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCJdO1xyXG4gIFxyXG4gIHZhciBkYXRlVGltZSA9ICBuZXcgRGF0ZShkYXRlU3RhbXBwKjEwMDApOy8vTWVnYSBFcnJvciwgbXVzdCBiZSB7ZGF0ZVN0YW1wcCoxMDAwfSwgd2FzIHdpdGhvdXQgKjEwMDBcclxuICB2YXIgY3Vycl9kYXRlID0gZGF0ZVRpbWUuZ2V0RGF0ZSgpOyAvL2dldHMgdGhlIGRhdGVcclxuICB2YXIgY3Vycl9tb250aCA9IGRhdGVUaW1lLmdldE1vbnRoKCk7Ly8gZ2V0cyBtb250aCAvLysgMTsgIFxyXG4gIHZhciBjdXJyX3llYXIgPSBkYXRlVGltZS5nZXRGdWxsWWVhcigpO1xyXG4gIHZhciBkYXlPZldlZWsgPSB3ZWVrZGF5c1tkYXRlVGltZS5nZXREYXkoKV07IC8vZGF5IG9mIHRoZSB3ZWVrXHJcbiAgXHJcbiAgLy9pZiAybmQgYXJnIGlzc2V0LCB3aGVuIGNhbGxpbmcgdGhlIGZ1bmN0aW9uLCByZXJ1cm5zIHNob3J0IGRhdGUsIGkuZSB7MS4wM30uIFVzZWQgaW4gWSBheGlzXHJcbiAgaWYodGFnKXtcclxuXHQgIGN1cnJfbW9udGggPSBjdXJyX21vbnRoICsgMTsgIC8vbW9udGggKyAxXHJcblx0ICBpZihjdXJyX21vbnRoLnRvU3RyaW5nKCkubGVuZ3RoID09IDEpeyAvL2lmIG1vbnRoIGludCBpcyBvZiBvbmUgbGVuZ3RoLCBhZGQgXCIwXCJcclxuXHRcdCBjdXJyX21vbnRoID0gXCIwXCIgKyBjdXJyX21vbnRoOyAvL2kuZSBcIjAzXCJcclxuXHQgIH1cclxuXHQgIG4gPSBjdXJyX2RhdGUgKyBcIi5cIiArIGN1cnJfbW9udGg7IC8vcmV0dXJucyAxLjAzXHJcblx0ICBcclxuICAvL2lmIDJuZCBhcmcgaXMgTk9UIHNldCwgcmV0dXJucyBmdWxsIGRhdGUsIGkuZSAge1NhdCwgMyBNYXJjaH0uIFVzZWQgaW4gdG9vbHRpcHNcclxuICB9IGVsc2Uge1xyXG4gICAgICBuID0gZGF5T2ZXZWVrICsgXCIsIFwiICsgbW9udGhMaXN0W2N1cnJfbW9udGhdICsgXCIgXCIgKyBjdXJyX2RhdGUvKiArIFwiLVwiICsgY3Vycl95ZWFyKi87IC8vcmV0dXJucyBTYXQsIDMgTWFyY2hcclxuICB9XHJcblxyXG4gIHJldHVybiBuO1xyXG5cdCAgXHJcblxyXG4gIH0gICAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY29udmVydERhdGVTdGFtcHQ7IiwiLy9Db250YWlucyBhbGwgbG9naWMgZm9yIGRyYXdpbmcgdGhlIHdob2xlIGNoYXJ0KGxpbmVzLCBkb3RzLCBheGlzLCB0b29sdGlwcykuIFJ1bnMgb24gbG9hZCBiYXNlZCBvbiBwcmVkaWZpbmVkIGhlcmUganNvbltdIGFycmF5LlxyXG5cclxudmFyIHRvb2xUaXBfZmlsZSA9IHJlcXVpcmUoJy4vY3JlYXRlc190b29sdGlwX2FycmF5X2Zyb21fanNvbi5qcycpOyAvLyBkZWZpbmUgdG9vbHRpcHMgZm9yIGVhY2gganNvbiBwb2ludCAvL2FkZGluZyB0byBhcnJheSB0b29sdGlwc1xyXG52YXIgZHJhd0F4aXNfZmlsZSA9IHJlcXVpcmUoJy4vZHJhd19WZXJ0X0hvcml6X0F4aXMuanMnKTsgIC8vZHJhdyBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBBeGlzXHJcbnZhciBkcmF3WFZhbHVlc19maWxlID0gcmVxdWlyZSgnLi9kcmF3X1hfdmFsdWVzX3RleHQuanMnKTsgIC8vRHJhdyB0aGUgWCB2YWx1ZSB0ZXh0cywgZHJhdyB0ZXh0IHZhbHVlcyBpbiBob3Jpem9udCBheGlzISEhISEhXHJcbnZhciBkcmF3WVZhbHVlc192ZXJ0aWNhbF9maWxlID0gcmVxdWlyZSgnLi9kcmF3X1lfdmFsdWVzX3ZlcnRpY2FsLmpzJyk7ICAvL0RyYXcgdGhlIFggdmFsdWUgdGV4dHMsIGRyYXcgdGV4dCB2YWx1ZXMgaW4gdmVydGljYWwgYXhpcyEhISEhIVxyXG52YXIgZHJhd0NoYXJ0TGluZXNfZmlsZSA9IHJlcXVpcmUoJy4vZHJhd19jaGFydExpbmVzLmpzJyk7ICAvL2RyYXcgY2hhcnQgbGluZXMgXHJcbnZhciBhZGREb3RzX2ZpbGUgPSByZXF1aXJlKCcuL2FkZEhvdmVyYWJsZV9Eb3RzLmpzJyk7ICAvL2RyYXcgaG92ZXJhYmxlIGRvdHMsIGlmIHUgaG92ZXIgb3ZlciB0aGVtLT4gdG9vbHRpcCB3aWxsIGFwcGVhclxyXG52YXIgc2hvd1Rvb2x0aXBzX2ZpbGUgPSByZXF1aXJlKCcuL3Nob3dUb29sdGlwX29uTW91c2VPdmVyLmpzJyk7ICAvL3Nob3cgVG9vbHRpcHMgb25Nb3VzZU92ZXJcclxudmFyIHN3aXRjaE5pZ2h0RGF5X2ZpbGUgPSByZXF1aXJlKCcuL3N3aXRjaERheU5pZ2h0TW9kZS5qcycpOyAgLy9zd2l0Y2hEYXlOaWdodE1vZGVcclxuXHJcbnZhciBzZWVrQmFyX2ZpbGUgPSByZXF1aXJlKCcuL1NlZWtfYmFyX2NvbnRyb2xzL3NlZWtfYmFyX2N0ci5qcycpOyAgLy9kaXNwbGF5IHNlZWtiYXIgdmFsdWVzIGluIGhpZGRlbiBTbGlkZVBhbmVsIFxyXG52YXIgZHJhd0NoYXJ0X29uQ2xpY2tfZmlsZSA9IHJlcXVpcmUoJy4vY29yZV9vbkNsaWNrLmpzJyk7Ly9kcmF3IGEgY2hhcnQgb25DbGljayB3aXRoIGN1c3RvbSBzZWVrYmFyIHZhbHVlc1xyXG5cclxuXHJcbmZ1bmN0aW9uIGNvcmUoKXtcclxuXHRcclxuXHRcclxuXHRcclxuICBcclxuICAvL0pzb24gZGF0YSBhcnJheVxyXG4gIHRoaXMuanNvbiA9XHRbXHJcbiAgICB7IC8vY2hhcnQgMVxyXG4gICAgICBjb2x1bW5zOiBbICB7WDogMCxZOiA0MCwgZGF0ZTogMTU1MTM5ODQwMCAvKmkuZSAxLjAzLjIwMTkqL30sIHtYOiAyLFk6IDEzMCwgZGF0ZTogMTU1MTQ4NDgwMH0sIHtYOiAzLFk6IDI0NCwgZGF0ZTogMTU1MTU3MTIwMH0sIHtYOiA0LFk6IDEyMCwgZGF0ZTogMTU1MTY1NzYwMH0sIHtYOiA1LFk6IDYwLCBkYXRlOiAxNTUxNzQ0MDAwLyo1LjAzLjE5Ki99LCB7WDogNixZOiAxMjAsIGRhdGU6IDE1NTE4MzA0MDB9LCB7WDogNyxZOiA2OSwgZGF0ZTogMTU1MTkxNjgwMH1dLFxyXG5cdCAgdHlwZXM6ICdsaW5lJyxcclxuXHQgIGNvbG9yczogJyMzREMyM0YnLCAgLy9ncmVlblxyXG5cdCAgbmFtZXM6ICduYW1lc1gnXHJcblx0fSxcclxuXHRcclxuXHR7IC8vY2hhcnQgMlxyXG4gICAgICBjb2x1bW5zOiBbICB7WDogMCxZOiAyOCwgZGF0ZTogMTU1MTM5ODQwMCAvKmkuZSAxLjAzLjIwMTkqL30sIHtYOiAyLFk6IDcwLCBkYXRlOiAxNTUxNDg0ODAwfSwge1g6IDMsWTogODgsIGRhdGU6IDE1NTE1NzEyMDB9LCB7WDogNCxZOiA2MiwgZGF0ZTogMTU1MTY1NzYwMH0sIHtYOiA1LFk6IDQ1LCBkYXRlOiAxNTUxNzQ0MDAwLyo1LjAzLjE5Ki99LCB7WDogNixZOiA0MCwgZGF0ZTogMTU1MTgzMDQwMH0sIHtYOiA3LFk6NDAsIGRhdGU6IDE1NTE5MTY4MDB9XSxcclxuXHQgIHR5cGVzOiAnbGluZScsXHJcblx0ICBjb2xvcnM6ICcjRjM0QzQ0JywgIC8vcmVkXHJcblx0ICBuYW1lczogJ25hbWVzWDInXHJcblx0fSxcclxuICBdLFxyXG5cclxuXHRcclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRcclxuICB0aGlzLmNyZWF0ZUNoYXJ0ID0gZnVuY3Rpb24oKXtcclxuXHQgIFxyXG5cdHZhciBqc29uLCBjLCBvZmZzZXRYLCBvZmZzZXRZLCB0aXBDYW52YXNfMix0aXBDdHg7IC8vRVhQT1JUU1xyXG5cdGV4cG9ydHMuanNvbiA9IHRoaXMuanNvbjsgLy9leHBvcnRzIGpzb24gYXJyYXkgKGkuZSB0byBnZXRNYXhYIE1vZHVsZSlcclxuICBcclxuICBcclxuXHQgIFxyXG5cdCAgLy9hbGVydCh0aGlzLmpzb25bMF0ubmFtZXMpO1xyXG5cdCAgLy9jYW52YXMgd2l0aCBjaGFydFxyXG4gICAgICB2YXIgZ3JhcGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdyYXBoXCIpO1xyXG4gICAgICBleHBvcnRzLmMgPSBncmFwaC5nZXRDb250ZXh0KFwiMmRcIik7IC8vRVhQT1JUIFZBUklBQkxFIChpLmUgdG8ge2RyYXdfVmVydF9Ib3Jpel9BeGlzfSBNb2R1bGUpXHJcblxyXG4gICAgICAvL0lGIE5PVCBJTiBNb2JpbGUsIGkuZSBvbiBsYXJnZSBzY3JlZW4sIHVzZSBzcGVjaWFsIGNhbnZhcyB3aWR0aCByZWNhbGN1bGF0aW9uLCBvbiBtb2JpbGUgbGVmdCBpdCBhcyB3YXMgKDMwMHgxNTApLlxyXG4gICAgICAvL1UgbWF5IG5vdCB1c2UgaXQsIGJ1dCBvbiBkZXNrdG9wIGNhbnZhcyBjaGFydCB3aWxsIGJlIHRvbyBzbWFsbCwgb25seSAzMDB4MTUwXHJcbiAgICAgIGlmKHNjcmVlbi53aWR0aCA+PSA2NDApeyBcclxuICAgICAgICAgIGdyYXBoLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSAzMjA7IFxyXG5cdCAgICAgIGdyYXBoLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDMyMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgXHJcblxyXG4gICAgICAvL2NhbnZhcyB3aXRoIHRvb2x0aXBzIGRvdFxyXG4gICAgICB2YXIgdGlwQ2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXBcIik7XHJcbiAgICAgIGV4cG9ydHMudGlwQ3R4ID0gdGlwQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKTsgLy9FWFBPUlQgVkFSSUFCTEUgKGkuZSB0byB7c2hvd1Rvb2x0aXBfb25Nb3VzZU92ZXJ9IE1vZHVsZSlcclxuXHQgIFxyXG5cdCAgdmFyIGNhbnZhc09mZnNldCA9ICQoXCIjZ3JhcGhcIikub2Zmc2V0KCk7IFxyXG5cdCAgXHJcbiAgICAgIGV4cG9ydHMub2Zmc2V0WCA9IGNhbnZhc09mZnNldC5sZWZ0OyAvL0VYUE9SVCBWQVJJQUJMRSAoaS5lIHRvIHtzaG93VG9vbHRpcF9vbk1vdXNlT3Zlcn0gTW9kdWxlKVxyXG4gICAgICBleHBvcnRzLm9mZnNldFkgPSBjYW52YXNPZmZzZXQudG9wOyAgLy9FWFBPUlQgVkFSSUFCTEUgKGkuZSB0byB7c2hvd1Rvb2x0aXBfb25Nb3VzZU92ZXJ9IE1vZHVsZSlcclxuXHQgIGV4cG9ydHMudGlwQ2FudmFzXzIgPSB0aXBDYW52YXM7ICAgICAvL0VYUE9SVCBWQVJJQUJMRSAoaS5lIHRvIHtzaG93VG9vbHRpcF9vbk1vdXNlT3Zlcn0gTW9kdWxlKVxyXG5cclxuICAgICAgdmFyIGdyYXBoO1xyXG5cdCAgLy92YXIgeFBhZGRpbmc7XHJcbiAgICAgIGV4cG9ydHMueFBhZGRpbmcgPSAzMDsgLy9sZWZ0IHBhZGRpbmcgb2Ygc2NhbGVzIGF4aXMgIC8vRVhQT1JUIFZBUklBQkxFIChpLmUgdG8ge2dldFhQaXhlbH0gTW9kdWxlKVxyXG4gICAgICAvKnZhciovIGV4cG9ydHMueVBhZGRpbmcgPSAzMDsgLy9FWFBPUlQgVkFSSUFCTEUgKGkuZSB0byB7Z2V0WVBpeGVsfSBNb2R1bGUpXHJcblx0ICBcclxuXHQgIFxyXG5cdCAgXHJcblx0ICBcclxuXHQgIC8vTU9EVUxFUyBQYXJ0LS0tLS0tLS0tLVxyXG4gICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqKiAgXHJcblx0ICBcclxuXHQgIC8vIGRlZmluZSB0b29sdGlwcyBmb3IgZWFjaCBqc29uIHBvaW50IC8vYWRkaW5nIHRvIGFycmF5IHRvb2x0aXBzXHJcblx0ICB2YXIgY3JlYXRlVG9vbHRpcEFycmF5ID0gbmV3IHRvb2xUaXBfZmlsZSgpO1xyXG5cdCAgdmFyIHRvb2x0aXBSZXN1bHQgPSBjcmVhdGVUb29sdGlwQXJyYXkuY3JlYXRlQXJyYXkodGhpcy5qc29uKTsgLy90b29sdGlwUmVzdWx0ID0+dG9vbHRpcHMgYXJyYXlcclxuXHQgIGNvbnNvbGUubG9nKHRvb2x0aXBSZXN1bHQpO1xyXG5cdCBcclxuXHJcblx0ICAvL2RyYXcgaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgQXhpc1xyXG5cdCAgIHZhciBkcmF3QXhpcyA9IG5ldyBkcmF3QXhpc19maWxlKCk7XHJcblx0ICAgZHJhd0F4aXMuZHJhd19YWV9BeGlzKCk7XHJcblx0ICAgXHJcblx0ICBcclxuXHQgICAvL2RyYXcgdGhlIFggdmFsdWUgdGV4dHMsIGRyYXcgdGV4dCB2YWx1ZXMgaW4gaG9yaXpvbnQgYXhpcyEhISEhIVxyXG5cdCAgIHZhciBkcmF3X1hfdGV4dCA9IG5ldyBkcmF3WFZhbHVlc19maWxlKCk7XHJcblx0ICAgZHJhd19YX3RleHQuZHJhd19YX3ZhbHVlX3RleHQodG9vbHRpcFJlc3VsdCk7IC8vdGhlIG9ubHkgd2F5IHRvIHBhc3MgdmFyIHRvb2x0aXBzIHRvIHRoaXMgbW9kdWxlIC8vdG9vbHRpcFJlc3VsdCA9PnRvb2x0aXBzIGFycmF5XHJcblx0ICAgXHJcblx0ICAgLy9kcmF3IHRoZSBZIHZhbHVlIHRleHRzLCBkcmF3IHRleHQgdmFsdWVzIGludmVydGljYWwgYXhpcyEhISEhIVxyXG5cdCAgIHZhciBkcmF3X1lfdGV4dCA9IG5ldyBkcmF3WVZhbHVlc192ZXJ0aWNhbF9maWxlKCk7XHJcblx0ICAgZHJhd19ZX3RleHQuZHJhd19ZX3ZhbHVlX3RleHQoKTsgLy90aGUgb25seSB3YXkgdG8gcGFzcyB2YXIgdG9vbHRpcHMgdG8gdGhpcyBtb2R1bGVcclxuXHQgICBcclxuXHQgICAvLyBEcmF3IHRoZSBDSEFSVCBncmFwaCBMaW5lc1xyXG5cdCAgICB2YXIgZHJhd19jaGFydExpbmVzID0gbmV3IGRyYXdDaGFydExpbmVzX2ZpbGUoKTtcclxuXHQgICAgZHJhd19jaGFydExpbmVzLmRyYXdfbGluZXModGhpcy5qc29uKTsgXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0Ly9kcmF3IGhvdmVyYWJsZSBkb3RzLCBpZiB1IGhvdmVyIG92ZXIgdGhlbS0+IHRvb2x0aXAgd2lsbCBhcHBlYXJcclxuXHQgICAgdmFyIGRyYXdfZG90cyA9IG5ldyBhZGREb3RzX2ZpbGUoKTtcclxuXHQgICAgZHJhd19kb3RzLmFkZEhvdmVyYWJsZURvdHModGhpcy5qc29uKTtcclxuXHRcdFxyXG5cdFx0Ly9zaG93VG9vbHRpcF9vbk1vdXNlT3ZlclxyXG5cdCAgICB2YXIgc2hvd1Rvb2x0aXBzID0gbmV3IHNob3dUb29sdGlwc19maWxlKCk7XHJcblx0ICAgIHNob3dUb29sdGlwcy5kaXNwYWx5VG9vbHRpcHModG9vbHRpcFJlc3VsdCk7IC8vdG9vbHRpcFJlc3VsdCA9PnRvb2x0aXBzIGFycmF5XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0Ly8gU3dpdGNoIGRheS9uaWdodCBtb2RlXHJcblx0ICAgIHZhciBzd2l0Y2hNb2RlID0gbmV3IHN3aXRjaE5pZ2h0RGF5X2ZpbGUoKTtcclxuXHQgICAgc3dpdGNoTW9kZS5zd2l0Y2hNb2RlKCk7IFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8vZGlzcGxheSBzZWVrYmFyIHZhbHVlcyBpbiBoaWRkZW4gU2xpZGVQYW5lbFxyXG5cdCAgICB2YXIgc2Vla0Jhcl9jb250cm9sID0gbmV3IHNlZWtCYXJfZmlsZSgpO1xyXG5cdCAgICBzZWVrQmFyX2NvbnRyb2wuZ2V0U0Jhcl92YWx1ZXMoKTsgXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0Ly9kcmF3IGEgY2hhcnQgb25DbGljayB3aXRoIGN1c3RvbSBzZWVrYmFyIHZhbHVlc1xyXG5cdCAgICB2YXIgZHJhd0NoYXJ0b25DbGlja2sgPSBuZXcgZHJhd0NoYXJ0X29uQ2xpY2tfZmlsZSgpO1xyXG5cdCAgICBkcmF3Q2hhcnRvbkNsaWNray5jcmVhdGVDaGFydF9vbkNsaWNra2soKTsgXHJcblx0ICBcclxuXHQgIC8vICoqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICoqXHJcbiAgICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0ICBcclxuICAgfSAvL2VuZCB0aGlzLkNyZWF0ZUNoYXJ0XHJcbiAgIFxyXG4gICBcclxuXHJcbiAgIFxyXG4gICBcclxuICAgXHJcbiAgIFxyXG4gICBcclxuICAgXHJcbiAgIFxyXG59IC8vZW5kIGZ1bmN0aW9uIEFMTFxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjb3JlOyIsIi8vSXQgY3JlYXRlcyAyIGxpbmVzIGNoYXJ0IHdoZW4gdXNlciBzZWxlY3RzIHNsaWRlcnMgdmFsdWUgY2xpY2tzIGJ1dHRvbiB0byBkcmF3IGEgY3VzdG9tIGNoYXJ0XHJcbi8vdmFyIGRyYXdDaGFydF9vbkNsaWNrX2ZpbGUgPSByZXF1aXJlKCcuL2RyYXdfY2hhcnRMaW5lcy5qcycpOyAvLyBpbmNsdWRlIGNvcmUuanMgd2hpY2ggY29udGFpbnMgYWxsIGxvZ2ljIGZvciBkcmF3aW5nIGNoYXJ0XHJcbnZhciBkcmF3Q2hhcnRfb25DbGlja19maWxlID0gcmVxdWlyZSgnLi9jb3JlLmpzJyk7XHJcblxyXG5cclxuZnVuY3Rpb24gY29yZV9vbkNsaWNrKCl7XHJcbiAgXHJcbiBcclxuXHJcblx0XHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0XHJcbiAgdGhpcy5jcmVhdGVDaGFydF9vbkNsaWNra2sgPSBmdW5jdGlvbigpe1xyXG5cdCAgJChcIiNkcmF3Q2hhcnRvbkNsaWNrXCIpLmNsaWNrKGZ1bmN0aW9uKCkgeyAgXHJcblx0ICBcclxuXHQgICAgICBcclxuXHRcdCAgXHJcblx0ICAgICAgLy92YXIgYXJyMSA9IFtdO1xyXG5cdFx0ICAvL3ZhciBhcnIyID0gW107XHJcblx0XHQgIFxyXG5cdFx0ICB2YXIgY29sdW1uQXJyID0gW107XHJcblx0XHQgIHZhciBjb2x1bW5BcnIyID0gW107XHJcblx0XHQgIFxyXG5cdFx0ICB2YXIgd2hvbGVfb2JqZWN0ID0ge307XHJcblx0XHQgIHZhciB3aG9sZV9vYmplY3QyID0ge307XHJcbiAgICAgICAgICAvL2dldHRpbmcgc2Vla2JhciB2YWx1ZXNcclxuXHRcdCAgXHJcblx0ICAgICAgLy9pdGVyYXRpb24gb3ZlciBzZWVrYmFycyBmb3IgdGhlIDFzdCBjaGFydFxyXG5cdCAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJChcIi5zbGlkZXJcIikubGVuZ3RoOyBpKyspIHtcclxuXHRcdCAgICAgIC8vYXJyMS5wdXNoKCAkKFwiI2ZpcnN0X2NoYXJ0XCIgKyBpKS52YWwoKSApOyBcclxuXHRcdFx0ICB2YXIgb2JqZWN0WCA9IHt9OyAvL2NyZWF0ZXMgZW1wdHkgb2JqZWN0XHJcblx0XHRcdCAgb2JqZWN0WC5YID0gaTsgLy9hZGRzIHRvIG9iamVjdFh7WDogaX1cclxuXHRcdFx0ICBvYmplY3RYLlkgPSQoXCIjZmlyc3RfY2hhcnRcIiArIGkpLnZhbCgpOyAvL2FkZHMgdG8gb2JqZWN0WHtZOiBzbGlkZXIgdmFsdWV9XHJcblx0XHRcdCAgb2JqZWN0WC5kYXRlID0gTWF0aC5yb3VuZCgrbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoMjQgKiA2MCAqIDYwICogMTAwMCkvMTAwMCkpOyAvL2dldHMgdG9kYXkgVW5peHN0YW1wICBpbiAxc3QgaXRlcmF0aW9uIGFuZCArMSBkYXkgaW4gZXZlcnkgaXRlcmF0aW9uIFxyXG5cdFx0XHQgIGNvbHVtbkFyci5wdXNoKG9iamVjdFgpOyBcclxuXHRcdFx0ICBcclxuXHRcdFx0ICAvL2NvbG9yczogJyMzREMyM0YnO1xyXG5cdCAgICAgIH1cclxuXHRcdCAgd2hvbGVfb2JqZWN0LmNvbHVtbnMgPSBjb2x1bW5BcnI7XHJcblx0XHQgIHdob2xlX29iamVjdC5jb2xvcnMgPSAnIzNEQzIzRic7IC8vZ3JlZW5cclxuXHRcdCAgd2hvbGVfb2JqZWN0Lm5hbWVzID0gJ25hbWVzWCc7XHJcblx0XHQgIC8vYXJyMS5wdXNoKHdob2xlX29iamVjdCk7XHJcblx0XHJcblx0ICAgIC8vY29uc29sZS5sb2coYXJyMSk7XHJcblx0XHQgXHJcblx0XHQgXHJcblx0XHJcblx0ICAgICAvL2l0ZXJhdGlvbiBvdmVyIHNlZWtiYXJzIGZvciB0aGUgMm5kIGNoYXJ0XHJcblx0ICAgICBmb3IgKHZhciBqID0gMDsgaiA8ICQoXCIuc2xpZGVyMlwiKS5sZW5ndGg7IGorKykge1xyXG5cdFx0ICAgICAvL2FycjIucHVzaCggJChcIiNzZWNvbmRfY2hhcnRcIiArIGopLnZhbCgpICk7XHJcbiAgICAgICAgICAgICAgdmFyIG9iamVjdFg9IHt9O1xyXG5cdFx0XHQgIG9iamVjdFguWCA9IGo7XHJcblx0XHRcdCAgb2JqZWN0WC5ZID0gICQoXCIjc2Vjb25kX2NoYXJ0XCIgKyBqKS52YWwoKTtcclxuXHRcdFx0ICBvYmplY3RYLmRhdGUgPSBNYXRoLnJvdW5kKCtuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArICgyNCAqIDYwICogNjAgKiAxMDAwKS8xMDAwKSk7IC8vZ2V0cyB0b2RheSBVbml4c3RhbXAgIGluIDFzdCBpdGVyYXRpb24gYW5kICsxIGRheSBpbiBldmVyeSBpdGVyYXRpb24gXHJcblx0XHRcdCAgY29sdW1uQXJyMi5wdXNoKG9iamVjdFgpOzsgXHRcdFx0IFxyXG5cdCAgICAgfVxyXG5cdCAgICAgLy9hbGVydChhcnIyKTtcclxuXHRcdCAgXHJcblx0XHQgd2hvbGVfb2JqZWN0Mi5jb2x1bW5zID0gY29sdW1uQXJyMjtcclxuXHRcdCB3aG9sZV9vYmplY3QyLmNvbG9ycyA9ICcjRjM0QzQ0JywgIC8vcmVkXHJcblx0XHQgd2hvbGVfb2JqZWN0Mi5uYW1lcyA9ICduYW1lc1gyJztcclxuXHQgICAgIC8vYXJyMS5wdXNoKHdob2xlX29iamVjdCk7XHJcblx0XHQgXHJcblx0XHQgXHJcblx0XHQgdmFyIGpzb25YID0gW107XHJcblx0XHQganNvblgucHVzaCh3aG9sZV9vYmplY3QsIHdob2xlX29iamVjdDIpO1xyXG5cdFx0IGNvbnNvbGUubG9nKGpzb25YKTtcclxuXHRcdCBcclxuXHRcdCBcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlTaWRlcGFuZWxcIikuc3R5bGUud2lkdGggPSBcIjBcIjsgLy9oaWRlcyB0aGUgc2xpZGUgcGFuZWxcclxuXHRcdCBcclxuXHRcdCAgLy9NT0RVTEVcclxuXHRcdCAgdmFyIGNvcmVaWiA9IG5ldyBkcmF3Q2hhcnRfb25DbGlja19maWxlKCk7XHJcblx0ICAgICAgLy9jb3JlWlouZHJhd19saW5lcyhqc29uWCk7XHJcblx0XHQgIGNvcmVaWi5jcmVhdGVDaGFydCgpO1xyXG5cdH0pO1xyXG5cdCAgXHJcblx0ICAvLyAqKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqKlxyXG4gICAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cdCAgXHJcbiAgIH0gLy9lbmQgdGhpcy5DcmVhdGVDaGFydFxyXG4gICBcclxuICAgXHJcblxyXG4gICBcclxuICAgXHJcbiAgIFxyXG4gICBcclxuICAgXHJcbiAgIFxyXG4gICBcclxufSAvL2VuZCBmdW5jdGlvbiBBTExcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY29yZV9vbkNsaWNrOyIsInZhciBnZXRYUGl4ZWxfZmlsZSA9IHJlcXVpcmUoJy4vZ2V0WFBpeGVsLmpzJyk7XHJcbnZhciBnZXRZUGl4ZWxfZmlsZSA9IHJlcXVpcmUoJy4vZ2V0WVBpeGVsLmpzJyk7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVzX3Rvb2x0aXBfYXJyYXlfZnJvbV9qc29uKCl7XHJcblxyXG5cclxuXHRcclxuICB0aGlzLmNyZWF0ZUFycmF5ID0gZnVuY3Rpb24oanNvbil7XHJcblx0ICB2YXIgZ2V0WFBpeGVsX2ZpbGUyID0gbmV3IGdldFhQaXhlbF9maWxlKCk7IC8vTW9kdWxlXHJcblx0ICB2YXIgZ2V0WVBpeGVsX2ZpbGUyID0gbmV3IGdldFlQaXhlbF9maWxlKCk7IC8vTW9kdWxlXHJcblx0ICBcclxuXHQgIC8vdmFyIGN2OyB2YXIgZyA9IFwiZ2dnXCI7XHJcblx0ICAvL2V4cG9ydHMuY3YgPSBnIDtcclxuXHQgIC8vYWxlcnQoZyk7XHJcbiAgICAgIC8vZGVmaW5lIHRvb2x0aXBzIGZvciBlYWNoIGpzb24gcG9pbnQgLy9hZGRpbmcgdG8gYXJyYXkgdG9vbHRpcHNcclxuXHQgIFxyXG4gICAgICB2YXIgdG9vbHRpcHMgPSBbXTtcclxuXHQgIC8vdmFyIHRvb2x0aXBzNDtcclxuXHQgIC8vZXhwb3J0cy50b29sdGlwczQgPSBbNCw0XTsgLy90b29sdGlwcztcclxuXHQgIFxyXG5cclxuICAgICAgLy9pdCB3b3JrcywgY3JlYXRlcyBhbiBhcnJheSB3aXRoIG9iamVjdHMgZm9yIHRvb2x0aXBzLCBjcmVhdGVzIGluIGZvcm1hdCBbe3g6JCwgeTokLCByWHI7JCwgdGlwOiR9LCB7eDokLCB5OiQsIHJYcjskLCB0aXA6JH1dXHJcbiAgICAgIC8vKDkwJSBjb3BpZWQgZnJvbSB2YXJpYW50IGZvciAxIGNoYXJ0LCBqdXN0IGFkZGVkIGFkZGl0aW9uYWwgaW5uZXIgZm9yIGxvb3Age2ZvciAodmFyIGogPSAwOyBqIDwganNvbltpXS5jb2x1bW5zLmxlbmd0aDsgaisrKX1cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBqc29uLmxlbmd0aDsgaSsrKSB7XHJcblx0ICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGpzb25baV0uY29sdW1ucy5sZW5ndGg7IGorKykge1xyXG5cdCAgICAgICAgIHZhciBzdGF0dXNYO1xyXG5cdFx0XHQgLy9kZWZpbmUgdmFsdWUgZm9yIHN0YXR1c1xyXG5cdCAgICAgICAgIGlmKGkgJSAyICE9MCl7XHJcblx0XHRcdFx0IHN0YXR1c1ggPSBcIkxlZnRcIjtcclxuXHRcdFx0IH0gZWxzZSB7XHJcblx0XHRcdCAgICAgc3RhdHVzWCA9XCJKb2luZWRcIjtcclxuXHRcdFx0IH0gXHJcblx0ICBcclxuICAgICAgICAgICAgIHRvb2x0aXBzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgIHg6IGdldFhQaXhlbF9maWxlMi5nZXRYUGl4ZWwzKGpzb25baV0uY29sdW1uc1tqXS5YKSxcclxuICAgICAgICAgICAgICAgICB5OiBnZXRZUGl4ZWxfZmlsZTIuZ2V0WVBpeGVsMyhqc29uW2ldLmNvbHVtbnNbal0uWSksXHJcbiAgICAgICAgICAgICAgICAgcjogNCxcclxuICAgICAgICAgICAgICAgICByWHI6IDE2LFxyXG4gICAgICAgICAgICAgICAgIGNvbG9yczogXCJyZWRcIiwgLy9OT1QgVVNFRD8/P1xyXG4gICAgICAgICAgICAgICAgIHRpcDoganNvbltpXS5jb2x1bW5zW2pdLlksICAvL1wiI3RleHRcIiArIChpICsgMSkgIC8vTWVnYSBlcnJvciB3YXMgaGVyZSAvL3RleHQgb2YgdG9vbHRpcCxcclxuXHRcdCAgICAgICAgIGRhdGVaOiBqc29uW2ldLmNvbHVtbnNbal0uZGF0ZSwgLy9cclxuXHRcdCAgICAgICAgIHN0YXR1czogc3RhdHVzWCAvLyAxc3Qgb3IgMm5kIGNoYXJ0LiBKb2luZWQvTGVmdFxyXG4gICAgICAgICAgICAgfSk7XHJcblx0XHRcdCBcclxuXHQgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy9jb25zb2xlLmxvZyh0b29sdGlwcyk7XHJcblx0ICByZXR1cm4gdG9vbHRpcHM7XHJcbiAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVzX3Rvb2x0aXBfYXJyYXlfZnJvbV9qc29uOyIsInZhciBjb3JlX3ZhciA9IHJlcXVpcmUoJy4vY29yZS5qcycpOyAvL0lNUE9SVCBWQVJJQUJMRVMge2MsIHhQYWRkaW5nLHlQYWRkaW5nfSBmcm9tIGNvcmUuanNcclxuXHJcblxyXG5mdW5jdGlvbiBkcmF3X1ZlcnRfSG9yaXpfQXhpcygpe1xyXG5cdFxyXG5cclxuXHRcclxuICB0aGlzLmRyYXdfWFlfQXhpcyA9IGZ1bmN0aW9uKCl7IFxyXG4gICAgICAvL3N0YXJ0IGltcG9ydCBWYXJzIGZyb20gY29yZS5qc1xyXG4gICAgICB2YXIgYyA9IGNvcmVfdmFyLmM7IC8vSU1QT1JUIFZBUiB7Y30gZm9tIGNvcmUuanNcclxuXHQgIHZhciB4UGFkZGluZyA9IGNvcmVfdmFyLnhQYWRkaW5nOyAvL0lNUE9SVCBWQVIge3hQQWRkaW5nfSBmb20gY29yZS5qc1xyXG5cdCAgdmFyIHlQYWRkaW5nID0gY29yZV92YXIueVBhZGRpbmc7IC8vSU1QT1JUIFZBUiB7eVBBZGRpbmd9IGZvbSBjb3JlLmpzXHJcblx0ICAvL0VORCAgaW1wb3J0IFZhcnMgZnJvbSBjb3JlLmpzXHJcblx0ICBcclxuXHQgIGMubGluZVdpZHRoID0gMjsgLy93aWR0aCBvZiBYWSBheGlzIHNjYWxlXHJcbiAgICAgIGMuc3Ryb2tlU3R5bGUgPSAnIzMzMyc7XHJcbiAgICAgIGMuZm9udCA9ICdpdGFsaWMgOHB0IHNhbnMtc2VyaWYnO1xyXG4gICAgICBjLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcblxyXG4gICAgIC8vIERyYXcgdGhlIGF4aXNlcyBzY2FsZXNcclxuICAgICBjLmJlZ2luUGF0aCgpO1xyXG4gICAgIGMubW92ZVRvKHhQYWRkaW5nLCAwKTtcclxuICAgICBjLmxpbmVUbyh4UGFkZGluZywgZ3JhcGguaGVpZ2h0IC0geVBhZGRpbmcpO1xyXG4gICAgIGMubGluZVRvKGdyYXBoLndpZHRoLCBncmFwaC5oZWlnaHQgLSB5UGFkZGluZyk7XHJcbiAgICAgYy5zdHJva2UoKTtcclxuXHJcbiAgfSAgICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkcmF3X1ZlcnRfSG9yaXpfQXhpczsiLCJ2YXIgY29yZV92YXIgPSByZXF1aXJlKCcuL2NvcmUuanMnKTsgLy9JTVBPUlQgVkFSSUFCTEVTIHtjLCB4UGFkZGluZyx5UGFkZGluZ30gZnJvbSBjb3JlLmpzXHJcbnZhciBnZXRNYXhYX2ZpbGUgPSByZXF1aXJlKCcuL2dldE1heFguanMnKTtcclxudmFyIGNvbnZlcnREYXRlX2ZpbGUgPSByZXF1aXJlKCcuL2NvbnZlcnREYXRlU3RhbXAuanMnKTtcclxudmFyIGdldFhQaXhlbF9maWxlID0gcmVxdWlyZSgnLi9nZXRYUGl4ZWwuanMnKTsgLy8gUmV0dXJuIHRoZSBYIHBpeGVsIGZvciBhIGdyYXBoIHBvaW50LT5mdW5jdGlvbiBnZXRYUGl4ZWwoKXtcclxudmFyIHRvb2x0aXBfdmFyID0gcmVxdWlyZSgnLi9jcmVhdGVzX3Rvb2x0aXBfYXJyYXlfZnJvbV9qc29uLmpzJyk7IC8vSU1QT1JUIFZBUklBQkxFUyB7dG9vbHRpcHMgfSBmcm9tIGNyZWF0ZXNfdG9vbHRpcF9hcnJheV9mcm9tX2pzb24uanNcclxuXHJcblxyXG4gLy9EcmF3IHRoZSBYIHZhbHVlIHRleHRzLCBkcmF3IHRleHQgdmFsdWVzIGluIGhvcml6b250IGF4aXMhISEhISFcclxuZnVuY3Rpb24gZHJhd19YX3ZhbHVlc190ZXh0KCl7XHJcblx0XHJcblxyXG4gXHJcbiAgdGhpcy5kcmF3X1hfdmFsdWVfdGV4dCA9IGZ1bmN0aW9uKHRvb2x0aXBzKXsgXHJcbiAgXHJcbiAgICAgIC8vc3RhcnQgaW1wb3J0IFZhcnMgZnJvbSBjb3JlLmpzXHJcbiAgICAgIHZhciBjID0gY29yZV92YXIuYzsgLy9JTVBPUlQgVkFSIHtjfSBmb20gY29yZS5qc1xyXG5cdCAgLy92YXIgeFBhZGRpbmcgPSBjb3JlX3Zhci54UGFkZGluZzsgLy9JTVBPUlQgVkFSIHt4UEFkZGluZ30gZnJvbSBjb3JlLmpzXHJcblx0ICB2YXIgeVBhZGRpbmcgPSBjb3JlX3Zhci55UGFkZGluZzsgLy9JTVBPUlQgVkFSIHt5UEFkZGluZ30gZnJvbSBjb3JlLmpzXHJcblx0ICAvL3ZhciB0b29sdGlwcyA9IHRvb2x0aXBfdmFyLnRvb2x0aXBzNDsgLy9JTVBPUlQgVkFSIHt0b29sdGlwfSBmcm9tIGNyZWF0ZXNfdG9vbHRpcF9hcnJheV9mcm9tX2pzb24uanNcclxuXHQgIC8vYWxlcnQoXCJ0b29sIFwiICsgdG9vbHRpcF92YXIuY3YpO1xyXG5cdCAgLy9FTkQgIGltcG9ydCBWYXJzIGZyb20gY29yZS5qc1xyXG5cdCAgXHJcblx0XHJcblx0ICB2YXIgbWF4WFZhbHVlID0gbmV3IGdldE1heFhfZmlsZSgpLmdldE1heFgoKTsgXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IG1heFhWYWx1ZSAtMTsgaSsrKSB7IC8vd2FzIG9yaWdpbmFsbHkgKHZhciBpID0gMDsgaSA8PSBtYXhYVmFsdWU7IGkrKyksIHVzZSAtMSBzdHJpY3RseSBmb3IgY2FzZXMgd2l0aCBkYXRlc1xyXG4gICAgICAgIC8vIHVzZXMganNvbi52YWx1ZXNbaV0uWFxyXG5cdCAgICAvL1RvIHVzZSBvbmUgc2FtZSBmdW5jdGlvbntmdW5jdF9jb252ZXJ0X2RhdGVTdGFtcH0gdG8gcmV1cm4gZGlmZiB2YWx1ZXMsd2UgdXNlIHRoZSAybmQgYXJnIHt0YWcodHJ1ZSl9LCBpZiBpdCBpcyBzZXQgaW4gY2FsbGluZyBmdW5jdGlvbiwgZnVuY3Rpb24gcmV0dXJucyBzaG9ydCBkYXRlLCBpLmUgezEuMDN9XHJcbiAgICAgICAgYy5maWxsVGV4dCgvKmkqLyBuZXcgY29udmVydERhdGVfZmlsZSgpLmZ1bmN0X2NvbnZlcnRfZGF0ZVN0YW1wKHRvb2x0aXBzW2ldLmRhdGVaLCB0cnVlKSAsIG5ldyBnZXRYUGl4ZWxfZmlsZSgpLmdldFhQaXhlbDMoaSksIGdyYXBoLmhlaWdodCAtIHlQYWRkaW5nICsgMjApO1xyXG4gICAgICB9XHJcbiAgfSAgICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkcmF3X1hfdmFsdWVzX3RleHQ7IiwidmFyIGNvcmVfdmFyID0gcmVxdWlyZSgnLi9jb3JlLmpzJyk7IC8vSU1QT1JUIFZBUklBQkxFUyB7YywgeFBhZGRpbmcseVBhZGRpbmd9IGZyb20gY29yZS5qc1xyXG52YXIgZ2V0TWF4WV9maWxlID0gcmVxdWlyZSgnLi9nZXRNYXhZLmpzJyk7XHJcbi8vdmFyIGNvbnZlcnREYXRlX2ZpbGUgPSByZXF1aXJlKCcuL2NvbnZlcnREYXRlU3RhbXAuanMnKTtcclxudmFyIGdldFlQaXhlbF9maWxlID0gcmVxdWlyZSgnLi9nZXRZUGl4ZWwuanMnKTsgLy8gUmV0dXJuIHRoZSBZIHBpeGVsIGZvciBhIGdyYXBoIHBvaW50LT5mdW5jdGlvbiBnZXRYUGl4ZWwoKXtcclxuXHJcblxyXG5cclxuLy8gRHJhdyB0aGUgWSB2YWx1ZSB0ZXh0cywgdGV4dCBpbiB2ZXJ0aWNhbCBheGlzXHJcbmZ1bmN0aW9uIGRyYXdfWV92YWx1ZXNfdmVydGljYWwoKXtcclxuXHRcclxuXHJcblxyXG4gIHRoaXMuZHJhd19ZX3ZhbHVlX3RleHQgPSBmdW5jdGlvbih0b29sdGlwcyl7IFxyXG4gIFxyXG4gICAgICAvL3N0YXJ0IGltcG9ydCBWYXJzIGZyb20gY29yZS5qc1xyXG4gICAgICB2YXIgYyA9IGNvcmVfdmFyLmM7IC8vSU1QT1JUIFZBUiB7Y30gZm9tIGNvcmUuanNcclxuXHQgIHZhciB4UGFkZGluZyA9IGNvcmVfdmFyLnhQYWRkaW5nOyAvL0lNUE9SVCBWQVIge3hQQWRkaW5nfSBmcm9tIGNvcmUuanNcclxuXHQgIC8vRU5EICBpbXBvcnQgVmFycyBmcm9tIGNvcmUuanNcclxuXHQgIFxyXG5cdFxyXG5cdCAgYy50ZXh0QWxpZ24gPSBcInJpZ2h0XCJcclxuICAgICAgYy50ZXh0QmFzZWxpbmUgPSBcIm1pZGRsZVwiO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAobmV3IGdldE1heFlfZmlsZSgpLmdldE1heFkyKCkgKyA1MCk7IGkgKz0gNTApIHsgLy9teSBhZGQgeys1MH1cclxuICAgICAgICAgYy5maWxsVGV4dChpLCB4UGFkZGluZyAtIDEwLCBuZXcgZ2V0WVBpeGVsX2ZpbGUoKS5nZXRZUGl4ZWwzKGkpKTsgLy9kbyBub3QgY2hhbmdlIDEwXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGMuc3Ryb2tlU3R5bGUgPSAnI2YwMCc7XHJcblxyXG4gIH0gICAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZHJhd19ZX3ZhbHVlc192ZXJ0aWNhbDsiLCIvL2l0IGRyYXdzIGNoYXJ0IGxpbmVzIFxyXG5cclxudmFyIGNvcmVfdmFyID0gcmVxdWlyZSgnLi9jb3JlLmpzJyk7IC8vSU1QT1JUIFZBUklBQkxFUyB7YywgeFBhZGRpbmcseVBhZGRpbmd9IGZyb20gY29yZS5qc1xyXG52YXIgZ2V0TWF4WV9maWxlID0gcmVxdWlyZSgnLi9nZXRNYXhZLmpzJyk7XHJcbi8vdmFyIGNvbnZlcnREYXRlX2ZpbGUgPSByZXF1aXJlKCcuL2NvbnZlcnREYXRlU3RhbXAuanMnKTtcclxudmFyIGdldFlQaXhlbF9maWxlID0gcmVxdWlyZSgnLi9nZXRZUGl4ZWwuanMnKTsgLy8gUmV0dXJuIHRoZSBZIHBpeGVsIGZvciBhIGdyYXBoIHBvaW50LT5mdW5jdGlvbiBnZXRYUGl4ZWwoKXtcclxudmFyIGdldFhQaXhlbF9maWxlID0gcmVxdWlyZSgnLi9nZXRYUGl4ZWwuanMnKTsgLy8gUmV0dXJuIHRoZSBYIHBpeGVsIGZvciBhIGdyYXBoIHBvaW50LT5mdW5jdGlvbiBnZXRYUGl4ZWwoKXtcclxuXHJcblxyXG4vLyBEcmF3IHRcclxuZnVuY3Rpb24gZHJhd19jaGFydExpbmVzKCl7XHJcblx0XHJcblxyXG5cclxuICAgIHRoaXMuZHJhd19saW5lcyA9IGZ1bmN0aW9uKGpzb24pe1xyXG5cdFx0XHJcbiAgICAgIC8vc3RhcnQgaW1wb3J0IFZhcnMgZnJvbSBjb3JlLmpzKioqKioqKioqXHJcbiAgICAgIHZhciBjID0gY29yZV92YXIuYzsgLy9JTVBPUlQgVkFSIHtjfSBmb20gY29yZS5qc1xyXG5cdCAgLy92YXIgeFBhZGRpbmcgPSBjb3JlX3Zhci54UGFkZGluZzsgLy9JTVBPUlQgVkFSIHt4UEFkZGluZ30gZnJvbSBjb3JlLmpzXHJcblx0ICAvL0VORCAgaW1wb3J0IFZhcnMgZnJvbSBjb3JlLmpzKioqKioqKioqXHJcblx0ICBcclxuXHQgIGMuYmVnaW5QYXRoKCk7XHJcblx0ICBmb3IgKHZhciBpID0gMDsgaSA8IGpzb24ubGVuZ3RoOyBpKyspIHsgLy8gd2FzIGk9MVxyXG5cclxuICAgICAgLy8oZnVuY3Rpb24oaVopIHsgIC8vc2hvb3RlcnMsIG9yIHUgY2FuIGp1c3QgdXNlIHtsZXQgaSA9IDF9IGluIGxvb3AgaW5zdGVhZCBvZiBzaG9vdGVyc1xyXG4gICAgICAvL2FsZXJ0KFwiaVotPiBcIiArIGlaKTtcclxuICAgIFxyXG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBqc29uW2ldLmNvbHVtbnMubGVuZ3RoOyBqKyspIHtcclxuXHQgICAgICAgIChmdW5jdGlvbihpeCwgcCkgeyAgLy9zaG9vdGVycywgb3IgdSBjYW4ganVzdCB1c2Uge2xldCBpID0gMX0gaW4gbG9vcCBpbnN0ZWFkIG9mIHNob290ZXJzIC8vaXggaXMge2l9LCBwIGlzIHtqfSAvL1NIT09URVIgaXMgYSBtdXN0IG90aGVyd2lzZSBpdCBqdW1wcyB0byBsYXN0IGkgYXQgb25jZVxyXG5cdCAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHQgICAgICAgICBcclxuXHRcdFx0ICAgICAvL2FsZXJ0KFwiaXgtPiBcIiArIGl4ICsgXCIgai0+IFwiICsgcCk7XHJcblx0XHRcdCBcclxuXHRcdFx0ICAgICAvL01lZ2EgRml4LCBzZXRzIHRoZSBwYXRoIHRvIHN0YXJ0IHBvc2l0aW9uLCBvdXQgb2YgZm9yIGxvb3AgaXQgd2FzIG5vdCB3b3JraW5nXHJcblx0XHRcdCAgICAgLy9zZXRzIHRoZSBwYXRoIHRvIHN0YXJ0IHBvc2l0aW9uIGluIGEgdmVyeSBmaXJzdCBpdGVyYXRpb24gXHJcblx0XHRcdCAgICAgaWYocCA9PSAwICl7IFxyXG5cdFx0XHRcdFx0IGMuYmVnaW5QYXRoKCk7IC8vbWVnYSBmaXggdG8gZHJhdyBkaWZmZXJlbnQgY29sb3JzcyBsaW5lc1xyXG5cdFx0XHRcdCAgICAgYy5tb3ZlVG8obmV3IGdldFhQaXhlbF9maWxlKCkuZ2V0WFBpeGVsMyhqc29uW2l4XS5jb2x1bW5zWzBdLlgpLCBuZXcgZ2V0WVBpeGVsX2ZpbGUoKS5nZXRZUGl4ZWwzKGpzb25baXhdLmNvbHVtbnNbMF0uWSkpO1xyXG5cdFx0XHQgICAgIH1cclxuXHRcdFx0IFxyXG5cdFx0XHQgXHJcblx0ICAgICAgICAgICAgIC8vYWxlcnQoaXgpO1xyXG5cdFx0ICAgICAgICAgLy9hbGVydChqc29uLnZhbHVlc1tpeF0uWCArIFwiICBhbmQgXCIgKyAganNvbi52YWx1ZXNbaXhdLlkgKyBcIiBpLT5cIiArIGl4KTtcclxuXHRcdFx0IFxyXG5cdFx0XHQgICAgIC8vYWxsIG90aGVyIGl0ZXJhdGlvbnMgc3RhcnRpbmcgZnJvbSAybmQsIGRyYXcgbGluZXMgd2l0aCB7Yy5saW5lVG99XHJcblx0XHRcdFx0IFxyXG5cdFx0ICAgICAgICAgYy5saW5lVG8obmV3IGdldFhQaXhlbF9maWxlKCkuZ2V0WFBpeGVsMyhqc29uW2l4XS5jb2x1bW5zW3BdLlgpLCBuZXcgZ2V0WVBpeGVsX2ZpbGUoKS5nZXRZUGl4ZWwzKGpzb25baXhdLmNvbHVtbnNbcF0uWSkpOyBcclxuXHRcdFx0XHQgYy5zdHJva2VTdHlsZSA9IGpzb25baXhdLmNvbG9ycyA7XHJcblx0XHRcdFx0IFxyXG5cdFx0ICAgICAgICAgYy5zdHJva2UoKTsgLy9zdHJva2UoKSBtZXRob2QgdG8gYWN0dWFsbHkgZHJhdyB0aGUgcGF0aCBvbiB0aGUgY2FudmFzLlxyXG5cdFx0XHRcdCBcclxuXHRcdCAgICAgICAgIC8vYy5jbGVhclJlY3QoMCwwLGdyYXBoLndpZHRoLGdyYXBoLmhlaWdodCk7XHJcblx0XHQgICAgICAgICAvL2RyYXdDaGFydCgpO1xyXG5cdFx0ICAgICAgICAgLy9zZXRUaW1lb3V0KGdldERyYXdlcihpKSwgMTAwMCk7XHJcblx0XHQgICAgICAgICAvL3NldFRpbWVvdXQoZ2V0RHJhd2VyKGkpLCAxMDAwKTtcclxuXHRcdCAgICAgXHJcblx0XHRcdCBcclxuXHRcdFx0ICAgICAvL3RpbWVYID0gaXggKiBwO1xyXG5cdFx0XHQgXHJcblx0ICAgICAgICB9LCAvKml4Ki8xICogNTAwKTtcclxuXHQgICAgfSkoaSwgaik7IC8vIGVuZCBzaG9vdGVycyBcclxuXHJcblxyXG4gICAgICAgIC8vYy5saW5lVG8oZ2V0WFBpeGVsKGpzb24udmFsdWVzW2ldLlgpLCBnZXRZUGl4ZWwoanNvbi52YWx1ZXNbaV0uWSkpO1xyXG4gICAgICAgIH1cclxuICAgICAvL30pKGkpOyAvLyBlbmQgc2hvb3RlcnMgXHJcbiAgICB9XHJcblxyXG5cdC8vZHJhdyBcIkZvbGxvd2VycyB0ZXh0XCJcclxuICAgIGMuZm9udCA9IFwiMjBweCBHZW9yZ2lhXCI7XHJcbiAgICBjLmZpbGxUZXh0KFwiRm9sbG93ZXJzXCIsIDEzMCwgMjApO1xyXG4gIH0gICAgXHJcbiAgXHJcbiAgXHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRyYXdfY2hhcnRMaW5lczsiLCJ2YXIganNvbl92YXIgPSByZXF1aXJlKCcuL2NvcmUuanMnKTsgLy9JTVBPUlQgVkFSSUFCTEUge2pzb259XHJcblxyXG5mdW5jdGlvbiBnZXRNYXhYKCl7XHJcblx0XHJcbiAgLy90aGlzLmNvb3JkaW5hdGVzU2V0ID1cdFwiaXQgaXMgdGVzdCwgQ29tbW9uSlMgd29ya3NcIixcclxuXHJcblx0XHJcbiAgdGhpcy5nZXRNYXhYID0gZnVuY3Rpb24oKXtcclxuXHQgIC8vIFJldHVybnMgdGhlIG1heCBYIHZhbHVlIGluIG91ciBqc29uIGxpc3QhXHJcblx0IHZhciBqc29uID0ganNvbl92YXIuanNvbjtcclxuICAgICAgdmFyIG1heCA9IDA7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwganNvbi5sZW5ndGg7IGkrKykge1xyXG5cdFx0IGZvciAodmFyIGogPSAwOyBqIDwganNvbltpXS5jb2x1bW5zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGpzb25baV0uY29sdW1uc1tqXS5YID4gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgIG1heCA9IGpzb25baV0uY29sdW1uc1tqXS5YO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHQgIH1cclxuICAgIC8vIG9taXRlZFxyXG4gICAgLy9tYXggKz0gMTAgLSBtYXggJSAxMDtcclxuXHQvL2FsZXJ0KFwibWF4IFwiICsgbWF4KVxyXG4gICAgcmV0dXJuIG1heDtcclxuXHJcbiAgfSAgICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnZXRNYXhYOyIsInZhciBqc29uX3ZhciA9IHJlcXVpcmUoJy4vY29yZS5qcycpOyAvL0lNUE9SVCBWQVJJQUJMRSB7anNvbn1cclxuXHJcbmZ1bmN0aW9uIGdldE1heFkoKXtcclxuXHRcclxuICAvL3RoaXMuY29vcmRpbmF0ZXNTZXQgPVx0XCJpdCBpcyB0ZXN0LCBDb21tb25KUyB3b3Jrc1wiLFxyXG5cclxuXHRcclxuICB0aGlzLmdldE1heFkyID0gZnVuY3Rpb24oKXtcclxuXHQgIHZhciBtYXggPSAwO1xyXG5cdCAgdmFyIGpzb24gPSBqc29uX3Zhci5qc29uO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGpzb24ubGVuZ3RoOyBpKyspIHtcclxuXHQgICAgZm9yICh2YXIgaiA9IDA7IGogPCBqc29uW2ldLmNvbHVtbnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgaWYgKGpzb25baV0uY29sdW1uc1tqXS5ZID4gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBtYXggPSBqc29uW2ldLmNvbHVtbnNbal0uWTtcclxuICAgICAgICAgICAgfVxyXG5cdCAgICB9XHJcbiAgICB9XHJcblx0Ly9hbGVydChcIm1heC0+IFwiICsgbWF4KTtcclxuICAgIG1heCArPSAxMCAtIG1heCAlIDEwO1xyXG4gICAgcmV0dXJuIG1heDtcclxuICB9ICAgIFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGdldE1heFk7IiwidmFyIGdldE1heFhfZmlsZSA9IHJlcXVpcmUoJy4vZ2V0TWF4WC5qcycpO1xyXG52YXIgWFBfdmFyID0gcmVxdWlyZSgnLi9jb3JlLmpzJyk7IC8vSU1QT1JUIFZBUklBQkxFIHt4UGFkZGluZ31cclxuXHJcbi8vIFJldHVybiB0aGUgWCBwaXhlbCBmb3IgYSBncmFwaCBwb2ludFxyXG5mdW5jdGlvbiBnZXRYUGl4ZWwoKXtcclxuXHRcclxuICAvL3RoaXMuY29vcmRpbmF0ZXNTZXQgPVx0XCJpdCBpcyB0ZXN0LCBDb21tb25KUyB3b3Jrc1wiLFxyXG5cclxuICB0aGlzLmdldFhQaXhlbDMgPSBmdW5jdGlvbih2YWwpe1xyXG5cdCAgdmFyIGdldE1heFggPSBuZXcgZ2V0TWF4WF9maWxlKCk7IC8vTW9kdWxlXHJcblx0ICBcclxuICAgICAvLyBSZXR1cm4gdGhlIHggcGl4ZWwgZm9yIGEgZ3JhcGggcG9pbnRcclxuICAgIC8vIHVzZXMgdGhlIGdldE1heFgoKSBmdW5jdGlvblxyXG4gICAgcmV0dXJuICgoZ3JhcGgud2lkdGggLSBYUF92YXIueFBhZGRpbmcpIC8gKGdldE1heFguZ2V0TWF4WCgpICsgMSkpICogdmFsICsgKFhQX3Zhci54UGFkZGluZyAqIDEuNSk7XHJcbiAgICAvLyB3YXNcclxuICAgIC8vcmV0dXJuICgoZ3JhcGgud2lkdGggLSB4UGFkZGluZykgLyBnZXRNYXhYKCkpICogdmFsICsgKHhQYWRkaW5nICogMS41KTtcclxuICB9XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBnZXRYUGl4ZWw7IiwidmFyIGdldE1heFlfZmlsZSA9IHJlcXVpcmUoJy4vZ2V0TWF4WS5qcycpO1xyXG52YXIgWFBfdmFyID0gcmVxdWlyZSgnLi9jb3JlLmpzJyk7IC8vSU1QT1JUIFZBUklBQkxFIHt4UGFkZGluZ31cclxuLy9pbXBvcnQge3hQYWRkaW5nfSBmcm9tICcuL2NvcmUnO1xyXG5cclxuLy8gUmV0dXJuIHRoZSB5IHBpeGVsIGZvciBhIGdyYXBoIHBvaW50XHJcbmZ1bmN0aW9uIGdldFlQaXhlbCgpe1xyXG5cdFxyXG5cclxuICB0aGlzLmdldFlQaXhlbDMgPSBmdW5jdGlvbih2YWwpe1xyXG4gICAgICB2YXIgZ2V0TWF4WSA9IG5ldyBnZXRNYXhZX2ZpbGUoKTsgLy9Nb2R1bGVcclxuXHQgIFxyXG4gICAgICAvLyB1c2VzIHRoZSBnZXRNYXhYKCkgZnVuY3Rpb25cclxuICAgICAgcmV0dXJuIGdyYXBoLmhlaWdodCAtICgoKGdyYXBoLmhlaWdodCAtIFhQX3Zhci55UGFkZGluZykgLyAoZ2V0TWF4WS5nZXRNYXhZMigpICsgNTApKSAqIHZhbCkgLSBYUF92YXIueVBhZGRpbmc7IC8vbXkgYWRkIHsrNTB9XHJcbiAgICBcclxuICB9XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBnZXRZUGl4ZWw7IiwidmFyIGNvcmVfdmFyID0gcmVxdWlyZSgnLi9jb3JlLmpzJyk7IC8vSU1QT1JUIFZBUklBQkxFUyB7YywgeFBhZGRpbmcseVBhZGRpbmd9IGZyb20gY29yZS5qc1xyXG4vL3ZhciBnZXRNYXhZX2ZpbGUgPSByZXF1aXJlKCcuL2dldE1heFkuanMnKTtcclxuLy92YXIgY29udmVydERhdGVfZmlsZSA9IHJlcXVpcmUoJy4vY29udmVydERhdGVTdGFtcC5qcycpO1xyXG52YXIgZ2V0WVBpeGVsX2ZpbGUgPSByZXF1aXJlKCcuL2dldFlQaXhlbC5qcycpOyAvLyBSZXR1cm4gdGhlIFkgcGl4ZWwgZm9yIGEgZ3JhcGggcG9pbnQtPmZ1bmN0aW9uIGdldFhQaXhlbCgpe1xyXG52YXIgZ2V0WFBpeGVsX2ZpbGUgPSByZXF1aXJlKCcuL2dldFhQaXhlbC5qcycpOyAvLyBSZXR1cm4gdGhlIFggcGl4ZWwgZm9yIGEgZ3JhcGggcG9pbnQtPmZ1bmN0aW9uIGdldFhQaXhlbCgpe1xyXG52YXIgY29udmVydERhdGVfZmlsZSA9IHJlcXVpcmUoJy4vY29udmVydERhdGVTdGFtcC5qcycpO1xyXG5cclxuXHJcbi8vc2hvd3MgdG9vbHRpcCBvbk1vdXNlIG92ZXJcclxuZnVuY3Rpb24gc2hvd1Rvb2x0aXBfb25Nb3VzZU92ZXIoKXtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHRcclxuXHJcblxyXG4gICAgdGhpcy5kaXNwYWx5VG9vbHRpcHMgPSBmdW5jdGlvbih0b29seil7ICAgLy9hcmdzKHRvb3BsaXBzIGFycmF5KVxyXG4gICAgICAvLyByZXF1ZXN0IG1vdXNlbW92ZSBldmVudHNcclxuICAgICAgJChcIiNncmFwaFwiKS5tb3VzZW1vdmUoZnVuY3Rpb24gKGUpIHtcclxuXHRcdCAgdmFyIG9uTW91c2VPdmVyX2ZpbGUgPSBuZXcgb25Nb3VzZU92ZXIoKTsvL3VzZXMgb3RoZXIgbW9kdWxlIGluIHRoaXMgdmVyeSBmaWxlXHJcbiAgICAgICAgICBvbk1vdXNlT3Zlcl9maWxlLmhhbmRsZU1vdXNlTW92ZUFjdGlvbihlLCB0b29seik7IC8vYXJncyhtb3VzZSBldmVudCwgdG9vcGxpcHMgYXJyYXkpXHJcbiAgICAgIH0pO1xyXG5cclxuICB9ICBcclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgXHJcbiAgXHJcbmZ1bmN0aW9uIG9uTW91c2VPdmVyKCl7XHJcblx0XHJcbiAgICB0aGlzLmhhbmRsZU1vdXNlTW92ZUFjdGlvbiA9IGZ1bmN0aW9uKGUsIHRvb2x0aXBzKXsgLy9hcmdzKG1vdXNlIGV2ZW50LCB0b29wbGlwcyBhcnJheSlcclxuXHRcdFxyXG5cdCAgICAgLy9zdGFydCBpbXBvcnQgVmFycyBmcm9tIGNvcmUuanMqKioqKioqKioqKipcclxuICAgICAgICAgdmFyIGMgPSBjb3JlX3Zhci5jOyAvL0lNUE9SVCBWQVIge2N9IGZvbSBjb3JlLmpzXHJcblx0ICAgICB2YXIgb2Zmc2V0WCA9IGNvcmVfdmFyLm9mZnNldFg7IC8vSU1QT1JUIFZBUiB7b2Zmc2V0WH0gZnJvbSBjb3JlLmpzXHJcblx0XHQgdmFyIG9mZnNldFkgPSBjb3JlX3Zhci5vZmZzZXRZOyAvL0lNUE9SVCBWQVIge29mZnNldFh9IGZyb20gY29yZS5qc1xyXG5cdFx0IHZhciB0aXBDYW52YXMgPSBjb3JlX3Zhci50aXBDYW52YXNfMjsgLy9JTVBPUlQgVkFSIHt0aXBDYW52YXMufSBmcm9tIGNvcmUuanNcclxuXHRcdCB2YXIgdGlwQ3R4ID0gY29yZV92YXIudGlwQ3R4OyAvL0lNUE9SVCBWQVIge3RpcENhbnZhcy59IGZyb20gY29yZS5qc1xyXG5cdCAgICAgLy9FTkQgIGltcG9ydCBWYXJzIGZyb20gY29yZS5qcyoqKioqKioqKioqKipcclxuXHRcdCBcclxuXHRcdCAvL2FsZXJ0KFwib2ZmIFwiICsgb2Zmc2V0WSk7XHJcblx0XHQgbW91c2VYID0gcGFyc2VJbnQoZS5jbGllbnRYIC0gb2Zmc2V0WCk7XHJcbiAgICAgICAgIG1vdXNlWSA9IHBhcnNlSW50KGUuY2xpZW50WSAtIG9mZnNldFkpOyBcclxuXHJcbiAgICAvLyBQdXQgeW91ciBtb3VzZW1vdmUgc3R1ZmYgaGVyZVxyXG4gICAgdmFyIGhpdCA9IGZhbHNlO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b29sdGlwcy5sZW5ndGg7IGkrKykgeyAvL2FsZXJ0KHRvb2x0aXBzLmxlbmd0aCk7XHJcbiAgICAgICAgdmFyIGRvdCA9IHRvb2x0aXBzW2ldO1xyXG4gICAgICAgIHZhciBkeCA9IG1vdXNlWCAtIGRvdC54O1xyXG4gICAgICAgIHZhciBkeSA9IG1vdXNlWSAtIGRvdC55OyBcclxuXHRcdC8vYWxlcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG4gICAgICAgIGlmIChkeCAqIGR4ICsgZHkgKiBkeSA8IHRvb2x0aXBzW2ldLnJYcikge1xyXG5cdFx0XHRcclxuXHRcdFx0Ly9NaW5lXHJcblx0XHRcdCQoXCIjdGlwXCIpLnNob3coMzAwKTsgLy9zaG93IHRvb2x0aXAsIGJ5IGRlZmF1bHQgaW4gY3NzOiBkaXNwbGF5OiBub25lLiBJcyBtYWRlIHRvIGZpeCBvdmVybGFwaW5nIGFuIGVtcHR5IHRvb2x0aXBcclxuXHRcdFx0XHJcbiAgICAgICAgICAgIHRpcENhbnZhcy5zdHlsZS5sZWZ0ID0gKHRvb2x0aXBzW2ldLngpICsgXCJweFwiOyAvL3Rvb2x0aXAgbWFyZ2luIGxlZnRcclxuICAgICAgICAgICAgdGlwQ2FudmFzLnN0eWxlLnRvcCA9ICh0b29sdGlwc1tpXS55IC0gNDApICsgXCJweFwiOyAgLy90b29sdGlwIG1hcmdpbiBib3R0b21cclxuICAgICAgICAgICAgdGlwQ3R4LmNsZWFyUmVjdCgwLCAwLCB0aXBDYW52YXMud2lkdGgsIHRpcENhbnZhcy5oZWlnaHQgKTsgLy9jbGVhclJlY3QobWFyZ2luTGVmdCwgd2lkdGgsIGhlaWdodClcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICB0aXBDdHgucmVjdCgwLDAsdGlwQ2FudmFzLndpZHRoLHRpcENhbnZhcy5oZWlnaHQpO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly9kZWZpbmUgdG9vbHRpcCB0ZXh0XHJcblx0XHRcdHZhciB0b29sVGlwVGV4dF9kYXRlID0gbmV3IGNvbnZlcnREYXRlX2ZpbGUoKS5mdW5jdF9jb252ZXJ0X2RhdGVTdGFtcCh0b29sdGlwc1tpXS5kYXRlWikgOyAvL2NvbnZlcnRzIGRhdGVVbml4IHRvIG5vcm1hbFxyXG5cdFx0XHQvL2FsZXJ0KHRvb2xUaXBUZXh0X2RhdGUpO1xyXG4gICAgICAgICAgICB2YXIgdG9vbFRpcFRleHRfdGV4dCA9IHRvb2x0aXBzW2ldLnRpcCArIFwiIFwiICsgdG9vbHRpcHNbaV0uc3RhdHVzIDsgIC8vZGVmaW5lcyB0aXAgKyBzdGF0dXMsIGkuZSBcIjQwIExlZnRcIlxyXG4gICAgICAgICAgICBpZih0b29sdGlwc1tpXS5zdGF0dXMgPT0gXCJKb2luZWRcIil7XHJcblx0XHRcdFx0dGV4dGNvbG9ycyA9IFwiZ3JlZW5cIjtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0ZXh0Y29sb3JzID0gXCJyZWRcIjtcclxuXHRcdFx0fVx0XHRcdFx0XHJcblx0XHRcdFxyXG5cdFx0XHR0aXBDdHguZmlsbFN0eWxlID0gXCJibGFja1wiOyAvL3NldCBpbml0aWFsIHRleHQgY29sb3JzIHRvIGJsYWNrXHJcblx0XHRcdFxyXG5cdFx0XHQvL2luIG1vYmlsZSBvbmx5LiBIZXJlIHdlIHNwZWNpZnkgZm9uci1zaXplIGFuZCB0ZXh0IHBhZGRpbmdzIGZvciBtb2JpbGUgZGV2aWNlc1xyXG5cdFx0XHRpZihzY3JlZW4ud2lkdGggPD0gNjQwKXsgXHJcblx0XHRcdCAgICB0aXBDdHguZm9udCA9IFwiNDVweCBBcmlhbFwiOyAvL3NldCBmb250IHNpemVcclxuXHRcdFx0XHR0aXBDdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjsgLy9zZXQgdGV4dCB0byBjZW50ZXIsIGluIG9yZGVyIHRvIGNlbnRlciBob3JpeiwgdGhlcmUgbXVzdCBiZSAxNTAgaW4gLmZpbGxUZXh0KHRleHQsIDE1MCwgcGFkZGluZ1RvcCkgLy8gMTUwIGlzIHRoZSBhbmNob3IgcG9pbnRcclxuXHRcdFx0XHR0aXBDdHguZmlsbFRleHQoLyokKGRvdC50aXApLnZhbCgpKi90b29sVGlwVGV4dF9kYXRlLCAxNTAsIDY1KTsgLy8odGV4dCwgcGFkZGluZ0xlZnQsIHBhZGRpbmdUb3ApICAvLyBUb29sdGlwIERhdGVcclxuXHRcdFx0XHQvL3RpcEN0eC5maWxsVGV4dChcIl9fX19fX1wiLCAyNSwgNzUpO1xyXG5cdFx0XHRcdHRpcEN0eC5maWxsU3R5bGUgPSB0ZXh0Y29sb3JzOyAvL3NldCB0ZXh0IGNvbG9yc1xyXG5cdFx0XHRcdHRpcEN0eC5mb250ID0gXCI2MHB4IEFyaWFsXCI7IC8vc2V0IGZvbnQgc2l6ZVxyXG5cdFx0XHRcdHRpcEN0eC5maWxsVGV4dCh0b29sVGlwVGV4dF90ZXh0LCAxNTAsIDEzNSk7ICAvL1Rvb2x0aXAgdGV4dCwgaS5lIFwiNDAgTGVmdFwiXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly9kZXNrdG9wXHJcblx0XHRcdFx0dGlwQ3R4LmZvbnQgPSBcIjQwcHggQXJpYWxcIjsgLy9zZXQgZm9udCBzaXplXHJcblx0XHRcdFx0dGlwQ3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7IC8vc2V0IHRleHQgdG8gY2VudGVyLCBpbiBvcmRlciB0byBjZW50ZXIgaG9yaXosIHRoZXJlIG11c3QgYmUgMTUwIGluIC5maWxsVGV4dCh0ZXh0LCAxNTAsIHBhZGRpbmdUb3ApIC8vIDE1MCBpcyB0aGUgYW5jaG9yIHBvaW50XHJcbiAgICAgICAgICAgICAgICB0aXBDdHguZmlsbFRleHQoLyokKGRvdC50aXApLnZhbCgpKi90b29sVGlwVGV4dF9kYXRlLCAxNTksIDQ1KTsgLy8odGV4dCwgcGFkZGluZ0xlZnQsIHBhZGRpbmdUb3ApKHdhcyA0NSwgNDUpXHJcblx0XHRcdFx0Ly90aXBDdHguZmlsbFRleHQoXCJfX19fX19fX19fX19fX19fX19fX1wiLCAxLCA1MCk7XHJcblx0XHRcdFx0dGlwQ3R4LmZpbGxTdHlsZSA9IHRleHRjb2xvcnM7IC8vc2V0IHRleHQgY29sb3JzXHJcblx0XHRcdFx0dGlwQ3R4LmZpbGxUZXh0KHRvb2xUaXBUZXh0X3RleHQsIDE1MCwgMTA1KTsgLy9Ub29sdGlwIHRleHQsIGkuZSBcIjQwIExlZnRcIiAod2FzIDcwLCAxMDUpXHJcblx0XHRcdH1cclxuICAgICAgICAgICAgaGl0ID0gdHJ1ZTtcclxuICAgICAgICB9IC8qZWxzZSB7XHJcblx0XHRcdCQoXCIjdGlwXCIpLmhpZGUoODAwKTtcclxuXHRcdH0qL1xyXG4gICAgfVxyXG4gICAgaWYgKCFoaXQpIHtcclxuICAgICAgICB0aXBDYW52YXMuc3R5bGUubGVmdCA9IFwiLTEwMDBweFwiOyAgLy93YXMgMjAwcHgsIHRoaXMgc29sdXRpb24gZml4ZXMgYnVnIHdoZW4gdG9vbHRpcCBhcHBlYXJzIGluIGxlZnQgZW1wdHkgaWYgbm90IG1vdXNlIG92ZXJlZFxyXG4gICAgfVxyXG5cdH1cclxuXHJcblxyXG5cclxuXHJcbiAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc2hvd1Rvb2x0aXBfb25Nb3VzZU92ZXI7IiwiLy92YXIgY29yZV92YXIgPSByZXF1aXJlKCcuL2NvcmUuanMnKTsgLy9JTVBPUlQgVkFSSUFCTEVTIHtjLCB4UGFkZGluZyx5UGFkZGluZ30gZnJvbSBjb3JlLmpzXHJcbi8vdmFyIGdldE1heFlfZmlsZSA9IHJlcXVpcmUoJy4vZ2V0TWF4WS5qcycpO1xyXG4vL3ZhciBjb252ZXJ0RGF0ZV9maWxlID0gcmVxdWlyZSgnLi9jb252ZXJ0RGF0ZVN0YW1wLmpzJyk7XHJcbi8vdmFyIGdldFlQaXhlbF9maWxlID0gcmVxdWlyZSgnLi9nZXRZUGl4ZWwuanMnKTsgLy8gUmV0dXJuIHRoZSBZIHBpeGVsIGZvciBhIGdyYXBoIHBvaW50LT5mdW5jdGlvbiBnZXRYUGl4ZWwoKXtcclxuLy92YXIgZ2V0WFBpeGVsX2ZpbGUgPSByZXF1aXJlKCcuL2dldFhQaXhlbC5qcycpOyAvLyBSZXR1cm4gdGhlIFggcGl4ZWwgZm9yIGEgZ3JhcGggcG9pbnQtPmZ1bmN0aW9uIGdldFhQaXhlbCgpe1xyXG5cclxuXHJcbi8vIERyYXcgdGhlIFkgdmFsdWUgdGV4dHMsIHRleHQgaW4gdmVydGljYWwgYXhpc1xyXG5mdW5jdGlvbiBzd2l0Y2hEYXlOaWdodE1vZGUoKXtcclxuXHRcclxuXHJcblxyXG4gICAgdGhpcy5zd2l0Y2hNb2RlID0gZnVuY3Rpb24oKXsgXHJcbiAgICAgIC8vc3RhcnQgaW1wb3J0IFZhcnMgZnJvbSBjb3JlLmpzXHJcbiAgICAgIC8vdmFyIGMgPSBjb3JlX3Zhci5jOyAvL0lNUE9SVCBWQVIge2N9IGZvbSBjb3JlLmpzXHJcblx0ICAvL3ZhciB4UGFkZGluZyA9IGNvcmVfdmFyLnhQYWRkaW5nOyAvL0lNUE9SVCBWQVIge3hQQWRkaW5nfSBmcm9tIGNvcmUuanNcclxuXHQgIC8vRU5EICBpbXBvcnQgVmFycyBmcm9tIGNvcmUuanNcclxuXHQgIFxyXG5cdCAgJChcIiNjaGFuZ2VNb2RlXCIpLmNsaWNrKGZ1bmN0aW9uKCkgeyBcclxuXHJcbiAgICAgICAgaWYoJChcIiNjaGFuZ2VNb2RlXCIpLmh0bWwoKSA9PSBcIk5pZ2h0IG1vZGVcIil7XHJcblx0XHQgICQoXCIjY2hhbmdlTW9kZVwiKS5odG1sKFwiRGF5IG1vZGVcIik7XHJcblx0XHQgICQoXCJib2R5XCIpLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgXCJncmV5XCIpO1xyXG5cdCAgICB9IGVsc2Uge1xyXG5cdFx0ICAkKFwiI2NoYW5nZU1vZGVcIikuaHRtbChcIk5pZ2h0IG1vZGVcIik7XHJcblx0XHQgICQoXCJib2R5XCIpLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgXCJ3aGl0ZVwiKTtcclxuXHQgICAgfVxyXG4gICAgIH0pO1xyXG5cclxuXHJcbiAgfSAgICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzd2l0Y2hEYXlOaWdodE1vZGU7IiwiZnVuY3Rpb24gdGVzdCgpe1xyXG5cdFxyXG4gIHRoaXMuY29vcmRpbmF0ZXNTZXQgPVx0XCJpdCBpcyB0ZXN0LCBDb21tb25KUyB3b3Jrc1wiLFxyXG5cclxuXHRcclxuICB0aGlzLmxvYWRFeGFtcGxlQ29vcmRpbmF0ZXMgPSBmdW5jdGlvbigpe1xyXG5cdCAgLy8kKFwiI2Nvb3Jkc0lucHV0XCIpLnZhbCh0aGlzLmNvb3JkaW5hdGVzU2V0KTsgLy8gIHdhcyBcXG4gIGluIHRoZSAgZW5kIFxyXG5cdCAgYWxlcnQodGhpcy5jb29yZGluYXRlc1NldCk7XHJcbiAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB0ZXN0OyJdfQ==
