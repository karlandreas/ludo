function oval(context, x, y, w, h)
{
    context.save();
    context.beginPath();
    context.translate(x, y);
    context.scale(w/2, h/2);
    context.arc(1, 1, 1, 0, 2*Math.PI, false);
    context.closePath();
    context.restore();
}

function drawCanvas(canvasId)
{
    //// General Declarations
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext('2d');


    //// Color Declarations
    var color = 'rgba(255, 255, 29, 1)';
    var color2 = 'rgba(168, 168, 0, 1)';
    var color3 = 'rgba(255, 255, 204, 1)';

    //// Oval Drawing
    oval(context, 134.5, 80.5, 32, 32);
    context.fillStyle = color;
    context.fill();
    context.strokeStyle = color2;
    context.lineWidth = 0.5;
    context.stroke();


    //// Bezier Drawing
    context.beginPath();
    context.moveTo(138.5, 89.32);
    context.bezierCurveTo(138.5, 89.32, 142.02, 79.68, 152.79, 82.74);
    context.bezierCurveTo(163.55, 85.79, 163.5, 102.5, 163.5, 102.5);
    context.bezierCurveTo(163.5, 102.5, 162.57, 92.17, 152.79, 89.32);
    context.bezierCurveTo(143, 86.47, 138.5, 89.32, 138.5, 89.32);
    context.closePath();
    context.fillStyle = color3;
    context.fill();
}