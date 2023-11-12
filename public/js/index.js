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
  let {
    scrollTop
  } = document.documentElement;
  if (scrollTop > lastScroll) {
    nav.style.top = "-100%";
  } else {
    nav.style.top = "0";
  }
  lastScroll = scrollTop;
});


if (window.location.pathname == "/") {
  const scrollReveal = document.querySelectorAll(".scrollReveal");
  document.addEventListener("scroll", () => {
    scrollReveal.forEach((element) => {
        let boundTop = element.getBoundingClientRect().top;
        let heightSticky = element.querySelector(".sticky").offsetHeight;
        let bottomSticky = element.querySelector(".sticky").getBoundingClientRect().bottom;
        let borderBottom = element.querySelector(".borderBottom");
        let borderTop = element.querySelector(".borderTop");
        let topHead = element.querySelector(".topHead");
        let bottomHead = element.querySelector(".bottomHead");
        if (boundTop <= 0 && boundTop + bottomSticky >= 0) {
          let distance = -boundTop
          let scaleX = 1 - distance / heightSticky;
          console.log("boundTop", boundTop);
          console.log("bottomSticky", bottomSticky);
          console.log("distance", distance);
          console.log("scaleX", scaleX);
          console.log("heightSticky", heightSticky, "\n \n \n \n");
          borderTop.style.transform = `scaleY(${scaleX})`;
          borderBottom.style.transform = `scaleY(${scaleX})`;
          topHead.style.transform = `scaleY(${1 / scaleX}) translateY(${distance / 4}px)`;
          bottomHead.style.transform = `scaleY(${1 / scaleX}) translateY(-${distance / 4}px)`;
          element.querySelector(".sticky").style.zIndex = "5";
          element.querySelectorAll(".support").forEach((sup) => {
            sup.style.transform = `scaleY(${1 / scaleX}) translateY(-${distance / 4}px)`;
          })
        }else if (boundTop > 0) {
          borderTop.style.transform = `scaleY(1)`;
          borderBottom.style.transform = `scaleY(1)`;
          topHead.style.transform = `scaleY(1) translateY(0px)`;
          bottomHead.style.transform = `scaleY(1) translateY(0px)`;
          element.querySelector(".sticky").style.zIndex = "5";
          element.querySelectorAll(".support").forEach((sup) => {
            sup.style.transform = `scaleY(1) translateY(0px)`;
          })
        }else {
          borderTop.style.transform = `scaleY(0)`;
          borderBottom.style.transform = `scaleY(0)`;
          topHead.style.transform = `scaleY(1) translateY(0px)`;
          bottomHead.style.transform = `scaleY(1) translateY(0px)`;
          element.querySelector(".sticky").style.zIndex = "-5";
          element.querySelectorAll(".support").forEach((sup) => {
            sup.style.transform = `scaleY(1) translateY(0px)`;
          })
        }
      })
    });





  const viewmore = document.querySelector("#viewmore");
  const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
    const {
      top,
      left,
      bottom,
      right
    } = el.getBoundingClientRect();
    const {
      innerHeight,
      innerWidth
    } = window;
    return partiallyVisible ? top > 0 && top < innerHeight || bottom > 0 && bottom < innerHeight : top >= 0 && bottom <= innerHeight;
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