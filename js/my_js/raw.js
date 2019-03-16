
$(function(){
	
	//canvas.width = window.innerWidth;     // equals window dimension
//canvas.height = window.innerHeight;


//canvas with chart
var graph = document.getElementById("graph");
var c = graph.getContext("2d");

//IF NOT IN Mobile, i.e on large screen, use special canvas width recalculation, on mobile left it as was (300x150).
//U may not use it, but on desktop canvas chart will be too small, only 300x150
if(screen.width >= 640){ 
    graph.width = window.innerWidth - 320; 
	graph.height = window.innerHeight - 320;
}



//canvas with tooltips dot
var tipCanvas = document.getElementById("tip");
var tipCtx = tipCanvas.getContext("2d");

//IF NOT IN Mobile, i.e on large screen, use special canvas width recalculation, on mobile left it as was (300x150) //NOT NECESSERY??????? Causes toolwip too wide on desktop???
/*
if(screen.width >= 640){ 
    tipCanvas.width = window.innerWidth - 320; 
	tipCanvas.height = window.innerHeight - 320;
}*/

//$(c.canvas).css("width", "80%");


var canvasOffset = $("#graph").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;

var graph;
var xPadding = 30; //left padding of scales axis
var yPadding = 30;




// Y is a json values
var json = {
    values: [
	    { X: 0,
          Y: 12,
		  date: "1.03" }, 
			
	    { X: 2,
          Y: 28,
		  date: "2.03"}, 
	    {
            X: 3,
            Y: 18,
		    date: "3.03"
        }, 
		{
        X: 4,
        Y: 34,
		date: "4.03"
    }, {
        X: 5,
        Y: 40,
		date: "5.03"
    }, {
        X: 6,
        Y: 80,
		date: "6.03"
    }, {
        X: 7,
        Y: 80,
		date: "7.03"
    }]
};

// define tooltips for each json point
var dots = [];
for (var i = 0; i < json.values.length; i++) {
    dots.push({
        x: getXPixel(json.values[i].X),
        y: getYPixel(json.values[i].Y),
        r: 4,
        rXr: 16,
        color: "red",
        tip: json.values[i].Y //"#text" + (i + 1)  //Mega error was here //text of tooltip
    });
}

alert(JSON.stringify(dots, null, 4));



// request mousemove events
$("#graph").mousemove(function (e) {
    handleMouseMove(e);
});



// show tooltip when mouse hovers over dot
function handleMouseMove(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // Put your mousemove stuff here
    var hit = false;
    for (var i = 0; i < dots.length; i++) {
        var dot = dots[i];
        var dx = mouseX - dot.x;
        var dy = mouseY - dot.y;
        if (dx * dx + dy * dy < dot.rXr) {
			
			//Mine
			$("#tip").show(300); //show tooltip, by default in css: display: none. Is made to fix overlaping an empty tooltip
			
            tipCanvas.style.left = (dot.x) + "px"; //tooltip margin left
            tipCanvas.style.top = (dot.y - 40) + "px";  //tooltip margin bottom
            tipCtx.clearRect(0, 0, tipCanvas.width, tipCanvas.height ); //clearRect(marginLeft, width, height)
            //                  tipCtx.rect(0,0,tipCanvas.width,tipCanvas.height);
			
			//in mobile only
			if(screen.width <= 640){ 
			    tipCtx.font = "90px Arial"; //set font size
				tipCtx.fillText(/*$(dot.tip).val()*/dot.tip, 25, 85); //(text, paddingLeft, paddingTop)
			} else {
				//tipCtx.font = "20px Arial"; //set font size
                tipCtx.fillText(/*$(dot.tip).val()*/dot.tip, 5, 15); //(text, paddingLeft, paddingTop)
			}
            hit = true;
        } /*else {
			$("#tip").hide(800);
		}*/
    }
    if (!hit) {
        tipCanvas.style.left = "-1000px";  //was 200px, this solution fixes bug when tooltip appears in left empty if not mouse overed
    }
}


// unchanged code follows

// Returns the max Y value in our json list
function getMaxY() {
    var max = 0;

    for (var i = 0; i < json.values.length; i++) {
        if (json.values[i].Y > max) {
            max = json.values[i].Y;
        }
    }

    max += 10 - max % 10;
    return max;
}

// Returns the max X value in our json list
function getMaxX() {
    var max = 0;

    for (var i = 0; i < json.values.length; i++) {
        if (json.values[i].X > max) {
            max = json.values[i].X;
        }
    }

    // omited
    //max += 10 - max % 10;
    return max;
}

// Return the x pixel for a graph point
function getXPixel(val) {
    // uses the getMaxX() function
    return ((graph.width - xPadding) / (getMaxX() + 1)) * val + (xPadding * 1.5);
    // was
    //return ((graph.width - xPadding) / getMaxX()) * val + (xPadding * 1.5);
}

// Return the y pixel for a graph point
function getYPixel(val) {
    return graph.height - (((graph.height - yPadding) / getMaxY()) * val) - yPadding;
}

//var graph = document.getElementById("graph"); //DUPLICATE
//var c = graph.getContext('2d');

c.lineWidth = 2; //width of XY axis scale
c.strokeStyle = '#333';
c.font = 'italic 8pt sans-serif';
c.textAlign = "center";

// Draw the axises scales
c.beginPath();
c.moveTo(xPadding, 0);
c.lineTo(xPadding, graph.height - yPadding);
c.lineTo(graph.width, graph.height - yPadding);
c.stroke();






// Draw the X value texts, draw text values in horizont axis!!!!!!
var myMaxX = getMaxX();
for (var i = 0; i <= myMaxX -1; i++) { //was originally (var i = 0; i <= myMaxX; i++), use -1 strictly for cases with dates
    // uses json.values[i].X
    c.fillText(/*i*/json.values[i].date, getXPixel(i), graph.height - yPadding + 20);
}




// Draw the Y value texts, text in vertical axis
c.textAlign = "right"
c.textBaseline = "middle";

for (var i = 0; i < getMaxY(); i += 10) {
    c.fillText(i, xPadding - 10, getYPixel(i));
}

c.strokeStyle = '#f00';



// Draw the CHART graph Lines------------------------------------------------------------
// **************************************************************************************
// **************************************************************************************
//                                                                                     **
/*
function drawChart(i){
	c.lineTo(getXPixel(json.values[i].X), getYPixel(json.values[i].Y)); 
	c.stroke();
}

function getDrawer(i) {
    return function() {
        drawChart(i);
    }
}
*/


c.beginPath();
//c.moveTo(getXPixel(json.values[0].X), getYPixel(json.values[0].Y)); //moveTo() method moves the path to the specified point in the canvas, without creating a line.
alert("json.values.length;" + json.values.length);
//c.lineTo(getXPixel(2), getYPixel(28));c.stroke();

for (var i = 0; i < json.values.length; i++) { // was i=1
	(function(ix) {  //shooters, or u can just use {let i = 1} in loop instead of shooters
	     setTimeout(function() {
	         
			 //Mega Fix, sets the path to start position, out of for loop it was not working
			 if(ix == 0 ){
				 c.moveTo(getXPixel(json.values[0].X), getYPixel(json.values[0].Y));
			 }
			 
			 
	         //alert(ix);
		     //alert(json.values[i].X + "  and " +  json.values[i].Y + " i->" + i);
		     c.lineTo(getXPixel(json.values[ix].X), getYPixel(json.values[ix].Y)); 
		     c.stroke(); //stroke() method to actually draw the path on the canvas.
		     //c.clearRect(0,0,graph.width,graph.height);
		     //drawChart();
		     //setTimeout(getDrawer(i), 1000);
		     //setTimeout(getDrawer(i), 1000);
		     
			 
	     }, ix * 500);
	})(i); // end shooters 
   //c.lineTo(getXPixel(json.values[i].X), getYPixel(json.values[i].Y));
}
//c.stroke();
// **                                                                                  **
// **************************************************************************************
// **************************************************************************************
// END Draw the CHART graph Lines









// Draw the dots
// **************************************************************************************
// **************************************************************************************
//                                                                                     **
c.fillStyle = '#333';

for (var i = 0; i < json.values.length; i++) {
    c.beginPath();
    c.arc(getXPixel(json.values[i].X), getYPixel(json.values[i].Y), 8/*Radius*/, 0, Math.PI * 2, true);
    c.fill();
}
// **                                                                                  **
// **************************************************************************************
// **************************************************************************************
});         
