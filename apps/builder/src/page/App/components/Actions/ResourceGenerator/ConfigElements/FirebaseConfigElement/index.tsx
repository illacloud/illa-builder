import { FirebaseResourceInitial } from "@illa-public/public-configs"
import { FirebaseResource } from "@illa-public/public-types"
import { TextLink } from "@illa-public/text-link"
import { isCloudVersion } from "@illa-public/utils"
import { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Divider,
  Popover,
  TextArea,
  WarningCircleIcon,
  getColor,
} from "@illa-design/react"
import {
  applyConfigItemLabelText,
  configItemTip,
  connectType,
  connectTypeStyle,
  errorIconStyle,
  errorMsgStyle,
  labelContainer,
  optionLabelStyle,
  privateKeyItem,
} from "@/page/App/Module/ActionEditor/styles"
import { ControlledElement } from "@/page/App/components/Actions/ControlledElement"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { urlValidate, validate } from "@/utils/form"
import { BaseConfigElementProps } from "../interface"
import { container } from "../style"

const FirebaseConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID } = props

  const { t } = useTranslation()

  const { control, formState } = useFormContext()

  const findResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  let content: FirebaseResource

  if (findResource === undefined) {
    content = FirebaseResourceInitial
  } else {
    content = (findResource as Resource<FirebaseResource>).content
  }

  return (
    <>
      <div css={container}>
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
    </>
  )
}

FirebaseConfigElement.displayName = "FirebaseConfigElement"
export default FirebaseConfigElement
