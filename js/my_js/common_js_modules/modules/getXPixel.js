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