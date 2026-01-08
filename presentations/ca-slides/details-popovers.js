/**
 * Accessible "More" popovers for slide details.
 * This script can be loaded after b6plus.js to leave that upstream file untouched.
 */

(function() {
"use strict";

const entries = [];
let handlersInstalled = false;
let counter = 0;

const hidePopover = entry => {
  entry.details.classList.remove("details-open");
  entry.trigger.setAttribute("aria-expanded", "false");
  entry.details.setAttribute("aria-hidden", "true");
};

const showPopover = entry => {
  entry.details.classList.add("details-open");
  entry.trigger.setAttribute("aria-expanded", "true");
  entry.details.setAttribute("aria-hidden", "false");
};

const togglePopover = entry => {
  if (entry.details.classList.contains("details-open")) {
    hidePopover(entry);
  } else {
    for (const other of entries) hidePopover(other);
    showPopover(entry);
  }
};

const ensureHandlers = () => {
  if (handlersInstalled) return;
  handlersInstalled = true;

  document.addEventListener("click", event => {
    if (event.target.closest(".details") ||
        event.target.closest(".details-trigger")) return;
    for (const entry of entries) hidePopover(entry);
  });

  document.addEventListener("keyup", event => {
    if (event.key === "Escape")
      for (const entry of entries) hidePopover(entry);
  });
};

const initDetails = () => {
  const details = Array.from(document.querySelectorAll(".details"));
  if (details.length === 0) return;

  document.body.classList.add("details-popovers-ready");

  const moreLabel = typeof window._ === "function" ? _("More") : "More";

  for (const detail of details) {
    if (detail.dataset.detailsPopoverInit) continue;
    detail.dataset.detailsPopoverInit = "true";
    counter += 1;

    const slide = detail.closest(".slide") || document.body;
    detail.id = detail.id || "details-popup-" + counter;
    detail.setAttribute("aria-hidden", "true");

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "details-trigger";
    trigger.textContent = moreLabel;
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", detail.id);

    const notesContainer = slide.querySelector(":scope > .notes");
    if (notesContainer) {
      notesContainer.appendChild(trigger);
    } else {
      slide.insertBefore(trigger, detail);
    }

    const entry = {details: detail, trigger};
    entries.push(entry);

    trigger.addEventListener("click", event => {
      event.stopPropagation();
      togglePopover(entry);
    });
    trigger.addEventListener("focus", () => showPopover(entry));
    trigger.addEventListener("pointerenter", () => showPopover(entry));
    detail.addEventListener("pointerenter", () => showPopover(entry));
  }

  ensureHandlers();
};

const initialize = () => {
  initDetails();
};

if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", initialize);
else
  initialize();

})();
