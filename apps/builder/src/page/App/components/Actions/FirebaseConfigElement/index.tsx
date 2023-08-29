import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useCallback, useContext, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Button,
  ButtonGroup,
  Divider,
  Popover,
  PreviousIcon,
  TextArea,
  WarningCircleIcon,
  getColor,
  useMessage,
} from "@illa-design/react"
import {
  onActionConfigElementSubmit,
  onActionConfigElementTest,
} from "@/page/App/components/Actions/api"
import { ConfigElementProps } from "@/page/App/components/Actions/interface"
import {
  applyConfigItemLabelText,
  configItemTip,
  connectType,
  connectTypeStyle,
  container,
  divider,
  errorIconStyle,
  errorMsgStyle,
  footerStyle,
  labelContainer,
  optionLabelStyle,
  privateKeyItem,
} from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import { TextLink } from "@/page/User/components/TextLink"
import {
  FirebaseResource,
  FirebaseResourceInitial,
} from "@/redux/resource/firebaseResource"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { urlValidate, validate } from "@/utils/form"

export const FirebaseConfigElement: FC<ConfigElementProps> = (props) => {
  const { onBack, resourceID, onFinished } = props

  const { t } = useTranslation()
  const message = useMessage()
  const { track } = useContext(MixpanelTrackContext)

  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  const findResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  let content: FirebaseResource

  if (findResource === undefined) {
    content = FirebaseResourceInitial
  } else {
    content = (findResource as Resource<FirebaseResource>).content
  }

  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleConnectionTest = useCallback(() => {
    track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "resource_configure_test",
      parameter5: "firebase",
    })
    const data = getValues()
    try {
      const content = {
        databaseUrl: data.databaseUrl.trim(),
        projectID: data.projectID,
        privateKey: JSON.parse(data.privateKey),
      }
      onActionConfigElementTest(data, content, "firebase", setTestLoading)
    } catch (e) {
      message.error({
        content: t("editor.action.resource.db.invalid_private.key"),
      })
    }
  }, [getValues, message, t, track])

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceID,
        "firebase",
        onFinished,
        setSaving,
      )}
    >
      <div css={container}>
        <div css={divider} />
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.name")}
          control={control}
          defaultValue={findResource?.resourceName ?? ""}
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
          title={t("editor.action.resource.db.label.firebase_database_url")}
          defaultValue={content.databaseUrl}
          name="databaseUrl"
          controlledType="input"
          control={control}
          isRequired
          rules={[
            {
              required: t("editor.action.resource.error.invalid_url"),
              validate: urlValidate,
            },
          ]}
          tips={
            formState.errors.databaseUrl && (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                <>{formState.errors.databaseUrl.message}</>
              </div>
            )
          }
        />
        <ControlledElement
          title={t("editor.action.resource.db.label.firebase_project_id")}
          defaultValue={content.projectID}
          name="projectID"
          controlledType="input"
          control={control}
          isRequired
          rules={[
            {
              validate,
            },
          ]}
        />
        <div css={privateKeyItem}>
          <Popover
            content={t("editor.action.resource.db.label.private_key_hover")}
            hasCloseIcon={false}
            trigger="hover"
            colorScheme="gray"
            showArrow={false}
          >
            <div css={labelContainer}>
              <span css={applyConfigItemLabelText(getColor("red", "02"))}>
                *
              </span>
              <span css={applyConfigItemLabelText(getColor("grayBlue", "02"))}>
                {t("editor.action.resource.db.label.private_key")}
              </span>
            </div>
          </Popover>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            defaultValue={
              content.privateKey && JSON.stringify(content.privateKey)
            }
            render={({ field: { value, onChange, onBlur } }) => (
              <TextArea
                style={{
                  overflow: "scroll",
                  minHeight: "240px",
                }}
                colorScheme="techPurple"
                w="100%"
                ml="16px"
                mr="24px"
                mb="8px"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                autoSize
                placeholder={t(
                  "editor.action.resource.db.placeholder.private_key",
                )}
              />
            )}
            name="privateKey"
          />
        </div>
        <div css={configItemTip}>
          <Trans
            i18nKey="editor.action.resource.db.tip.private_key"
            t={t}
            components={[
              <TextLink
                key="go-to-setup"
                onClick={() => {
                  window.open(
                    "https://firebase.google.com/docs/admin/setup",
                    "_blank",
                  )
                }}
              />,
            ]}
          />
        </div>
        {isCloudVersion && (
          <div css={connectType}>
            <div css={labelContainer}>
              <span css={applyConfigItemLabelText(getColor("grayBlue", "02"))}>
                {t("editor.action.resource.db.label.connect_type")}
              </span>
            </div>
            <span css={connectTypeStyle}>
              {t("editor.action.resource.db.tip.connect_type")}
            </span>
          </div>
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
            colorScheme="gray"
            loading={testLoading}
            disabled={!formState.isValid}
            type="button"
            onClick={handleConnectionTest}
          >
            {t("editor.action.form.btn.test_connection")}
          </Button>
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

FirebaseConfigElement.displayName = "FirebaseConfigElement"
