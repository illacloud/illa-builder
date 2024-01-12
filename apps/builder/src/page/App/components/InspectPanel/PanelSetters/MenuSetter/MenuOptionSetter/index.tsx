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
import { get, isString } from "lodash-es"
import { FC } from "react"
import { useSelector } from "react-redux"
import { v4 } from "uuid"
import { MenuItemProps, MenuItemType, SubMenuProps } from "@illa-design/react"
import { SetterMenuItem } from "@/page/App/components/InspectPanel/PanelSetters/MenuSetter/MenuOptionSetter/setterMenuItem"
import { SetterSubMenu } from "@/page/App/components/InspectPanel/PanelSetters/MenuSetter/MenuOptionSetter/setterSubMenu"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { ColumnContainer } from "../../DragMoveComponent/ColumnContainer"
import { MenuOptionSetterProps } from "./interface"

function getDifferentLabelFromValue(
  values: MenuItemType[],
  prefix: string,
): string {
  let label = `${prefix}${values.length}`
  let plus = 0
  while (values.find((item) => item.label === label)) {
    plus++
    label = `${prefix}${values.length + plus}`
  }
  return label
}

function getDifferentValueFromValue(
  values: MenuItemType[],
  prefix: string,
  suffix: string,
): string {
  let value = `${prefix}${suffix}${values.length}`
  let plus = 0
  while (values.find((item) => item.value === value)) {
    plus++
    value = `${prefix}${suffix}${values.length + plus}`
  }
  return value
}

export const MenuOptionSetter: FC<MenuOptionSetterProps> = (props) => {
  const {
    handleUpdateMultiAttrDSL,
    attrName,
    value,
    childrenSetter,
    widgetDisplayName,
  } = props

  const execResult = useSelector(getExecutionResult)
  const executeValue = get(
    execResult,
    `${widgetDisplayName}.${attrName}`,
    [],
  ) as MenuItemType[]

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  return (
    <ColumnContainer
      attrName={attrName}
      value={value}
      handleUpdateMultiAttrDSL={handleUpdateMultiAttrDSL}
      items={value.map((item) => item.id!)}
      columnNum={value.length}
      onClickNew={() => {
        handleUpdateMultiAttrDSL?.({
          [attrName]: [
            ...value,
            {
              id: v4(),
              label: getDifferentLabelFromValue(value, "Menu "),
              value: getDifferentValueFromValue(value, "", "menu"),
            },
          ],
        })
      }}
    >
      {value.map((item, index) => (
        <SetterSubMenu
          id={item.id!}
          key={item.id}
          onDelete={() => {
            const newValues: MenuItemProps[] = value.filter(
              (_, i) => i !== index,
            )
            handleUpdateMultiAttrDSL?.({
              [attrName]: newValues,
            })
          }}
          value={item.value}
          label={
            isString(executeValue[index].label)
              ? (executeValue[index].label as string)
              : JSON.stringify(executeValue[index].label)
          }
          onClickAdd={() => {
            const newValues = value.map((i) => {
              if (i.value === item.value) {
                if ("subItems" in i) {
                  return {
                    ...i,
                    subItems: [
                      ...(i.subItems ?? []),
                      {
                        id: v4(),
                        label: getDifferentLabelFromValue(
                          i.subItems!!,
                          "Sub Menu ",
                        ),
                        value: getDifferentValueFromValue(
                          i.subItems!!,
                          `${item.value}:`,
                          "subMenu",
                        ),
                      },
                    ],
                  }
                } else {
                  return {
                    ...i,
                    subItems: [
                      {
                        id: v4(),
                        label: "Sub Menu 0",
                        value: `${item.value}:subMenu0`,
                      },
                    ],
                  }
                }
              } else {
                return i
              }
            })
            handleUpdateMultiAttrDSL?.({
              [attrName]: [...newValues],
            })
          }}
          attrPath={`${attrName}.${index}`}
          childrenSetter={childrenSetter}
          widgetDisplayName={widgetDisplayName}
        >
          <DndContext
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event) => {
              const value = (item as SubMenuProps).subItems
              if (value === undefined) {
                return
              }
              const { active, over } = event
              if (active && over && active.id !== over.id) {
                const oldIndex = value.findIndex(
                  (item) => item.id === active.id,
                )
                const newIndex = value.findIndex((item) => item.id === over.id)
                const finalColumns = arrayMove(value, oldIndex, newIndex)
                handleUpdateMultiAttrDSL?.({
                  [`${attrName}.${index}.subItems`]: finalColumns,
                })
                return finalColumns
              }
            }}
          >
            <SortableContext
              items={
                (item as SubMenuProps).subItems?.map((child) => child.id!) ?? []
              }
              strategy={verticalListSortingStrategy}
            >
              {"subItems" in item &&
                ((item as SubMenuProps).subItems?.length ?? 0) > 0 &&
                (item as SubMenuProps).subItems?.map((child, i) => (
                  <SetterMenuItem
                    id={child.id!}
                    key={child.id}
                    onDelete={() => {
                      const newValues: MenuItemProps[] = [...value]
                      const newSubItems =
                        item.subItems?.filter(
                          (subItem, subIndex) => subIndex !== i,
                        ) ?? []
                      if (newSubItems.length !== 0) {
                        newValues[index] = {
                          ...item,
                          subItems: newSubItems,
                        } as SubMenuProps
                      } else {
                        const newItem = { ...item }
                        delete newItem.subItems
                        newValues[index] = newItem
                      }
                      handleUpdateMultiAttrDSL?.({
                        [attrName]: newValues,
                      })
                    }}
                    attrPath={`${attrName}.${index}.subItems.${i}`}
                    childrenSetter={childrenSetter}
                    widgetDisplayName={widgetDisplayName}
                    label={
                      isString(
                        get(executeValue, `${index}.subItems.${i}.label`),
                      )
                        ? get(executeValue, `${index}.subItems.${i}.label`) ??
                          ""
                        : JSON.stringify(
                            get(executeValue, `${index}.subItems.${i}.label`),
                          )
                    }
                    value={child.value}
                  />
                ))}
            </SortableContext>
          </DndContext>
        </SetterSubMenu>
      ))}
    </ColumnContainer>
  )
}

MenuOptionSetter.displayName = "MenuOptionSetter"
export default MenuOptionSetter
