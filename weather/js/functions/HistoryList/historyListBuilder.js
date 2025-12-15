/**
 * clears history container
 * @param {HTMLElement} DOMParent - history container element
 */

export function historyListBuilder(DOMParent) {
  while (DOMParent.firstChild) {
    DOMParent.removeChild(DOMParent.firstChild);
  }
}
