import { FC, useState } from "react"
import { ResourceEditorProps } from "./interface"
import { footerStyle } from "./style"
import { Button, ButtonGroup } from "@illa-design/button"
import { PaginationPreIcon } from "@illa-design/icon"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { getAllResources } from "@/redux/resource/resourceSelector"

export const ActionResourceCreator: FC<ResourceEditorProps> = (props) => {
  const { resourceId, onBack, onCreated, resourceType } = props

  const { t } = useTranslation()

  const resourceList = useSelector(getAllResources)
    .filter((r) => r.resourceType == resourceType)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )

  const [testLoading, setTestLoading] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const [fillFinished, setFillFinished] = useState(false)

  return (
    <div>
      <div css={footerStyle}>
        <Button
          leftIcon={<PaginationPreIcon />}
          variant="text"
          colorScheme="gray"
          onClick={() => {
            if (resourceList.length == 0) {
              onBack("select")
            } else {
              onBack("createAction")
            }
          }}
        >
          {t("back")}
        </Button>
        <ButtonGroup spacing="8px">
          <Button
            colorScheme="gray"
            loading={testLoading}
            disabled={!fillFinished}
            onClick={() => {}}
          >
            {t("editor.action.form.btn.test_connection")}
          </Button>
          <Button
            colorScheme="techPurple"
            disabled={!fillFinished}
            loading={createLoading}
            onClick={() => {}}
          >
            {t("editor.action.form.btn.create_resource")}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

ActionResourceCreator.displayName = "ActionResourceCreator"
