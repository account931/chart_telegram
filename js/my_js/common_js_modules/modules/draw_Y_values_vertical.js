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