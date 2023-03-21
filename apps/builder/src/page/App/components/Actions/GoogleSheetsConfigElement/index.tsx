import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button, ButtonGroup, Divider, PreviousIcon } from "@illa-design/react"
import { onActionConfigElementSubmit } from "@/page/App/components/Actions/api"
import { ConfigElementProps } from "@/page/App/components/Actions/interface"
import {
  container,
  divider,
  footerStyle,
  optionLabelStyle,
} from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import {
  GoogleSheetAccessOptions,
  GoogleSheetAuthenticationOptions,
  GoogleSheetResource,
  GoogleSheetResourceInitial,
} from "@/redux/resource/googleSheetResource"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { validate } from "@/utils/form"

export const GoogleSheetsConfigElement: FC<ConfigElementProps> = (props) => {
  const { resourceId, onBack, onFinished } = props
  const { t } = useTranslation()
  const { handleSubmit, control, formState, watch } = useForm({
    shouldUnregister: true,
    mode: "onChange",
  })
  const resource = useSelector(getAllResources).find(
    (r) => r.resourceId === resourceId,
  )
  const content = (resource?.content ??
    GoogleSheetResourceInitial) as GoogleSheetResource

  const [saving, setSaving] = useState<boolean>(false)

  const authType = watch("authentication", content.authentication)
  const isServiceAccount = authType === "serviceAccount"
  const isOAuth = authType === "oauth"

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceId,
        "googlesheet",
        onFinished,
        setSaving,
      )}
    >
      <div css={container}>
        <div css={divider} />
        <ControlledElement
          title={"Authentication"}
          defaultValue={content.authentication}
          name="authentication"
          isRequired
          rules={[
            {
              validate,
            },
          ]}
          controlledType="select"
          control={control}
          options={GoogleSheetAuthenticationOptions}
          tips={
            isServiceAccount
              ? "With service account authentication, we will only have access to spreadsheets you share with the email address corresponding to the service account used. See here for documentation on creating a service account and access key."
              : null
          }
        />

        {isServiceAccount && (
          <ControlledElement
            title={"Private Key"}
            defaultValue={content.privateKey}
            name="privateKey"
            isRequired={isServiceAccount}
            rules={[
              {
                validate,
              },
            ]}
            controlledType="textarea"
            control={control}
            placeholders={[
              `{
                  "type": "service_account",
                  "project_id": "projectId",
                  "private_key_id": "privateKeyId",
                  "private_key": "-----BEGIN PRIVATE KEY-----
                privateKey
                -----END PRIVATE KEY-----",
                  "client_email": "clientEmail",
                  "client_id": "100000000000000000000",
                  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                  "token_uri": "https://oauth2.googleapis.com/token",
                  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                  "client_x509_cert_url": "clientx509CertUrl"
                }`,
            ]}
            tips={
              "Used to connect to Google Sheets. Click here to create a project and get the OAuth credential. "
            }
          />
        )}

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
        {isOAuth && (
          <>
            <ControlledElement
              title={"Access Type"}
              name="accessType"
              controlledType="select"
              control={control}
              defaultValue={content.accessType}
              isRequired
              options={GoogleSheetAccessOptions}
              tips={
                "If you want to build apps that can modify your spreadsheets, make sure to enable read and write access."
              }
            />
            <ControlledElement
              title={"Share credentials"}
              name="shareCredentials"
              controlledType="checkbox"
              control={control}
              defaultValue={content.shareCredentials}
              contentLabel={
                "Share Google Sheets credentials with members and share with users when the app is public."
              }
            />
          </>
        )}
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
