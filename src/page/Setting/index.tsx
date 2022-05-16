import { useEffect } from "react"
import { FC, useState } from "react"
import { ContainerWidget } from "../../wrappedComponents/ContainerWidget"
import {widgetBuilder} from "../../wrappedComponents/WidgetBuilder";

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
          leftColumn: "752px",
          rightColumn: "auto",
          bottomRow: "auto",
        },
      },
    ],
    type: "CONTAINER_WIDGET",
    category: "layout",
    widgetName: "layout",
    props: {
      height: "auto",
      width: "auto",
      leftColumn: "auto",
      rightColumn: "auto",
      topRow: "auto",
      bottomRow: "auto",
      position: "absolute",
    },
  }

  return (
    <div>
      Setting
      <ContainerWidget {...dsl} />
    </div>
  )
}
