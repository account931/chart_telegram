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



},{"./modules/core.js":2,"./modules/test.js":8}],2:[function(require,module,exports){
var toolTip_file = require('./creates_tooltip_array_from_json.js');


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
	  
	var json; 
	exports.json = this.json; //exports json array (i.e to getMaxX Module)
  
  
	  
	  //alert(this.json[0].names);
	  //canvas with chart
      var graph = document.getElementById("graph");
      var c = graph.getContext("2d");

      //IF NOT IN Mobile, i.e on large screen, use special canvas width recalculation, on mobile left it as was (300x150).
      //U may not use it, but on desktop canvas chart will be too small, only 300x150
      if(screen.width >= 640){ 
          graph.width = window.innerWidth - 320; 
	      graph.height = window.innerHeight - 320;
      }

      

      //canvas with tooltips dot
      var tipCanvas = document.getElementById("tip");
      var tipCtx = tipCanvas.getContext("2d");
	  
	  var canvasOffset = $("#graph").offset();
      var offsetX = canvasOffset.left;
      var offsetY = canvasOffset.top;

      var graph;
	  //var xPadding;
      exports.xPadding = 30; //left padding of scales axis  //EXPORT VARIABLE (i.e to {getXPixel} Module)
      /*var*/ exports.yPadding = 30; //EXPORT VARIABLE (i.e to {getYPixel} Module)
	  
	  //MODULES Part
	  // define tooltips for each json point //adding to array tooltips
	  var createTooltipArray = new toolTip_file();
	  createTooltipArray.createArray(this.json);
	  
	  //console.log(tooltips);

   } //end this.CreateChart
   
   

   
   
   
   
   
   
   
} //end function ALL

