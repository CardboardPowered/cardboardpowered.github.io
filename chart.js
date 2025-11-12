// Extract from Cardbot Translated to JS
class PieChart {
	constructor(data, labels, colors) {
		this.data = data;	 // array of numbers
		this.labels = labels; // array of strings
		this.colors = colors; // array of CSS color strings
	}

	drawPieTo(ctx, width, height) {
		var total = this.data.reduce((sum, val) => sum + val, 0);
		var startAngle = 0;
		var centerX = width / 2;
		var centerY = height / 2;
		var radius = Math.min(centerX, centerY) - 20;

		// draw pie slices
		for (var i = 0; i < this.data.length; i++) {
			ctx.fillStyle = this.colors[i];
			var arcAngle = (this.data[i] / total) * 2 * Math.PI;

			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.arc(centerX, centerY, radius, startAngle, startAngle + arcAngle);
			ctx.closePath();
			ctx.fill();

			startAngle += arcAngle;
		}
		startAngle = 0; // reset startAngle for labels

		// draw labels
		ctx.fillStyle = "black";
		ctx.font = "12px Arial";
		for (var i = 0; i < this.data.length; i++) {
			var val = this.data[i] / total;
			var arcAngle = val * 2 * Math.PI;
			var angle = startAngle + arcAngle / 2;
			var count = this.data[i];
			if (count == 0) continue;

			var lbl = this.labels[i] + " (" + count + ")" + "=" + Math.round(val * 100) + "%";
			var tw = ctx.measureText(lbl.split('\n')[0]).width;
			var th = 14; // approx
			var labelX = centerX + (radius * 0.7 * Math.cos(angle)) - (tw / 2) + 10;
			var labelY = centerY + (radius * 0.7 * Math.sin(angle)) + (th / 2);
			ctx.fillText(lbl, labelX, labelY);
			startAngle += arcAngle;
		}
	}
}
