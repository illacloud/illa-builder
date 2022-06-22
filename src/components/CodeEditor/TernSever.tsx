import tern from "tern"
import "codemirror/addon/tern/worker"
// import "codemirror/addon/tern/tern.css"
import "codemirror/addon/tern/tern"
// import 'tern/lib/tern';
// import 'tern/plugin/complete_strings';
// import 'tern/doc/demo/polyfill';
// import 'tern/lib/signal';
// import 'tern/lib/def';
// import 'tern/lib/comment';
// import 'tern/lib/infer';
// import "tern/plugin/doc_comment"
import ecmascript from "tern/defs/ecmascript.json"
import CodeMirror from "codemirror"
import ReactDOM from "react-dom"
import { HintComplement } from "@/components/EditorInput/AutoComplete/HintComplement"

// create global variable
// @ts-ignore
// see in: https://github.com/codemirror/codemirror5/issues/5362
window.tern = tern

export const TernServer = (data: Record<any, any> = {}) => {
  return new CodeMirror.TernServer({
    defs: [ecmascript, data],
    completionTip: (data) => {
      console.log(data, "completionTip")
      let div = document.createElement("div")
      let a = ReactDOM.render(<HintComplement />, div)
      return div
    },
  })
}
