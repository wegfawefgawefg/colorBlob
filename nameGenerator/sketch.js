var firstLetters = "abcdefghijklmnopqrstuvwxyz";
var firstLettersCapital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var secondLetters = "aeiouy";

var names = [];
var numNames = 100;
var syllablesPerName = 5;

var nameElements = [];

var button_generateNewNames;
var slider_syllablesPerName;

function setup()
{
  //  get handles for the input elements
  button_generateNewNames = select( '#button_generateNewNames' );
  input_startsWithLetter = select( '#input_startsWithLetter' );
  slider_syllablesPerName = select( '#slider_syllablesPerName' );

  //  set the callbacks for the input elements
  button_generateNewNames.mousePressed( generateNewNames );
  slider_syllablesPerName.changed( setSyllablesPerName );
}

function setSyllablesPerName()
{
  syllablesPerName = slider_syllablesPerName.value();
}

function generateNewNames()
{
  //  delete the old names and display elements
  names = [];
  for( var i = 0; i < nameElements.length; i++ )
  {
    nameElements[i].remove();
  }
  nameElements = [];

  //  create the new names and elements
  for( var i = 0; i < numNames; i++ )
  {
    var newName = generateFullName();
    names.push( newName );

    var newElement = createElement( 'h3', newName );
    nameElements.push( newElement );
  }
}

function generateFullName()
{
  var wholeName = '';

  //  generate first name
  var firstName = generateWord();
  wholeName = wholeName.concat( firstName );

  //  add space
  wholeName = wholeName.concat( ' ' );

  //  generate last name
  var lastName = generateWord();
  wholeName = wholeName.concat( lastName );

  return wholeName;
}

function generateWord()
{
  //  generate first name
  var numSyllables = floor( random( syllablesPerName ) );
  var word = '';
  for( var s = 0; s < numSyllables; s++ )
  {
    //  pick first letter
    var firstLetter = '';
    //  //  if first syllable then use capital first letter
    if( s === 0 )
    {
      firstLetter = firstLettersCapital.charAt( floor(random( firstLettersCapital.length )) );
    }
    else
    {
      firstLetter = firstLetters.charAt( floor(random( firstLetters.length )) );
    }

    //  pick second letter
    var secondLetter = secondLetters.charAt( floor(random(secondLetters.length)) );

    //  create syllable
    var syllable = firstLetter.concat( secondLetter );

    //  append to name
    word = word.concat( syllable );
  }

  return word;
}

function filterGenerator( letter )
{
  function filterFunction( inputString )
  {
    if( inputString.charAt(0) === letter )
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  return filterFunction;
}
