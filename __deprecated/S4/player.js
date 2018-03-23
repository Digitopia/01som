//this is called by myControlPhrase
function tickCounter(time, playbackRate) {
	tickCount++;
}

function playG1(time, playbackRate) {
  g1.rate(playbackRate);
  g1.play(time);
}

function playG2(time, playbackRate) {
  g2.rate(playbackRate);
  g2.play(time);
}

function playG3(time, playbackRate) {
	g3.rate(playbackRate);
	g3.play(time);
}

function playB(time, playbackRate) {
	b.rate(playbackRate);
	b.play(time);
}

function playP(time, playbackRate) {
	p.rate(playbackRate);
	p.play(time);
}

function playC(time, playbackRate) {
	c.rate(playbackRate);
	c.play(time);
}

function playD1(time, playbackRate) {
	d1.rate(playbackRate);
	d1.play(time);
}

function playD2(time, playbackRate) {
	d2.rate(playbackRate);
	d2.play(time);
}

function playD3(time, playbackRate) {
	d3.rate(playbackRate);
	d3.play(time);
}

function playCustom(time, playbackRate) {
	customFile.rate(playbackRate);
	customFile.play(time);
}