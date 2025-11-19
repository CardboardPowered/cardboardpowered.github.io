function $(a){return document.getElementById(a)}
function runn(){return $("running")}
function srcc(c) { return "https://img.shields.io/badge/Powering%20-" + c + "%20Servers-blue"}

function cookieStats() {
	var co2 = getCookie('bstatsA=');
	return (undefined!=co2 && co2!='');
}

function getLast() {
	return getCookie("bstatsLast=");
}

function bstats() {
	var co = getCookie('bstats=');
	var co2 = getCookie('bstatsA=');
	var co3 = getCookie('bstatsB=');

	if (undefined!=co && co!=''){runn().src = srcc(co);}
	if (undefined!=co2 && co2!='') {
		makePieChart();
		return;
	}
	bstatsRaw();
	makePieChart();
}

function bstatsRaw() {
	getJSON('https://bstats.org/api/v1/plugins/580/charts/paper_version/data', function(err, data) { if (err == null) {
		var myData1 = "";
		var myData2 = "";
		var c = 0; 
		for (var i=0; i < data.length; i++) {
			if (data[i].name.includes("Cardboard-")) {
				var name = data[i].name.split("Cardboard-")[1];
				var count = data[i].y;
				
				c += data[i].y;
				myData1 += name + ",";
				myData2 += count + ",";
			}
		}
		runn().src = srcc(c);
		setCookie('bstats=' + c, 60);
		setCookie('bstatsA=' + myData1, 60);
		setCookie('bstatsB=' + myData2, 60);
		setCookie('bstatsLast=' + Date.now(), 60);
	}}, function() {
		setTimeout(function() { makePieChart(); }, 100);
	});
}

function getJSON(url, cb, cb2) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true); xhr.responseType = 'json';
	xhr.onload = function(){ var stat = xhr.status;cb(stat !== 200 ? stat : null, xhr.response); if (undefined != cb2) { cb2(); }};
	xhr.send();
};

setTimeout(function() {
	bstats();
}, 1000);

//bstats();

function getCookie(name) {
	var ca = decodeURIComponent(document.cookie)
	if (ca.indexOf(name) == -1) {return ""}
	return ca.split(name)[1].split(';')[0]
}

function setCookie(ccon, min) {
	var d = new Date();
	d.setTime(d.getTime()+(min*60*1000));
	document.cookie = ccon + ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax";
}

var colors = ["#F7D9A4","#FFE0B2", "#FFD27F","#E0BC7F","#DAB787","#CFA97A","#B58A66","#A67C52"];
var tries = 0;

function makePieChart() {
	const canvas = $("pieCanvas");
	const ctx = canvas.getContext("2d");

	var labels = getCookie('bstatsA=').split(",").map(String);
	var data = getCookie('bstatsB=').split(",").map(Number);
	
	if (labels.length == 0 && tries == 0) {
		// setTimeout(function() { bstats(); }, 1000);
	}
	
	console.log(document.cookie)
	console.log(labels)
	console.log(data)

	const chart = new PieChart(data, labels, colors);
	chart.drawPieTo(ctx, canvas.width, canvas.height);

	var total = data.reduce((sum, val) => sum + val, 0);
	var out = `<tr><i>Total: ${total} servers.</i></tr>`;
	for (var i = data.length-1; i >= 0; i--) {
		var num = data[i]; if (num == 0) continue;
		var val = Math.round((num / total) * 100);
		var lbl = labels[i] + " " + num + "\n";
		out += `<tr><td>${val}%</td><td>${labels[i]}</td><td>${num}</td></tr>`
	}
	$("verTA").innerHTML = out;
}
