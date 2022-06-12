import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import i18n from "@/i18n/config"
import { SettingCommonForm } from "../Components/SettingCommonForm"

export const SettingOthers: FC = () => {
  const { t } = useTranslation()

  const [languageValue, setLanguageValue] = useState<string>("English")

  const paramData = [
    {
      title: t("setting.other.language"),
      content: [
        {
          type: "select",
          selectOptions: ["English", "简体中文"],
          defaultSelectValue: languageValue,
          onChange: (value: string) => {
            setLanguageValue(value)
          },
        },
      ],
    },
    {
      content: [
        {
          type: "button",
          value: t("setting.other.save"),
        },
      ],
    },
  ]

  const handleSubmit = () => {
    console.log("account other", languageValue)
    if (languageValue === "English") {
      i18n.changeLanguage("en-US")
    } else if (languageValue === "简体中文") {
      i18n.changeLanguage("zh-CN")
    }
  }

  return <SettingCommonForm paramData={paramData} onSubmit={handleSubmit} />
}

SettingOthers.displayName = "SettingOthers"
