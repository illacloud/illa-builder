import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers"
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { AddIcon, Button } from "@illa-design/react"
import {
  columnLabelStyle,
  columnNumStyle,
} from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/ColumnSetter/style"
import { ColumnContainerProps } from "./interface"
import {
  containerStyle,
  listStyle,
  optionListHeaderStyle,
  optionListLabelStyle,
} from "./style"

export const ColumnContainer: FC<ColumnContainerProps> = (props) => {
  const {
    onDragEnd,
    handleUpdateMultiAttrDSL,
    attrName,
    value,
    hideTitle,
    onClickNew,
    columnNum,
    children,
    items,
    headerExtNode,
  } = props

  const { t } = useTranslation()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  return (
    <div css={containerStyle}>
      <div css={columnLabelStyle}>
        <div css={columnNumStyle}>
          {t("editor.inspect.setter_content.column_setter.label", {
            number: columnNum,
          })}
        </div>
        <Button
          leftIcon={<AddIcon />}
          variant="text"
          size="small"
          colorScheme="techPurple"
          onClick={() => {
            onClickNew()
          }}
        >
          {t("editor.inspect.setter_content.column_setter.new")}
        </Button>
      </div>
      <div css={listStyle}>
        {!hideTitle && (
          <div css={optionListHeaderStyle}>
            <div css={optionListLabelStyle}>
              {t("editor.inspect.setter_content.column_setter.title")}
            </div>
            {headerExtNode}
          </div>
        )}
        <DndContext
          modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={
            onDragEnd
              ? onDragEnd
              : (event) => {
                  if (value === undefined || attrName == undefined) {
                    return
                  }
                  const { active, over } = event
                  if (active && over && active.id !== over.id) {
                    const oldIndex = value.findIndex(
                      (item) => item.id === active.id,
                    )
                    const newIndex = value.findIndex(
                      (item) => item.id === over.id,
                    )
                    const finalColumns = arrayMove(value, oldIndex, newIndex)
                    handleUpdateMultiAttrDSL?.({
                      [attrName]: finalColumns,
                    })
                    return finalColumns
                  }
                }
          }
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {children}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}
