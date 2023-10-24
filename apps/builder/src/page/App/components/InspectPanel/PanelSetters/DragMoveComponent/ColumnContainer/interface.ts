import { UniqueIdentifier } from "@dnd-kit/core"
import { DragEndEvent } from "@dnd-kit/core/dist/types"
import { PropsWithChildren } from "react"

export interface ColumnContainerProps extends PropsWithChildren {
  hideTitle?: boolean
  columnNum: number
  onClickNew: () => void
  onDragEnd?: (event: DragEndEvent) => void
  items: (
    | UniqueIdentifier
    | {
        id: UniqueIdentifier
      }
  )[]
}
