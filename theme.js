// Dark/light mode toggle.
//
// This file does two separate jobs on purpose:
//
// 1. The very first few lines run immediately, the moment this script
//    tag is hit in <head> — before the browser has painted anything.
//    That's what stops a "flash" of the wrong theme: by the time the
//    page is visible, data-theme is already set correctly.
// 2. Everything inside the DOMContentLoaded listener wires up the
//    toggle button itself, which can only happen once the button
//    actually exists in the page.

(function applyStoredTheme() {
  var stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch (err) {
    // localStorage can throw in some private-browsing modes — if so,
    // just fall through to the system preference below.
  }

  var theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", theme);
})();

document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.getElementById("theme-toggle");
  var label = document.getElementById("theme-label");
  if (!toggle || !label) return;

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  // Updates everything except the label text, which fadeToLabel() below
  // handles separately so it can crossfade instead of snapping instantly.
  function updateToggleState(theme) {
    var isDark = theme === "dark";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }

  function fadeToLabel(text) {
    label.style.opacity = "0";
    window.setTimeout(function () {
      label.textContent = text;
      label.style.opacity = "1";
    }, 150);
  }

  // Sync the button with whatever theme applyStoredTheme() already set,
  // so it's correct even before the first click. No crossfade here —
  // this runs once on page load, there's nothing to fade from.
  updateToggleState(currentTheme());
  label.textContent = currentTheme() === "dark" ? "Dark" : "Light";

  toggle.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    updateToggleState(next);
    fadeToLabel(next === "dark" ? "Dark" : "Light");
    try {
      localStorage.setItem("theme", next);
    } catch (err) {
      // If storage is unavailable, the toggle still works for this
      // page view — it just won't be remembered on the next visit.
    }
  });
});
