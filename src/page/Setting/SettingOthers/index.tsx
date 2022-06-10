import { FC } from "react"
import { SettingCommonForm } from "../Components/SettingCommonForm"

export const SettingOthers: FC = () => {
  const paramData = [
    {
      title: "Language",
      content: [
        {
          type: "select",
          selectOptions: ["English", "简体中文"],
          defaultSelectValue: "English",
        },
      ],
    },
    {
      content: [
        {
          type: "button",
          value: "Save Changes",
        },
      ],
    },
  ]
  return <SettingCommonForm paramData={paramData} />
}

SettingOthers.displayName = "SettingOthers"
