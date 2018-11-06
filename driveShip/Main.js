
requestAnimationFrame(main);

function main()
{
  var game = new Game();
  requestAnimationFrame(game.mainLoop);
}

function init()
{
  let cElem = document.getElementById("mainCanvas");
  let c = cElem.getContext("2d");
  c.fillRect(0, 0, cElem.width, cElem.height);
}
