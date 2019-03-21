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