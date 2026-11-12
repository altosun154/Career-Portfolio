// ScrollReveal integration — fades/raises content in as it enters the
// viewport. Loaded after the ScrollReveal CDN script, so the global
// `ScrollReveal` function is already available here.
//
// Deliberately does NOT target `figure img`: those images already have
// their own CSS transform/transition (the slight rotate-on-hover in
// styles.css). ScrollReveal reveals elements by setting an inline
// `transform` style directly on them, which would silently fight with
// that existing rule. Targeting the surrounding `figure` instead gets
// the same visual effect without the two features touching the same
// property on the same element.

document.addEventListener("DOMContentLoaded", function () {
  if (typeof ScrollReveal !== "function") return; // CDN didn't load — page still works, just without the animation.

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var sr = ScrollReveal({
    distance: reduceMotion ? "0px" : "24px",
    duration: reduceMotion ? 1 : 600,
    easing: "ease-out",
    reset: false,
    mobile: true,
  });

  sr.reveal("section > h2", { interval: 60 });
  sr.reveal("#projects > article, #projects > details", {
    origin: "bottom",
    interval: 120,
  });
  sr.reveal("figure", { origin: "bottom" });
  sr.reveal("#experience table", { origin: "bottom" });
});
