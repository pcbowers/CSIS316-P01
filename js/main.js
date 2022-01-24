/* Manage Placement of Transition */

function placeTransition() {
  // Select the necessary HTML elements
  let transition = document.getElementById("transition")
  let header = document.getElementById("header")
  let fade = document.getElementById("fade")

  // store the window height
  let windowHeight = window.innerHeight

  // get the y location of the bottom of the header
  let headerBottom = header.getBoundingClientRect().bottom

  // get the height of the transition element (the pencils)
  let transitionHeight =
    parseFloat(transition.clientHeight) -
    parseFloat(transition.style.paddingTop || "0px")

  // figure out how much padding should be added
  //   Uses some math to figure out the maximum value
  //   Either 35% of the transition higher than the header
  //   Or just enough for the pencils to touch the bottom
  //
  //   This way the pencils are always at the bottom, but
  //   potentially lower if necessary.
  transition.style.paddingTop =
    Math.max(
      headerBottom - 0.35 * transitionHeight,
      windowHeight - transitionHeight
    ) + "px"

  // transition is hidden by default in case JS is disabled
  // this is necessary to show the transition once the JS runs
  transition.style.opacity = 1
}

// recalculate when resized
window.onresize = placeTransition

// run initially
placeTransition()

/* Manage Placement of Cursor */

// create a variable to store whether or not a touch was initiated first
let startedByTouch = false

// add event listeners for touch
document.addEventListener("touchstart", () => (startedByTouch = true))
document.addEventListener("touchmove", () => (startedByTouch = true))
document.addEventListener("touchend", () => (startedByTouch = true))

// hide the styled cursor
function hideCursor() {
  let cursor = document.getElementById("cursor")
  cursor.style.transform = "scale(0.1)"
  cursor.style.opacity = 0
}

// when the cursor moves, move the styled cursor with it
function moveCursor(e) {
  // select the HTML elements
  let cursor = document.getElementById("cursor")
  let author = document.getElementById("author")
  let profile = document.getElementById("profile")
  let hero = document.getElementById("hero")

  // allow the cursor to be a dynamic size based on the CSS
  let cursorSize = cursor.clientHeight / 2

  // get all elements under the cursor
  let hoveredElements = document.elementsFromPoint(e.clientX, e.clientY)

  // if outside of the page, started by touch, or hovering the author/profile, hide cursor
  if (
    e.pageX > hero.clientWidth ||
    e.pageY > hero.clientHeight ||
    e.pageX < 0 ||
    e.pageY < 0 ||
    startedByTouch ||
    hoveredElements.includes(author) ||
    hoveredElements.includes(profile)
  ) {
    hideCursor()
  } else {
    cursor.style.transform = "scale(1)"
    cursor.style.opacity = 1
    cursor.style.left = e.pageX - cursorSize + "px"
    cursor.style.top = e.pageY - cursorSize + "px"
    cursor.style.pointerEvents = "all"
  }

  //reset in case mouse and touch are both supported
  startedByTouch = false
}

// add event listener for mouse movement
document.addEventListener("mousemove", moveCursor)
document.addEventListener("mouseleave", hideCursor)
