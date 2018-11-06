class Timer
{
  constructor(timerName, targetFrameRate)
  {
    this.alarms = [];
    this.targetFrameRate = targetFrameRate;
    this.frameRate = 0.0;
    this.targetDTime = (1.0 / targetFrameRate)*1000.0;
    this.firstTime = Date.now();
    this.lastTime = Date.now();
    this.now = Date.now();
    this.dTime = 0.0;
    this.timeRemaining = this.targetDTime;
    this.timeUntilNext = targetFrameRate - this.dTime;
    this.consoleAlarm = false;
    this.timerName = timerName;
  }

  tic()
  {
    this.now = Date.now();
    this.dTime = this.now - this.lastTime;
    this.timeRemaining = this.timeRemaining - this.dTime;
    //  its time to ring alarms
    if (this.timeRemaining < 0.0)
    {
      if( this.consoleAlarm == true )
      {
        this.ringAlarmThroughConsole();
      }
      //  ring alarms
      for(var i = 0; i < this.alarms.length; i++)
      {
        this.alarms[i]();
      }
      this.timeRemaining = this.timeRemaining + this.targetDTime;
    }
    this.lastTime = this.now;
  }

  /*  make sure that you bind a member function to an instance.
      or else the member function will have no context and it
      will throw a this undefined err */
  addAlarm( alarmFunction )
  {
    this.alarms.push(alarmFunction);
  }

  enableConsoleAlarm()
  {
    this.consoleAlarm = true;
  }

  disableConsoleAlarm()
  {
    this.consoleAlarm = false;
  }

  ringAlarmThroughConsole()
  {
    console.log( "ALARM: " + this.timerName + "." );
    console.log( "\t" + "TIME: " + Date.now() + "." );
    console.log( "\t" + "FREQ: " + this.targetFrameRate + "." );
  }

  getTimeRemaining()
  {
    return this.timeRemaining;
  }

  getDTime()
  {
    return this.dTime;
  }
}
