import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { getCurrentPageExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { PageLabel } from "../../../../Components/Label"
import {
  labelContainerStyle,
  sectionContainerStyle,
  setterContainerStyle,
} from "../../style"
import ColorPickerSetter from "../ColorSetter"

export const BackgroundSetter: FC = () => {
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

  const { leftPanel, rightPanel, body, header, footer } = currentPageStyle ?? {}

  const handleChangeLeftBackGroundColor = (value: string) => {
    dispatch(
      componentsActions.updateCurrentPageStyleReducer({
        pageName: displayName,
        style: {
          leftPanel: {
            background: value,
          },
        },
      }),
    )
  }
  const handleChangeRightBackGroundColor = (value: string) => {
    dispatch(
      componentsActions.updateCurrentPageStyleReducer({
        pageName: displayName,
        style: {
          rightPanel: {
            background: value,
          },
        },
      }),
    )
  }
  const handleChangeBodyBackGroundColor = (value: string) => {
    dispatch(
      componentsActions.updateCurrentPageStyleReducer({
        pageName: displayName,
        style: {
          body: {
            background: value,
          },
        },
      }),
    )
  }
  const handleChangeHeaderBackGroundColor = (value: string) => {
    dispatch(
      componentsActions.updateCurrentPageStyleReducer({
        pageName: displayName,
        style: {
          header: {
            background: value,
          },
        },
      }),
    )
  }
  const handleChangeFooterBackGroundColor = (value: string) => {
    dispatch(
      componentsActions.updateCurrentPageStyleReducer({
        pageName: displayName,
        style: {
          footer: {
            background: value,
          },
        },
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
          value={body.background ?? "white"}
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
            value={header.background ?? "white"}
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
            value={leftPanel.background ?? "white"}
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
            value={rightPanel.background ?? "white"}
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
            value={footer.background ?? "white"}
            handleUpdateColor={handleChangeFooterBackGroundColor}
          />
        </div>
      )}
    </section>
  )
}
