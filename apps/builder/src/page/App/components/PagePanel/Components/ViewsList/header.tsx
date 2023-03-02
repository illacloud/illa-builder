import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { AddIcon, Button, Link, PlusIcon } from "@illa-design/react"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { SectionViewShape } from "@/redux/currentApp/editor/components/componentsState"
import { generateSectionContainerConfig } from "@/utils/generators/generatePageOrSectionConfig"
import { HeaderProps } from "./interface"
import {
  headerAddIconStyle,
  headerLabelStyle,
  viewsListHeaderWrapperStyle,
} from "./style"
import { generateNewViewItem } from "./utils"

export const ViewListHeader: FC<HeaderProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { sectionName, sectionNodeExecutionResult } = props

  const handleClickAddButton = useCallback(() => {
    const { displayName, sectionViewConfigs } = sectionNodeExecutionResult
    const config = generateSectionContainerConfig(
      displayName,
      `${sectionName}Container`,
    )
    const hasKeys = sectionViewConfigs.map((item: SectionViewShape) => {
      return `${displayName}-${item.key}`
    })
    const newSectionViewConfig = generateNewViewItem(
      hasKeys,
      config.displayName,
      displayName,
    )
    dispatch(
      componentsActions.addSectionViewReducer({
        parentNodeName: displayName,
        containerNode: config,
        newSectionViewConfig,
      }),
    )
  }, [dispatch, sectionName, sectionNodeExecutionResult])

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
