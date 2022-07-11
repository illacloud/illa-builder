import { FC, useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { Api } from "@/api/base"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import { Message } from "@illa-design/message"
import { SettingCommonForm } from "../Components/SettingCommonForm"
import { languageType } from "./interface"

export const SettingOthers: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const userInfo = useSelector(getCurrentUser)

  const [buttonLoading, setButtonLoading] = useState<boolean>(false)
  const [languageValue, setLanguageValue] = useState<string>("")

  useMemo(() => {
    switch (userInfo?.language) {
      case "zh-cn":
        setLanguageValue("简体中文")
        break
      case "en-us":
        setLanguageValue("English")
        break
    }
  }, [userInfo])

  const languageHasChange = useMemo(() => {
    if (languageValue === "English" && userInfo?.language === "en-us") {
      return false
    }
    if (languageValue === "简体中文" && userInfo?.language === "zh-cn") {
      return false
    }
    return true
  }, [languageValue, userInfo])

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
    if (!languageHasChange) {
      return
    }
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
        dispatch(currentUserActions.updateCurrentUserReducer(response.data))
        Message.success(t("edit_success"))
      },
      (failure) => {},
      (crash) => {},
      (loading) => {
        setButtonLoading(loading)
      },
    )
  }

  return languageValue ? (
    <SettingCommonForm paramData={paramData} onSubmit={handleSubmit} />
  ) : (
    <></>
  )
}

SettingOthers.displayName = "SettingOthers"
