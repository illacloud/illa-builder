import { FC } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { CanvasWidget } from "../../wrappedComponents/CanvasWidget"

export const Setting: FC = () => {
  const dsl = {
    id: "dslRoot",
    parentId: "root",
    version: "0.0.1",
    children: [
      {
        id: "dsl1ce1f734-4418-4e87-aee6-9e7a1bf0f12b",
        version: "0.0.1",
        type: "TEST_WIDGET",
        category: "view",
        widgetName: "view",
        parentId: "dslRoot",
        props: {
          height: "auto",
          width: "auto",
          position: "absolute",
          nodeText: "input",
          topRow: "243px",
          leftColumn: "52px",
          rightColumn: "auto",
          bottomRow: "auto",
        },
      },
    ],
    type: "CANVAS_WIDGET",
    category: "layout",
    widgetName: "layout",
    props: {
      height: "100%",
      width: "100%",
      leftColumn: "auto",
      rightColumn: "auto",
      topRow: "auto",
      bottomRow: "auto",
      position: "absolute",
    },
  }

  return (
    <DndProvider backend={HTML5Backend}>
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      Setting
      <CanvasWidget {...dsl} />
    </div>
    </DndProvider>
  )
}
