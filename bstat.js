function runn(){return document.getElementById("running")}
function srcc(c) { return "https://img.shields.io/badge/Running%20on-" + c + "%20Servers-blue"}
function bstats() {
	var co = getCookie('bstats=');
	if (undefined!=co && co!=''){runn().src = srcc(co); return;}

	getJSON('https://bstats.org/api/v1/plugins/580/charts/paper_version/data', function(err, data) { if (err == null) {
		var c = 0; for (var i=0; i < data.length; i++) { if (data[i].name.includes("Cardboard")) c += data[i].y; }
		runn().src = srcc(c); setCookie('bstats=' + c, 60);
	}});
}

function getJSON(url, cb) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true); xhr.responseType = 'json';
	xhr.onload = function(){ var stat = xhr.status;cb(stat !== 200 ? stat : null, xhr.response);};
	xhr.send();
};

bstats();

function getCookie(name) {
	var ca = decodeURIComponent(document.cookie)
	if (ca.indexOf(name) != 0) {return ""}
	return ca.split(name)[1].split(';')[0]
}

function setCookie(ccon, min) {
	var d = new Date();
	d.setTime(d.getTime()+(min*60*1000));
	document.cookie = ccon + ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax";
}