module.exports = core;
},{"./creates_tooltip_array_from_json.js":3}],3:[function(require,module,exports){
var getXPixel_file = require('./getXPixel.js');
var getYPixel_file = require('./getYPixel.js');

function creates_tooltip_array_from_json(){


	
  this.createArray = function(json){
	  var getXPixel_file2 = new getXPixel_file(); //Module
	  var getYPixel_file2 = new getYPixel_file(); //Module
	  
	  
      //define tooltips for each json point //adding to array tooltips
      var tooltips = [];

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
      console.log(tooltips);
   }
}

module.exports = creates_tooltip_array_from_json;
},{"./getXPixel.js":6,"./getYPixel.js":7}],4:[function(require,module,exports){
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
},{"./core.js":2}],5:[function(require,module,exports){
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
},{"./core.js":2}],6:[function(require,module,exports){
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
},{"./core.js":2,"./getMaxX.js":4}],7:[function(require,module,exports){
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
},{"./core.js":2,"./getMaxY.js":5}],8:[function(require,module,exports){
function test(){
	
  this.coordinatesSet =	"it is test, CommonJS works",

	
  this.loadExampleCoordinates = function(){
	  //$("#coordsInput").val(this.coordinatesSet); //  was \n  in the  end 
	  alert(this.coordinatesSet);
   }
}

module.exports = test;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tYWluLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9jb3JlLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9jcmVhdGVzX3Rvb2x0aXBfYXJyYXlfZnJvbV9qc29uLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9nZXRNYXhYLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9nZXRNYXhZLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy9nZXRYUGl4ZWwuanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tb2R1bGVzL2dldFlQaXhlbC5qcyIsImpzL215X2pzL2NvbW1vbl9qc19tb2R1bGVzL21vZHVsZXMvdGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXHJcbnZhciB0ZXN0X2ZpbGUgPSByZXF1aXJlKCcuL21vZHVsZXMvdGVzdC5qcycpO1xyXG52YXIgY29yZV9maWxlID0gcmVxdWlyZSgnLi9tb2R1bGVzL2NvcmUuanMnKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAgIC8vdmFyIHRlc3QgPSBuZXcgdGVzdF9maWxlKCk7XHJcblx0Ly90ZXN0LmxvYWRFeGFtcGxlQ29vcmRpbmF0ZXMoKTtcclxuXHRcclxuXHR2YXIgbWFpbiA9IG5ldyBjb3JlX2ZpbGUoKTtcclxuXHRtYWluLmNyZWF0ZUNoYXJ0KCk7XHJcblx0XHJcblxyXG5cdFxyXG5cdFxyXG5cdFxyXG5cdFxyXG5cdFxyXG5cdFxyXG5cdFxyXG5cclxuXHJcblxyXG5cclxuLy8gRU5EIFJFQURZXHJcbn0pO1xyXG5cclxuXHJcbiIsInZhciB0b29sVGlwX2ZpbGUgPSByZXF1aXJlKCcuL2NyZWF0ZXNfdG9vbHRpcF9hcnJheV9mcm9tX2pzb24uanMnKTtcclxuXHJcblxyXG5mdW5jdGlvbiBjb3JlKCl7XHJcbiAgXHJcbiAgLy9Kc29uIGRhdGEgYXJyYXlcclxuICB0aGlzLmpzb24gPVx0W1xyXG4gICAgeyAvL2NoYXJ0IDFcclxuICAgICAgY29sdW1uczogWyAge1g6IDAsWTogNDAsIGRhdGU6IDE1NTEzOTg0MDAgLyppLmUgMS4wMy4yMDE5Ki99LCB7WDogMixZOiAxMzAsIGRhdGU6IDE1NTE0ODQ4MDB9LCB7WDogMyxZOiAyNDQsIGRhdGU6IDE1NTE1NzEyMDB9LCB7WDogNCxZOiAxMjAsIGRhdGU6IDE1NTE2NTc2MDB9LCB7WDogNSxZOiA2MCwgZGF0ZTogMTU1MTc0NDAwMC8qNS4wMy4xOSovfSwge1g6IDYsWTogMTIwLCBkYXRlOiAxNTUxODMwNDAwfSwge1g6IDcsWTogNjksIGRhdGU6IDE1NTE5MTY4MDB9XSxcclxuXHQgIHR5cGVzOiAnbGluZScsXHJcblx0ICBjb2xvcnM6ICcjM0RDMjNGJywgIC8vZ3JlZW5cclxuXHQgIG5hbWVzOiAnbmFtZXNYJ1xyXG5cdH0sXHJcblx0XHJcblx0eyAvL2NoYXJ0IDJcclxuICAgICAgY29sdW1uczogWyAge1g6IDAsWTogMjgsIGRhdGU6IDE1NTEzOTg0MDAgLyppLmUgMS4wMy4yMDE5Ki99LCB7WDogMixZOiA3MCwgZGF0ZTogMTU1MTQ4NDgwMH0sIHtYOiAzLFk6IDg4LCBkYXRlOiAxNTUxNTcxMjAwfSwge1g6IDQsWTogNjIsIGRhdGU6IDE1NTE2NTc2MDB9LCB7WDogNSxZOiA0NSwgZGF0ZTogMTU1MTc0NDAwMC8qNS4wMy4xOSovfSwge1g6IDYsWTogNDAsIGRhdGU6IDE1NTE4MzA0MDB9LCB7WDogNyxZOjQwLCBkYXRlOiAxNTUxOTE2ODAwfV0sXHJcblx0ICB0eXBlczogJ2xpbmUnLFxyXG5cdCAgY29sb3JzOiAnI0YzNEM0NCcsICAvL3JlZFxyXG5cdCAgbmFtZXM6ICduYW1lc1gyJ1xyXG5cdH0sXHJcbiAgXSxcclxuXHJcblx0XHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0XHJcbiAgdGhpcy5jcmVhdGVDaGFydCA9IGZ1bmN0aW9uKCl7XHJcblx0ICBcclxuXHR2YXIganNvbjsgXHJcblx0ZXhwb3J0cy5qc29uID0gdGhpcy5qc29uOyAvL2V4cG9ydHMganNvbiBhcnJheSAoaS5lIHRvIGdldE1heFggTW9kdWxlKVxyXG4gIFxyXG4gIFxyXG5cdCAgXHJcblx0ICAvL2FsZXJ0KHRoaXMuanNvblswXS5uYW1lcyk7XHJcblx0ICAvL2NhbnZhcyB3aXRoIGNoYXJ0XHJcbiAgICAgIHZhciBncmFwaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3JhcGhcIik7XHJcbiAgICAgIHZhciBjID0gZ3JhcGguZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgLy9JRiBOT1QgSU4gTW9iaWxlLCBpLmUgb24gbGFyZ2Ugc2NyZWVuLCB1c2Ugc3BlY2lhbCBjYW52YXMgd2lkdGggcmVjYWxjdWxhdGlvbiwgb24gbW9iaWxlIGxlZnQgaXQgYXMgd2FzICgzMDB4MTUwKS5cclxuICAgICAgLy9VIG1heSBub3QgdXNlIGl0LCBidXQgb24gZGVza3RvcCBjYW52YXMgY2hhcnQgd2lsbCBiZSB0b28gc21hbGwsIG9ubHkgMzAweDE1MFxyXG4gICAgICBpZihzY3JlZW4ud2lkdGggPj0gNjQwKXsgXHJcbiAgICAgICAgICBncmFwaC53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gMzIwOyBcclxuXHQgICAgICBncmFwaC5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSAzMjA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIFxyXG5cclxuICAgICAgLy9jYW52YXMgd2l0aCB0b29sdGlwcyBkb3RcclxuICAgICAgdmFyIHRpcENhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlwXCIpO1xyXG4gICAgICB2YXIgdGlwQ3R4ID0gdGlwQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHQgIFxyXG5cdCAgdmFyIGNhbnZhc09mZnNldCA9ICQoXCIjZ3JhcGhcIikub2Zmc2V0KCk7XHJcbiAgICAgIHZhciBvZmZzZXRYID0gY2FudmFzT2Zmc2V0LmxlZnQ7XHJcbiAgICAgIHZhciBvZmZzZXRZID0gY2FudmFzT2Zmc2V0LnRvcDtcclxuXHJcbiAgICAgIHZhciBncmFwaDtcclxuXHQgIC8vdmFyIHhQYWRkaW5nO1xyXG4gICAgICBleHBvcnRzLnhQYWRkaW5nID0gMzA7IC8vbGVmdCBwYWRkaW5nIG9mIHNjYWxlcyBheGlzICAvL0VYUE9SVCBWQVJJQUJMRSAoaS5lIHRvIHtnZXRYUGl4ZWx9IE1vZHVsZSlcclxuICAgICAgLyp2YXIqLyBleHBvcnRzLnlQYWRkaW5nID0gMzA7IC8vRVhQT1JUIFZBUklBQkxFIChpLmUgdG8ge2dldFlQaXhlbH0gTW9kdWxlKVxyXG5cdCAgXHJcblx0ICAvL01PRFVMRVMgUGFydFxyXG5cdCAgLy8gZGVmaW5lIHRvb2x0aXBzIGZvciBlYWNoIGpzb24gcG9pbnQgLy9hZGRpbmcgdG8gYXJyYXkgdG9vbHRpcHNcclxuXHQgIHZhciBjcmVhdGVUb29sdGlwQXJyYXkgPSBuZXcgdG9vbFRpcF9maWxlKCk7XHJcblx0ICBjcmVhdGVUb29sdGlwQXJyYXkuY3JlYXRlQXJyYXkodGhpcy5qc29uKTtcclxuXHQgIFxyXG5cdCAgLy9jb25zb2xlLmxvZyh0b29sdGlwcyk7XHJcblxyXG4gICB9IC8vZW5kIHRoaXMuQ3JlYXRlQ2hhcnRcclxuICAgXHJcbiAgIFxyXG5cclxuICAgXHJcbiAgIFxyXG4gICBcclxuICAgXHJcbiAgIFxyXG4gICBcclxuICAgXHJcbn0gLy9lbmQgZnVuY3Rpb24gQUxMXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNvcmU7IiwidmFyIGdldFhQaXhlbF9maWxlID0gcmVxdWlyZSgnLi9nZXRYUGl4ZWwuanMnKTtcclxudmFyIGdldFlQaXhlbF9maWxlID0gcmVxdWlyZSgnLi9nZXRZUGl4ZWwuanMnKTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZXNfdG9vbHRpcF9hcnJheV9mcm9tX2pzb24oKXtcclxuXHJcblxyXG5cdFxyXG4gIHRoaXMuY3JlYXRlQXJyYXkgPSBmdW5jdGlvbihqc29uKXtcclxuXHQgIHZhciBnZXRYUGl4ZWxfZmlsZTIgPSBuZXcgZ2V0WFBpeGVsX2ZpbGUoKTsgLy9Nb2R1bGVcclxuXHQgIHZhciBnZXRZUGl4ZWxfZmlsZTIgPSBuZXcgZ2V0WVBpeGVsX2ZpbGUoKTsgLy9Nb2R1bGVcclxuXHQgIFxyXG5cdCAgXHJcbiAgICAgIC8vZGVmaW5lIHRvb2x0aXBzIGZvciBlYWNoIGpzb24gcG9pbnQgLy9hZGRpbmcgdG8gYXJyYXkgdG9vbHRpcHNcclxuICAgICAgdmFyIHRvb2x0aXBzID0gW107XHJcblxyXG4gICAgICAvL2l0IHdvcmtzLCBjcmVhdGVzIGFuIGFycmF5IHdpdGggb2JqZWN0cyBmb3IgdG9vbHRpcHMsIGNyZWF0ZXMgaW4gZm9ybWF0IFt7eDokLCB5OiQsIHJYcjskLCB0aXA6JH0sIHt4OiQsIHk6JCwgclhyOyQsIHRpcDokfV1cclxuICAgICAgLy8oOTAlIGNvcGllZCBmcm9tIHZhcmlhbnQgZm9yIDEgY2hhcnQsIGp1c3QgYWRkZWQgYWRkaXRpb25hbCBpbm5lciBmb3IgbG9vcCB7Zm9yICh2YXIgaiA9IDA7IGogPCBqc29uW2ldLmNvbHVtbnMubGVuZ3RoOyBqKyspfVxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGpzb24ubGVuZ3RoOyBpKyspIHtcclxuXHQgICAgIGZvciAodmFyIGogPSAwOyBqIDwganNvbltpXS5jb2x1bW5zLmxlbmd0aDsgaisrKSB7XHJcblx0ICAgICAgICAgdmFyIHN0YXR1c1g7XHJcblx0XHRcdCAvL2RlZmluZSB2YWx1ZSBmb3Igc3RhdHVzXHJcblx0ICAgICAgICAgaWYoaSAlIDIgIT0wKXtcclxuXHRcdFx0XHQgc3RhdHVzWCA9IFwiTGVmdFwiO1xyXG5cdFx0XHQgfSBlbHNlIHtcclxuXHRcdFx0ICAgICBzdGF0dXNYID1cIkpvaW5lZFwiO1xyXG5cdFx0XHQgfSBcclxuXHQgIFxyXG4gICAgICAgICAgICAgdG9vbHRpcHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgeDogZ2V0WFBpeGVsX2ZpbGUyLmdldFhQaXhlbDMoanNvbltpXS5jb2x1bW5zW2pdLlgpLFxyXG4gICAgICAgICAgICAgICAgIHk6IGdldFlQaXhlbF9maWxlMi5nZXRZUGl4ZWwzKGpzb25baV0uY29sdW1uc1tqXS5ZKSxcclxuICAgICAgICAgICAgICAgICByOiA0LFxyXG4gICAgICAgICAgICAgICAgIHJYcjogMTYsXHJcbiAgICAgICAgICAgICAgICAgY29sb3JzOiBcInJlZFwiLCAvL05PVCBVU0VEPz8/XHJcbiAgICAgICAgICAgICAgICAgdGlwOiBqc29uW2ldLmNvbHVtbnNbal0uWSwgIC8vXCIjdGV4dFwiICsgKGkgKyAxKSAgLy9NZWdhIGVycm9yIHdhcyBoZXJlIC8vdGV4dCBvZiB0b29sdGlwLFxyXG5cdFx0ICAgICAgICAgZGF0ZVo6IGpzb25baV0uY29sdW1uc1tqXS5kYXRlLCAvL1xyXG5cdFx0ICAgICAgICAgc3RhdHVzOiBzdGF0dXNYIC8vIDFzdCBvciAybmQgY2hhcnQuIEpvaW5lZC9MZWZ0XHJcbiAgICAgICAgICAgICB9KTtcclxuXHRcdFx0IFxyXG5cdCAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyh0b29sdGlwcyk7XHJcbiAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVzX3Rvb2x0aXBfYXJyYXlfZnJvbV9qc29uOyIsInZhciBqc29uX3ZhciA9IHJlcXVpcmUoJy4vY29yZS5qcycpOyAvL0lNUE9SVCBWQVJJQUJMRSB7anNvbn1cclxuXHJcbmZ1bmN0aW9uIGdldE1heFgoKXtcclxuXHRcclxuICAvL3RoaXMuY29vcmRpbmF0ZXNTZXQgPVx0XCJpdCBpcyB0ZXN0LCBDb21tb25KUyB3b3Jrc1wiLFxyXG5cclxuXHRcclxuICB0aGlzLmdldE1heFggPSBmdW5jdGlvbigpe1xyXG5cdCAgLy8gUmV0dXJucyB0aGUgbWF4IFggdmFsdWUgaW4gb3VyIGpzb24gbGlzdCFcclxuXHQgdmFyIGpzb24gPSBqc29uX3Zhci5qc29uO1xyXG4gICAgICB2YXIgbWF4ID0gMDtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBqc29uLmxlbmd0aDsgaSsrKSB7XHJcblx0XHQgZm9yICh2YXIgaiA9IDA7IGogPCBqc29uW2ldLmNvbHVtbnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICBpZiAoanNvbltpXS5jb2x1bW5zW2pdLlggPiBtYXgpIHtcclxuICAgICAgICAgICAgICAgICAgbWF4ID0ganNvbltpXS5jb2x1bW5zW2pdLlg7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cdCAgfVxyXG4gICAgLy8gb21pdGVkXHJcbiAgICAvL21heCArPSAxMCAtIG1heCAlIDEwO1xyXG5cdC8vYWxlcnQoXCJtYXggXCIgKyBtYXgpXHJcbiAgICByZXR1cm4gbWF4O1xyXG5cclxuICB9ICAgIFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGdldE1heFg7IiwidmFyIGpzb25fdmFyID0gcmVxdWlyZSgnLi9jb3JlLmpzJyk7IC8vSU1QT1JUIFZBUklBQkxFIHtqc29ufVxyXG5cclxuZnVuY3Rpb24gZ2V0TWF4WSgpe1xyXG5cdFxyXG4gIC8vdGhpcy5jb29yZGluYXRlc1NldCA9XHRcIml0IGlzIHRlc3QsIENvbW1vbkpTIHdvcmtzXCIsXHJcblxyXG5cdFxyXG4gIHRoaXMuZ2V0TWF4WTIgPSBmdW5jdGlvbigpe1xyXG5cdCAgdmFyIG1heCA9IDA7XHJcblx0ICB2YXIganNvbiA9IGpzb25fdmFyLmpzb247XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwganNvbi5sZW5ndGg7IGkrKykge1xyXG5cdCAgICBmb3IgKHZhciBqID0gMDsgaiA8IGpzb25baV0uY29sdW1ucy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBpZiAoanNvbltpXS5jb2x1bW5zW2pdLlkgPiBtYXgpIHtcclxuICAgICAgICAgICAgICAgIG1heCA9IGpzb25baV0uY29sdW1uc1tqXS5ZO1xyXG4gICAgICAgICAgICB9XHJcblx0ICAgIH1cclxuICAgIH1cclxuXHQvL2FsZXJ0KFwibWF4LT4gXCIgKyBtYXgpO1xyXG4gICAgbWF4ICs9IDEwIC0gbWF4ICUgMTA7XHJcbiAgICByZXR1cm4gbWF4O1xyXG4gIH0gICAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2V0TWF4WTsiLCJ2YXIgZ2V0TWF4WF9maWxlID0gcmVxdWlyZSgnLi9nZXRNYXhYLmpzJyk7XHJcbnZhciBYUF92YXIgPSByZXF1aXJlKCcuL2NvcmUuanMnKTsgLy9JTVBPUlQgVkFSSUFCTEUge3hQYWRkaW5nfVxyXG5cclxuLy8gUmV0dXJuIHRoZSBYIHBpeGVsIGZvciBhIGdyYXBoIHBvaW50XHJcbmZ1bmN0aW9uIGdldFhQaXhlbCgpe1xyXG5cdFxyXG4gIC8vdGhpcy5jb29yZGluYXRlc1NldCA9XHRcIml0IGlzIHRlc3QsIENvbW1vbkpTIHdvcmtzXCIsXHJcblxyXG4gIHRoaXMuZ2V0WFBpeGVsMyA9IGZ1bmN0aW9uKHZhbCl7XHJcblx0ICB2YXIgZ2V0TWF4WCA9IG5ldyBnZXRNYXhYX2ZpbGUoKTsgLy9Nb2R1bGVcclxuXHQgIFxyXG4gICAgIC8vIFJldHVybiB0aGUgeCBwaXhlbCBmb3IgYSBncmFwaCBwb2ludFxyXG4gICAgLy8gdXNlcyB0aGUgZ2V0TWF4WCgpIGZ1bmN0aW9uXHJcbiAgICByZXR1cm4gKChncmFwaC53aWR0aCAtIFhQX3Zhci54UGFkZGluZykgLyAoZ2V0TWF4WC5nZXRNYXhYKCkgKyAxKSkgKiB2YWwgKyAoWFBfdmFyLnhQYWRkaW5nICogMS41KTtcclxuICAgIC8vIHdhc1xyXG4gICAgLy9yZXR1cm4gKChncmFwaC53aWR0aCAtIHhQYWRkaW5nKSAvIGdldE1heFgoKSkgKiB2YWwgKyAoeFBhZGRpbmcgKiAxLjUpO1xyXG4gIH1cclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGdldFhQaXhlbDsiLCJ2YXIgZ2V0TWF4WV9maWxlID0gcmVxdWlyZSgnLi9nZXRNYXhZLmpzJyk7XHJcbnZhciBYUF92YXIgPSByZXF1aXJlKCcuL2NvcmUuanMnKTsgLy9JTVBPUlQgVkFSSUFCTEUge3hQYWRkaW5nfVxyXG4vL2ltcG9ydCB7eFBhZGRpbmd9IGZyb20gJy4vY29yZSc7XHJcblxyXG4vLyBSZXR1cm4gdGhlIHkgcGl4ZWwgZm9yIGEgZ3JhcGggcG9pbnRcclxuZnVuY3Rpb24gZ2V0WVBpeGVsKCl7XHJcblx0XHJcblxyXG4gIHRoaXMuZ2V0WVBpeGVsMyA9IGZ1bmN0aW9uKHZhbCl7XHJcbiAgICAgIHZhciBnZXRNYXhZID0gbmV3IGdldE1heFlfZmlsZSgpOyAvL01vZHVsZVxyXG5cdCAgXHJcbiAgICAgIC8vIHVzZXMgdGhlIGdldE1heFgoKSBmdW5jdGlvblxyXG4gICAgICByZXR1cm4gZ3JhcGguaGVpZ2h0IC0gKCgoZ3JhcGguaGVpZ2h0IC0gWFBfdmFyLnlQYWRkaW5nKSAvIChnZXRNYXhZLmdldE1heFkyKCkgKyA1MCkpICogdmFsKSAtIFhQX3Zhci55UGFkZGluZzsgLy9teSBhZGQgeys1MH1cclxuICAgIFxyXG4gIH1cclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGdldFlQaXhlbDsiLCJmdW5jdGlvbiB0ZXN0KCl7XHJcblx0XHJcbiAgdGhpcy5jb29yZGluYXRlc1NldCA9XHRcIml0IGlzIHRlc3QsIENvbW1vbkpTIHdvcmtzXCIsXHJcblxyXG5cdFxyXG4gIHRoaXMubG9hZEV4YW1wbGVDb29yZGluYXRlcyA9IGZ1bmN0aW9uKCl7XHJcblx0ICAvLyQoXCIjY29vcmRzSW5wdXRcIikudmFsKHRoaXMuY29vcmRpbmF0ZXNTZXQpOyAvLyAgd2FzIFxcbiAgaW4gdGhlICBlbmQgXHJcblx0ICBhbGVydCh0aGlzLmNvb3JkaW5hdGVzU2V0KTtcclxuICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHRlc3Q7Il19
