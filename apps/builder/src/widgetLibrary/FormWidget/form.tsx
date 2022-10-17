import { FC, useMemo } from "react"
import { BasicContainer } from "../BasicContainer/BasicContainer"
import { FormWIdgetProps } from "./interface"
import { testStyle, formHeaderStyle, formBodyStyle } from "./style"

export const FormWidget: FC<FormWIdgetProps> = ({ childrenNode }) => {
  const renderHeader = useMemo(() => {
    const headerComponentNode = childrenNode[0]
    return <BasicContainer componentNode={headerComponentNode} />
  }, [childrenNode])
  const renderBody = useMemo(() => {
    const bodyComponentNode = childrenNode[1]
    return <BasicContainer componentNode={bodyComponentNode} />
  }, [childrenNode])
  const renderFooter = useMemo(() => {
    const footerComponentNode = childrenNode[2]
    return <BasicContainer componentNode={footerComponentNode} />
  }, [childrenNode])

  return (
    <div css={testStyle}>
      <div css={formHeaderStyle}>{renderHeader}</div>
      <div css={formBodyStyle}>{renderBody}</div>
      <div css={formHeaderStyle}>{renderFooter}</div>
    </div>
  )
}

FormWidget.displayName = "FormWidget"
