import "codemirror/addon/hint/sql-hint"
import "codemirror/addon/hint/javascript-hint"
import CodeMirror from "codemirror"
import ReactDOM from "react-dom"
import { AutoCompleteItem } from "@/components/EditorInput/AutoComplete/item"

let origJsHint = CodeMirror.hint.javascript
CodeMirror.hint.javascript = function (cm, option) {
  let inner = origJsHint(cm, option) || {
    from: cm.getCursor(),
    to: cm.getCursor(),
    list: [],
  }
  console.log(inner, cm, option, "javascript inner")
  inner?.list?.push({
    text: "bozo",
    render: (elt: HTMLLIElement) => {
      // console.log(elt, "render")
      let div = document.createElement("div")
      ReactDOM.render(
        <AutoCompleteItem type={"String"} content={"bozo"} />,
        div,
      )
      elt?.appendChild(div)
    },
  })
  return inner
}

const hintWords = ["trap.our()", "trap.hints()", "trap"]
const jsHinter = CodeMirror.hint.javascript
CodeMirror.hint.javascript = function (editor, option) {
  const cursor = editor.getCursor()
  const currentLine = editor.getLine(cursor.line)
  let start = cursor.ch
  let end = start
  const rex = /[\w.]/
  while (end < currentLine.length && rex.test(currentLine.charAt(end))) ++end
  while (start && rex.test(currentLine.charAt(start - 1))) --start
  const curWord = start !== end && currentLine.slice(start, end)
  const dflt = jsHinter(editor, option)
  const result = dflt || {
    from: CodeMirror.Pos(cursor.line, end),
    to: CodeMirror.Pos(cursor.line, end),
    list: [],
  }
  // Add our custom hintWords to the list, if they start with the curWord...
  hintWords.forEach((h) => {
    if (h.startsWith(curWord)) result.list.push(h)
  })
  result.list.sort() // sort the final list of hints
  return result
}

let origSqlHint = CodeMirror.hint.sql
CodeMirror.hint.sql = function (cm, option) {
  cm.doc.modeOption = "sql"
  let inner = origSqlHint(cm, option) || {
    from: cm.getCursor(),
    to: cm.getCursor(),
    list: [],
  }
  console.log(inner, cm, option, "sql inner")
  inner?.list?.push("bozo")
  return inner
}
