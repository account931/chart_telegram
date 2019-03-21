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