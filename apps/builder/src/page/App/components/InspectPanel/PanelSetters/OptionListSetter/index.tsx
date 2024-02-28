import { get, isString } from "lodash-es"
import { FC } from "react"
import { useSelector } from "react-redux"
import { v4 } from "uuid"
import { Column } from "@/page/App/components/InspectPanel/PanelSetters/DragMoveComponent/Column"
import { ColumnContainer } from "@/page/App/components/InspectPanel/PanelSetters/DragMoveComponent/ColumnContainer"
import { ColumnEmpty } from "@/page/App/components/InspectPanel/PanelSetters/DragMoveComponent/Empty"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { OptionListSetterProps } from "./interface"

const OptionListSetter: FC<OptionListSetterProps> = (props) => {
  const {
    value,
    attrName,
    widgetDisplayName,
    childrenSetter,
    handleUpdateMultiAttrDSL,
    itemName = "Option",
  } = props

  const execResult = useSelector(getExecutionResult)
  const executeValue = get(execResult, `${widgetDisplayName}.${attrName}`, [])

  return (
    <ColumnContainer
      attrName={attrName}
      value={value}
      handleUpdateMultiAttrDSL={handleUpdateMultiAttrDSL}
      columnNum={value.length}
      items={value.map((item) => item.id)}
      onClickNew={() => {
        const newItem = {
          id: `${itemName}-${v4()}`,
          key: `${itemName}-${v4()}`,
          label: `${itemName} ${value.length + 1}`,
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
                  ...value[index],
                  id: `${itemName}-${v4()}`,
                  key: `${itemName}-${v4()}`,
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
                })
              }}
              showCopy
              showDelete
              key={item.id}
              id={item.id}
              label={
                isString(get(executeValue, `${index}.label`))
                  ? get(executeValue, `${index}.label`)
                  : JSON.stringify(get(executeValue, `${index}.label`))
              }
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
}

OptionListSetter.displayName = "OptionListSetter"
export default OptionListSetter
