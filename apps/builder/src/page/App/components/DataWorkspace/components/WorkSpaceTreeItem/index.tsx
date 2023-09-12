import { AnimatePresence, motion } from "framer-motion"
import { FC, MouseEvent, memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CaretRightIcon } from "@illa-design/react"
import { panelBarItemContainerAnimationVariants } from "@/components/PanelBar/style"
import { getExpandedKeys } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { WorkSpaceTreeNode } from "./WorkSpaceTreeNode"
import { WorkSpaceTreeItemProps } from "./interface"
import {
  applyExpandIconStyle,
  applyJsonContentStyle,
  applyObjectOrArrayContainerStyle,
  applyTitleAndDescContainerStyle,
  objectAndArrayDescStyle,
  objectAndArrayTitleStyle,
} from "./style"

export const WorkSpaceTreeItem: FC<WorkSpaceTreeItemProps> = memo(
  (props: WorkSpaceTreeItemProps) => {
    const {
      title,
      data,
      isSelected,
      level,
      handleSelect,
      parentKey,
      isChild = false,
    } = props
    const expandedKeys = useSelector(getExpandedKeys)
    const uniqueKey = parentKey === title ? parentKey : `${parentKey}/${title}`
    const isExpanded = expandedKeys.includes(uniqueKey)
    const dispatch = useDispatch()
    const keyArr = Object.keys(data).filter((item) => !item.startsWith("$"))

    return (
      <>
        <div
          css={applyObjectOrArrayContainerStyle(!!isSelected, level, isChild)}
          onClick={(e: MouseEvent<HTMLDivElement>) => {
            handleSelect?.([title], e)
            if (isExpanded) {
              dispatch(configActions.removeExpandedKey(uniqueKey))
            } else {
              dispatch(
                configActions.setExpandedKey(expandedKeys.concat(uniqueKey)),
              )
            }
          }}
        >
          <span css={applyExpandIconStyle(isExpanded)}>
            <CaretRightIcon />
          </span>
          <div css={applyTitleAndDescContainerStyle}>
            <label css={objectAndArrayTitleStyle(isChild)}>{title}&nbsp;</label>
            <label css={objectAndArrayDescStyle}>
              {`{}`}
              {keyArr.length}
              {keyArr.length > 1 ? "keys" : "key"}
            </label>
          </div>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              css={applyJsonContentStyle(isSelected)}
              variants={panelBarItemContainerAnimationVariants}
              animate={isExpanded ? "enter" : "exit"}
              transition={{ duration: 0.2 }}
              exit="exit"
            >
              {keyArr.map((name) => (
                <WorkSpaceTreeNode
                  key={name}
                  name={name}
                  value={data[name]}
                  itemKey={title + name}
                  level={level}
                  parentKey={uniqueKey}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  },
)

WorkSpaceTreeItem.displayName = "WorkSpaceTreeItem"
