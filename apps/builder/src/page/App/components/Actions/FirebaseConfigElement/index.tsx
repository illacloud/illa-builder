import { FC, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Button,
  ButtonGroup,
  Divider,
  Input,
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
import {
  configItem,
  configItemTip,
  connectType,
  connectTypeStyle,
  labelContainer,
  optionLabelStyle,
} from "@/page/App/components/Actions/styles"
import { TextLink } from "@/page/User/components/TextLink"
import {
  FirebaseResource,
  FirebaseResourceInitial,
} from "@/redux/resource/firebaseResource"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { isCloudVersion, isURL } from "@/utils/typeHelper"
import { FirebaseConfigElementProps } from "./interface"
import {
  applyConfigItemLabelText,
  container,
  divider,
  errorIconStyle,
  errorMsgStyle,
  footerStyle,
  privateKeyItem,
} from "./style"

export const FirebaseConfigElement: FC<FirebaseConfigElementProps> = (
  props,
) => {
  const { onBack, resourceId, onFinished } = props

  const { t } = useTranslation()
  const message = useMessage()

  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  const findResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceId === resourceId)
  })

  let content: FirebaseResource

  if (findResource === undefined) {
    content = FirebaseResourceInitial
  } else {
    content = (findResource as Resource<FirebaseResource>).content
  }

  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleConnectionTest = () => {
    const data = getValues()

    try {
      const content = {
        databaseUrl: data.databaseUrl,
        projectID: data.projectID,
        privateKey: JSON.parse(data.privateKey),
      }

      onActionConfigElementTest(data, content, "firebase", setTestLoading)
    } catch (e) {
      message.error({
        content: t("editor.action.resource.db.invalid_private.key"),
      })
    }
  }

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceId,
        "firebase",
        onFinished,
        setSaving,
      )}
    >
      <div css={container}>
        <div css={divider} />
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.db.label.name")}
            </span>
          </div>
          <Controller
            control={control}
            defaultValue={findResource?.resourceName ?? ""}
            rules={{
              validate: (value) => value != undefined && value.trim() != "",
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                w="100%"
                ml="16px"
                mr="24px"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                colorScheme="techPurple"
                placeholder={t("editor.action.resource.db.placeholder.name")}
              />
            )}
            name="resourceName"
          />
        </div>
        <div css={configItemTip}>
          {t("editor.action.resource.restapi.tip.name")}
        </div>
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
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.db.label.firebase_database_url")}
            </span>
          </div>
          <Controller
            defaultValue={content.databaseUrl}
            control={control}
            rules={{
              required: t("editor.action.resource.error.invalid_url"),
              validate: (value: string) => {
                return isURL(value)
                  ? true
                  : t("editor.action.resource.error.invalid_url")
              },
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                w="100%"
                ml="16px"
                mr="24px"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                colorScheme="techPurple"
              />
            )}
            name="databaseUrl"
          />
        </div>
        {formState.errors.databaseUrl && (
          <div css={configItemTip}>
            <div css={errorMsgStyle}>
              <>
                <WarningCircleIcon css={errorIconStyle} />
                {formState.errors.databaseUrl.message}
              </>
            </div>
          </div>
        )}
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.db.label.firebase_project_id")}
            </span>
          </div>
          <Controller
            defaultValue={content.projectID}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                w="100%"
                ml="16px"
                mr="24px"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                colorScheme="techPurple"
              />
            )}
            name="projectID"
          />
        </div>
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
