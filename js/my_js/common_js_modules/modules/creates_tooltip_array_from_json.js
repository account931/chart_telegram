var getXPixel_file = require('./getXPixel.js');
var getYPixel_file = require('./getYPixel.js');

function creates_tooltip_array_from_json(){


	
  this.createArray = function(json){
	  var getXPixel_file2 = new getXPixel_file(); //Module
	  var getYPixel_file2 = new getYPixel_file(); //Module
	  
	  //var cv; var g = "ggg";
	  //exports.cv = g ;
	  //alert(g);
      //define tooltips for each json point //adding to array tooltips
	  
      var tooltips = [];
	  //var tooltips4;
	  //exports.tooltips4 = [4,4]; //tooltips;
	  

      //it works, creates an array with objects for tooltips, creates in format [{x:$, y:$, rXr;$, tip:$}, {x:$, y:$, rXr;$, tip:$}]
      //(90% copied from variant for 1 chart, just added additional inner for loop {for (var j = 0; j < json[i].columns.length; j++)}
      for (var i = 0; i < json.length; i++) {
	     for (var j = 0; j < json[i].columns.length; j++) {
	         var statusX;
			 //define value for status
	         if(i % 2 !=0){
				 statusX = "Left";
			 } else {
			     statusX ="Joined";
			 } 
	  
             tooltips.push({
                 x: getXPixel_file2.getXPixel3(json[i].columns[j].X),
                 y: getYPixel_file2.getYPixel3(json[i].columns[j].Y),
                 r: 4,
                 rXr: 16,
                 colors: "red", //NOT USED???
                 tip: json[i].columns[j].Y,  //"#text" + (i + 1)  //Mega error was here //text of tooltip,
		         dateZ: json[i].columns[j].date, //
		         status: statusX // 1st or 2nd chart. Joined/Left
             });
			 
	      }
      }
      //console.log(tooltips);
	  return tooltips;
   }
}

module.exports = creates_tooltip_array_from_json;