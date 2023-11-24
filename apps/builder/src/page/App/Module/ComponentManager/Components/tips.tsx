import { FC } from "react"
import { useTranslation } from "react-i18next"
import VectorIcon from "@/assets/tutorial/vector.svg?react"
import { tipContainerStyle, tipTextStyle, vectorStyle } from "./style"

export const Tip: FC = () => {
  const { t } = useTranslation()
  return (
    <div css={tipContainerStyle}>
      <span css={tipTextStyle}>
        <VectorIcon css={vectorStyle} />
        {t("widget.frame.initial-title")}
      </span>
    </div>
  )
}
