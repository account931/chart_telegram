var core_var = require('./core.js'); //IMPORT VARIABLES {c, xPadding,yPadding} from core.js
//var getMaxX_file = require('./getMaxX.js');


//converts Unix to normal. To use one same function we use the 2nd arg {tag}, if it is set in calling function, function returns short date, i.e {1.03}
function convertDateStampt(){
	

 
  this.funct_convert_dateStamp = function(dateStampp, tag){   //arg(UnixStamp, true/false)
  
      //start import Vars from core.js
      var c = core_var.c; //IMPORT VAR {c} fom core.js
	  //var xPadding = core_var.xPadding; //IMPORT VAR {xPAdding} fom core.js
	  var yPadding = core_var.yPadding; //IMPORT VAR {yPAdding} fom core.js
	  //END  import Vars from core.js
	  
	  
  var n;
  var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  var dateTime =  new Date(dateStampp*1000);//Mega Error, must be {dateStampp*1000}, was without *1000
  var curr_date = dateTime.getDate(); //gets the date
  var curr_month = dateTime.getMonth();// gets month //+ 1;  
  var curr_year = dateTime.getFullYear();
  var dayOfWeek = weekdays[dateTime.getDay()]; //day of the week
  
  //if 2nd arg isset, when calling the function, rerurns short date, i.e {1.03}. Used in Y axis
  if(tag){
	  curr_month = curr_month + 1;  //month + 1
	  if(curr_month.toString().length == 1){ //if month int is of one length, add "0"
		 curr_month = "0" + curr_month; //i.e "03"
	  }
	  n = curr_date + "." + curr_month; //returns 1.03
	  
  //if 2nd arg is NOT set, returns full date, i.e  {Sat, 3 March}. Used in tooltips
  } else {
      n = dayOfWeek + ", " + monthList[curr_month] + " " + curr_date/* + "-" + curr_year*/; //returns Sat, 3 March
  }

  return n;
	  

  }    
}

module.exports = convertDateStampt;