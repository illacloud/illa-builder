import { convertPathToString } from "@illa-public/dynamic-string"
import IconHotSpot from "@illa-public/icon-hot-spot"
import copyToClipboard from "copy-to-clipboard"
import { AnimatePresence, motion } from "framer-motion"
import { toPath } from "lodash-es"
import { FC, memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CaretRightIcon, CopyIcon } from "@illa-design/react"
import { panelBarItemContainerAnimationVariants } from "@/components/PanelBar/style"
import { getExpandedKeys } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { WorkSpaceTreeNode } from "./WorkSpaceTreeNode"
import { WorkSpaceTreeItemProps } from "./interface"
import {
  applyExpandIconStyle,
  applyObjectOrArrayContainerStyle,
  applyTitleAndDescContainerStyle,
  jsonContentStyle,
  objectAndArrayDescStyle,
  objectAndArrayTitleStyle,
} from "./style"

export const WorkSpaceTreeItem: FC<WorkSpaceTreeItemProps> = memo(
  (props: WorkSpaceTreeItemProps) => {
    const { title, data, level, parentKey, isChild } = props
    const expandedKeys = useSelector(getExpandedKeys)
    const uniqueKey = parentKey === title ? parentKey : `${parentKey}/${title}`
    const isExpanded = expandedKeys.includes(uniqueKey)
    const dispatch = useDispatch()
    const keyArr = Object.keys(data)
    return (
      <>
        <div
          css={applyObjectOrArrayContainerStyle(level)}
          onClick={() => {
            if (isExpanded) {
              dispatch(configActions.removeExpandedKey(uniqueKey))
            } else {
              dispatch(
                configActions.setExpandedKey(expandedKeys.concat(uniqueKey)),
              )
            }
          }}
        >
          <div css={applyTitleAndDescContainerStyle}>
            <span css={applyExpandIconStyle(isExpanded)}>
              <CaretRightIcon />
            </span>
            <label css={objectAndArrayTitleStyle}>
              {isChild
                ? title
                : `{{${convertPathToString(toPath(`${parentKey}.${title}`))}}}`}
              &nbsp;
            </label>
            <label css={objectAndArrayDescStyle}>
              {Array.isArray(data)
                ? `[]${keyArr.length} items`
                : `{}${keyArr.length} keys`}
            </label>
          </div>
          <IconHotSpot
            onClick={(e) => {
              e.stopPropagation()
              copyToClipboard(
                `{{${convertPathToString(toPath(`${parentKey}.${title}`))}}}`,
              )
            }}
            id="copy-icon-hot-spot"
          >
            <CopyIcon />
          </IconHotSpot>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              css={jsonContentStyle}
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
                  level={level + 1}
                  parentKey={convertPathToString(
                    toPath(`${parentKey}.${title}`),
                  )}
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
