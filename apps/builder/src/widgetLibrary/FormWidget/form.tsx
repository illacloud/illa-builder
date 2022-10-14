import { FC, useMemo } from "react"
import { BasicContainer } from "../BasicContainer/BasicContainer"
import { testStyle } from "./style"

export const FormWidget: FC = ({ childrenNode }) => {
  const renderChildrenNode = useMemo(() => {
    return childrenNode.map((item) => (
      <BasicContainer componentNode={item} key={item.widgetName} />
    ))
  }, [childrenNode])
  return <div css={testStyle}>{renderChildrenNode}</div>
}

FormWidget.displayName = "FormWidget"
