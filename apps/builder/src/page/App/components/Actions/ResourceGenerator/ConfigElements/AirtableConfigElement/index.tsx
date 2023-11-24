import { AirtableResourceInitial } from "@illa-public/public-configs"
import { AirtableResource } from "@illa-public/public-types"
import { TextLink } from "@illa-public/text-link"
import { FC } from "react"
import { useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { ControlledElement } from "@/page/App/components/Actions/ControlledElement"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { validate } from "@/utils/form"
import { BaseConfigElementProps } from "../interface"
import { container } from "../style"

const AirtableConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID } = props
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
    </>
  )
}

AirtableConfigElement.displayName = "AirtableConfigElement"
export default AirtableConfigElement
