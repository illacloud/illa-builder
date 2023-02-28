import { FC, useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button, ButtonGroup, Divider, PreviousIcon } from "@illa-design/react"
import {
  onActionConfigElementSubmit,
  onActionConfigElementTest,
} from "@/page/App/components/Actions/api"
import { ConfigElementProps } from "@/page/App/components/Actions/interface"
import {
  container,
  divider,
  footerStyle,
  optionLabelStyle,
} from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import {
  AppWriteResource,
  AppWriteResourceInitial,
} from "@/redux/resource/appWriteResource"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { validate } from "@/utils/form"

export const AppWriteConfigElement: FC<ConfigElementProps> = (props) => {
  const { resourceId, onBack, onFinished } = props
  const { t } = useTranslation()
  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })
  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceId === resourceId)
  })
  let content: AppWriteResource
  if (!resource) {
    content = AppWriteResourceInitial
  } else {
    content = (resource as Resource<AppWriteResource>).content
  }

  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleConnectionTest = useCallback(() => {
    const data = getValues()
    onActionConfigElementTest(
      data,
      {
        host: data.host,
        projectID: data.projectID,
        database: data.database,
        jwt: data.jwt,
      },
      "appwrite",
      setTestLoading,
    )
  }, [getValues])

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceId,
        "appwrite",
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
          controlledType="input"
          isRequired
          title={"Host"}
          control={control}
          defaultValue={content.host}
          rules={[
            {
              validate,
            },
          ]}
          placeholders={["Hostname or IP"]}
          name="host"
        />
        <ControlledElement
          controlledType="input"
          isRequired
          title={"Database ID"}
          control={control}
          defaultValue={content.database}
          rules={[
            {
              validate,
            },
          ]}
          placeholders={["Database ID"]}
          name="database"
        />
        <ControlledElement
          controlledType="input"
          isRequired
          title={"Project ID"}
          control={control}
          defaultValue={content.projectID}
          rules={[
            {
              validate,
            },
          ]}
          placeholders={["Project ID"]}
          name="projectID"
        />
        <ControlledElement
          controlledType="input"
          isRequired
          title={"X-Appwrite-JWT"}
          control={control}
          defaultValue={content.jwt}
          rules={[
            {
              validate,
            },
          ]}
          placeholders={["token"]}
          name="jwt"
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
AppWriteConfigElement.displayName = "AppWriteConfigElement"
