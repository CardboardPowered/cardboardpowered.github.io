function $(id) {return document.getElementById(id)}

function ver_click(e) {
	for (var i = 19; i <= 25; i++) {
		if (undefined != $(i)) {
			$(i).className = $(i).className.replace(' active', '');
		}
	}
	$(e).className += ' active';
	var txt = $(e).innerText;
	req_new(txt, e)
}

addEventListener("load", function(e){ req_new('1.21.10', '26') });

var myObj;
function req_new(ver, e) {
	ver = ver.replace('*','');
	if (undefined != myObj) {
		doo(ver, e, 0);
		return;
	}

	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			myObj = JSON.parse(this.responseText);
			doo(ver, e, 0);
		}
	};
	req.open("GET", "https://api.modrinth.com/v2/project/cardboard/version", true);
	req.send();
}

function doo(ver, e, c) {
	var objj = myObj[c]
	var name = objj.name.split(" ")[0].replace('#','')
	var dl = objj.files[0].url
	var vars = objj.game_versions;

	// TODO: 1.21.8 on modrinth
	if (ver == '1.21.9') {
	}

	if (!vars.toString().includes(ver.split(' ')[0])) {
		doo(ver, e, c + 1)
		return;
	}

	$('dlb').innerHTML = '<span class="tspan">Download </a> #' + name + "&nbsp;<b>(for " + vars + ")</b></span>";
	$('verc').innerHTML = $(e).innerText;
	$('dll').href = dl;
}