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