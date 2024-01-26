import { TextLink } from "@illa-public/text-link"
import { FC, HTMLAttributes } from "react"
import { Trans, useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useModal } from "@illa-design/react"
import {
  actionStyle,
  applyHiddenStyle,
  buttonStyle,
  decsStyle,
  guidePopoverStyle,
  linkStyle,
  titleStyle,
} from "@/components/Guide/GuidePopover/style"
import { guideActions } from "@/redux/guide/guideSlice"
import { openDiscord } from "@/utils/navigate"

export interface GuidePopoverProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  hideExit?: boolean
  isLastStep?: boolean
  onClickDoIt?: () => void
}

export const GuidePopover: FC<GuidePopoverProps> = (props) => {
  const { title, description, hideExit, isLastStep, onClickDoIt, ...rest } =
    props
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const modal = useModal()

  const handleExitGuide = () => {
    modal.show({
      id: "exitGuide",
      title: t("tutorial.modal.tutorial.exit_confirm.title"),
      children: t("tutorial.modal.tutorial.exit_confirm.description"),
      cancelText: t("tutorial.modal.tutorial.exit_confirm.cancel"),
      okText: t("tutorial.modal.tutorial.exit_confirm.exit"),
      okButtonProps: {
        colorScheme: "techPurple",
      },
      onOk: () => {
        dispatch(guideActions.updateGuideStatusReducer(false))
      },
    })
  }

  return (
    <div css={guidePopoverStyle} {...rest}>
      <div css={titleStyle}>{t(title)}</div>
      <div css={decsStyle}>
        <Trans
          i18nKey={description}
          t={t}
          components={[
            <TextLink
              key="openDiscord"
              css={linkStyle}
              onClick={openDiscord}
            />,
          ]}
        />
      </div>
      <div css={actionStyle}>
        <span
          css={[buttonStyle, applyHiddenStyle(isLastStep || hideExit)]}
          onClick={handleExitGuide}
        >
          {t("editor.tutorial.panel.onboarding_app.exit")}
        </span>
        <span
          css={[buttonStyle]}
          onClick={() => {
            onClickDoIt?.()
          }}
        >
          {isLastStep
            ? t("editor.tutorial.panel.onboarding_app.congratulations_button")
            : hideExit
              ? t("editor.tutorial.panel.onboarding_app.test_it_button")
              : t("editor.tutorial.panel.onboarding_app.do_it")}
        </span>
      </div>
    </div>
  )
}

GuidePopover.displayName = "GuidePopover"
