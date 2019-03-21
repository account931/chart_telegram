//var core_var = require('./core.js'); //IMPORT VARIABLES {c, xPadding,yPadding} from core.js
//var getMaxY_file = require('./getMaxY.js');
//var convertDate_file = require('./convertDateStamp.js');
//var getYPixel_file = require('./getYPixel.js'); // Return the Y pixel for a graph point->function getXPixel(){
//var getXPixel_file = require('./getXPixel.js'); // Return the X pixel for a graph point->function getXPixel(){


// Draw the Y value texts, text in vertical axis
function switchDayNightMode(){
	


    this.switchMode = function(){ 
      //start import Vars from core.js
      //var c = core_var.c; //IMPORT VAR {c} fom core.js
	  //var xPadding = core_var.xPadding; //IMPORT VAR {xPAdding} from core.js
	  //END  import Vars from core.js
	  
	  $("#changeMode").click(function() { 

        if($("#changeMode").html() == "Night mode"){
		  $("#changeMode").html("Day mode");
		  $("body").css("background-color", "grey");
	    } else {
		  $("#changeMode").html("Night mode");
		  $("body").css("background-color", "white");
	    }
     });


  }    
}

module.exports = switchDayNightMode;