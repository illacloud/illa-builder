import { motion } from "framer-motion"
import { get } from "lodash"
import { FC, useCallback, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CaretRightIcon, ErrorIcon } from "@illa-design/react"
import { JsonView } from "@/page/App/components/Debugger/components/JsonView"
import { configActions } from "@/redux/config/configSlice"
import {
  clearComponentAttachedUsersHandler,
  getDisattachedComponents,
  updateSelectedComponentUsersHandler,
} from "@/redux/currentApp/collaborators/collaboratorsHandlers"
import { getComponentAttachUsers } from "@/redux/currentApp/collaborators/collaboratorsSelector"
import { collaboratorsActions } from "@/redux/currentApp/collaborators/collaboratorsSlice"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { getDisplayNameAndPropertyPath } from "@/utils/executionTreeHelper/utils"
import { ErrorItemProps } from "./interface"
import {
  applyExpandIconStyle,
  errorContainerStyle,
  errorExpandStyle,
  errorIconStyle,
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
  const root = useSelector(getCanvas)
  const componentsAttachedUsers = useSelector(getComponentAttachUsers)
  const [isExpanded, setIsExpanded] = useState(false)

  const { displayName, attrPath } = useMemo(() => {
    return getDisplayNameAndPropertyPath(pathName)
  }, [pathName])

  const attrValue = useMemo(() => {
    const node = searchDsl(root, displayName)
    if (node) {
      return get(node?.props, attrPath)
    }
    return undefined
  }, [root, displayName, attrPath])

  const handleComponentSelect = useCallback(() => {
    const selectedComponent = searchDsl(root, displayName)
    if (selectedComponent) {
      dispatch(
        configActions.updateSelectedComponent([selectedComponent.displayName]),
      )
      // dispatch(
      //   collaboratorsActions.updateComponentAttachedUsers([
      //     selectedComponent.displayName,
      //   ]),
      // )
      updateSelectedComponentUsersHandler([])
      const disattachedComponents = getDisattachedComponents(
        componentsAttachedUsers,
        [selectedComponent.displayName],
      )
      if (!!disattachedComponents.length) {
        // dispatch(
        //   collaboratorsActions.clearComponentAttachedUsers(
        //     disattachedComponents,
        //   ),
        // )
        clearComponentAttachedUsersHandler(disattachedComponents)
      }
    }
  }, [dispatch, root, displayName])

  return (
    <div css={errorContainerStyle}>
      <div css={errorItemStyle}>
        <div>
          <ErrorIcon size={"16px"} css={errorIconStyle} />
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
          <span>The value at {attrPath} is invalid</span>
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
        <JsonView
          key={attrPath}
          name={attrPath}
          value={attrValue}
          // value={{"a": "bbbb"}}
        />
      </motion.div>
    </div>
  )
}
