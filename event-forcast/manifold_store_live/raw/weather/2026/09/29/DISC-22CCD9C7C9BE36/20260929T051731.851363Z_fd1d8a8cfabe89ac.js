function startList ( ) {
    if (document.all&&document.getElementById) {
        navRoot = document.getElementById("nav");
        for (i=0; i<navRoot.childNodes.length; i++) {
            node = navRoot.childNodes[i];
            if (node.nodeName=="LI") {
                node.onmouseover=function() {
                    this.className+=" over";
                }
                node.onmouseout=function() {
                    this.className=this.className.replace(" over", "");
                }
            }
        }
        navRoot = document.getElementById("vertnav");
        for (i=0; i<navRoot.childNodes.length; i++) {
            node = navRoot.childNodes[i];
            if (node.nodeName=="LI") {
                node.onmouseover=function() {
                    this.className+=" over";
                }
                node.onmouseout=function() {
                    this.className=this.className.replace(" over", "");
                }
            }
        }
    }
	var navRoot = document.getElementById("subnav");
	if (navRoot == null) {}
	else {
        for (var i=0; i<navRoot.childNodes.length; i++) {
            var node = navRoot.childNodes[i];
            if (node.nodeName=="LI") {
                node.onmouseover=function() {
                    this.className+=" over";
                }
                node.onmouseout=function() {
                    this.className=this.className.replace(" over", "");
                }
            }
        }
	}
	var navRoot = document.getElementById("thirdnav");
	if (navRoot == null) {}
	else {
        for (var i=0; i<navRoot.childNodes.length; i++) {
            var node = navRoot.childNodes[i];
            if (node.nodeName=="LI") {
                node.onmouseover=function() {
                    this.className+=" over";
                }
                node.onmouseout=function() {
                    this.className=this.className.replace(" over", "");
                }
            }
		}
	}
	var navRoot = document.getElementById("fourthnav");
	if (navRoot == null) {}
	else {
        for (var i=0; i<navRoot.childNodes.length; i++) {
            var node = navRoot.childNodes[i];
            if (node.nodeName=="LI") {
                node.onmouseover=function() {
                    this.className+=" over";
                }
                node.onmouseout=function() {
                    this.className=this.className.replace(" over", "");
                }
            }
		}
	}		
	
}

window.onload=startList;
