import { ILLADriveListAllContent, SORTED_TYPE } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { BaseFxSelect } from "../BaseFxSelect"
import { containerStyle } from "./style"

interface SortOperateProps {
  commandArgs: ILLADriveListAllContent
  handleOptionsValueChange: (name: string, value: string | boolean) => void
}

const SortOperate: FC<SortOperateProps> = ({
  commandArgs,
  handleOptionsValueChange,
}) => {
  const { t } = useTranslation()
  const sortTypeOptions = [SORTED_TYPE.ascend, SORTED_TYPE.descend]
  const sortByeOptions = [
    "id",
    "lastModifiedAt",
    "lastModifiedBy",
    "name",
    "contentType",
    "size",
  ]

  return (
    <div css={containerStyle}>
      <BaseFxSelect
        attrName="sortedBy"
        label={t("editor.action.panel.label.drive.sort_by")}
        isFx={commandArgs.sortedByFx}
        value={commandArgs.sortedBy}
        options={sortByeOptions}
        handleOptionsValueChange={handleOptionsValueChange}
      />
      <BaseFxSelect
        attrName="sortedType"
        label={t("editor.action.panel.label.drive.sort_direction")}
        isFx={commandArgs.sortedTypeFx}
        value={commandArgs.sortedType}
        options={sortTypeOptions}
        handleOptionsValueChange={handleOptionsValueChange}
      />
    </div>
  )
}

export default SortOperate
