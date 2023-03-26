import { FC, HTMLAttributes } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { Button, useMessage, useModal } from "@illa-design/react"
import {
  actionStyle,
  bottomStyle,
  decsStyle,
  guidePopoverStyle,
  titleStyle,
  topStyle,
} from "@/components/Guide/GuidePopover/style"
import { guideActions } from "@/redux/guide/guideSlice"

export interface GuidePopoverProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  onClickDoIt?: () => void
  position?: "top" | "bottom"
}

export const GuidePopover: FC<GuidePopoverProps> = (props) => {
  const { position, title, description, onClickDoIt, ...rest } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const modal = useModal()
  const message = useMessage()

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
    <div
      css={[
        guidePopoverStyle,
        position === "top"
          ? topStyle
          : position === "bottom"
          ? bottomStyle
          : undefined,
      ]}
      {...rest}
    >
      <div css={titleStyle}>{title}</div>
      <div css={decsStyle}>{description}</div>
      <div css={actionStyle}>
        <Button
          variant="fill"
          colorScheme="techPurple"
          onClick={handleExitGuide}
        >
          Skip
        </Button>
        <Button
          variant="fill"
          colorScheme="techPurple"
          onClick={() => {
            onClickDoIt?.()
          }}
        >
          Do it for me
        </Button>
      </div>
    </div>
  )
}

GuidePopover.displayName = "GuidePopover"
