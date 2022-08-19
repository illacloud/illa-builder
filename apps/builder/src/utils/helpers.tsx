/*
 * unfocus all window selection
 *
 * @param document
 * @param window
 */
export function unFocus(document: Document, window: Window) {
  if (document.getSelection()) {
    document.getSelection()?.empty()
  } else {
    try {
      window.getSelection()?.removeAllRanges()
    } catch (e) {}
  }
}
