// Language
const langBtn = document.getElementById('lngBtn'),
    langList = document.getElementById('lngList')

langBtn.addEventListener('click', e => {
    e.stopPropagation()
    openLangList()
})

const openLangList = () => {
    langList.classList.toggle('list--visible')
}
// End lnaguage

// Cursour
const $bigBall = document.querySelector('.cursor__ball--big');
// const $smallBall = document.querySelector('.cursor__ball--small');
const $hoverables = document.querySelectorAll('a, button');

// Listeners
document.body.addEventListener('mousemove', onMouseMove);

for (let i = 0; i < $hoverables.length; i++) {
  $hoverables[i].addEventListener('mouseenter', onMouseHover);
  $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}

// Move the cursor
function onMouseMove(e) {
  TweenMax.to($bigBall, .4, {
    x: e.pageX - 15,
    y: e.pageY - 15
  })
//   TweenMax.to($smallBall, .1, {
//     x: e.pageX - 5,
//     y: e.pageY - 7
//   })
}

// Hover an element
function onMouseHover() {
  TweenMax.to($bigBall, .3, {
    scale: 2
  })
}
function onMouseHoverOut() {
  TweenMax.to($bigBall, .3, {
    scale: 1
  })
}
// End cursour

document.addEventListener('click', () => {
    langList.classList.remove('list--visible')
})