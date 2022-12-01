import { motion } from "framer-motion"
import { FC, useState } from "react"
import { CaretRightIcon, isArray, isObject, isString } from "@illa-design/react"
import { applyJsonValueColorStyle } from "@/page/App/components/DataWorkspace/style"
import {
  applyExpandIconStyle,
  jsonContentAnimation,
} from "@/page/App/components/Debugger/components/ErrorItem/style"
import { JsonViewProps } from "./interface"
import {
  applyLevelStyle,
  itemDescStyle,
  jsonExpandStyle,
  jsonStyle,
} from "./style"

export const JsonView: FC<JsonViewProps> = (props) => {
  const { name, value, level = 0 } = props
  const [isExpanded, setIsExpanded] = useState(false)

  const type = typeof value
  if (isObject(value) || isArray(value)) {
    const keyArr = Object.keys(value).filter((item) => !item.startsWith("$"))
    return (
      <>
        <div css={jsonStyle}>
          <span
            css={[jsonExpandStyle, applyExpandIconStyle(isExpanded)]}
            onClick={() => {
              setIsExpanded(!isExpanded)
            }}
          >
            <CaretRightIcon />
          </span>
          <span css={applyJsonValueColorStyle("string")}>{`"${name}"`}</span>:
          <label css={itemDescStyle}>
            {`${isObject(value) ? "{}" : "[]"}`}&nbsp;{keyArr.length}
            {keyArr.length > 1 ? "keys" : "key"}
          </label>
        </div>
        <motion.div
          variants={jsonContentAnimation}
          role="region"
          animate={isExpanded ? "enter" : "exit"}
          initial={false}
          transition={{ duration: 0.2 }}
        >
          {keyArr.map((name) => (
            <JsonView
              key={name}
              name={name}
              value={value[name]}
              level={level + 1}
            />
          ))}
        </motion.div>
      </>
    )
  }

  return (
    <div css={[jsonStyle, applyLevelStyle(level + 1)]}>
      <span css={applyJsonValueColorStyle("string")}>{`"${name}"`}</span>:
      <span>
        {isString(value) ? (
          <span css={applyJsonValueColorStyle(type)}>{`"${value}"`}</span>
        ) : (
          <span css={applyJsonValueColorStyle(type)}>{`${value}`}</span>
        )}
      </span>
    </div>
  )
}

JsonView.displayName = "JsonView"
