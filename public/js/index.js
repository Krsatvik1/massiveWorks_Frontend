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
const nav = document.querySelector("nav");
let lastScroll = 0;
document.addEventListener("scroll", () => {
  let { scrollTop } = document.documentElement;
  if (scrollTop > lastScroll) {
    nav.style.top = "-100%";
  } else {
    nav.style.top = "0";
  }
  lastScroll = scrollTop;
});

if (window.location.pathname == "/") {
  const el = document.querySelector("established-a");
  let borderTop = document.getElementById("borderTop");
  let borderBottom = document.getElementById("borderBottom");
  let borderBottomHeight = borderBottom.getBoundingClientRect().height;
  const el_b = document.querySelector("work-title");
  let borderTop_b = document.getElementById("borderTop-b");
  let borderBottom_b = document.getElementById("borderBottom-b");
  let borderBottomHeight_b = borderBottom_b.getBoundingClientRect().height;
  document.addEventListener("scroll", () => {
    document.querySelector("work-title > div").style.zIndex = null;
    let topHead = document.getElementById("topHead");
    let bottomHead = document.getElementById("bottomHead");
    let topHead_b = document.getElementById("topHead-b");
    let bottomHead_b = document.getElementById("bottomHead-b");
    let bottom_b = el_b.getBoundingClientRect().bottom;
    let height_b = el_b.getBoundingClientRect().height;
    let { bottom, height } = el.getBoundingClientRect();
    if (bottom <= height && bottom >= 0) {
      let distance = height - bottom;
      let scaleX = 1 - distance / height;
      borderTop.style.transform = `scaleY(${scaleX})`;
      borderBottom.style.transform = `scaleY(${scaleX})`;
      document.body.style.background = "white";
      document.querySelector("established-a > div").style.zIndex = null;
      document.querySelector("#estd").style.transform=`scaleY(${1 / scaleX})  translateY(-${
        distance / 4
      }px)`;
      topHead.style.transform = `scaleY(${1 / scaleX}) translateY(${
        distance / 4
      }px)`;
      bottomHead.style.transform = `scaleY(${1 / scaleX}) translateY(-${
        distance / 4
      }px)`;
    } else if (bottom < 0 && !(bottom_b <= height_b && bottom_b >= 0)) {
      document.body.style.background = "black";
      borderTop.style.transform = `scaleY(0)`;
      borderBottom.style.transform = `scaleY(0)`;
      topHead.style.transform = `scaleY(1)`;
      bottomHead.style.transform = `scaleY(1)`;
      document.querySelector("established-a > div").style.zIndex = "-1";
    } else if (!(bottom_b <= height_b && bottom_b >= 0)) {
      document.body.style.background = "black";
      topHead.style.transform = `scaleY(1)`;
      bottomHead.style.transform = `scaleY(1)`;
      borderTop.style.transform = `scaleY(1)`;
      borderBottom.style.transform = `scaleY(1)`;
    }
    if (bottom_b <= height_b && bottom_b >= 0) {
      let distance_b = height_b - bottom_b;
      let scaleX_b = 1 - distance_b / height_b;
      borderTop_b.style.transform = `scaleY(${scaleX_b})`;
      borderBottom_b.style.transform = `scaleY(${scaleX_b})`;
      document.body.style.background = "black";
      document.querySelector("#take1").style.transform=`scaleY(${1 / scaleX_b})  translateY(-${
        distance_b / 4
      }px)`;
      document.querySelector("#take2").style.transform=`scaleY(${1 / scaleX_b})  translateY(-${
        distance_b / 4
      }px)`;
      document.querySelector("#belive").style.transform=`scaleY(${1 / scaleX_b})  translateY(-${
        distance_b / 4
      }px)`;
      document.querySelector("work-title > div").style.zIndex = '5';
      topHead_b.style.transform = `scaleY(${1 / scaleX_b}) translateY(${
        distance_b / 4
      }px)`;
      bottomHead_b.style.transform = `scaleY(${1 / scaleX_b}) translateY(-${
        distance_b / 4
      }px)`;
    } else if (bottom_b < 0 && !(bottom <= height && bottom >= 0)) {
      document.body.style.background = "black";
      borderTop_b.style.transform = `scaleY(0)`;
      borderBottom_b.style.transform = `scaleY(0)`;
      topHead_b.style.transform = `scaleY(1)`;
      bottomHead_b.style.transform = `scaleY(1)`;
      document.querySelector("work-title > div").style.zIndex = "-1";
    } else if (!(bottom <= height && bottom >= 0)){
      document.body.style.background = "black";
      topHead_b.style.transform = `scaleY(1)`;
      bottomHead_b.style.transform = `scaleY(1)`;
      borderTop_b.style.transform = `scaleY(1)`;
      borderBottom_b.style.transform = `scaleY(1)`;
    }
  });
  //target nav element and scroll it up when page is scrolling down and send it up and when page is scrolling up bring it down
  // Path: public\js\index.js

  const viewmore = document.querySelector("#viewmore");
  const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
      ? (top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)
      : top >= 0 && bottom <= innerHeight;
  };
  document.addEventListener("scroll", () => {
    if (elementIsVisibleInViewport(viewmore) && window.innerWidth < 768) {
      viewmore.querySelector("#viewChild1").style.transitionDuration = "1s";
      viewmore.querySelector("#viewChild3").style.transitionDuration = "1s";
      viewmore.querySelector("#viewChild2").style.transitionDuration = "1s";
      viewmore.querySelector("#viewChild1").style.marginRight = "-0.75rem";
      viewmore.querySelector("#viewChild3").style.marginLeft = "-0.75rem";
      viewmore.querySelector("#viewChild2").style.width = "10rem";
      viewmore.querySelector("#viewChild2").style.paddingLeft = "1.25rem";
      viewmore.querySelector("#viewChild2").style.paddingRight = "1.25rem";
      viewmore.querySelector("#viewChild2").style.paddingTop = "0.5rem";
      viewmore.querySelector("#viewChild2").style.paddingBottom = "0.5rem";
    } else if (window.innerWidth < 768) {
      viewmore.querySelector("#viewChild1").style.transitionDuration = "0s";
      viewmore.querySelector("#viewChild3").style.transitionDuration = "0s";
      viewmore.querySelector("#viewChild2").style.transitionDuration = "0s";
      viewmore.querySelector("#viewChild1").style.marginRight = null;
      viewmore.querySelector("#viewChild3").style.marginLeft = null;
      viewmore.querySelector("#viewChild2").style.width = null;
      viewmore.querySelector("#viewChild2").style.paddingLeft = null;
      viewmore.querySelector("#viewChild2").style.paddingRight = null;
      viewmore.querySelector("#viewChild2").style.paddingTop = null;
      viewmore.querySelector("#viewChild2").style.paddingBottom = null;
    } else {
      viewmore.querySelector("#viewChild1").style.transitionDuration = "1s";
      viewmore.querySelector("#viewChild3").style.transitionDuration = "1s";
      viewmore.querySelector("#viewChild2").style.transitionDuration = "1s";
    }
  });
}
