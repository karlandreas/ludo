
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
	
	newFilter: function() {
		return document.createElementNS("http://www.w3.org/2000/svg","filter");
	},
	
	newGaussianBlur: function() {
		return document.createElementNS("http://www.w3.org/2000/svg","feGaussianBlur");
	},
	
	newOffset: function() {
		return document.createElementNS("http://www.w3.org/2000/svg","feOffset");
	},
	
	newMerge: function() {
		return document.createElementNS("http://www.w3.org/2000/svg","feMerge");
	},
	
	newMergeNode: function() {
		return document.createElementNS("http://www.w3.org/2000/svg","feMergeNode");
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
	},
	
	createAIShadow2: function() {
		
		var filter = this.newFilter();
		filter.setAttribute('id', 'AI_Shadow_2');
		filter.setAttribute('width', '140%');
		filter.setAttribute('height', '130%');
		filter.setAttribute('x', '-15%');
		filter.setAttribute('y', '-15%');
		filter.setAttribute('filterUnits', 'objectBoundingBox');
		
		var gaussianBlur = this.newGaussianBlur();
		gaussianBlur.setAttribute("in", "SourceAlpha");
		gaussianBlur.setAttribute("stdDeviation", "6");
		gaussianBlur.setAttribute("result", "blur");
		
		var offset = this.newOffset();
		offset.setAttribute("dx", "-8");
		offset.setAttribute("dy", "8");
		offset.setAttribute("in", "blur");
		offset.setAttribute("result", "offsetBlurredAlpha");
		
		var merge = this.newMerge();
		
		var mergeNode1 = this.newMergeNode();
		mergeNode1.setAttribute("in", "offsetBlurredAlpha");
		
		var mergeNode2 = this.newMergeNode();
		mergeNode2.setAttribute("in", "SourceGraphic");
		
		merge.appendChild(mergeNode1);
		merge.appendChild(mergeNode2);
		
		filter.appendChild(gaussianBlur);
		filter.appendChild(offset);
		filter.appendChild(merge);
		
		return filter;
	}
}

