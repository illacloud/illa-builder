import { FC, useEffect, useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { Api } from "@/api/base"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import { Message } from "@illa-design/message"
import { CurrentUser } from "@/redux/currentUser/currentUserState"
import { SettingCommonForm } from "../Components/SettingCommonForm"

export const SettingOthers: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const userInfo = useSelector(getCurrentUser)

  const [buttonLoading, setButtonLoading] = useState<boolean>(false)
  const [languageValue, setLanguageValue] = useState<string>("")
  const [dataList, setDataList] = useState<any[]>([])
  const [refresh, setRefresh] = useState<number>(0)

  useMemo(() => {
    if (!userInfo?.userId) {
      return
    }
    if (!languageValue) {
      setLanguageValue(userInfo?.language as string)
    }
  }, [userInfo])

  useEffect(() => {
    if (languageValue) {
      setDataList([
        {
          title: t("setting.other.language"),
          content: [
            {
              type: "select",
              selectOptions: [
                {
                  label: "English",
                  value: "en-US",
                },
                {
                  label: "简体中文",
                  value: "zh-CN",
                },
              ],
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
      ])
    }
  }, [languageValue, refresh])

  const handleSubmit = () => {
    if (languageValue === userInfo?.language) {
      return
    }

    Api.request<CurrentUser>(
      {
        url: "/users/language",
        method: "PATCH",
        data: {
          language: languageValue,
        },
      },
      (response) => {
        dispatch(currentUserActions.updateCurrentUserReducer(response.data))
        Message.success(t("edit_success"))
        setRefresh(refresh + 1)
      },
      (failure) => {},
      (crash) => {},
      (loading) => {
        setButtonLoading(loading)
      },
    )
  }

  return dataList.length ? (
    <SettingCommonForm paramData={dataList} onSubmit={handleSubmit} />
  ) : (
    <></>
  )
}

SettingOthers.displayName = "SettingOthers"
