function doc(i){
  return document.querySelector(String(i));
}
function gridA(n) {
  return doc('#grid > ol > li:nth-child('+String(n)+') > a');
}
function nightDay (now) {
  if (now.value === 'night') {
    return ['black', 'white', 'powderblue', 'powderblue', 'day'];
  } else {
    return ['white', 'black', 'blue',  'black', 'night'];
  }
}
function nightDayHandler(self) {
  var target = doc('body');
  var alist = Array.prototype.slice.call(document.querySelectorAll('a'));
  var gridAlist = Array.prototype.slice.call(
    document.querySelectorAll('#grid > ol > li > a')
    );
  var dayNight = nightDay(self);
  target.style.backgroundColor = dayNight[0];
  target.style.color = dayNight[1];
  for (let i of alist) {
    if ((i === gridAlist[0] || i.href === document.URL) && i !== alist[0]) {

    } else if (alist.indexOf(i) > 3) {
      i.style.color = dayNight[2];
    } else {
      i.style.color = dayNight[3];
    }
  }
  self.value = dayNight[4];
}
