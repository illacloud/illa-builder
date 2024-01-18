import IconHotSpot from "@illa-public/icon-hot-spot"
import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { PlusIcon, getColor } from "@illa-design/react"
import ColorPickerSetter from "@/components/ColorSetter"
import { PageLabel } from "@/page/App/components/PagePanel/Components/Label"
import {
  labelContainerStyle,
  sectionContainerStyle,
} from "@/page/App/components/PagePanel/Modules/Style/style"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import {
  getCurrentPageExecutionResult,
  getCurrentPageFooterSection,
  getCurrentPageHeaderSection,
  getCurrentPageLeftSection,
  getCurrentPageRightSection,
} from "@/redux/currentApp/executionTree/executionSelector"
import { AddSection } from "../AddSection"
import { DeleteActionContainer } from "../DeleteActionContainer"

export const DividerSetter: FC = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const currentPage = useSelector(getCurrentPageExecutionResult)
  const { displayName } = currentPage

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

  const handleUpdateLeftDivider = useCallback(
    (value: string) => {
      dispatch(
        componentsActions.updateCurrentPageStyleReducer({
          pageName: displayName,
          style: {
            dividerColor: value,
          },
          sectionName: "leftSection",
        }),
      )
    },
    [dispatch, displayName],
  )

  const handleDeleteLeftDivider = useCallback(() => {
    dispatch(
      componentsActions.deleteCurrentPageStyleReducer({
        pageName: displayName,
        styleKey: "dividerColor",
        sectionName: "leftSection",
      }),
    )
  }, [dispatch, displayName])

  const handleUpdateRightDivider = useCallback(
    (value: string) => {
      dispatch(
        componentsActions.updateCurrentPageStyleReducer({
          pageName: displayName,
          style: {
            dividerColor: value,
          },
          sectionName: "rightSection",
        }),
      )
    },
    [dispatch, displayName],
  )

  const handleDeleteRightDivider = useCallback(() => {
    dispatch(
      componentsActions.deleteCurrentPageStyleReducer({
        pageName: displayName,
        styleKey: "dividerColor",
        sectionName: "rightSection",
      }),
    )
  }, [dispatch, displayName])

  const handleUpdateHeaderDivider = useCallback(
    (value: string) => {
      dispatch(
        componentsActions.updateCurrentPageStyleReducer({
          pageName: displayName,
          style: {
            dividerColor: value,
          },
          sectionName: "headerSection",
        }),
      )
    },
    [dispatch, displayName],
  )

  const handleDeleteHeaderDivider = useCallback(() => {
    dispatch(
      componentsActions.deleteCurrentPageStyleReducer({
        pageName: displayName,
        styleKey: "dividerColor",
        sectionName: "headerSection",
      }),
    )
  }, [dispatch, displayName])

  const handleUpdateFooterDivider = useCallback(
    (value: string) => {
      dispatch(
        componentsActions.updateCurrentPageStyleReducer({
          pageName: displayName,
          style: {
            dividerColor: value,
          },
          sectionName: "footerSection",
        }),
      )
    },
    [dispatch, displayName],
  )

  const handleDeleteFooterDivider = useCallback(() => {
    dispatch(
      componentsActions.deleteCurrentPageStyleReducer({
        pageName: displayName,
        styleKey: "dividerColor",
        sectionName: "footerSection",
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
        <AddSection>
          <span>
            <IconHotSpot>
              <PlusIcon />
            </IconHotSpot>
          </span>
        </AddSection>
      </div>
      {hasLeftDivider && (
        <DeleteActionContainer
          labelName={t("editor.page.label_name.left_panel")}
          onClickDelete={handleDeleteLeftDivider}
        >
          <ColorPickerSetter
            value={leftStyle?.dividerColor ?? getColor("grayBlue", "08")}
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
            value={rightStyle?.dividerColor ?? getColor("grayBlue", "08")}
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
            value={headerStyle?.dividerColor ?? getColor("grayBlue", "08")}
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
            value={footerStyle?.dividerColor ?? getColor("grayBlue", "08")}
            handleUpdateColor={handleUpdateFooterDivider}
          />
        </DeleteActionContainer>
      )}
    </section>
  )
}
