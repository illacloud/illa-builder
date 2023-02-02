import { FC, forwardRef, useCallback, useEffect, useRef } from "react"
import { MenuWidgetProps, WrappedMenuProps } from "./interface"

export const WrappedMenu = forwardRef<HTMLDivElement, WrappedMenuProps>(
  (props, ref) => {
    const {
      mode,
      onClickSubMenu,
      handleOnClickMenuItem,
      handleUpdateOriginalDSLMultiAttr,
    } = props

    return <div></div>
  },
)

export const MenuWidget: FC<MenuWidgetProps> = (props) => {
  const {
    mode,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    updateComponentHeight,
    items,
    ...rest
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {})
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])
  const timeoutId = useRef<number>()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const updateHeight = useCallback(() => {
    timeoutId.current = window.setTimeout(() => {
      if (wrapperRef.current) {
        updateComponentHeight(wrapperRef.current?.clientHeight)
      }
    }, 180)
  }, [updateComponentHeight])

  useEffect(() => {
    updateHeight()
    return () => {
      clearTimeout(timeoutId.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, items])

  return <div ref={wrapperRef}></div>
}

WrappedMenu.displayName = "WrappedMenu"
