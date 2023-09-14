import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentPageExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { componentsActions } from "../../../../../../../../redux/currentApp/editor/components/componentsSlice"
import { PageLabel } from "../../../../Components/Label"
import {
  labelContainerStyle,
  sectionContainerStyle,
  setterContainerStyle,
} from "../../style"
import ShadowSelect from "../ShadowSelect"
import { SHADOW_VALUE } from "../ShadowSelect/constants"

export const ShadowSetter: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const currentPage = useSelector(getCurrentPageExecutionResult)
  const {
    displayName,
    hasFooter,
    hasLeft,
    hasRight,
    hasHeader,
    style: currentPageStyle,
  } = currentPage

  const handleUpdateLeftShadow = useCallback(
    (value: SHADOW_VALUE) => {
      dispatch(
        componentsActions.updateCurrentPageStyleReducer({
          pageName: displayName,
          style: {
            leftPanel: {
              shadowSize: value,
            },
          },
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
            rightPanel: {
              shadowSize: value,
            },
          },
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
            header: {
              shadowSize: value,
            },
          },
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
            footer: {
              shadowSize: value,
            },
          },
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
            value={currentPageStyle?.leftPanel?.shadowSize ?? SHADOW_VALUE.NONE}
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
            value={
              currentPageStyle?.rightPanel?.shadowSize ?? SHADOW_VALUE.NONE
            }
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
            value={currentPageStyle?.header?.shadowSize ?? SHADOW_VALUE.NONE}
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
            value={currentPageStyle?.footer?.shadowSize ?? SHADOW_VALUE.NONE}
            onChange={handleUpdateFooterShadow}
          />
        </div>
      )}
    </section>
  )
}
