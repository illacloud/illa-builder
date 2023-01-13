import { Range } from "@codemirror/state"
import { Decoration, EditorView } from "@codemirror/view"
import { IExpressionShape } from "@/components/NewCodeEditor/CodeMirror/extensions/interface"

export const defaultHighlightClassName = "cm-default-highlight"
export const errorHighlightClassName = "cm-error-highlight"

const defaultHighlightMark = Decoration.mark({
  class: defaultHighlightClassName,
})
const errorHighlightMark = Decoration.mark({ class: errorHighlightClassName })

export function getDecoration(
  view: EditorView,
  expressions?: IExpressionShape[],
) {
  if (!Array.isArray(expressions) || expressions.length === 0) {
    return Decoration.none
  }
  const value = view.state.doc.toString()
  if (!value) {
    return Decoration.none
  }
  const ranges: Range<Decoration>[] = []
  let i = 0
  expressions.forEach((expression) => {
    const start = value.indexOf(expression.value, i)
    if (start >= 0) {
      i = start + expression.value.length
      const rang = (
        expression.hasError ? errorHighlightMark : defaultHighlightMark
      ).range(start, i)
      ranges.push(rang)
    }
  })
  return Decoration.set(ranges)
}
