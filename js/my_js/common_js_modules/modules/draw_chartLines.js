//it draws chart lines 

var core_var = require('./core.js'); //IMPORT VARIABLES {c, xPadding,yPadding} from core.js
var getMaxY_file = require('./getMaxY.js');
//var convertDate_file = require('./convertDateStamp.js');
var getYPixel_file = require('./getYPixel.js'); // Return the Y pixel for a graph point->function getXPixel(){
var getXPixel_file = require('./getXPixel.js'); // Return the X pixel for a graph point->function getXPixel(){


// Draw t
function draw_chartLines(){
	


    this.draw_lines = function(json){
		
      //start import Vars from core.js*********
      var c = core_var.c; //IMPORT VAR {c} fom core.js
	  //var xPadding = core_var.xPadding; //IMPORT VAR {xPAdding} from core.js
	  //END  import Vars from core.js*********
	  
	  c.beginPath();
	  for (var i = 0; i < json.length; i++) { // was i=1

      //(function(iZ) {  //shooters, or u can just use {let i = 1} in loop instead of shooters
      //alert("iZ-> " + iZ);
    
          for (var j = 0; j < json[i].columns.length; j++) {
	        (function(ix, p) {  //shooters, or u can just use {let i = 1} in loop instead of shooters //ix is {i}, p is {j} //SHOOTER is a must otherwise it jumps to last i at once
	           setTimeout(function() {
	         
			     //alert("ix-> " + ix + " j-> " + p);
			 
			     //Mega Fix, sets the path to start position, out of for loop it was not working
			     //sets the path to start position in a very first iteration 
			     if(p == 0 ){ 
					 c.beginPath(); //mega fix to draw different colorss lines
				     c.moveTo(new getXPixel_file().getXPixel3(json[ix].columns[0].X), new getYPixel_file().getYPixel3(json[ix].columns[0].Y));
			     }
			 
			 
	             //alert(ix);
		         //alert(json.values[ix].X + "  and " +  json.values[ix].Y + " i->" + ix);
			 
			     //all other iterations starting from 2nd, draw lines with {c.lineTo}
				 
		         c.lineTo(new getXPixel_file().getXPixel3(json[ix].columns[p].X), new getYPixel_file().getYPixel3(json[ix].columns[p].Y)); 
				 c.strokeStyle = json[ix].colors ;
				 
		         c.stroke(); //stroke() method to actually draw the path on the canvas.
				 
		         //c.clearRect(0,0,graph.width,graph.height);
		         //drawChart();
		         //setTimeout(getDrawer(i), 1000);
		         //setTimeout(getDrawer(i), 1000);
		     
			 
			     //timeX = ix * p;
			 
	        }, /*ix*/1 * 500);
	    })(i, j); // end shooters 


        //c.lineTo(getXPixel(json.values[i].X), getYPixel(json.values[i].Y));
        }
     //})(i); // end shooters 
    }

	//draw "Followers text"
    c.font = "20px Georgia";
    c.fillText("Followers", 130, 20);
  }    
  
  

}

module.exports = draw_chartLines;