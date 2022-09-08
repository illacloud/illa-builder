import { FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  errorIconStyle,
  errorItemStyle,
  nameStyle,
  sourceStyle,
  applyExpandIconStyle,
  jsonContentAnimation, errorContainerStyle, errorMessageStyle, jsonStyle,
} from "./style"
import { CaretRightIcon, ErrorIcon } from "@illa-design/icon"
import { ErrorItemProps } from "./interface"
import { motion } from "framer-motion"

export const ErrorItem: FC<ErrorItemProps> = (props) => {
  const { item, pathName } = props
  const dispatch = useDispatch()
  const actionList = useSelector(getActionList)
  const executionResult = useSelector(getExecutionResult)
  const displayIndex = pathName.indexOf(".")
  const handleActionSelect = () => {
    const action = actionList.find(
      (item) => item.displayName === pathName.split(".")[0],
    )
    action && dispatch(configActions.updateSelectedAction(action))
  }
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div css={errorContainerStyle}>
      <div css={errorItemStyle}>
        <div>
          <ErrorIcon size={"16px"} css={errorIconStyle} />
          <span css={applyExpandIconStyle(isExpanded)} onClick={() => {
            setIsExpanded(!isExpanded)
          }}>
            <CaretRightIcon />
          </span>
          <span css={nameStyle} onClick={handleActionSelect}>[{pathName.slice(0, displayIndex)}]</span>
          <span>The value at {pathName.slice(displayIndex + 1)} is invalid</span>
        </div>
        <div css={sourceStyle} onClick={handleActionSelect}>{pathName}</div>
      </div>
      <motion.div
        css={jsonStyle}
        variants={jsonContentAnimation}
        role="region"
        animate={isExpanded ? "enter" : "exit"}
        initial={false}
        transition={{ duration: 0.2 }}
      >
        <div css={errorMessageStyle}>{item?.errorName}: {item?.errorMessage}</div>
        <div>

        </div>
      </motion.div>
    </div>
  )
}
