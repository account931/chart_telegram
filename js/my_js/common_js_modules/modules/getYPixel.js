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