import { convertPathToString } from "@illa-public/dynamic-string"
import { toPath } from "lodash-es"
import { FC, useCallback, useMemo } from "react"
import { Image, Menu, MenuItemProps, SubMenuProps } from "@illa-design/react"
import {
  applyMenuBrandContainerStyle,
  applyMenuTitleStyle,
  applyMenuWidgetContainerStyle,
} from "@/widgetLibrary/MenuWidget/style"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { MenuWidgetProps, WrappedMenuProps } from "./interface"

export const WrappedMenu: FC<WrappedMenuProps> = (props) => {
  const {
    menuTitle,
    menuLogo,
    bgColor,
    colorScheme,
    hoverColorScheme,
    mode = "horizontal",
    horizontalAlign,
    selectedValues,
    items,
    onClickSubMenu,
    onClickMenuItem,
    onMenuSelect,
    onClickMenuLogo,
  } = props

  const menuBrandContainer = useMemo(() => {
    if (!menuTitle && !menuLogo) {
      return <></>
    } else {
      return (
        <div css={applyMenuBrandContainerStyle(mode)}>
          {menuLogo && (
            <Image
              src={menuLogo}
              width="unset"
              height={mode === "horizontal" ? "24px" : "32px"}
              objectFit="scale-down"
              onClick={onClickMenuLogo}
            />
          )}
          {menuTitle && <div css={applyMenuTitleStyle(mode)}>{menuTitle}</div>}
        </div>
      )
    }
  }, [menuLogo, menuTitle, mode, onClickMenuLogo])

  return (
    <div css={applyMenuWidgetContainerStyle(mode)}>
      {menuBrandContainer}
      <Menu
        flexGrow="1"
        w="100%"
        colorScheme={colorScheme}
        hoverColorScheme={hoverColorScheme}
        bgColor={bgColor}
        mode={mode}
        selectedValues={selectedValues}
        onClickSubMenu={onClickSubMenu}
        horizontalAlign={horizontalAlign}
        onClickMenuItem={onClickMenuItem}
        items={items}
        onMenuSelect={onMenuSelect}
      />
    </div>
  )
}

export const StaticMenuWidget: FC<MenuWidgetProps> = (props) => {
  const {
    menuTitle,
    menuLogo,
    bgColor,
    colorScheme,
    mode,
    selectedValues,
    hoverColorScheme,
    horizontalAlign,
    items,
    displayName,
    handleUpdateMultiExecutionResult,
    updateComponentHeight,
    triggerEventHandler,
    onClickMenuLogo,
  } = props
  const handleOnClickMenuItem = useCallback(
    (value: string, valuePath: string[]) => {
      if (valuePath.length === 1) {
        const index = items?.findIndex((i) => i.value === value) ?? 0
        const pathArray = ["items", `${index}`, "events"]
        triggerEventHandler(
          "clickMenuItem",
          convertPathToString(pathArray),
          undefined,
          (path) => {
            return convertPathToString(toPath(path).slice(3))
          },
        )
      } else if (valuePath.length === 2) {
        const sub = items?.findIndex((i) => i.value === valuePath[0])
        if (
          sub != undefined &&
          sub !== -1 &&
          items &&
          "subItems" in items[sub]
        ) {
          const subIndex = (items[sub] as SubMenuProps).subItems?.findIndex(
            (i) => i.value === valuePath[1],
          )
          const pathArray = [
            "items",
            `${sub}`,
            "subItems",
            `${subIndex}`,
            "events",
          ]
          triggerEventHandler(
            "clickMenuItem",
            convertPathToString(pathArray),
            undefined,
            (path) => {
              return convertPathToString(toPath(path).slice(5))
            },
          )
        }
      }
    },
    [items, triggerEventHandler],
  )

  const handleClickSubMenu = useCallback(
    (value: string) => {
      const index = items?.findIndex((i) => i.value === value)
      if (index != undefined && index !== -1) {
        const paths = ["items", `${index}`, "events"]
        triggerEventHandler(
          "clickMenuItem",
          convertPathToString(paths),
          undefined,
          (path) => {
            return convertPathToString(toPath(path).slice(3))
          },
        )
      }
    },
    [items, triggerEventHandler],
  )

  return (
    <AutoHeightContainer updateComponentHeight={updateComponentHeight}>
      <WrappedMenu
        menuTitle={menuTitle}
        menuLogo={menuLogo}
        selectedValues={
          Array.isArray(selectedValues)
            ? selectedValues
            : [JSON.stringify(selectedValues)]
        }
        colorScheme={colorScheme}
        hoverColorScheme={hoverColorScheme}
        bgColor={bgColor}
        mode={mode}
        horizontalAlign={horizontalAlign}
        onClickMenuItem={handleOnClickMenuItem}
        onClickSubMenu={handleClickSubMenu}
        items={items}
        onMenuSelect={(value, valuePath, selectedValues) => {
          handleUpdateMultiExecutionResult([
            {
              displayName,
              value: {
                selectedValues: selectedValues,
              },
            },
          ])
          triggerEventHandler("onMenuSelect")
        }}
        onClickMenuLogo={onClickMenuLogo}
      />
    </AutoHeightContainer>
  )
}

