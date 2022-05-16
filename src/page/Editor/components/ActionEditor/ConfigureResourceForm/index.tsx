import { EmotionJSX } from "@emotion/react/types/jsx-namespace"
import { FC, useRef, cloneElement } from "react"
import { ConfigureResourceFormProps } from "./interface"
import { MySQL, RESTAPI } from "./Resources"
import {
  FormContainerCSS,
  FormFooterCSS,
  BackIconCSS,
  FormFooterFilling,
  CreateResourceBtnCSS,
} from "./style"
import { Button } from "@illa-design/button"
import { PaginationPreIcon } from "@illa-design/icon"

export const ConfigureResourceForm: FC<ConfigureResourceFormProps> = (
  props,
) => {
  const { back, resouceType } = props

  const formRef = useRef<HTMLFormElement>(null)

  const renderResouceNode = () => {
    const nodeMap: {
      [index: string]: EmotionJSX.Element
    } = {
      // query
      "REST API": <RESTAPI />,
      // database
      MySQL: <MySQL />,
    }

    return cloneElement(nodeMap[resouceType], { ref: formRef }) || null
  }

  function submitForm() {
    formRef.current?.requestSubmit();
  }

  return (
    <div css={FormContainerCSS}>
      <div>{renderResouceNode()}</div>

      <div css={FormFooterCSS}>
        <Button
          variant="text"
          size="medium"
          colorScheme="grayBlue"
          type="button"
          onClick={back}
        >
          <PaginationPreIcon css={BackIconCSS} />
          Back
        </Button>

        <div css={FormFooterFilling}></div>

        <Button size="medium" colorScheme="gray" type="button">
          Test Connection
        </Button>

        <Button
          size="medium"
          colorScheme="techPurple"
          css={CreateResourceBtnCSS}
          onClick={submitForm}
        >
          Create Resource
        </Button>
      </div>
    </div>
  )
}
