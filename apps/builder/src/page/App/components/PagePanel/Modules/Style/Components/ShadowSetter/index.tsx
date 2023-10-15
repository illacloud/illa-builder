import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { PageLabel } from "@/page/App/components/PagePanel/Components/Label"
import {
  labelContainerStyle,
  sectionContainerStyle,
  setterContainerStyle,
} from "@/page/App/components/PagePanel/Modules/Style/style"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import {
  getCurrentPageExecutionResult,
  getCurrentPageFooterSection,
  getCurrentPageHeaderSection,
  getCurrentPageLeftSection,
  getCurrentPageRightSection,
} from "@/redux/currentApp/executionTree/executionSelector"
import ShadowSelect from "../ShadowSelect"
import { SHADOW_VALUE } from "../ShadowSelect/constants"

export const ShadowSetter: FC = () => {
  const { t } = useTranslation()
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

  const handleUpdateLeftShadow = useCallback(
    (value: SHADOW_VALUE) => {
      dispatch(
        componentsActions.updateCurrentPageStyleReducer({
          pageName: displayName,
          style: {
            shadowSize: value,
          },
          sectionName: "leftSection",
        }),
      )
    },
    [dispatch, displayName],
  )

  const handleUpdateRightShadow = useCallback(
    (value: SHADOW_VALUE) => {
      dispatch(
        componentsActions.updateCurrentPageStyleReducer({
          pageName: displayName,
          style: {
            shadowSize: value,
          },
          sectionName: "rightSection",
        }),
      )
    },
    [dispatch, displayName],
  )

  const handleUpdateHeaderShadow = useCallback(
    (value: SHADOW_VALUE) => {
      dispatch(
        componentsActions.updateCurrentPageStyleReducer({
          pageName: displayName,
          style: {
            shadowSize: value,
          },
          sectionName: "headerSection",
        }),
      )
    },
    [dispatch, displayName],
  )

  const handleUpdateFooterShadow = useCallback(
    (value: SHADOW_VALUE) => {
      dispatch(
        componentsActions.updateCurrentPageStyleReducer({
          pageName: displayName,
          style: {
            shadowSize: value,
          },
          sectionName: "footerSection",
        }),
      )
    },
    [dispatch, displayName],
  )

  return (
    <section css={sectionContainerStyle}>
      <div css={labelContainerStyle}>
        <PageLabel
          labelName={t("editor.inspect.setter_group.shadow")}
          size="big"
        />
      </div>
      {hasLeft && (
        <div css={setterContainerStyle}>
          <PageLabel
            labelName={t("editor.page.label_name.left_panel")}
            size="small"
          />
          <ShadowSelect
            value={leftStyle?.shadowSize ?? SHADOW_VALUE.NONE}
            onChange={handleUpdateLeftShadow}
          />
        </div>
      )}
      {hasRight && (
        <div css={setterContainerStyle}>
          <PageLabel
            labelName={t("editor.page.label_name.right_panel")}
            size="small"
          />
          <ShadowSelect
            value={rightStyle?.shadowSize ?? SHADOW_VALUE.NONE}
            onChange={handleUpdateRightShadow}
          />
        </div>
      )}
      {hasHeader && (
        <div css={setterContainerStyle}>
          <PageLabel
            labelName={t("editor.page.label_name.header")}
            size="small"
          />
          <ShadowSelect
            value={headerStyle?.shadowSize ?? SHADOW_VALUE.NONE}
            onChange={handleUpdateHeaderShadow}
          />
        </div>
      )}
      {hasFooter && (
        <div css={setterContainerStyle}>
          <PageLabel
            labelName={t("editor.page.label_name.footer")}
            size="small"
          />
          <ShadowSelect
            value={footerStyle?.shadowSize ?? SHADOW_VALUE.NONE}
            onChange={handleUpdateFooterShadow}
          />
        </div>
      )}
    </section>
  )
}
