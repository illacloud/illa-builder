import { selectAllResource } from "@/redux/action/resource/resourceSelector"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { FC, useRef, cloneElement } from "react"
import { ConfigureResourceFormProps, ConnectionRef } from "./interface"
import { MySQL, RESTAPI } from "./Resources"
import {
  formContainerCss,
  formFooterCss,
  backIconCss,
  FormFooterFilling,
  createResourceBtnCss,
} from "./style"
import { Button } from "@illa-design/button"
import { PaginationPreIcon } from "@illa-design/icon"

export const ConfigureResourceForm: FC<ConfigureResourceFormProps> = (
  props,
) => {
  const { resourceId, back, onSubmit, resourceType: resourceTypeProps } = props
  const { t } = useTranslation()

  const resource = useSelector(selectAllResource).find(
    (i) => i.id === resourceId,
  )
  // if receive `resourceTypeProps` means add new
  const resourceType = resourceTypeProps || resource?.type

  const connectionRef = useRef<ConnectionRef>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const renderResourceNode = () => {
    let node = null

    switch (resourceType) {
      case "REST API":
        node = <RESTAPI resourceId={resourceId} />
        break
      case "MySQL":
        node = <MySQL connectionRef={connectionRef} resourceId={resourceId} />
        break
      default:
        node = <div>No Config</div>
        break
    }

    return cloneElement(node, { ref: formRef }) || null
  }

  function submitForm() {
    formRef.current?.requestSubmit()
    onSubmit && onSubmit()
  }

  return (
    <div css={formContainerCss}>
      <div>{renderResourceNode()}</div>
      <div css={formFooterCss}>
        <Button
          variant="text"
          size="medium"
          colorScheme="grayBlue"
          type="button"
          onClick={back}
        >
          <PaginationPreIcon css={backIconCss} />
          {t("editor.action.form.btn.back")}
        </Button>

        <div css={FormFooterFilling} />

        <Button
          size="medium"
          colorScheme="gray"
          type="button"
          onClick={() => {
            connectionRef.current?.testConnection()
          }}
        >
          {t("editor.action.form.btn.testConnection")}
        </Button>

        <Button
          size="medium"
          colorScheme="techPurple"
          css={createResourceBtnCss}
          onClick={submitForm}
        >
          {t("editor.action.form.btn.createResource")}
        </Button>
      </div>
    </div>
  )
}
