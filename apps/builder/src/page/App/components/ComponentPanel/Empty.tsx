import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Empty } from "@illa-design/react"
import { ReactComponent as EmptySearchIcon } from "@/assets/empty-search-icon.svg"
import { emptyStyle } from "./style"

export const EmptySearchResult: FC = () => {
  const { t } = useTranslation()

  return (
    <div css={emptyStyle}>
      <Empty
        icon={<EmptySearchIcon />}
        description={t("editor.widget_picker.empty_tip")}
      />
    </div>
  )
}

EmptySearchResult.displayName = "Empty"
