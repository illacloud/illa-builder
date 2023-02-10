import { Reorder } from "framer-motion"
import { get, isEqual } from "lodash"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { v4 } from "uuid"
import { MenuItemProps, MenuItemType, SubMenuProps } from "@illa-design/react"
import { NewButton } from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter/newButton"
import { SetterMenuItem } from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter/setterMenuItem"
import { SetterSubMenu } from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter/setterSubMenu"
import {
  menuOptionSetterContainerStyle,
  optionListHeaderStyle,
  removeNativeStyle,
} from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter/style"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
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
    childrenSetter,
    widgetDisplayName,
  } = props

  const execResult = useSelector(getExecutionResult)
  const values = get(
    execResult,
    `${widgetDisplayName}.${attrName}`,
    [],
  ) as MenuItemType[]

  const { t } = useTranslation()

  return (
    <div css={menuOptionSetterContainerStyle}>
      <div css={optionListHeaderStyle}>
        {t("editor.inspect.setter_content.menu_setter.label", {
          number: values.length,
        })}
        <NewButton
          title={t("editor.inspect.setter_content.column_setter.new")}
          onClick={() => {
            handleUpdateMultiAttrDSL?.({
              [attrName]: [
                ...values,
                {
                  id: v4(),
                  label: getDifferentLabelFromValue(values, "Menu "),
                  value: getDifferentValueFromValue(values, "", "menu"),
                },
              ],
            })
          }}
        />
      </div>
      <Reorder.Group
        axis="y"
        onDragEnd={() => {
          handleUpdateMultiAttrDSL?.({
            [attrName]: [...values],
          })
        }}
        values={values}
        onReorder={(newOrder) => {
          if (isEqual(values, newOrder)) return
          handleUpdateMultiAttrDSL?.({
            [attrName]: [...newOrder],
          })
        }}
        css={removeNativeStyle}
      >
        {values.map((item, index) => (
          <Reorder.Item key={item.id} value={item}>
            <SetterSubMenu
              onDelete={() => {
                const newValues: MenuItemProps[] = values.filter(
                  (_, i) => i !== index,
                )
                handleUpdateMultiAttrDSL?.({
                  [attrName]: newValues,
                })
              }}
              value={item.value}
              label={item.label as string}
              onClickAdd={() => {
                const newValues = values.map((i) => {
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
              <Reorder.Group
                axis="y"
                values={"subItems" in item ? item.subItems ?? [] : []}
                onReorder={(newItems) => {
                  if (isEqual(item, newItems)) return
                  const newValues = [...values]
                  newValues[index] = {
                    ...newValues[index],
                    subItems: newItems,
                  }
                  handleUpdateMultiAttrDSL?.({
                    [attrName]: [...newValues],
                  })
                }}
                css={removeNativeStyle}
                onDragEnd={() => {
                  handleUpdateMultiAttrDSL?.({
                    [attrName]: [...values],
                  })
                }}
              >
                {"subItems" in item &&
                  ((item as SubMenuProps).subItems?.length ?? 0) > 0 &&
                  (item as SubMenuProps).subItems?.map((child, i) => (
                    <Reorder.Item key={child.id} value={child}>
                      <SetterMenuItem
                        onDelete={() => {
                          const newValues: MenuItemProps[] = [...values]
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
                        label={child.label as string}
                        value={child.value}
                        onClickItem={() => {}}
                      />
                    </Reorder.Item>
                  ))}
              </Reorder.Group>
            </SetterSubMenu>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  )
}

MenuOptionSetter.displayName = "MenuOptionSetter"
