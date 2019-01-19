var c = document.getElementById("c");
var ctx = c.getContext("2d");
ctx.lineWidth = 1;

var	x = 4096,
	y = 4096,
	skala = 1;
	
let pierw3 = Math.sqrt(3);

function Podziel (a, c, b, d)
{
	let p0 = [a, c];
	let p1 = [(b - a) / 3 + a, (d - c) / 3 + c];
	let p3 = [2 * (b - a) / 3 + a, 2 * (d - c) / 3 + c];
	
	let p2 = [(pierw3 * (p3[1] - p1[1]) + p1[0] + p3[0]) / 2, (pierw3 * (p1[0] - p3[0]) + p1[1] + p3[1]) / 2];
	
	return [p0, p1, p2, p3];
}
function Rysuj(s)
{
	for (let i = 0; i < s.length; i++)
	{
		ctx.strokeStyle = "hsl(" + (i % 360) + ", 50%, 50%)";
		
		ctx.beginPath();
		ctx.moveTo(s[i][0] * skala + x, s[i][1] * skala + y);
		if (i == s.length - 1)
			ctx.lineTo(s[0][0] * skala + x, s[0][1] * skala + y);
		else
			ctx.lineTo(s[i + 1][0] * skala + x, s[i + 1][1] * skala + y);
		ctx.stroke();
	}
}

let p = [];
let pn = [];

function Generuj (stopien)
{
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, 8192, 8192);
	
	p =
	[
		[0, -3464.10161514],
		[3000, 1732.05080757],
		[-3000, 1732.05080757]
	];
	
	for (let j = 0; j < stopien; j++)
	{
		pn = [];

		for (let i = 0; i < p.length; i++)
		{
			if (i == p.length - 1)
				var pt = Podziel (p[i][0], p[i][1], p[0][0], p[0][1]);
			else
				var pt = Podziel (p[i][0], p[i][1], p[i + 1][0], p[i + 1][1]);
			
			while (pt.length)
			{
				pn.push(pt[0]);
				pt.shift();
			}
		}
		p = pn;
	}
	
	//ctx.strokeStyle = "#FFF";
	Rysuj(p);
}
