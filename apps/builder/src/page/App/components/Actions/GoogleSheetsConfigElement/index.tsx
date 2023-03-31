import { FC, useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button, ButtonGroup, PreviousIcon } from "@illa-design/react"
import { ResourceDivider } from "@/page/App/components/Actions/ResourceDivider"
import { onActionConfigElementSubmit } from "@/page/App/components/Actions/api"
import { ConfigElementProps } from "@/page/App/components/Actions/interface"
import { container, footerStyle } from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import { TextLink } from "@/page/User/components/TextLink"
import {
  GoogleSheetResource,
  GoogleSheetResourceInitial,
} from "@/redux/resource/googleSheetResource"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { validate } from "@/utils/form"

export const GoogleSheetsConfigElement: FC<ConfigElementProps> = (props) => {
  const { resourceId, onBack, onFinished } = props
  const { t } = useTranslation()
  const { handleSubmit, control, formState } = useForm({
    shouldUnregister: true,
    mode: "onChange",
  })
  const resource = useSelector(getAllResources).find(
    (r) => r.resourceId === resourceId,
  )
  const content = (resource?.content ??
    GoogleSheetResourceInitial) as GoogleSheetResource

  const [saving, setSaving] = useState<boolean>(false)

  const handleLinkTo = useCallback(
    (link: string) => () => {
      window.open(link, "_blank")
    },
    [],
  )

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceId,
        "googlesheets",
        onFinished,
        setSaving,
      )}
    >
      <div css={container}>
        <ResourceDivider type="Service Account" />
        <ControlledElement
          title={t("editor.action.form.label.gs.private_key")}
          defaultValue={content.opts.privateKey}
          name="privateKey"
          isRequired
          rules={[
            {
              validate,
            },
          ]}
          controlledType="textarea"
          control={control}
          placeholders={[t("editor.action.form.placeholder.gs.private_key")]}
          tips={
            <Trans
              i18nKey="editor.action.form.tips.gs.private_key"
              t={t}
              components={[
                <TextLink
                  key="editor.action.form.tips.gs.private_key.console"
                  onClick={handleLinkTo(
                    "https://console.cloud.google.com/cloud-resource-manager",
                  )}
                />,
                <TextLink
                  key="editor.action.form.tips.gs.private_key.docs"
                  onClick={handleLinkTo(
                    "https://cloud.google.com/docs/authentication/getting-started",
                  )}
                />,
                <TextLink
                  key="editor.action.form.tips.gs.private_key.limit"
                  onClick={handleLinkTo(
                    "https://developers.google.com/sheets/api/limits",
                  )}
                />,
              ]}
            />
          }
        />
        <ResourceDivider type="General Option" />
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.name")}
          control={control}
          defaultValue={resource?.resourceName ?? ""}
          rules={[
            {
              validate,
            },
          ]}
          placeholders={[t("editor.action.resource.db.placeholder.name")]}
          name="resourceName"
          tips={t("editor.action.resource.restapi.tip.name")}
        />
      </div>
      <div css={footerStyle}>
        <Button
          leftIcon={<PreviousIcon />}
          variant="text"
          colorScheme="gray"
          type="button"
          onClick={onBack}
        >
          {t("back")}
        </Button>
        <ButtonGroup spacing="8px">
          <Button
            colorScheme="techPurple"
            disabled={!formState.isValid}
            loading={saving}
            type="submit"
          >
            {t("editor.action.form.btn.save_changes")}
          </Button>
        </ButtonGroup>
      </div>
    </form>
  )
}
GoogleSheetsConfigElement.displayName = "GoogleSheetsConfigElement"
