import CodeMirror from "codemirror"
import "codemirror/addon/mode/multiplex"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/sql/sql"
import "codemirror/addon/hint/sql-hint"

CodeMirror.defineMode("sql-js", function (config) {
  return CodeMirror.multiplexingMode(
    CodeMirror.getMode(config, "sql"),
    {
      open: "{{",
      close: "}}",
      mode: CodeMirror.getMode(config, {
        name: "javascript",
      })
    },
  );
});

CodeMirror.defineMode("text-js", (config, parserConfig) => ({
  token: (stream, state) => {
    const cmCustomCheckStreamFn = (streamWrapper) => {
      const reg = /\{\{.*?\}\}/g
      const targetStr = streamWrapper.match(reg) || ""
      if (targetStr[0]?.length && streamWrapper.match(targetStr[0])) {
        return "test-style"
      }
      // const customKeyWords = [['BEGIN', 'begin-style'], ['END', 'end-style']];
      // for (let i = 0; i < customKeyWords.length; i++) {
      //   // console.log(streamWrapper.match(customKeyWords[i][0]))
      //   if (streamWrapper.match(customKeyWords[i][0])) { return customKeyWords[i][1]; }
      // }
      return ""
    }

    // console.log(stream)

    const ret = cmCustomCheckStreamFn(stream)
    if (ret.length > 0) return ret

    stream.next()
    return null
  },
}))
