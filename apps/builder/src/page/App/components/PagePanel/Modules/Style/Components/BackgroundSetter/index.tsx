import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import ColorPickerSetter from "@/components/ColorSetter"
import { PageLabel } from "@/page/App/components/PagePanel/Components/Label"
import {
  labelContainerStyle,
  sectionContainerStyle,
  setterContainerStyle,
} from "@/page/App/components/PagePanel/Modules/Style/style"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import {
  getCurrentPageBodySection,
  getCurrentPageExecutionResult,
  getCurrentPageFooterSection,
  getCurrentPageHeaderSection,
  getCurrentPageLeftSection,
  getCurrentPageRightSection,
} from "@/redux/currentApp/executionTree/executionSelector"

export const BackgroundSetter: FC = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const currentPage = useSelector(getCurrentPageExecutionResult)
  const { displayName, hasFooter, hasLeft, hasRight, hasHeader } = currentPage

  const bodySection = useSelector(getCurrentPageBodySection)
  const rightSection = useSelector(getCurrentPageRightSection)
  const leftSection = useSelector(getCurrentPageLeftSection)
  const headerSection = useSelector(getCurrentPageHeaderSection)
  const footerSection = useSelector(getCurrentPageFooterSection)
  const { style: bodyStyle } = bodySection ?? {}
  const { style: rightStyle } = rightSection ?? {}
  const { style: leftStyle } = leftSection ?? {}
  const { style: headerStyle } = headerSection ?? {}
  const { style: footerStyle } = footerSection ?? {}

  const handleChangeLeftBackGroundColor = (value: string) => {
    dispatch(
      componentsActions.updateCurrentPageStyleReducer({
        pageName: displayName,
        style: {
          background: value,
        },
        sectionName: "leftSection",
      }),
    )
  }
  const handleChangeRightBackGroundColor = (value: string) => {
    dispatch(
      componentsActions.updateCurrentPageStyleReducer({
        pageName: displayName,
        style: {
          background: value,
        },
        sectionName: "rightSection",
      }),
    )
  }
  const handleChangeBodyBackGroundColor = (value: string) => {
    dispatch(
      componentsActions.updateCurrentPageStyleReducer({
        pageName: displayName,
        style: {
          background: value,
        },
        sectionName: "bodySection",
      }),
    )
  }
  const handleChangeHeaderBackGroundColor = (value: string) => {
    dispatch(
      componentsActions.updateCurrentPageStyleReducer({
        pageName: displayName,
        style: {
          background: value,
        },
        sectionName: "headerSection",
      }),
    )
  }
  const handleChangeFooterBackGroundColor = (value: string) => {
    dispatch(
      componentsActions.updateCurrentPageStyleReducer({
        pageName: displayName,
        style: {
          background: value,
        },
        sectionName: "footerSection",
      }),
    )
  }

  return (
    <section css={sectionContainerStyle}>
      <div css={labelContainerStyle}>
        <PageLabel
          labelName={t("editor.inspect.setter_group.background")}
          size="big"
        />
      </div>
      <div css={setterContainerStyle}>
        <PageLabel labelName={t("editor.page.label_name.body")} size="small" />
        <ColorPickerSetter
          value={bodyStyle?.background ?? "white"}
          handleUpdateColor={handleChangeBodyBackGroundColor}
        />
      </div>
      {hasHeader && (
        <div css={setterContainerStyle}>
          <PageLabel
            labelName={t("editor.page.label_name.header")}
            size="small"
          />
          <ColorPickerSetter
            value={headerStyle?.background ?? "white"}
            handleUpdateColor={handleChangeHeaderBackGroundColor}
          />
        </div>
      )}
      {hasLeft && (
        <div css={setterContainerStyle}>
          <PageLabel
            labelName={t("editor.page.label_name.left_panel")}
            size="small"
          />
          <ColorPickerSetter
            value={leftStyle?.background ?? "white"}
            handleUpdateColor={handleChangeLeftBackGroundColor}
          />
        </div>
      )}
      {hasRight && (
        <div css={setterContainerStyle}>
          <PageLabel
            labelName={t("editor.page.label_name.right_panel")}
            size="small"
          />
          <ColorPickerSetter
            value={rightStyle?.background ?? "white"}
            handleUpdateColor={handleChangeRightBackGroundColor}
          />
        </div>
      )}
      {hasFooter && (
        <div css={setterContainerStyle}>
          <PageLabel
            labelName={t("editor.page.label_name.footer")}
            size="small"
          />
          <ColorPickerSetter
            value={footerStyle?.background ?? "white"}
            handleUpdateColor={handleChangeFooterBackGroundColor}
          />
        </div>
      )}
    </section>
  )
}
