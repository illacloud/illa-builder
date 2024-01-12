import { get, isString } from "lodash-es"
import { FC } from "react"
import { useSelector } from "react-redux"
import { v4 } from "uuid"
import { Column } from "@/page/App/components/InspectPanel/PanelSetters/DragMoveComponent/Column"
import { ColumnContainer } from "@/page/App/components/InspectPanel/PanelSetters/DragMoveComponent/ColumnContainer"
import { ColumnEmpty } from "@/page/App/components/InspectPanel/PanelSetters/DragMoveComponent/Empty"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { ColumnButtonGroupSetterProps, GroupButton } from "./interface"

const ColumnButtonGroupSetter: FC<ColumnButtonGroupSetterProps> = (props) => {
  const {
    attrName,
    handleUpdateMultiAttrDSL,
    childrenSetter,
    value,
    widgetDisplayName,
  } = props

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const executeValue: GroupButton[] =
    get(targetComponentProps, attrName, undefined) ?? []

  return (
    <ColumnContainer
      hideTitle
      columnNum={value?.length ?? 0}
      onClickNew={() => {
        handleUpdateMultiAttrDSL?.({
          [attrName]: [
            ...(value ?? []),
            {
              id: v4(),
              mappedValue: "Button",
              colorScheme: "blue",
            } as GroupButton,
          ],
        })
      }}
      attrName={attrName}
      value={value}
      handleUpdateMultiAttrDSL={handleUpdateMultiAttrDSL}
      items={value?.map((v) => v.id) ?? []}
    >
      {value && value.length > 0 ? (
        value.map((v, index) => {
          return (
            <Column
              key={v.id}
              label={
                isString(executeValue[index].mappedValue)
                  ? executeValue[index].mappedValue
                  : JSON.stringify(executeValue[index].mappedValue)
              }
              showDelete={true}
              showVisible={false}
              attrPath={`${attrName}.${index}`}
              childrenSetter={childrenSetter}
              onDelete={(id) => {
                const finalColumns = value.filter((item) => item.id !== id)
                handleUpdateMultiAttrDSL?.({
                  [attrName]: finalColumns,
                })
              }}
              id={v.id}
              widgetDisplayName={widgetDisplayName}
            />
          )
        })
      ) : (
        <ColumnEmpty />
      )}
    </ColumnContainer>
  )
}

ColumnButtonGroupSetter.displayName = "ColumnButtonGroupSetter"

export default ColumnButtonGroupSetter
