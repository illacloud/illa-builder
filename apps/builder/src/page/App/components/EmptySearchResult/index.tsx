import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Empty } from "@illa-design/react"
import EmptySearchIcon from "@/assets/empty-search-icon.svg?react"
import { EmptySearchResultProps } from "@/page/App/components/EmptySearchResult/interface"
import { emptyStyle } from "./style"

export const EmptySearchResult: FC<EmptySearchResultProps> = (props) => {
  const { t } = useTranslation()

  return (
    <div css={emptyStyle}>
      <Empty
        icon={<EmptySearchIcon />}
        description={props.desc ?? t("editor.widget_picker.empty_tip")}
      />
    </div>
  )
}

EmptySearchResult.displayName = "EmptySearchResult"
