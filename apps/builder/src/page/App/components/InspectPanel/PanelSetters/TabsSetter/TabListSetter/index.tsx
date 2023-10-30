import { FC, memo } from "react"
import { v4 } from "uuid"
import { Column } from "@/page/App/components/InspectPanel/PanelSetters/DragMoveComponent/Column"
import { ColumnContainer } from "@/page/App/components/InspectPanel/PanelSetters/DragMoveComponent/ColumnContainer"
import { ColumnEmpty } from "@/page/App/components/InspectPanel/PanelSetters/DragMoveComponent/Empty"
import { ViewSetterProps } from "./interface"

const TabListSetter: FC<ViewSetterProps> = memo((props: ViewSetterProps) => {
  const {
    value,
    attrName,
    widgetDisplayName,
    childrenSetter,
    handleUpdateMultiAttrDSL,
  } = props

  return (
    <ColumnContainer
      attrName={attrName}
      value={value}
      handleUpdateMultiAttrDSL={handleUpdateMultiAttrDSL}
      columnNum={value.length}
      items={value.map((item) => item.id)}
      onClickNew={() => {
        const newItem = {
          id: `views-${v4()}`,
          key: `views-${v4()}`,
          label: `Tab ${value.length + 1}`,
        }
        handleUpdateMultiAttrDSL?.({
          [attrName]: [...value, newItem],
        })
      }}
    >
      {value.length > 0 ? (
        value.map((item, index) => {
          return (
            <Column
              onCopy={() => {
                const newItem = {
                  id: `views-${v4()}`,
                  key: `views-${v4()}`,
                  label: value[index].label,
                  disabled: value[index].disabled,
                }
                const updatedArray = [...value, newItem]
                handleUpdateMultiAttrDSL?.({
                  [attrName]: updatedArray,
                })
              }}
              onDelete={(id) => {
                const newV = value.filter((item) => item.id !== id)
                handleUpdateMultiAttrDSL?.({
                  [attrName]: newV,
                  currentIndex: 0,
                  currentKey: newV[0]?.key,
                })
              }}
              showCopy
              showDelete
              key={item.id}
              id={item.id}
              label={item.label}
              widgetDisplayName={widgetDisplayName}
              childrenSetter={childrenSetter}
              attrPath={`${attrName}.${index}`}
            />
          )
        })
      ) : (
        <ColumnEmpty />
      )}
    </ColumnContainer>
  )
})

TabListSetter.displayName = "TabListSetter"
export default TabListSetter
