import { FC } from "react"
import { SettingCommonForm } from "../Components/SettingCommonForm"

export const SettingPassword: FC = () => {
  const paramData = [
    {
      title: "Current password",
      content: [
        {
          type: "input",
          value: "kwononlyboa@gmail.com",
          disabled: true,
        },
      ],
    },
    {
      title: "New password",
      content: [
        {
          type: "input",
        },
      ],
    },
    {
      title: "Confirm password",
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

SettingPassword.displayName = "SettingPassword"