export const DynamicMenuWidget: FC<MenuWidgetProps> = (props) => {
  const {
    menuTitle,
    menuLogo,
    bgColor,
    colorScheme,
    mode,
    selectedValues,
    hoverColorScheme,
    horizontalAlign,
    updateComponentHeight,
    mappedOption,
    triggerEventHandler,
    displayName,
    handleUpdateMultiExecutionResult,
    onClickMenuLogo,
  } = props

  const total = mappedOption?.values?.length ?? 0

  const items: MenuItemProps[] = []

  if (mappedOption && total !== 0) {
    for (let i = 0; i < total; i++) {
      if (mappedOption.groupLabels?.[i]) {
        let parent = items.find(
          (v) => v.label === mappedOption.groupLabels?.[i],
        ) as SubMenuProps

        if (!parent) {
          parent = {
            label:
              typeof mappedOption.groupLabels?.[i] === "string"
                ? mappedOption.groupLabels?.[i]
                : JSON.stringify(mappedOption.groupLabels?.[i]),
            value:
              typeof mappedOption.groupLabels?.[i] === "string"
                ? mappedOption.groupLabels?.[i]
                : JSON.stringify(mappedOption.groupLabels?.[i]),
            subItems: [],
          } as SubMenuProps
          items.push(parent)
        }
        parent.subItems!!.push({
          disabled: mappedOption.disables?.[i],
          hidden: mappedOption.hidden?.[i],
          label: mappedOption.labels?.[i],
          value: mappedOption.values?.[i],
        } as MenuItemProps)
      } else {
        items.push({
          disabled: mappedOption.disables?.[i],
          hidden: mappedOption.hidden?.[i],
          label: mappedOption.labels?.[i],
          value: mappedOption.values?.[i],
        } as SubMenuProps)
      }
    }
  }

  return (
    <AutoHeightContainer updateComponentHeight={updateComponentHeight}>
      <WrappedMenu
        menuTitle={menuTitle}
        menuLogo={menuLogo}
        selectedValues={
          Array.isArray(selectedValues)
            ? selectedValues
            : [JSON.stringify(selectedValues)]
        }
        colorScheme={colorScheme}
        hoverColorScheme={hoverColorScheme}
        bgColor={bgColor}
        items={items}
        mode={mode}
        horizontalAlign={horizontalAlign}
        onMenuSelect={(value, valuePath, selectedValues) => {
          handleUpdateMultiExecutionResult([
            {
              displayName,
              value: {
                selectedValues: selectedValues,
              },
            },
          ])
          triggerEventHandler("onMenuSelect")
        }}
        onClickMenuLogo={onClickMenuLogo}
      />
    </AutoHeightContainer>
  )
}

export const MenuWidget: FC<MenuWidgetProps> = (props) => {
  const { optionConfigureMode, triggerEventHandler } = props

  const handleClickMenuLogo = useCallback(() => {
    triggerEventHandler("onMenuLogoClick")
  }, [triggerEventHandler])

  if (optionConfigureMode === "static") {
    return <StaticMenuWidget {...props} onClickMenuLogo={handleClickMenuLogo} />
  } else {
    return (
      <DynamicMenuWidget {...props} onClickMenuLogo={handleClickMenuLogo} />
    )
  }
}

StaticMenuWidget.displayName = "StaticMenuWidget"
DynamicMenuWidget.displayName = "DynamicMenuWidget"
WrappedMenu.displayName = "WrappedMenu"
export default MenuWidget
