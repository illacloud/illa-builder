import { createContext, FC, ReactNode, useMemo } from "react"
import { ActionResultType } from "@/page/App/components/ActionEditor/ActionEditorPanel/ActionResult/interface"

interface Injected {
  onDeleteActionItem: () => void
  onDuplicateActionItem: () => void
  handleUpdateResult: (result: ActionResultType) => void
  onEditResource?: (id: string) => void
  onCreateResource?: () => void
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
    onEditResource,
    onCreateResource,
  } = props

  const value = useMemo(() => {
    return {
      onDuplicateActionItem,
      onDeleteActionItem,
      handleUpdateResult,
      onEditResource,
      onCreateResource,
    }
  }, [
    onDuplicateActionItem,
    onDeleteActionItem,
    handleUpdateResult,
    onEditResource,
    onCreateResource,
  ])

  return (
    <ACTION_EDITOR_CONTEXT.Provider value={value}>
      {children}
    </ACTION_EDITOR_CONTEXT.Provider>
  )
}
