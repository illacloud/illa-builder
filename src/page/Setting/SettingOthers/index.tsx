import { FC, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import i18n from "@/i18n/config"
import { getBuilderInfo } from "@/redux/builderInfo/builderInfoSelector"
import { builderInfoActions } from "@/redux/builderInfo/builderInfoSlice"
import { SettingCommonForm } from "../Components/SettingCommonForm"

export const SettingOthers: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [languageValue, setLanguageValue] = useState<string>(
    useSelector(getBuilderInfo).language,
  )

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
    if (languageValue === "English") {
      i18n.changeLanguage("en-US")
    } else if (languageValue === "简体中文") {
      i18n.changeLanguage("zh-CN")
    }
    dispatch(builderInfoActions.updateLanguageReducer(languageValue))
  }

  return <SettingCommonForm paramData={paramData} onSubmit={handleSubmit} />
}

SettingOthers.displayName = "SettingOthers"
