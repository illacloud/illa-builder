import { AnimatePresence, motion } from "framer-motion"
import { FC, MouseEvent, memo, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CaretRightIcon } from "@illa-design/react"
import { getExpandedKeys } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { WorkSpaceTreeNode } from "./WorkSpaceTreeNode"
import { WorkSpaceTreeItemProps } from "./interface"
import {
  applyExpandIconStyle,
  applyItemContainerStyle,
  applyJsonContentStyle,
  itemNameDescStyle,
  itemNameStyle,
} from "./style"

export const WorkSpaceTreeItem: FC<WorkSpaceTreeItemProps> = memo(
  (props: WorkSpaceTreeItemProps) => {
    const { title, data, isSelected, handleSelect } = props
    const expandedKeys = useSelector(getExpandedKeys)
    const isExpanded = expandedKeys.includes(title)
    const dispatch = useDispatch()
    const keyArr = Object.keys(data).filter((item) => !item.startsWith("$"))

    const tree = useMemo(() => {
      return keyArr.map((name) => (
        <WorkSpaceTreeNode
          key={name}
          name={name}
          value={data[name]}
          itemKey={title + name}
          level={0}
        />
      ))
    }, [data, keyArr, title])

    return (
      <>
        <div
          css={applyItemContainerStyle(isSelected, 0)}
          onClick={(e: MouseEvent<HTMLDivElement>) => {
            if (e.metaKey || e.shiftKey) {
              handleSelect?.([title], e)
              return
            }
            handleSelect?.([title], e)
            if (isExpanded) {
              dispatch(configActions.removeExpandedKey(title))
            } else {
              dispatch(configActions.setExpandedKey(expandedKeys.concat(title)))
            }
          }}
        >
          <span css={applyExpandIconStyle(isExpanded, 0)}>
            <CaretRightIcon />
          </span>
          <label css={itemNameStyle}>{title}&nbsp;</label>
          <label css={itemNameDescStyle}>
            {`{}`}&nbsp;{keyArr.length}
            {keyArr.length > 1 ? "keys" : "key"}
          </label>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              css={applyJsonContentStyle(isSelected)}
              role="region"
              animate={{ height: "auto", opacity: 1 }}
              initial={{ height: 0, opacity: 0 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {tree}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  },
)

WorkSpaceTreeItem.displayName = "WorkSpaceTreeItem"
