import { FC } from "react"
import { SettingCommonForm } from "../Components/SettingCommonForm"

export const SettingAccount: FC = () => {
  const paramData = [
    {
      title: "Email",
      subTitle: "(uneditable)",
      content: [
        {
          type: "input",
          value: "kwononlyboa@gmail.com",
          disabled: true,
        },
      ],
    },
    {
      title: "Username",
      content: [
        {
          type: "input",
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

SettingAccount.displayName = "SettingAccount"
