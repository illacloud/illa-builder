import { createContext, FC, ReactNode, useMemo } from "react"
import { ActionResultType } from "@/page/App/components/ActionEditor/ActionEditorPanel/ActionResult/interface"

interface Injected {
  onDeleteActionItem: () => void
  onDuplicateActionItem: () => void
  handleUpdateResult: (result: ActionResultType) => void
}

interface IProps extends Injected {
  children?: ReactNode
}

export const ACTION_EDITOR_CONTEXT = createContext<Injected>({} as Injected)

export const ActionEditorProvider: FC<IProps> = (props) => {
  const {
    children,
    onDeleteActionItem,
    onDuplicateActionItem,
    handleUpdateResult,
  } = props

  const value = useMemo(() => {
    return {
      onDuplicateActionItem,
      onDeleteActionItem,
      handleUpdateResult,
    }
  }, [onDuplicateActionItem, onDeleteActionItem, handleUpdateResult])

  return (
    <ACTION_EDITOR_CONTEXT.Provider value={value}>
      {children}
    </ACTION_EDITOR_CONTEXT.Provider>
  )
}
