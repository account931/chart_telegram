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