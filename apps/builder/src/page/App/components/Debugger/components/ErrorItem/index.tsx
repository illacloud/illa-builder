import { motion } from "framer-motion"
import { get } from "lodash-es"
import { FC, useCallback, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CaretRightIcon, ErrorCircleIcon } from "@illa-design/react"
import { JsonView } from "@/page/App/components/Debugger/components/JsonView"
import { configActions } from "@/redux/config/configSlice"
import {
  getComponentMap,
  searchComponentFromMap,
} from "@/redux/currentApp/components/componentsSelector"
import { getDisplayNameAndPropertyPath } from "@/utils/executionTreeHelper/utils"
import { ErrorItemProps } from "./interface"
import {
  applyExpandIconStyle,
  errorContainerStyle,
  errorExpandStyle,
  errorIconStyle,
  errorInfoStyle,
  errorItemContentStyle,
  errorItemStyle,
  errorMessageStyle,
  jsonContentAnimation,
  jsonStyle,
  nameStyle,
  sourceStyle,
} from "./style"

export const ErrorItem: FC<ErrorItemProps> = (props) => {
  const { item, pathName } = props
  const dispatch = useDispatch()
  const components = useSelector(getComponentMap)
  const [isExpanded, setIsExpanded] = useState(false)

  const { displayName, attrPath } = getDisplayNameAndPropertyPath(pathName)

  const attrValue = useMemo(() => {
    const node = searchComponentFromMap(components, displayName)
    if (node) {
      return get(node?.props, attrPath)
    }
    return undefined
  }, [components, displayName, attrPath])

  const handleComponentSelect = useCallback(() => {
    const selectedComponent = searchComponentFromMap(components, displayName)
    if (selectedComponent) {
      dispatch(
        configActions.updateSelectedComponent([selectedComponent.displayName]),
      )
    }
  }, [components, displayName, dispatch])

  return (
    <div css={errorContainerStyle}>
      <div css={errorItemStyle}>
        <div css={errorItemContentStyle}>
          <ErrorCircleIcon size={"16px"} css={errorIconStyle} />
          <span
            css={[errorExpandStyle, applyExpandIconStyle(isExpanded)]}
            onClick={() => {
              setIsExpanded(!isExpanded)
            }}
          >
            <CaretRightIcon />
          </span>
          <span css={nameStyle} onClick={handleComponentSelect}>
            [{displayName}]
          </span>
          <span css={errorInfoStyle}>The value at {attrPath} is invalid</span>
        </div>
        <div css={sourceStyle} onClick={handleComponentSelect}>
          {pathName}
        </div>
      </div>
      <motion.div
        css={jsonStyle}
        variants={jsonContentAnimation}
        role="region"
        animate={isExpanded ? "enter" : "exit"}
        initial={false}
        transition={{ duration: 0.2 }}
      >
        <div css={errorMessageStyle}>
          {item?.errorName}: {item?.errorMessage}
        </div>
        <JsonView key={attrPath} name={attrPath} value={attrValue} />
      </motion.div>
    </div>
  )
}
