import { UniqueIdentifier } from "@dnd-kit/core"
import { DragEndEvent } from "@dnd-kit/core/dist/types"
import { PropsWithChildren, ReactNode } from "react"

export interface ColumnContainerProps extends PropsWithChildren {
  onDragEnd?: (event: DragEndEvent) => void
  hideTitle?: boolean
  columnNum: number
  handleUpdateMultiAttrDSL?: (updateSlice: Record<string, unknown>) => void
  attrName?: string
  value?: any[]
  onClickNew: () => void
  items: (
    | UniqueIdentifier
    | {
        id: UniqueIdentifier
      }
  )[]
  headerExtNode?: ReactNode
}
