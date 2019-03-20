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