/* const { maxBy } = require("lodash"); */

var q = document.getElementById("matrix"),
	d = window.devicePixelRatio || 1,
    w = screen.width * d,
    h = screen.height * d,
    f = 16 * d,
    p = Array(Math.floor(w / f) + 1).join(1).split(""), // Set array size to width of screen + 1
	o = p.length,
    t = ["A", "B", "c", "d", "e", "j", "Q", "5", "t", "k", "n", "m", "8", "2", "6", "7"],
    l = t.length,
    c = q.getContext("2d"),
    stop = false, fps = 12, fpsInterval, startTime, now, then, elapsed;

q.width = w;
q.height = h;

c.font = f + "px Arial";
c.fillRect(0, 0, w, h);
c.fillStyle = "#010101";

function rain() {
	c.fillStyle = "rgba(1, 1, 1, 0.05)";
	c.fillRect(0, 0, w, h);
	c.fillStyle = "#13748e";

	return p.map(function(v, i) {
		var r = Math.random();
		c.fillText(t[r * l >> 0], i * f, v, f);
		v += f;
		return v > (768 * d) + r * 1e4 ? 0 : v; // 768 is 48 rows of 16px
	});
}

function startAnimating() {
	fpsInterval = 1000 / fps;
	then = Date.now();
	startTime = then;

	// Set up canvas for digital rain
	while (o--) {
		p = rain();
	}
	q.style.opacity = 1;

	animate();
}

function animate() {

	// stop
	if (stop) {
		return;
	}

	// request another frame

	requestAnimationFrame(animate);

	// calc elapsed time since last loop

	now = Date.now();
	elapsed = now - then;

	// if enough time has elapsed, draw the next frame

	if (elapsed > fpsInterval) {

		// Get ready for next frame by setting then=now, but...
		// Also, adjust for fpsInterval not being multiple of 16.67
		then = now - (elapsed % fpsInterval);

		// draw stuff here
		p = rain();

	}
}

var z = new FontFace("Roboto Mono", "url(https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap)");

z.load(null, 5000).then(function(font) {

    document.fonts.add(font);
    c.font = f + "px Matrix Code NFI";
    startAnimating();

}, startAnimating);


var myInp=document.getElementById("myInp");
var btnCopy=document.getElementById("btnCopy");

btnCopy.onclick=function(){
  myInp.select();
  myInp.setSelectionRange(0,9999);
  document.execCommand("Copy");
};