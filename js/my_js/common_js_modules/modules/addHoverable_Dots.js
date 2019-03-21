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