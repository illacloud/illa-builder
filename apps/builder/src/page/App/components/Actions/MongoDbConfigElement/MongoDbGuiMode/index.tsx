import { FC, useState } from "react"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Input,
  InputNumber,
  Password,
  RadioGroup,
  getColor,
} from "@illa-design/react"
import { MongoDbConfigModeProps } from "@/page/App/components/Actions/MongoDbConfigElement/interface"
import {
  applyConfigItemLabelText,
  hostInputContainer,
} from "@/page/App/components/Actions/MongoDbConfigElement/style"
import {
  configItem,
  configItemTip,
  connectTypeStyle,
  labelContainer,
} from "@/page/App/components/Actions/styles"
import {
  MongoDbConnectionFormat,
  MongoDbGuiConfigContent,
  MongoDbGuiConfigContentInitial,
  MongoDbResource,
} from "@/redux/resource/mongodbResource"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { isCloudVersion } from "@/utils/typeHelper"

export const MongoDbGuiMode: FC<MongoDbConfigModeProps> = (props) => {
  const { control, resourceId } = props

  const { t } = useTranslation()

  let findResource: Resource<ResourceContent> | undefined = useSelector(
    (state: RootState) => {
      return state.resource.find((r) => r.resourceId === resourceId)
    },
  )

  let content: MongoDbGuiConfigContent

  if (findResource === undefined) {
    content = MongoDbGuiConfigContentInitial
  } else {
    const mongoDbResource = (
      findResource as Resource<MongoDbResource<MongoDbGuiConfigContent>>
    ).content
    content =
      mongoDbResource.configType === "gui"
        ? mongoDbResource.configContent
        : MongoDbGuiConfigContentInitial
  }

  const [connectionFormat, setConnectionFormat] =
    useState<MongoDbConnectionFormat>(content.connectionFormat ?? "standard")

  return (
    <>
      <div css={configItem}>
        <div css={labelContainer}>
          <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
          <span
            css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
          >
            {t("editor.action.resource.db.label.hostname")}
          </span>
        </div>
        <div css={hostInputContainer}>
          <Controller
            defaultValue={content.host}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                w="100%"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                colorScheme="techPurple"
                placeholder={t(
                  "editor.action.resource.db.placeholder.hostname",
                )}
              />
            )}
            name="host"
          />
        </div>
      </div>
      <div css={configItem}>
        <div css={labelContainer}>
          <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
          <span
            css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
          >
            {t("editor.action.resource.db.label.connection_format")}
          </span>
        </div>
        <Controller
          defaultValue={connectionFormat}
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <RadioGroup
              w="100%"
              colorScheme="gray"
              ml="16px"
              mr="24px"
              type="button"
              forceEqualWidth={true}
              onBlur={onBlur}
              onChange={(v, event) => {
                setConnectionFormat(v)
                onChange(v, event)
              }}
              value={value}
              options={[
                {
                  value: "standard",
                  label: t(
                    "editor.action.resource.db.label.mongodb_connection_standard",
                  ),
                },
                {
                  value: "mongodb+srv",
                  label: t(
                    "editor.action.resource.db.label.mongodb_connection_dns_seed_list",
                  ),
                },
              ]}
            />
          )}
          name="connectionFormat"
        />
      </div>
      {connectionFormat === "standard" && (
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.db.label.port")}
            </span>
          </div>
          <div css={hostInputContainer}>
            <Controller
              defaultValue={content.port}
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <InputNumber
                  w="100%"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  colorScheme="techPurple"
                  placeholder="3306"
                />
              )}
              name="port"
            />
          </div>
        </div>
      )}
      <div css={configItem}>
        <div css={labelContainer}>
          <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
          <span
            css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
          >
            {t("editor.action.resource.db.label.database")}
          </span>
        </div>
        <Controller
          defaultValue={content.databaseName}
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
              placeholder={t("editor.action.resource.db.placeholder.database")}
            />
          )}
          name="databaseName"
        />
      </div>
      <div css={configItem}>
        <div css={labelContainer}>
          <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
          <span
            css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
          >
            {t("editor.action.resource.db.label.username_password")}
          </span>
        </div>
        <div css={hostInputContainer}>
          <Controller
            defaultValue={content.databaseUsername}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                w="100%"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                colorScheme="techPurple"
                placeholder={t(
                  "editor.action.resource.db.placeholder.username",
                )}
              />
            )}
            name="databaseUsername"
          />
          <Controller
            control={control}
            defaultValue={content.databasePassword}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Password
                colorScheme="techPurple"
                w="100%"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                ml="8px"
                placeholder={t(
                  "editor.action.resource.db.placeholder.password",
                )}
              />
            )}
            name="databasePassword"
          />
        </div>
      </div>
      {isCloudVersion && (
        <>
          <div css={configItemTip}>
            {t("editor.action.resource.db.tip.username_password")}
          </div>
          <div css={configItem}>
            <div css={labelContainer}>
              <span css={applyConfigItemLabelText(getColor("grayBlue", "02"))}>
                {t("editor.action.resource.db.label.connect_type")}
              </span>
            </div>
            <span css={connectTypeStyle}>
              {t("editor.action.resource.db.tip.connect_type")}
            </span>
          </div>
        </>
      )}
    </>
  )
}

MongoDbGuiMode.displayName = "MongoDbGuiMode"
