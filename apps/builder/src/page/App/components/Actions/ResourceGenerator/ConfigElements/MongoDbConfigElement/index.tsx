import { MongoDbResourceInitial } from "@illa-public/public-configs"
import { MongoDbConfig, MongoDbResource } from "@illa-public/public-types"
import { FC } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Divider } from "@illa-design/react"
import { optionLabelStyle } from "@/page/App/Module/ActionEditor/styles"
import { ControlledElement } from "@/page/App/components/Actions/ControlledElement"
import { MongoDbGuiMode } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/MongoDbConfigElement/MongoDbGuiMode"
import { MongoDbUriMode } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/MongoDbConfigElement/MongoDbUriMode"
import { RootState } from "@/store"
import { validate } from "@/utils/form"
import { BaseConfigElementProps } from "../interface"
import { container } from "../style"

const MongoDbConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID } = props

  const { t } = useTranslation()
  const { control, watch } = useFormContext()

  const findResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  let content: MongoDbResource<MongoDbConfig>
  if (findResource === undefined) {
    content = MongoDbResourceInitial
  } else {
    content = findResource.content as MongoDbResource<MongoDbConfig>
  }

  const configTypeWatch = watch("configType", content.configType)
  const openSSLWatch = watch("open", content.ssl.open ?? false)

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
          title={t("editor.action.resource.db.label.config_type")}
          defaultValue={content.configType}
          name="configType"
          controlledType="radio-group"
          control={control}
          forceEqualWidth
          options={[
            {
              value: "gui",
              label: "General",
            },
            {
              value: "uri",
              label: "URI",
            },
          ]}
        />
        {configTypeWatch === "gui" && (
          <MongoDbGuiMode
            control={control}
            watch={watch}
            resourceID={resourceID}
          />
        )}
        {configTypeWatch === "uri" && (
          <MongoDbUriMode
            control={control}
            watch={watch}
            resourceID={resourceID}
          />
        )}

        <ControlledElement
          controlledType={["switch"]}
          title={t("editor.action.resource.db.label.ssl_options")}
          control={control}
          defaultValue={content.ssl.open}
          name="open"
          contentLabel={t("editor.action.resource.db.tip.ssl_options")}
        />

        {openSSLWatch && (
          <>
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.resource.db.label.mongodb_ssl_client")}
              control={control}
              defaultValue={content.ssl.client}
              name="client"
              placeholders={[
                t("editor.action.resource.db.placeholder.mongo_certificate"),
              ]}
            />
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.resource.db.label.mongodb_ssl_ca")}
              control={control}
              defaultValue={content.ssl.ca}
              name="ca"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />
          </>
        )}
      </div>
    </>
  )
}

MongoDbConfigElement.displayName = "MongoDbConfigElement"
export default MongoDbConfigElement
