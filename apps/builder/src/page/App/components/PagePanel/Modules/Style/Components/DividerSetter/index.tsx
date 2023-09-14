import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { PlusIcon } from "@illa-design/react"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { getCurrentPageExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { PageLabel } from "../../../../Components/Label"
import {
  iconHotSpotContainerStyle,
  labelContainerStyle,
  sectionContainerStyle,
} from "../../style"
import ColorPickerSetter from "../ColorSetter"
import { DeleteActionContainer } from "../DelteActionContainer"

export const DividerSetter: FC = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const currentPage = useSelector(getCurrentPageExecutionResult)
  const { displayName, style: currentPageStyle } = currentPage

  const { leftPanel, rightPanel, header, footer } = currentPageStyle ?? {}

  const hasLeftDivider = !!leftPanel?.dividerColor
  const hasRightDivider = !!rightPanel?.dividerColor
  const hasHeaderDivider = !!header?.dividerColor
  const hasFooterDivider = !!footer?.dividerColor

  const handleUpdateLeftDivider = useCallback(
    (value: string) => {
      dispatch(
        componentsActions.updateCurrentPageStyleReducer({
          pageName: displayName,
          style: {
            leftPanel: {
              dividerColor: value,
            },
          },
        }),
      )
    },
    [dispatch, displayName],
  )

  const handleDeleteLeftDivider = useCallback(() => {
    dispatch(
      componentsActions.deleteCurrentPageStyleReducer({
        pageName: displayName,
        styleKey: "leftPanel.dividerColor",
      }),
    )
  }, [dispatch, displayName])

  const handleUpdateRightDivider = useCallback(
    (value: string) => {
      dispatch(
        componentsActions.updateCurrentPageStyleReducer({
          pageName: displayName,
          style: {
            rightPanel: {
              dividerColor: value,
            },
          },
        }),
      )
    },
    [dispatch, displayName],
  )

  const handleDeleteRightDivider = useCallback(() => {
    dispatch(
      componentsActions.deleteCurrentPageStyleReducer({
        pageName: displayName,
        styleKey: "rightPanel.dividerColor",
      }),
    )
  }, [dispatch, displayName])

  const handleUpdateHeaderDivider = useCallback(
    (value: string) => {
      dispatch(
        componentsActions.updateCurrentPageStyleReducer({
          pageName: displayName,
          style: {
            header: {
              dividerColor: value,
            },
          },
        }),
      )
    },
    [dispatch, displayName],
  )

  const handleDeleteHeaderDivider = useCallback(() => {
    dispatch(
      componentsActions.deleteCurrentPageStyleReducer({
        pageName: displayName,
        styleKey: "header.dividerColor",
      }),
    )
  }, [dispatch, displayName])

  const handleUpdateFooterDivider = useCallback(
    (value: string) => {
      dispatch(
        componentsActions.updateCurrentPageStyleReducer({
          pageName: displayName,
          style: {
            footer: {
              dividerColor: value,
            },
          },
        }),
      )
    },
    [dispatch, displayName],
  )

  const handleDeleteFooterDivider = useCallback(() => {
    dispatch(
      componentsActions.deleteCurrentPageStyleReducer({
        pageName: displayName,
        styleKey: "footer.dividerColor",
      }),
    )
  }, [dispatch, displayName])

  return (
    <section css={sectionContainerStyle}>
      <div css={labelContainerStyle}>
        <PageLabel
          labelName={t("editor.inspect.setter_group.divider")}
          size="big"
        />
        <span css={iconHotSpotContainerStyle}>
          <PlusIcon />
        </span>
      </div>
      {hasLeftDivider && (
        <DeleteActionContainer
          labelName={t("editor.page.label_name.left_panel")}
          onClickDelete={handleDeleteLeftDivider}
        >
          <ColorPickerSetter
            value="white"
            handleUpdateColor={handleUpdateLeftDivider}
          />
        </DeleteActionContainer>
      )}
      {hasRightDivider && (
        <DeleteActionContainer
          labelName={t("editor.page.label_name.right_panel")}
          onClickDelete={handleDeleteRightDivider}
        >
          <ColorPickerSetter
            value="white"
            handleUpdateColor={handleUpdateRightDivider}
          />
        </DeleteActionContainer>
      )}
      {hasHeaderDivider && (
        <DeleteActionContainer
          labelName={t("editor.page.label_name.header")}
          onClickDelete={handleDeleteHeaderDivider}
        >
          <ColorPickerSetter
            value="white"
            handleUpdateColor={handleUpdateHeaderDivider}
          />
        </DeleteActionContainer>
      )}
      {hasFooterDivider && (
        <DeleteActionContainer
          labelName={t("editor.page.label_name.footer")}
          onClickDelete={handleDeleteFooterDivider}
        >
          <ColorPickerSetter
            value="white"
            handleUpdateColor={handleUpdateFooterDivider}
          />
        </DeleteActionContainer>
      )}
    </section>
  )
}
