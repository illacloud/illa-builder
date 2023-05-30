import align from "@/assets/richText/align.svg"
import alignCenter from "@/assets/richText/alignCenter.svg"
import alignLeft from "@/assets/richText/alignLeft.svg"
import alignRight from "@/assets/richText/alignRight.svg"
import bold from "@/assets/richText/bold.svg"
import clear from "@/assets/richText/clear.svg"
import code from "@/assets/richText/code.svg"
import embedded from "@/assets/richText/embedded.svg"
import italic from "@/assets/richText/italic.svg"
import link from "@/assets/richText/link.svg"
import orderList from "@/assets/richText/orderList.svg"
import redo from "@/assets/richText/redo.svg"
import strike from "@/assets/richText/strike.svg"
import unLink from "@/assets/richText/unLink.svg"
import underline from "@/assets/richText/underline.svg"
import undo from "@/assets/richText/undo.svg"
import unorderList from "@/assets/richText/unorderList.svg"

export const EMPTY_LABEL = "<p></p>"

export const TOOLBAR_CONFIG = {
  inline: {
    options: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "monospace",
      "superscript",
      "subscript",
    ],
    bold: { icon: bold },
    italic: { icon: italic },
    underline: { icon: underline },
    strikethrough: { icon: strike },
    monospace: { icon: code },
  },
  fontSize: {
    options: [12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
  },
  list: {
    options: ["ordered", "unordered"],
    unordered: { icon: unorderList },
    ordered: { icon: orderList },
  },
  textAlign: {
    center: { icon: alignCenter },
    left: { icon: alignLeft },
    right: { icon: alignRight },
    justify: { icon: align },
  },
  colorPicker: {
    icon: "",
    popupClassName: "colorPopup",
  },
  link: {
    link: { icon: link },
    unlink: { icon: unLink },
    popupClassName: "linkPopup",
  },
  embedded: {
    icon: embedded,
    popupClassName: "embeddedPopup",
  },
  remove: {
    icon: clear,
  },
  history: {
    undo: { icon: undo },
    redo: { icon: redo },
  },
  blockType: {
    className: "blockType",
  },
  options: [
    "link",
    "image",
    "colorPicker",
    "embedded",
    "blockType",
    "fontSize",
    "textAlign",
    "inline",
    "list",
    "remove",
    "history",
  ],
}
