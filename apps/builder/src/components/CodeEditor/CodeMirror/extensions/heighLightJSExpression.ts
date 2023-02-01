import { Range } from "@codemirror/state"
import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view"
import { IExpressionShape } from "@/components/CodeEditor/CodeMirror/extensions/interface"

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

const getHighlightExtDecorations = (value: {
  decoration: DecorationSet
  update: (update: ViewUpdate) => void
}) => value.decoration

const getCls = (expressions?: IExpressionShape[]) => {
  return class {
    decoration: DecorationSet
    constructor(view: EditorView) {
      this.decoration = getDecoration(view, expressions)
    }
    update(update: ViewUpdate) {
      this.decoration = getDecoration(update.view, expressions)
    }
  }
}
export const getHighlightExpressionExtension = (
  expressions?: IExpressionShape[],
) => {
  return ViewPlugin.fromClass(getCls(expressions), {
    decorations: getHighlightExtDecorations,
  })
}
