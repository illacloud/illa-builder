import { TextLink } from "@illa-public/text-link"
import { FC } from "react"
import { useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button, PreviousIcon } from "@illa-design/react"
import { footerStyle } from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import {
  AirtableResource,
  AirtableResourceInitial,
} from "@/redux/resource/airtableResource"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { validate } from "@/utils/form"
import { CreateButton } from "../ActionButtons/CreateButton"
import { BaseConfigElementProps } from "../interface"
import { container } from "../style"

const AirtableConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { onBack, resourceID, hasFooter = true } = props
  const { t } = useTranslation()

  const { control } = useFormContext()
  const resource = useSelector((state: RootState) => {
    return state.resource.find(
      (r) => r.resourceID === resourceID,
    ) as Resource<AirtableResource>
  })

  const content = resource?.content ?? AirtableResourceInitial

  const handleURLClick = (link: string) => window.open(link, "_blank")

  return (
    <>
      <div css={container}>
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

        <ControlledElement
          title={t("editor.action.form.option.airtable.access_token")}
          defaultValue={content.authenticationConfig.token}
          name="token"
          controlledType="password"
          control={control}
          isRequired
          tips={
            <Trans
              i18nKey="editor.action.form.tips.airtable.access_token"
              t={t}
              components={[
                <TextLink
                  key={"text-link"}
                  onClick={() => {
                    handleURLClick(
                      "https://support.airtable.com/docs/creating-and-using-api-keys-and-access-tokens",
                    )
                  }}
                />,
              ]}
            />
          }
        />
      </div>
      {hasFooter && (
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
          <CreateButton />
        </div>
      )}
    </>
  )
}

AirtableConfigElement.displayName = "AirtableConfigElement"
export default AirtableConfigElement
