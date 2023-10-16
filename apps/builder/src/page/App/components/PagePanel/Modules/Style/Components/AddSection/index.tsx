import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  DropList,
  DropListItem,
  DropListProps,
  Dropdown,
  getColor,
} from "@illa-design/react"
import i18n from "@/i18n/config"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import {
  getCurrentPageExecutionResult,
  getCurrentPageFooterSection,
  getCurrentPageHeaderSection,
  getCurrentPageLeftSection,
  getCurrentPageRightSection,
} from "@/redux/currentApp/executionTree/executionSelector"
import { AddSectionProps } from "./interface"

export const AddSection: FC<AddSectionProps> = ({ children }) => {
  const dispatch = useDispatch()

  const currentPage = useSelector(getCurrentPageExecutionResult)
  const { displayName, hasFooter, hasLeft, hasRight, hasHeader } = currentPage

  const rightSection = useSelector(getCurrentPageRightSection)
  const leftSection = useSelector(getCurrentPageLeftSection)
  const headerSection = useSelector(getCurrentPageHeaderSection)
  const footerSection = useSelector(getCurrentPageFooterSection)
  const { style: rightStyle } = rightSection ?? {}
  const { style: leftStyle } = leftSection ?? {}
  const { style: headerStyle } = headerSection ?? {}
  const { style: footerStyle } = footerSection ?? {}

  const hasLeftDivider = !!leftStyle?.dividerColor
  const hasRightDivider = !!rightStyle?.dividerColor
  const hasHeaderDivider = !!headerStyle?.dividerColor
  const hasFooterDivider = !!footerStyle?.dividerColor

  const SECTION_OPTIONS = [
    {
      label: i18n.t("editor.page.label_name.left_panel"),
      value: "leftSection",
      disabled: !hasLeft || hasLeftDivider,
    },
    {
      label: i18n.t("editor.page.label_name.right_panel"),
      value: "rightSection",
      disabled: !hasRight || hasRightDivider,
    },
    {
      label: i18n.t("editor.page.label_name.header"),
      value: "headerSection",
      disabled: !hasHeader || hasHeaderDivider,
    },
    {
      label: i18n.t("editor.page.label_name.footer"),
      value: "footerSection",
      disabled: !hasFooter || hasFooterDivider,
    },
  ]

  const onClickItem: DropListProps["onClickItem"] = (key) => {
    dispatch(
      componentsActions.updateCurrentPageStyleReducer({
        pageName: displayName,
        style: {
          dividerColor: getColor("grayBlue", "08"),
        },
        sectionName: key as
          | "leftSection"
          | "rightSection"
          | "headerSection"
          | "footerSection"
          | "bodySection",
      }),
    )
  }

  return (
    <Dropdown
      position="bottom-start"
      trigger="click"
      dropList={
        <DropList onClickItem={onClickItem}>
          {SECTION_OPTIONS.map((option) => {
            return (
              <DropListItem
                key={option.label}
                value={option.value}
                disabled={option.disabled}
                colorScheme="techPurple"
                title={option.label}
              />
            )
          })}
        </DropList>
      }
    >
      {children}
    </Dropdown>
  )
}
