import { SORTED_TYPE } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { RadioGroup, Select, SelectValue } from "@illa-design/react"
import { containerStyle, nameStyle } from "./style"

interface SortOperateProps {
  sortedBy: string
  sortedType: SORTED_TYPE
  handleOptionsValueChange: (name: string, value: string | boolean) => void
}

const SortOperate: FC<SortOperateProps> = ({
  sortedBy,
  sortedType,
  handleOptionsValueChange,
}) => {
  const { t } = useTranslation()
  const selectOptions = [
    {
      label: t("drive.table.title.file_name"),
      value: "name",
    },
    {
      label: t("drive.table.title.file_size"),
      value: "size",
    },
    {
      label: t("drive.table.title.last_modified"),
      value: "lastModifiedAt",
    },
    {
      label: t("drive.table.title.last_modifier"),
      value: "lastModifiedBy",
    },
  ]

  const radioOptions = [
    {
      label: "asc",
      value: SORTED_TYPE.ascend,
    },
    {
      label: "desc",
      value: SORTED_TYPE.descend,
    },
  ]
  return (
    <div css={containerStyle}>
      <span css={nameStyle}>{t("editor.action.panel.label.drive.folder")}</span>
      <Select
        w="100%"
        ml="8px"
        colorScheme="techPurple"
        onChange={(v) => handleOptionsValueChange("sortedBy", v as string)}
        value={sortedBy as SelectValue}
        options={selectOptions}
      />
      <RadioGroup
        w="100%"
        colorScheme="gray"
        forceEqualWidth
        type="button"
        onChange={(v) => handleOptionsValueChange("sortedType", v as string)}
        value={sortedType}
        options={radioOptions}
      />
    </div>
  )
}

export default SortOperate
