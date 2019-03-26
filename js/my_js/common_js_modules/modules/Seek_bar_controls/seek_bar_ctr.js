//it detects changes over sliders for chart1 and chart2 and html() <span> with relevant sliders values
//var json_var = require('./core.js'); //IMPORT VARIABLE {json}

function seek_bar_ctr(){
	
  //this.coordinatesSet =	"it is test, CommonJS works",

	
  this.getSBar_values = function(){ 
  
    //iteration over seekbars for the 1st chart
	for (var i = 0; i < $(".slider").length; i++) {
		(function(ix) { //shooters
	        $("#first_chart" + ix).change(function(){  		
                $("#first_demo" + ix).html(this.value);  //var t = $("#demo" + i); alert(t);
            });
		})(i); //end shooters
	}
	
	
	
	  //iteration over seekbars for the 2nd chart
	for (var j = 0; j < $(".slider2").length; j++) {
		(function(ix) { //shooters
	        $("#second_chart" + ix).change(function(){  		
                $("#second_demo" + ix).html(this.value);  //var t = $("#demo" + i); alert(t);
            });
		})(j); //end shooters
	}
	
	
	
	
	
  }    
}

module.exports = seek_bar_ctr;