import { FC, HTMLAttributes } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { Button, useModal } from "@illa-design/react"
import {
  actionStyle,
  applyVisibleStyle,
  decsStyle,
  guidePopoverStyle,
  titleStyle,
} from "@/components/Guide/GuidePopover/style"
import { guideActions } from "@/redux/guide/guideSlice"

export interface GuidePopoverProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  isLastStep?: boolean
  onClickDoIt?: () => void
}

export const GuidePopover: FC<GuidePopoverProps> = (props) => {
  const { title, description, isLastStep, onClickDoIt, ...rest } = props
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
    <div css={[guidePopoverStyle]} {...rest}>
      <div css={titleStyle}>{t(title)}</div>
      <div css={decsStyle}>{t(description)}</div>
      <div css={actionStyle}>
        <Button
          css={applyVisibleStyle(!isLastStep)}
          variant="fill"
          colorScheme="techPurple"
          onClick={handleExitGuide}
        >
          {t("editor.tutorial.panel.onboarding_app.exit")}
        </Button>
        <Button
          variant="fill"
          colorScheme="techPurple"
          onClick={() => {
            onClickDoIt?.()
          }}
        >
          {isLastStep
            ? t("editor.tutorial.panel.onboarding_app.congratulations_button")
            : t("editor.tutorial.panel.onboarding_app.do_it")}
        </Button>
      </div>
    </div>
  )
}

GuidePopover.displayName = "GuidePopover"
