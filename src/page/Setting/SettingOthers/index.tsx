import { FC, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import i18n from "@/i18n/config"
import { getBuilderInfo } from "@/redux/builderInfo/builderInfoSelector"
import { builderInfoActions } from "@/redux/builderInfo/builderInfoSlice"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { Api } from "@/api/base"
import { SettingCommonForm } from "../Components/SettingCommonForm"
import { languageType } from "./interface"

export const SettingOthers: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const userInfo = useSelector(getCurrentUser)
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)

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
          loading: buttonLoading,
        },
      ],
    },
  ]

  const handleSubmit = () => {
    let result: languageType = "en-us"
    if (languageValue === "English") {
      result = "en-us"
    } else if (languageValue === "简体中文") {
      result = "zh-cn"
    }
    Api.request(
      {
        url: "/users/language",
        method: "PATCH",
        data: {
          language: result,
        },
      },
      (response) => {
        if (languageValue === "English") {
          i18n.changeLanguage("en-US")
        } else if (languageValue === "简体中文") {
          i18n.changeLanguage("zh-CN")
        }
        // dispatch(builderInfoActions.updateLanguageReducer(languageValue))
        location.reload()
      },
      (failure) => {},
      (crash) => {},
      (loading) => {
        setButtonLoading(loading)
      },
    )
  }

  return <SettingCommonForm paramData={paramData} onSubmit={handleSubmit} />
}

SettingOthers.displayName = "SettingOthers"
