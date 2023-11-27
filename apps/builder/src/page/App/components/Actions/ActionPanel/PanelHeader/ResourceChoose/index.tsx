import { getIconFromResourceType } from "@illa-public/icon"
import { getInitialContent } from "@illa-public/public-configs"
import { FC, Suspense } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  AddIcon,
  PenIcon,
  Select,
  Space,
  globalColor,
  illaPrefix,
} from "@illa-design/react"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { createNewStyle, itemContainer, itemLogo, itemText } from "./style"

interface ResourceChooseProps {
  setGeneratorVisible: (v: boolean) => void
  setEditorVisible: (v: boolean) => void
}

const ResourceChoose: FC<ResourceChooseProps> = ({
  setGeneratorVisible,
  setEditorVisible,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const resourceList = useSelector(getAllResources)
  const action = useSelector(getCachedAction)!!
  const selectedAction = useSelector(getSelectedAction)!!

  //maybe empty
  const currentSelectResource = resourceList.find(
    (r) => r.resourceID === action.resourceID,
  )

  const options = resourceList.map((item) => ({
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
        <AddIcon size="14px" />
        {t("editor.action.panel.option.resource.new")}
      </Space>
    ),
    value: "create",
  })

  return (
    <Select
      w="360px"
      colorScheme="techPurple"
      options={options}
      value={
        currentSelectResource
          ? action.resourceID
          : t("editor.action.resource_choose.deleted")
      }
      onChange={(value) => {
        if (value === "create") {
          setGeneratorVisible(true)
          return
        }
        const resource = resourceList.find((r) => r.resourceID === value)
        if (resource != undefined) {
          dispatch(
            configActions.updateCachedAction({
              ...action,
              // selected resource is same as action type
              actionType: resource.resourceType,
              resourceID: value as string,
              content:
                selectedAction.actionType === resource.resourceType
                  ? selectedAction.content
                  : getInitialContent(resource.resourceType),
            }),
          )
        }
      }}
      addAfter={
        <PenIcon
          style={
            currentSelectResource
              ? { cursor: "pointer" }
              : { cursor: "not-allowed" }
          }
          color={globalColor(`--${illaPrefix}-grayBlue-04`)}
          onClick={(e) => {
            e.stopPropagation()
            if (currentSelectResource) {
              setEditorVisible(true)
            }
          }}
        />
      }
    />
  )
}

export default ResourceChoose
