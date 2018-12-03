var c = document.getElementById("c");
var ctx = c.getContext("2d");
ctx.lineWidth = 1;

var	x = 4096,
	y = 4096,
	skala = 1;
		
function Podziel (a, c, b, d)
{
	let p0 = [a, c];
	let p1 = [(b - a) / 3 + a, (d - c) / 3 + c];
	let p3 = [2 * (b - a) / 3 + a, 2 * (d - c) / 3 + c];
	let w1,
		w2;
	
	let h = Math.sqrt((Math.pow(((b - a) / 3), 2)) + (Math.pow(((d - c) / 3), 2)));
	
	if (b == a)	w1 = 0;
	else
	{
		w1 = Math.sqrt(1 / (1 + Math.pow(((d - c) / (b - a)), 2)));
	}
	if (d == c)	w2 = 0;
	else
	{
		w2 = Math.sqrt(1 / (1 + Math.pow(((b - a) / (d - c)), 2)));
	}
	
	if (a < b) w1 = -w1;
	if (c > d) w2 = -w2;
	
	let p2 = [w2 * h + (b - a) / 2 + a, w1 * h + (d - c) / 2 + c];
	
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
		[0, -4000],
		[3000, 2000],
		[-3000, 2000]
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
