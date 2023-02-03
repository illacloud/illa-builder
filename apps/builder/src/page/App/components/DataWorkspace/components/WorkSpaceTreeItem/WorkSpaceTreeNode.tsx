import { css } from "@emotion/react"
import { AnimatePresence, motion } from "framer-motion"
import { FC, memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CaretRightIcon, isArray, isObject } from "@illa-design/react"
import { WorkSpaceTreeNodeProps } from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeItem/interface"
import {
  applyExpandIconStyle,
  applyItemContainerStyle,
  applyJsonContentStyle,
  itemNameDescStyle,
  itemNameStyle,
  jsonItemStyle,
  jsonNameStyle,
  jsonValueStyle,
} from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeItem/style"
import { applyJsonValueColorStyle } from "@/page/App/components/DataWorkspace/style"
import { getExpandedKeys } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"

export const renderJsonValue = (value: any) => {
  const type = typeof value
  switch (type) {
    case "string":
      return <label css={applyJsonValueColorStyle(type)}>{`"${value}"`}</label>
    default:
      return <label css={applyJsonValueColorStyle(type)}>{`${value}`}</label>
  }
}

export const WorkSpaceTreeNode: FC<WorkSpaceTreeNodeProps> = memo(
  (props: WorkSpaceTreeNodeProps) => {
    const { name, value, itemKey, level = 0 } = props
    const expandedKeys = useSelector(getExpandedKeys)
    const isExpanded = expandedKeys.includes(itemKey)
    const dispatch = useDispatch()
    if (isObject(value) || isArray(value)) {
      const keyArr = Object.keys(value).filter((item) => !item.startsWith("$"))
      return (
        <div>
          <div
            css={applyItemContainerStyle(false, level + 1)}
            onClick={() => {
              if (isExpanded) {
                dispatch(configActions.removeExpandedKey(itemKey))
              } else {
                dispatch(
                  configActions.setExpandedKey(expandedKeys.concat(itemKey)),
                )
              }
            }}
          >
            <span css={applyExpandIconStyle(isExpanded, level + 1)}>
              <CaretRightIcon />
            </span>
            <label css={itemNameStyle}>{name}&nbsp;</label>
            <label css={itemNameDescStyle}>
              {`${isObject(value) ? "{}" : "[]"}`}&nbsp;{keyArr.length}
              {keyArr.length > 1 ? "keys" : "key"}
            </label>
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                css={applyJsonContentStyle(false)}
                role="region"
                animate={{ height: "auto", opacity: 1 }}
                initial={{ height: 0, opacity: 0 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {keyArr.map((name) => (
                  <WorkSpaceTreeNode
                    key={name}
                    name={name}
                    value={value[name]}
                    itemKey={itemKey + name}
                    level={level + 1}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    } else {
      return (
        <div css={css(applyItemContainerStyle(false, level), jsonItemStyle)}>
          <label css={jsonNameStyle}>{name}&nbsp;</label>
          <label css={jsonValueStyle}>{renderJsonValue(value)}</label>
        </div>
      )
    }
  },
)

WorkSpaceTreeNode.displayName = "WorkSpaceTreeNode"
