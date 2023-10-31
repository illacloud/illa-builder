import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { difference } from "lodash"
import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { AddIcon, Link, useMessage } from "@illa-design/react"
import { searchDSLByDisplayName } from "@/redux/currentApp/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { SectionViewShape } from "@/redux/currentApp/components/componentsState"
import { generateSectionContainerConfig } from "@/utils/generators/generatePageOrSectionConfig"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { HeaderProps } from "./interface"
import { headerLabelStyle, viewsListHeaderWrapperStyle } from "./style"
import { generateNewViewItemFromBodySectionConfig } from "./utils"

export const ViewListHeader: FC<HeaderProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const message = useMessage()
  const { sectionName, parentNodeDisplayName } = props

  const handleClickAddButton = useCallback(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "add_view",
      parameter2: sectionName.slice(0, -7),
    })

    const parentNode = searchDSLByDisplayName(parentNodeDisplayName)
    if (!parentNode) return
    if (!parentNode || !parentNode.props) return
    let bodySectionSubPaths: string[] = []
    if (sectionName !== "bodySection") {
      const pageNode = searchDSLByDisplayName(parentNode.parentNode!)
      if (!pageNode) return
      const bodySectionNode = pageNode.childrenNode.find(
        (node) => node.showName === "bodySection",
      )
      if (!bodySectionNode) return
      bodySectionSubPaths =
        bodySectionNode.props?.sectionViewConfigs.map(
          (config: Record<string, string>) => config.path,
        ) ?? []
    }

    const config = generateSectionContainerConfig(
      parentNodeDisplayName,
      `${sectionName}Container`,
    )
    const hasPaths = parentNode.props.sectionViewConfigs.map(
      (item: SectionViewShape) => {
        return item.path
      },
    )
    const diffSubPaths = difference(bodySectionSubPaths, hasPaths)
    if (diffSubPaths.length === 0 && sectionName !== "bodySection") {
      message.info({
        content: t("editor.page.message.new_path"),
      })
    }

    const newSectionViewConfig = generateNewViewItemFromBodySectionConfig(
      hasPaths,
      config.displayName,
      parentNodeDisplayName,
      diffSubPaths,
    )
    dispatch(
      componentsActions.addSectionViewConfigByConfigReducer({
        parentNodeName: parentNodeDisplayName,
        sectionName,
        sectionViewConfig: newSectionViewConfig,
        sectionViewNode: config,
      }),
    )
  }, [dispatch, message, parentNodeDisplayName, sectionName, t])

  return (
    <div css={viewsListHeaderWrapperStyle}>
      <span css={headerLabelStyle}>{t("editor.page.label_name.views")}</span>
      <Link
        colorScheme="techPurple"
        icon={<AddIcon />}
        hoverable
        onClick={handleClickAddButton}
      >
        <span>{t("editor.inspect.setter_content.column_setter.new")}</span>
      </Link>
    </div>
  )
}
