function setup()
{
  frameRate( 10 );
}
function draw()
{
  var ps = selectAll( 'p' );
  for( var i = 0; i < ps.length; i++ )
  {
    var text = ps[i].html();
    words = text.split( '' );

    for( var t = 0; t < i + 1; t++ )
    {
      words.push( words[0] );
      words.splice( 0, 1 );
    }

    newWords = words.join( '' );
    ps[i].html( newWords );
  }
}
