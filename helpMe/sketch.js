function setup()
{
  frameRate( 1000 );
}
function draw()
{
  var oddPs = selectAll( '.odd' );
  for( var i = 0; i < oddPs.length; i++ )
  {
    var angle = sin( millis() / 10 + i / 10 ) * 0.5;
    oddPs[i].style( 'rotate', angle + i);
  }
  var evenPs = selectAll( '.even' );
  for( var i = 0; i < evenPs.length; i++ )
  {
    var angle = -sin( millis() / 10 + i / 10 ) * 0.5;
    evenPs[i].style( 'rotate', angle - i);
  }}
