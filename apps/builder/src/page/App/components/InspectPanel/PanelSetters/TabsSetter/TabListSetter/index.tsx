import { get } from "lodash"
import { FC, memo } from "react"
import { useSelector } from "react-redux"
import { Column } from "@/page/App/components/InspectPanel/PanelSetters/DragMoveComponent/Column"
import { ColumnContainer } from "@/page/App/components/InspectPanel/PanelSetters/DragMoveComponent/ColumnContainer"
import { ColumnEmpty } from "@/page/App/components/InspectPanel/PanelSetters/DragMoveComponent/Empty"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { ViewItemShape, ViewSetterProps } from "./interface"
import { generateNewViewItem } from "./utils/generateNewOptions"

const TabListSetter: FC<ViewSetterProps> = memo((props: ViewSetterProps) => {
  const {
    value,
    attrName,
    widgetDisplayName,
    childrenSetter,
    handleUpdateMultiAttrDSL,
  } = props
  const executionResult = useSelector(getExecutionResult)

  const allViews = get(
    executionResult,
    `${widgetDisplayName}.${attrName}`,
    [],
  ) as ViewItemShape[]

  return (
    <ColumnContainer
      attrName={attrName}
      value={value}
      handleUpdateMultiAttrDSL={handleUpdateMultiAttrDSL}
      columnNum={value.length}
      items={value.map((item) => item.id)}
      onClickNew={() => {
        const newItem = generateNewViewItem(allViews.map((view) => view.key))
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
                const newItem = generateNewViewItem(
                  allViews.map((view) => view.key),
                )
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
