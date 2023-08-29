import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { MongoDbConfigModeProps } from "@/page/App/components/Actions/MongoDbConfigElement/interface"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import {
  MongoDbResource,
  MongoDbUriConfigContent,
  MongoDbUriConfigContentInitial,
} from "@/redux/resource/mongodbResource"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { validate } from "@/utils/form"

export const MongoDbUriMode: FC<MongoDbConfigModeProps> = (props) => {
  const { resourceID, control } = props

  const { t } = useTranslation()
  const findResource: Resource<ResourceContent> | undefined = useSelector(
    (state: RootState) => {
      return state.resource.find((r) => r.resourceID === resourceID)
    },
  )

  let content: MongoDbUriConfigContent
  if (findResource === undefined) {
    content = MongoDbUriConfigContentInitial
  } else {
    const mongoDbResource = (
      findResource as Resource<MongoDbResource<MongoDbUriConfigContent>>
    ).content
    content =
      mongoDbResource.configType === "uri"
        ? mongoDbResource.configContent
        : MongoDbUriConfigContentInitial
  }

  return (
    <ControlledElement
      title={t("editor.action.resource.db.label.connection_format")}
      control={control}
      name="uri"
      defaultValue={content.uri}
      placeholders={[
        "mongodb+srv://admin:password@host/mydb?retryWrites=true&w=majority",
      ]}
      controlledType="input"
      rules={[
        {
          validate,
        },
      ]}
      isRequired
    />
  )
}

MongoDbUriMode.displayName = "MongoDbUriMode"
