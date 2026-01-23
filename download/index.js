function $(id) {return document.getElementById(id)}

function vClk(el) {
	const els = document.querySelectorAll('#version-select .active');
	for (var i=0; i < els.length; i++) { els[i].classList.remove('active'); }

	el.classList.add('active');
	req_new(el.innerText, el)
}

function ver_click(e) {
	for (var i=19; i <= 25; i++) { if (undefined != $(i)) { $(i).className = $(i).className.replace(' active', ''); } }

	$(e).className += ' active';
	var txt = $(e).innerText;
	req_new(txt, e)
}

var versionJson;
function req_new(ver, e) {
	if (undefined != versionJson) {
		doo(ver, e, 0);
		return;
	}

	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			versionJson = JSON.parse(this.responseText);
			doo(ver, e, 0);
		}
	};
	req.open("GET", "https://api.modrinth.com/v2/project/cardboard/version", true);
	req.send();
}

const snapMsg = "WARNING:\nThis version of Cardboard is an experimental snapshot release!\n\n-Not actively supported\n-Use at your own risk!";
const expMsg = "WARNING:\nThis version of Cardboard is still experimental";

function doo(ver, e, c) {
	var objj = versionJson[c];
	var name = objj.name.split(" ")[0].replace('#','')
	var file = objj.files[0];
	var dl = file.url;
	var vars = objj.game_versions;
	var version = ver.split(' ')[0].split('*')[0]; 

	if (vars.indexOf(version) == -1) {
		doo(ver, e, c + 1)
		return;
	}

	var updated = new Date(objj.date_published);
	var mm = months(updated, new Date())

	$('dlb').innerHTML = '<span class="tspan">Download </a> #' + name + "&nbsp;<b>(for " + vars + ")</b></span>";
	$('verc').innerHTML = ver; // $(e).innerText;
	$('dll').href = file.url;
	$('updated').innerText = "Last Updated: " + updated.toDateString();
	
	$('size').innerText = file.filename + " / " + (file.size/1024/1024).toFixed(2) + "MB";
	$('warn').innerText = (version.indexOf('w') != -1 || version.indexOf('-') != -1) ? snapMsg : (ver.indexOf('*') != -1 ? expMsg : "");
	$('warn2').innerHTML = "";
	if (mm > 11) {
		$('warn2').innerHTML = `<i>Last Updated: ${mm} Months Ago! This version may not be actively supported</i><br>`;
	}
}

addEventListener("load", function(e){ req_new('1.21.11') });

setTimeout(function() { req_new('1.21.11') }, 100);

function months(d1, d2) {
	var months;
	months = (d2.getFullYear() - d1.getFullYear()) * 12;
	months += d2.getMonth() - d1.getMonth();
	if (d2.getDate() < d1.getDate()){months--;}
	return months;
}