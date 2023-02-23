import { FC, useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Button,
  ButtonGroup,
  Divider,
  Input,
  InputNumber,
  Password,
  PreviousIcon,
  WarningCircleIcon,
  getColor,
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
} from "@/page/App/components/Actions/styles"
import {
  ElasticSearchResource,
  ElasticSearchResourceInitial,
} from "@/redux/resource/elasticSearchResource"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { isCloudVersion, isURL } from "@/utils/typeHelper"
import { RedisConfigElementProps } from "./interface"
import {
  applyConfigItemLabelText,
  container,
  divider,
  errorIconStyle,
  errorMsgStyle,
  footerStyle,
  hostInputContainer,
} from "./style"

export const ElasticSearchConfigElement: FC<RedisConfigElementProps> = (
  props,
) => {
  const { onBack, resourceId, onFinished } = props

  const { t } = useTranslation()

  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  const findResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceId === resourceId)
  })

  const content = useMemo(() => {
    if (findResource === undefined) {
      return ElasticSearchResourceInitial
    } else {
      return (findResource as Resource<ElasticSearchResource>).content
    }
  }, [findResource])

  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceId,
        "elasticsearch",
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
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.db.label.hosturl")}
            </span>
          </div>
          <div css={hostInputContainer}>
            <Controller
              defaultValue={content.host}
              control={control}
              rules={{
                required: t("editor.action.form.required"),
                validate: (value: string) => {
                  return isURL(value)
                    ? true
                    : t("editor.action.resource.error.invalid_url")
                },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  w="100%"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  error={!!formState.errors.host}
                  colorScheme="techPurple"
                  placeholder={t(
                    "editor.action.resource.db.placeholder.hosturl",
                  )}
                />
              )}
              name="host"
            />
          </div>
        </div>
        {formState.errors.host && (
          <div css={configItemTip}>
            <div css={errorMsgStyle}>
              <>
                <WarningCircleIcon css={errorIconStyle} />
                {formState.errors.host.message}
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
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  colorScheme="techPurple"
                  w="100%"
                  placeholder="9200"
                />
              )}
              name="port"
            />
          </div>
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
              defaultValue={content.username}
              control={control}
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
              name="username"
            />
            <Controller
              control={control}
              defaultValue={content.password}
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
              name="password"
            />
          </div>
        </div>
        {isCloudVersion && (
          <>
            <div css={configItemTip}>
              {t("editor.action.resource.db.tip.username_password")}
            </div>
            <div css={connectType}>
              <div css={labelContainer}>
                <span
                  css={applyConfigItemLabelText(getColor("grayBlue", "02"))}
                >
                  {t("editor.action.resource.db.label.connect_type")}
                </span>
              </div>
              <span css={connectTypeStyle}>
                {t("editor.action.resource.db.tip.connect_type")}
              </span>
            </div>
          </>
        )}
      </div>
      <div css={footerStyle}>
        <Button
          leftIcon={<PreviousIcon />}
          variant="text"
          colorScheme="gray"
          type="button"
          onClick={() => {
            onBack()
          }}
        >
          {t("back")}
        </Button>
        <ButtonGroup spacing="8px">
          <Button
            colorScheme="gray"
            loading={testLoading}
            disabled={!formState.isValid}
            type="button"
            onClick={() => {
              const data = getValues()
              onActionConfigElementTest(
                data,
                {
                  host: data.host,
                  port: data.port.toString(),
                  username: data.username,
                  password: data.password,
                },
                "elasticsearch",
                setTestLoading,
              )
            }}
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

ElasticSearchConfigElement.displayName = "ElasticSearchConfigElement"
