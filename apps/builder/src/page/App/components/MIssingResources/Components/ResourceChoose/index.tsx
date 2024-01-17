import { getIconFromResourceType } from "@illa-public/icon"
import { FC, Suspense } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Select, SelectOptionObject, Space } from "@illa-design/react"
import DatabaseIcon from "@/page/App/components/Icons/database"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { createNewStyle, itemContainer, itemLogo, itemText } from "./style"

interface ResourceChooseProps {
  setGeneratorVisible: (v: boolean) => void
  changeResourceID: (resourceID: string) => void
  resourceID?: string
}

const ResourceChoose: FC<ResourceChooseProps> = ({
  setGeneratorVisible,
  resourceID,
  changeResourceID,
}) => {
  const { t } = useTranslation()

  const resourceList = useSelector(getAllResources)

  const options: SelectOptionObject[] = resourceList.map((item) => ({
    label: (
      <div css={itemContainer}>
        <span css={itemLogo}>
          <Suspense>
            {getIconFromResourceType(item.resourceType, "14px")}
          </Suspense>
        </span>
        <span css={itemText}>{item.resourceName}</span>
      </div>
    ),
    value: item.resourceID,
  }))
  options.unshift({
    label: (
      <Space
        size="8px"
        direction="horizontal"
        alignItems="center"
        css={createNewStyle}
      >
        <DatabaseIcon size="16px" />
        {t("editor.action.panel.option.resource.new")}
      </Space>
    ),
    value: "create",
  })

  return (
    <Select
      w="100%"
      colorScheme="techPurple"
      options={options}
      value={resourceID || " Choose a resource"}
      onChange={(value) => {
        if (value === "create") {
          setGeneratorVisible(true)
          return
        }
        changeResourceID(value as string)
      }}
    />
  )
}

export default ResourceChoose
