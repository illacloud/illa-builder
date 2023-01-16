import { getColor } from "@illa-design/react"
import ArrayIcon from "@/components/CodeEditor/CodeMirror/assets/array.svg"
import BooleanIcon from "@/components/CodeEditor/CodeMirror/assets/boolean.svg"
import FunctionIcon from "@/components/CodeEditor/CodeMirror/assets/function.svg"
import KeywordIcon from "@/components/CodeEditor/CodeMirror/assets/keyword.svg"
import NullIcon from "@/components/CodeEditor/CodeMirror/assets/null.svg"
import NumberIcon from "@/components/CodeEditor/CodeMirror/assets/number.svg"
import ObjectIcon from "@/components/CodeEditor/CodeMirror/assets/object.svg"
import StringIcon from "@/components/CodeEditor/CodeMirror/assets/string.svg"
import TableIcon from "@/components/CodeEditor/CodeMirror/assets/table.svg"
import TypeIcon from "@/components/CodeEditor/CodeMirror/assets/type.svg"
import UnknownIcon from "@/components/CodeEditor/CodeMirror/assets/undefine.svg"
import {
  defaultHighlightClassName,
  errorHighlightClassName,
} from "@/components/CodeEditor/CodeMirror/extensions/heighlightJSExpression"

export const ILLACodeMirrorTheme = {
  "&.cm-editor .cm-scroller": {
    fontFamily: "Fira Code",
    fontSize: "14px",
    lineHeight: "18px",
  },
  "&.cm-editor .cm-content": {
    padding: "6px 8px",
  },
  "&.cm-editor .cm-line": {
    padding: 0,
  },
  "&.cm-editor.cm-focused .cm-matchingBracket": {
    color: getColor("green", "03"),
    backgroundColor: "rgba(0, 170, 91, 0.08);",
  },
  "&.cm-editor .cm-placeholder": {
    color: getColor("grayBlue", "04"),
    height: "18px",
  },
  "&.cm-editor .cm-tooltip-autocomplete": {
    border: "none",
  },
  "&.cm-editor .cm-completionIcon": {
    width: "14px",
    height: "14px",
    fontSize: "14px",
    opacity: 1,
    paddingRight: "8px",
    position: "absolute",
    top: "5px",
  },
  "&.cm-editor .cm-completionIcon-Function::after": {
    content: `url(${FunctionIcon})`,
  },
  "&.cm-editor .cm-completionIcon-Object::after": {
    content: `url(${ObjectIcon})`,
  },
  "&.cm-editor .cm-completionIcon-Number::after": {
    content: `url(${NumberIcon})`,
  },
  "&.cm-editor .cm-completionIcon-String::after": {
    content: `url(${StringIcon})`,
  },
  "&.cm-editor .cm-completionIcon-Boolean::after": {
    content: `url(${BooleanIcon})`,
  },
  "&.cm-editor .cm-completionIcon-Array::after": {
    content: `url(${ArrayIcon})`,
  },
  "&.cm-editor .cm-completionIcon-Null::after": {
    content: `url(${NullIcon})`,
  },
  "&.cm-editor .cm-completionIcon-Unknown::after": {
    content: `url(${UnknownIcon})`,
  },
  "&.cm-editor .cm-completionIcon-type::after": {
    content: `url(${TypeIcon})`,
  },
  "&.cm-editor .cm-completionIcon-keyword::after": {
    content: `url(${KeywordIcon})`,
  },
  "&.cm-editor .cm-completionIcon-table::after": {
    content: `url(${TableIcon})`,
  },
  "&.cm-editor .cm-tooltip-autocomplete>ul .cm-completionLabel": {
    fontSize: "12px",
    lineHeight: "22px",
    position: "absolute",
    left: "25px",
    top: "2px",
  },
  "&.cm-editor .cm-tooltip-autocomplete>ul .cm-completionLabel .cm-completionMatchedText":
    {
      fontWeight: 600,
      textDecoration: "none",
    },
  "&.cm-editor .cm-tooltip-autocomplete>ul .cm-completionDetail": {
    position: "absolute",
    right: "8px",
    top: "2px",
    margin: 0,
    color: getColor("grayBlue", "04"),
    fontSize: "12px",
    lineHeight: "22px",
    fontStyle: "normal",
  },
  "&.cm-editor .cm-tooltip-autocomplete>ul": {
    backgroundColor: getColor("white", "01"),
    border: `1px solid ${getColor("greyBlue", "08")}`,
    boxShadow: " 0px 2px 16px rgba(0, 0, 0, 0.16)",
    borderRadius: "8px",
    fontFamily: "Fira Code",
  },
  "&.cm-editor .cm-tooltip-autocomplete>ul li": {
    height: "24px",
    lineHeight: "24px",
    position: "relative",
    fontFamily: "Fira Code",
  },
  "&.cm-editor .cm-tooltip-autocomplete>ul li[aria-selected]": {
    backgroundColor: getColor("techPurple", "07"),
    color: getColor("techPurple", "01"),
  },
  "&.cm-editor .cm-completionInfo": {
    padding: "4px  8px",
    backgroundColor: getColor("white", "01"),
    border: `1px solid ${getColor("greyBlue", "08")}`,
    boxShadow: "0px 2px 16px rgba(0, 0, 0, 0.16)",
    borderRadius: "8px",
    width: "287px",
  },
  "&.cm-editor .cm-completionInfo  .completionInfoCardTitle": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "&.cm-editor .cm-completionInfo.cm-completionInfo-right": {
    left: "calc(100% + 8px)",
  },
  "&.cm-editor .cm-completionInfo  .completionInfoCardTitle .cardTitle": {
    width: "100%",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "20px",
    color: getColor("techPurple", "01"),
  },
  "&.cm-editor .cm-completionInfo  .completionInfoCardTitle .openInfo": {
    width: "12px",
    height: "12px",
    display: "flex",
    alignItems: "center",
  },
  "&.cm-editor .cm-completionInfo  .completionInfoType": {
    fontSize: "12px",
    color: getColor("grayBlue", "02"),
    margin: 0,
    lineHeight: "20px",
  },
  "&.cm-editor .cm-completionInfo  .completionInfoEvaluatesTitle": {
    fontSize: "12px",
    color: getColor("grayBlue", "02"),
    margin: 0,
    fontWeight: 500,
    lineHeight: "20px",
  },
  "&.cm-editor .cm-completionInfo  .completionInfoDoc": {
    fontSize: "12px",
    color: getColor("grayBlue", "04"),
    margin: 0,
    lineHeight: "20px",
  },
  "&.cm-editor .cm-completionInfo  .evaluatesResult": {
    display: "inline-block",
    margin: 0,
    padding: "0 8px",
    fontSize: "12px",
    lineHeight: "18px",
    color: getColor("grayBlue", "02"),
    backgroundColor: getColor("grayBlue", "09"),
    position: "relative",
    cursor: "pointer",
  },
  "&.cm-editor .cm-completionInfo  .evaluatesResult:hover .evaluatesTooltips": {
    visibility: "visible",
  },
  "&.cm-editor .cm-completionInfo .evaluatesResult .evaluatesTooltips": {
    visibility: "hidden",
    fontFamily: "Fira Code",
    position: "absolute",
    left: "calc(100% + 4px)",
    top: "-50%",
    maxHeight: "162px",
    borderRadius: "4px",
    boxShadow: "0px 2px 16px rgba(0, 0, 0, 0.16);",
    backgroundColor: getColor("grayBlue", "01"),
    padding: "12px 16px",
    fontSize: "14px",
    lineHeight: "18px",
    color: getColor("white", "01"),
    whiteSpace: "pre",
    overflowY: "auto",
    cursor: "auto",
  },
  [`.${defaultHighlightClassName}`]: {
    color: getColor("green", "03"),
    backgroundColor: "rgba(0, 170, 91, 0.08);",
  },
  [`.${errorHighlightClassName}`]: {
    color: getColor("red", "03"),
    backgroundColor: "rgba(255, 71, 71, 0.08);",
  },
}
