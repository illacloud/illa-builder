import { EmotionJSX } from "@emotion/react/types/jsx-namespace"
import { FC } from "react"
import { ConfigureResourceFormProps } from "./interface"
import { MySQL, RESTAPI } from "./Resources"

import { FormContainerCSS } from "./style"

export const ConfigureResourceForm: FC<ConfigureResourceFormProps> = (
  props,
) => {
  const { back, resouceType } = props

  const renderResouceNode = () => {
    const nodeMap: {
      [index: string]: EmotionJSX.Element | FC
    } = {
      // query
      "REST API": RESTAPI,
      // database
      MySQL: <MySQL back={back} />,
    }

    return nodeMap[resouceType] || null
  }

  return <div css={FormContainerCSS}>{renderResouceNode()}</div>
}
