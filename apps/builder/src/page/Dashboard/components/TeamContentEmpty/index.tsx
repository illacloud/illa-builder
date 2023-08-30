import { FC } from "react"
import { useTranslation } from "react-i18next"
import {
  Button,
  Empty,
  EmptyIcon,
  PlusIcon,
  getColor,
} from "@illa-design/react"
import { TeamContentEmptyProps } from "./interface"
import { emptyStyle, emptyTextStyle } from "./style"

export const TeamContentEmpty: FC<TeamContentEmptyProps> = (props) => {
  const { t } = useTranslation()

  return (
    <Empty
      paddingVertical="120px"
      icon={<EmptyIcon size="48px" color={getColor("grayBlue", "02")} />}
      description={
        <div css={emptyStyle}>
          <div css={emptyTextStyle}>{t("new_dashboard.desc.blank")}</div>
          <Button
            colorScheme="grayBlue"
            loading={props.loading}
            variant="outline"
            leftIcon={<PlusIcon size="10px" />}
            onClick={() => {
              props.navigate?.()
            }}
          >
            {t("new_dashboard.button.blank")}
          </Button>
        </div>
      }
    />
  )
}
