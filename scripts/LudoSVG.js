
var LudoSVG = function(id) {
	
	this.id = id;
	this.x	= 0;
	this.y	= 0;
}

LudoSVG.prototype = {
	
	newSVG: function(width, height) {
		var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
		svg.setAttribute('id', this.id);
		svg.setAttribute('x', this.x + "px");
		svg.setAttribute('y', this.y + "px");
		svg.setAttribute('width', width + "px");
		svg.setAttribute('height', height + "px");
		svg.setAttribute('viewBox', this.x + " " + this.y + " " + width + " " + height);
		return svg;
	},
	
	newPath: function() {
		return document.createElementNS("http://www.w3.org/2000/svg","path");
	},
	
	newPolygon: function() {
		return document.createElementNS("http://www.w3.org/2000/svg","polygon");
	},
	
	newCircle: function() {
		return document.createElementNS("http://www.w3.org/2000/svg","circle");
	},
	
	newGroup: function() {
		return document.createElementNS("http://www.w3.org/2000/svg","g");
	},
	
	newStyle: function() {
		var s = document.createElement('style');
		s.type = "text/css";
		return s;
	},
	
	addStylesToSVG: function(green, turquise) {
		
		var styleTag = this.newStyle();
		
		var blacksStyle   = ".blacks_style { fill:#000000; } \n";
		var greensStyle   = ".greens_style { fill:" + green + "; } \n";
		var turquiseStyle = ".turquise_style { fill:" + turquise + "; } \n";
			
		styleTag.innerHTML += blacksStyle;
		styleTag.innerHTML += greensStyle;
		styleTag.innerHTML += turquiseStyle;
		
		return styleTag;
	}
}

