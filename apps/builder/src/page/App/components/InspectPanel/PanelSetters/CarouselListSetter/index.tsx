import { FC } from "react"
import { v4 } from "uuid"
import { Column } from "@/page/App/components/InspectPanel/PanelSetters/DragMoveComponent/Column"
import { ColumnContainer } from "@/page/App/components/InspectPanel/PanelSetters/DragMoveComponent/ColumnContainer"
import { ColumnEmpty } from "@/page/App/components/InspectPanel/PanelSetters/DragMoveComponent/Empty"
import { CarouselListSetterProps } from "./interface"

const CarouselListSetter: FC<CarouselListSetterProps> = (props) => {
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
          label: `Image ${value.length + 1}`,
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
                  id: `views-${v4()}`,
                  key: `views-${v4()}`,
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
}

CarouselListSetter.displayName = "CarouselListSetter"
export default CarouselListSetter
