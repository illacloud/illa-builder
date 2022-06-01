import { useTranslation } from "react-i18next"
import useClickAway from "react-use/lib/useClickAway"
import { forwardRef, useState, useRef, useEffect, FC } from "react"
import { Menu } from "@illa-design/menu"
import { motion } from "framer-motion"
import {
  applycontextMenuStyle,
  deleteActionStyle,
  duplicateActionStyle,
  applycontextMenuVisibleStyle,
} from "./style"
const MenuItem = Menu.Item
import { ContextMenuProps } from "./interface"

export const ContextMenu: FC<ContextMenuProps> = (props) => {
  const { contextMenuEvent, onDuplicate, onDelete } = props
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const contextMenuRef = useRef<HTMLDivElement | null>(null)

  useClickAway(contextMenuRef, () => {
    setVisible(false)
  })

  useEffect(() => {
    if (!contextMenuEvent) {
      return
    }

    contextMenuEvent.preventDefault()

    let offset = 0
    const { clientX, clientY } = contextMenuEvent
    const OFFSET_THRESHOLD = 10
    const contextMenuRect = contextMenuRef.current?.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const contextMenuBottom = clientY + (contextMenuRect?.height ?? 0)

    if (contextMenuBottom > viewportHeight) {
      offset = contextMenuBottom - viewportHeight + OFFSET_THRESHOLD
    }

    setPosition({ x: clientX, y: clientY - offset })

    setVisible(true)
  }, [contextMenuEvent])

  function handleAction(key: string) {
    switch (key) {
      case "duplicate":
        duplicateActionItem()
        break
      case "delete":
        deleteActionItem()
        break
      default:
        break
    }
  }

  function duplicateActionItem() {
    setVisible(false)
    onDuplicate && onDuplicate()
  }

  function deleteActionItem() {
    setVisible(false)
    onDelete && onDelete()
  }

  const MotionMenu = motion(
    forwardRef<HTMLDivElement>((_, ref) => (
      <Menu
        css={[
          applycontextMenuStyle(position.y, position.x),
          applycontextMenuVisibleStyle(visible),
        ]}
        onClickMenuItem={handleAction}
        ref={ref}
      >
        <MenuItem
          key={"duplicate"}
          title={t("editor.action.action_list.contextMenu.duplicate")}
          css={duplicateActionStyle}
        />
        <MenuItem
          key={"delete"}
          title={t("editor.action.action_list.contextMenu.delete")}
          css={deleteActionStyle}
        />
      </Menu>
    )),
  )

  return (
    <MotionMenu
      ref={contextMenuRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    />
  )
}

ContextMenu.displayName = "ActionListContextMenu"
