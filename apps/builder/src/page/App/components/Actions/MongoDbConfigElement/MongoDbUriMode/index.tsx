import { FC } from "react"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Input, getColor } from "@illa-design/react"
import { MongoDbConfigModeProps } from "@/page/App/components/Actions/MongoDbConfigElement/interface"
import { applyConfigItemLabelText } from "@/page/App/components/Actions/MongoDbConfigElement/style"
import {
  configItem,
  labelContainer,
} from "@/page/App/components/Actions/styles"
import {
  MongoDbResource,
  MongoDbUriConfigContent,
  MongoDbUriConfigContentInitial,
} from "@/redux/resource/mongodbResource"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"
import { RootState } from "@/store"

export const MongoDbUriMode: FC<MongoDbConfigModeProps> = (props) => {
  const { resourceId, control } = props

  const { t } = useTranslation()

  let findResource: Resource<ResourceContent> | undefined = useSelector(
    (state: RootState) => {
      return state.resource.find((r) => r.resourceId === resourceId)
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
    <div css={configItem}>
      <div css={labelContainer}>
        <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
        <span css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}>
          {t("editor.action.resource.db.label.connection_format")}
        </span>
      </div>
      <Controller
        control={control}
        defaultValue={content.uri}
        rules={{
          required: true,
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            w="100%"
            onBlur={onBlur}
            onChange={onChange}
            ml="16px"
            mr="24px"
            value={value}
            colorScheme="techPurple"
            placeholder={
              "mongodb+srv://admin:password@host/mydb?retryWrites=true&w=majority"
            }
          />
        )}
        name="uri"
      />
    </div>
  )
}

MongoDbUriMode.displayName = "MongoDbUriMode"
