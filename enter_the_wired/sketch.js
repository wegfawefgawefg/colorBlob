function enumGenerator(...keys) {
  return keys.reduce((acc, key, index) => {
    acc[key] = index;
    return acc;
  }, {});
}

const Direction = Object.freeze(enumGenerator('Left', 'Right'));

function spin_text(text, left_or_right, speed = 1) {
  if (left_or_right === Direction.Left) {
    words = text.split('');
    for (var t = 0; t < speed; t++) {
      words.push(words[0]);
      words.splice(0, 1);
    }
    return words.join('');
  } else if (left_or_right === Direction.Right) {
    words = text.split('');
    for (var t = 0; t < speed; t++) {
      words.unshift(words[words.length - 1]);
      words.splice(words.length - 1, 1);
    }
    return words.join('');
  }
}

function update_text() {
  var ps = document.querySelectorAll('.spintext');
  ps.forEach(function (p) {
    p.innerHTML = spin_text(p.innerHTML, Direction.Left, 2);
  });

  var pcloser = document.getElementById('pcloser');
  pcloser.innerHTML = spin_text(pcloser.innerHTML, Direction.Right);
}

setInterval(update_text, 100);