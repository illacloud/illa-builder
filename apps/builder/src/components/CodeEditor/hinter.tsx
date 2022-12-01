import CodeMirror, { Hint, Hints } from "codemirror"
import "codemirror/addon/hint/html-hint"
import "codemirror/addon/hint/javascript-hint"
import "codemirror/addon/hint/sql-hint"
import "codemirror/addon/hint/xml-hint"
import { render } from "react-dom"
import { isString } from "@illa-design/react"
import { AutoCompleteItem } from "./AutoComplete"

let origJsHint = CodeMirror.hint.javascript
CodeMirror.hint.javascript = async function (cm, option) {
  return (
    (await origJsHint(cm, option)) || {
      from: cm.getCursor(),
      to: cm.getCursor(),
      list: [],
    }
  )
}

const transHinters = (inner: Hints) => {
  const newList = []
  for (let i = 0; i < inner.list.length; i++) {
    let item = isString(inner.list[i])
      ? (inner.list[i] as string)
      : (inner.list[i] as Hint)?.text
    newList.push({
      text: item,
      render: (elt: HTMLLIElement) => {
        let div = document.createElement("div")
        render(<AutoCompleteItem content={item as string} />, div)
        elt?.appendChild(div)
      },
    })
  }
  inner.list = newList
  return inner
}

let origSqlHint = CodeMirror.hint.sql
CodeMirror.hint.sql = async function (cm, option) {
  const editor = cm
  // [TODO] override sql-hint.js
  // @ts-ignore override doc.modeOption
  // see in: https://github.com/codemirror/codemirror5/issues/5249
  editor.doc.modeOption = "sql"
  let inner = (await origSqlHint(editor, option)) || {
    from: cm.getCursor(),
    to: cm.getCursor(),
    list: [],
  }
  return transHinters(inner)
}

let origXmlHint = CodeMirror.hint.xml
CodeMirror.hint.xml = async function (cm, option) {
  let inner = (await origXmlHint(cm, option)) || {
    from: cm.getCursor(),
    to: cm.getCursor(),
    list: [],
  }
  return transHinters(inner)
}

let origHtmlHint = CodeMirror.hint.html
CodeMirror.hint.html = async function (cm, option) {
  let inner = (await origHtmlHint(cm, option)) || {
    from: cm.getCursor(),
    to: cm.getCursor(),
    list: [],
  }
  return transHinters(inner)
}
