import { AnimatePresence, motion } from "framer-motion"
import { FC, memo, useEffect, useMemo, useState } from "react"
import { isArray, isObject } from "@illa-design/react"
import { CaretRightIcon } from "@illa-design/react"
import { renderJsonValue } from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeItem/globalStateTreeItem"
import { TreeItemProps, TreeNodeProps } from "./interface"
import {
  applyExpandIconStyle,
  applyJsonContentStyle,
  applyObjectOrArrayContainerStyle,
  applySimpleItemContainerStyle,
  applyTitleAndDescContainerStyle,
  jsonNameStyle,
  jsonValueStyle,
  objectAndArrayDescStyle,
  objectAndArrayTitleStyle,
  panelBarItemContainerAnimationVariants,
} from "./style"

export const TreeNode: FC<TreeNodeProps> = memo((props: TreeNodeProps) => {
  const { name, value, level = 0, expandAll } = props
  if (name === undefined || name === "") {
    return null
  }
  if (isObject(value) || isArray(value)) {
    return (
      <TreeItem
        title={name}
        data={value}
        level={level + 1}
        isChild
        expandAll={expandAll}
      />
    )
  } else {
    return (
      <div css={applySimpleItemContainerStyle(level + 1, name)}>
        <label css={jsonNameStyle}>{name}</label>
        <label css={jsonValueStyle}>{renderJsonValue(value, false)}</label>
      </div>
    )
  }
})
TreeNode.displayName = "TreeNode"

export const TreeItem: FC<TreeItemProps> = memo((props: TreeItemProps) => {
  const { title, data, level, isChild = false, expandAll } = props
  const [expanded, setExpanded] = useState(false)
  const keyArr = Object.keys(data)

  useEffect(() => {
    setExpanded(Boolean(expandAll))
  }, [expandAll])

  const tree = useMemo(() => {
    return Object.keys(data).map((name) => (
      <TreeNode
        key={name}
        name={name}
        value={data[name]}
        level={level}
        expandAll={expandAll}
      />
    ))
  }, [data, expandAll, level])

  return (
    <>
      <div
        css={applyObjectOrArrayContainerStyle(level, isChild)}
        onClick={() => setExpanded(!expanded)}
      >
        <span css={applyExpandIconStyle(expanded)}>
          <CaretRightIcon />
        </span>
        <div css={applyTitleAndDescContainerStyle}>
          <label css={objectAndArrayTitleStyle(isChild)}>{title}</label>
          <label css={objectAndArrayDescStyle}>
            {isArray(data) ? "[]" : "{}"}
            {keyArr.length}
            {keyArr.length > 1 ? "keys" : "key"}
          </label>
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            css={applyJsonContentStyle}
            variants={panelBarItemContainerAnimationVariants}
            animate={expanded ? "enter" : "exit"}
            transition={{ duration: 0.2 }}
            exit="exit"
          >
            {tree}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})
TreeItem.displayName = "TreeItem"
