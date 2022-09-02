let sx = 0, // For scroll positions
  sy = 0;
let dx = sx, // For container positions
  dy = sy;

let strength = 50;

window.onload = function () {
  draggable(document.getElementById("card"));

  const body = document.body;
  const main = document.getElementById("main");

  body.style.height = main.clientHeight + "px";

  main.style.position = "fixed";
  main.style.top = 0;
  main.style.left = 0;

  // Bind a scroll function
  window.addEventListener("scroll", easeScroll);

  window.requestAnimationFrame(render);

  var magnets = document.querySelectorAll(".magnetic");

  magnets.forEach((magnet) => {
    magnet.addEventListener("mousemove", moveMagnet);
    magnet.addEventListener("mouseout", function (event) {
      TweenMax.to(event.currentTarget, 1, { x: 0, y: 0, ease: Power4.easeOut });
    });
  });
};

function easeScroll() {
  sx = window.pageXOffset;
  sy = window.pageYOffset;
}

function render() {
  //We calculate our container position by linear interpolation method
  dx = li(dx, sx, 0.07);
  dy = li(dy, sy, 0.07);

  dx = Math.floor(dx * 100) / 100;
  dy = Math.floor(dy * 100) / 100;

  main.style.transform = `translate3d(-${dx}px, -${dy}px, 0px)`;

  window.requestAnimationFrame(render);
}

function li(a, b, n) {
  return (1 - n) * a + n * b;
}

function draggable(el) {
  el.addEventListener("mousedown", function (e) {
    var offsetX = e.clientX - parseInt(window.getComputedStyle(this).left);
    var offsetY = e.clientY - parseInt(window.getComputedStyle(this).top);

    function mouseMoveHandler(e) {
      el.style.top = e.clientY - offsetY + "px";
      el.style.left = e.clientX - offsetX + "px";
    }

    function reset() {
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mouseup", reset);
    }

    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", reset);
  });
}

function copyElementText(id) {
  var text = document.getElementById(id).innerText;
  var elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
}

function moveMagnet(event) {
  var magnetButton = event.currentTarget;
  var bounding = magnetButton.getBoundingClientRect();

  //console.log(magnetButton, bounding)

  TweenMax.to(magnetButton, 1, {
    x:
      ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
      strength,
    y:
      ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
      strength,
    ease: Power4.easeOut,
  });
}

function goto(windows) {
  window.scrollTo({ top: window.height * windows, behavior: "smooth" });
}
