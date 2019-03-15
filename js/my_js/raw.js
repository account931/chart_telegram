
$(function(){
	
	//canvas.width = window.innerWidth;     // equals window dimension
//canvas.height = window.innerHeight;


//canvas with chart
var graph = document.getElementById("graph");
var ctx = graph.getContext("2d");

//IF NOT IN Mobile, i.e on large screen, use special canvas width recalculation, on mobile left it as was (300x150)
if(screen.width >= 640){ 
    graph.width = window.innerWidth - 320; 
	graph.height = window.innerHeight - 320;
}

//canvas with tooltips dot
var tipCanvas = document.getElementById("tip");
var tipCtx = tipCanvas.getContext("2d");

//$(ctx.canvas).css("width", "80%");


var canvasOffset = $("#graph").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;

var graph;
var xPadding = 30; //left padding of scales axis
var yPadding = 30;




// Y is a data values
var data = {
    values: [
	    {   X: 0,
            Y: 12,
		    date: "1 march" }, 
			
	    {   X: 2,
            Y: 28,
		    date: "2 march"}, 
	    {
            X: 3,
            Y: 18,
		    date: "3 march"
        }, 
		{
        X: 4,
        Y: 34,
		date: "4 march"
    }, {
        X: 5,
        Y: 40,
		date: "5 march"
    }, {
        X: 6,
        Y: 80,
		date: "6 march"
    }, {
        X: 7,
        Y: 80,
		date: "7 march"
    }]
};

// define tooltips for each data point
var dots = [];
for (var i = 0; i < data.values.length; i++) {
    dots.push({
        x: getXPixel(data.values[i].X),
        y: getYPixel(data.values[i].Y),
        r: 4,
        rXr: 16,
        color: "red",
        tip: data.values[i].Y //"#text" + (i + 1)  //Mega error was here //text of tooltip
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

// Returns the max Y value in our data list
function getMaxY() {
    var max = 0;

    for (var i = 0; i < data.values.length; i++) {
        if (data.values[i].Y > max) {
            max = data.values[i].Y;
        }
    }

    max += 10 - max % 10;
    return max;
}

// Returns the max X value in our data list
function getMaxX() {
    var max = 0;

    for (var i = 0; i < data.values.length; i++) {
        if (data.values[i].X > max) {
            max = data.values[i].X;
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

graph = document.getElementById("graph");
var c = graph.getContext('2d');

c.lineWidth = 2; //width of XY axis scale
c.strokeStyle = '#333';
c.font = 'italic 8pt sans-serif';
c.textAlign = "center";

// Draw the axises
c.beginPath();
c.moveTo(xPadding, 0);
c.lineTo(xPadding, graph.height - yPadding);
c.lineTo(graph.width, graph.height - yPadding);
c.stroke();






// Draw the X value texts, draw text values in horizont axis!!!!!!
var myMaxX = getMaxX();
for (var i = 0; i <= myMaxX; i++) {
    // uses data.values[i].X
    c.fillText(i/*data.values[i].date*/, getXPixel(i), graph.height - yPadding + 20);
}




// Draw the Y value texts, text in vertical axis
c.textAlign = "right"
c.textBaseline = "middle";

for (var i = 0; i < getMaxY(); i += 10) {
    c.fillText(i, xPadding - 10, getYPixel(i));
}

c.strokeStyle = '#f00';



// Draw the line graph--------------------------------------------------------------------------------
/*
function drawChart(i){
	c.lineTo(getXPixel(data.values[i].X), getYPixel(data.values[i].Y)); 
	c.stroke();
}

function getDrawer(i) {
    return function() {
        drawChart(i);
    }
}
*/


c.beginPath();
c.moveTo(getXPixel(data.values[0].X), getYPixel(data.values[0].Y));
for (var i = 1; i < data.values.length; i++) {
	//setTimeout(function() {
		c.lineTo(getXPixel(data.values[i].X), getYPixel(data.values[i].Y)); 
		//drawChart();
		//setTimeout(getDrawer(i), 1000);
		 //setTimeout(getDrawer(i), 1000);
		
	//}, 2000);
   //c.lineTo(getXPixel(data.values[i].X), getYPixel(data.values[i].Y));
}
c.stroke();











// Draw the dots
c.fillStyle = '#333';

for (var i = 0; i < data.values.length; i++) {
    c.beginPath();
    c.arc(getXPixel(data.values[i].X), getYPixel(data.values[i].Y), 8/*Radius*/, 0, Math.PI * 2, true);
    c.fill();
}
});         
