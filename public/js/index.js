const openIcon = document.querySelector("#openNav");
const closeIcon = document.querySelector("#closeNav");
const sideNav = document.querySelector("#sideNav");
openIcon.addEventListener("click", () => {
  openIcon.style.opacity = "0";
  closeIcon.style.display = "flex";
  closeIcon.style.opacity = "100";
  sideNav.style.left = "0";
  setTimeout(() => {
    openIcon.style.display = "none";
  }, 100);
});
closeIcon.addEventListener("click", () => {
  closeIcon.style.opacity = "0";
  openIcon.style.display = "flex";
  openIcon.style.opacity = "100";
  sideNav.style.left = "100%";
  setTimeout(() => {
    closeIcon.style.display = "none";
  }, 100);
});
window.addEventListener("resize", () => {
  sideNav.style = null;
  openIcon.style = null;
  closeIcon.style = null;
});
// const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
//   const { top, left, bottom, right } = el.getBoundingClientRect();
//   const { innerHeight, innerWidth } = window;
//   return partiallyVisible
//     ? ((top > 0 && top < innerHeight) ||
//         (bottom > 0 && bottom < innerHeight))
//     : top >= 0 && bottom <= innerHeight;
// };
const el = document.querySelector("established");
let borderTop = document.getElementById("borderTop");
    let borderBottom = document.getElementById("borderBottom");
    let borderBottomHeight = borderBottom.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  document.querySelector("established > div").style.zIndex = null;
  let topHead = document.getElementById("topHead");
    let bottomHead = document.getElementById("bottomHead");
  let { bottom, height } = el.getBoundingClientRect();
  if (bottom <= height && bottom >= 0) {
    let distance = height - bottom;
    let scaleX = 1 - distance / height;
    borderTop.style.transform = `scaleY(${scaleX})`;
    borderBottom.style.transform = `scaleY(${scaleX})`;
    document.body.style.background = 'white'
    topHead.style.transform = `scaleY(${1/scaleX})`
    bottomHead.style.transform = `scaleY(${1/scaleX})`
    
    
  }
  else if (bottom < 0) {
    document.body.style.background = 'black'
    borderTop.style.transform = `scaleY(0)`;
    borderBottom.style.transform = `scaleY(0)`;
    topHead.style.transform = `scaleY(1)`
    bottomHead.style.transform = `scaleY(1)`
    document.querySelector("established > div").style.zIndex = "-1";
  }
  else{
    document.body.style.background = 'black'
    topHead.style.transform = `scaleY(1)`
    bottomHead.style.transform = `scaleY(1)` 
    borderTop.style.transform = `scaleY(1)`;
    borderBottom.style.transform = `scaleY(1)`;
  }
})