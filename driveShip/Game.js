class Game
{
  constructor()
  {
    this.gameTimer = new Timer( "MainGameTimer", 60.0 );
    this.terminate = false;
    this.canvas = document.getElementById("mainCanvas");
    this.c = this.canvas.getContext("2d");

    //  bind some functions to use as alarms
    this.tic = this.tic.bind(this);
    this.render = this.render.bind(this);
    this.gameTimer.addAlarm( this.tic );
    this.gameTimer.addAlarm( this.render );
    this.testTimer.addAlarm( this.tic );

    this.mainLoop = this.mainLoop.bind(this);
  }

  mainLoop()
  {
    if (this.terminate == false)
    {
      this.expandCanvas();
      this.gameTimer.tic();
      this.testTimer.tic();
      requestAnimationFrame(this.mainLoop);
    }
  }

  expandCanvas()
  {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  //  game logic here
  tic()
  {
  }

  //  render game here
  render()
  {
  }
}
