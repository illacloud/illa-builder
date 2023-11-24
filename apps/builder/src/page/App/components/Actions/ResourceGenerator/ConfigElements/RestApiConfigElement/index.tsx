import { RestApiResourceInit } from "@illa-public/public-configs"
import { RestApiAuth, RestApiResource } from "@illa-public/public-types"
import { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Alert, Divider } from "@illa-design/react"
import { optionLabelStyle } from "@/page/App/Module/ActionEditor/styles"
import { ControlledElement } from "@/page/App/components/Actions/ControlledElement"
import { InputRecordEditor } from "@/page/App/components/Actions/InputRecordEditor"
import { BasicAuthPanel } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/RestApiConfigElement/BasicAuthPanel"
import { BearerAuthPanel } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/RestApiConfigElement/BearerAuthPanel"
import { DigestAuthPanel } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/RestApiConfigElement/DigestAuthPanel"
import {
  AuthenticationOptions,
  VerificationModeOptions,
} from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/RestApiConfigElement/values"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { validate } from "@/utils/form"
import { BaseConfigElementProps } from "../interface"
import { container } from "../style"

const RestApiAuthTypeComponentMap = {
  none: null,
  basic: BasicAuthPanel,
  bearer: BearerAuthPanel,
  digest: DigestAuthPanel,
}

const RestApiConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID } = props

  const { t } = useTranslation()
  const { control, watch } = useFormContext()
  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID) as Resource<
      RestApiResource<RestApiAuth>
    >
  })
  const content = resource?.content ?? RestApiResourceInit

  const showCertificates = (watch("baseUrl", content.baseUrl) ?? "").startsWith(
    "https://",
  )
  const showCertificatesConfig = watch(
    "selfSignedCert",
    content?.selfSignedCert,
  )
  const showSkipVerify = watch("mode", content.certs?.mode) === "skip"
  const authType = watch("authentication", content.authentication)

  const SubPanelComponent =
    RestApiAuthTypeComponentMap[
      authType as keyof typeof RestApiAuthTypeComponentMap
    ]

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
        <Divider
          direction="horizontal"
          ml="24px"
          mr="24px"
          mt="8px"
          mb="8px"
          w="unset"
        />
        <div css={optionLabelStyle}>
          {t("editor.action.resource.db.title.general_option")}
        </div>
        <ControlledElement
          title={t("editor.action.resource.restapi.label.base_url")}
          defaultValue={content.baseUrl}
          isRequired
          name="baseUrl"
          controlledType="input"
          control={control}
          rules={[{ validate }]}
          placeholders={[
            t("editor.action.resource.restapi.placeholder.base_url"),
          ]}
        />
        <Controller
          control={control}
          defaultValue={content.urlParams}
          render={({ field: { value, onChange } }) => (
            <InputRecordEditor
              label={t("editor.action.resource.restapi.label.url_parameters")}
              records={value}
              onAdd={() => {
                onChange([...value, { key: "", value: "" }])
              }}
              onDelete={(index) => {
                let newRecords = [...value]
                newRecords.splice(index, 1)
                if (newRecords.length === 0) {
                  newRecords = [{ key: "", value: "" }]
                }
                onChange(newRecords)
              }}
              onChangeKey={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
              onChangeValue={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
            />
          )}
          name="urlParams"
        />
        <Controller
          control={control}
          defaultValue={content.headers}
          render={({ field: { value, onChange } }) => (
            <InputRecordEditor
              label={t("editor.action.resource.restapi.label.headers")}
              records={value}
              onAdd={() => {
                onChange([...value, { key: "", value: "" }])
              }}
              onDelete={(index) => {
                let newRecords = [...value]
                newRecords.splice(index, 1)
                if (newRecords.length === 0) {
                  newRecords = [{ key: "", value: "" }]
                }
                onChange(newRecords)
              }}
              onChangeKey={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
              onChangeValue={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
            />
          )}
          name="headers"
        />
        <Controller
          control={control}
          defaultValue={content.cookies}
          render={({ field: { value, onChange } }) => (
            <InputRecordEditor
              label={t("editor.action.resource.restapi.label.cookies")}
              records={value}
              onAdd={() => {
                onChange([...value, { key: "", value: "" }])
              }}
              onDelete={(index) => {
                let newRecords = [...value]
                newRecords.splice(index, 1)
                if (newRecords.length === 0) {
                  newRecords = [{ key: "", value: "" }]
                }
                onChange(newRecords)
              }}
              onChangeKey={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
              onChangeValue={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
            />
          )}
          name="cookies"
        />
        {showCertificates && (
          <ControlledElement
            title={t("editor.action.form.label.restapi.certificates")}
            defaultValue={content?.selfSignedCert ?? false}
            name="selfSignedCert"
            controlledType="switch"
            control={control}
            contentLabel={t("editor.action.form.option.restapi.certificates")}
          />
        )}
        {showCertificatesConfig && (
          <>
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.form.option.restapi.ca_certificate")}
              control={control}
              defaultValue={content?.certs?.caCert ?? ""}
              name="caCert"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.form.option.restapi.client_key")}
              control={control}
              defaultValue={content?.certs?.clientKey ?? ""}
              name="clientKey"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.form.option.restapi.client_certificate")}
              control={control}
              defaultValue={content?.certs?.clientCert ?? ""}
              name="clientCert"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />
            <ControlledElement
              title={t("editor.action.form.label.restapi.verification_mode")}
              defaultValue={content?.certs?.mode ?? "verify-full"}
              name="mode"
              controlledType="select"
              control={control}
              options={VerificationModeOptions}
            />
            {showSkipVerify && (
              <ControlledElement
                title=""
                defaultValue=""
                name=""
                controlledType="none"
                control={control}
                tips={
                  <Alert
                    title={t(
                      "editor.action.form.tips.connect_to_local.title.tips",
                    )}
                    content={t(
                      "editor.action.form.tips.restapi.verification_mode.skip_ca_certificate",
                    )}
                  />
                }
              />
            )}
          </>
        )}
        <ControlledElement
          title={t("editor.action.resource.restapi.label.authentication")}
          defaultValue={content.authentication}
          name="authentication"
          controlledType="select"
          control={control}
          options={AuthenticationOptions}
        />

        {SubPanelComponent && (
          <SubPanelComponent control={control} auth={content.authContent} />
        )}
      </div>
    </>
  )
}

RestApiConfigElement.displayName = "RestApiConfigElement"
export default RestApiConfigElement
