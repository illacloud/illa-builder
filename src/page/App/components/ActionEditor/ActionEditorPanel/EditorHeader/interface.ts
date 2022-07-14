export interface DropDownListProps {
  onDeleteActionItem: () => void
  onDuplicateActionItem: () => void
}

export interface ActionEditorHeaderMoreButtonProps extends DropDownListProps {}

export interface ActionEditorHeaderProps
  extends ActionEditorHeaderMoreButtonProps {}
