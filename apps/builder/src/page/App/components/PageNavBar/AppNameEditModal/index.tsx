import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Button, Input, useMessage } from "@illa-design/react"
import { BuilderApi } from "@/api/base"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { AppNameEditorModalProps } from "@/page/App/components/PageNavBar/interface"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { trackInEditor } from "@/utils/mixpanelHelper"
import {
  appNameEditorSaveButtonWrapperStyle,
  appNameEditorWrapperStyle,
  appNameInputLabelStyle,
  appNameInputWrapperStyle,
} from "./style"

export const AppNameEditModal: FC<AppNameEditorModalProps> = (props) => {
  const appInfo = useSelector(getAppInfo)
  const message = useMessage()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { onSuccess } = props

  const [appNewName, setAppNewName] = useState<string>(appInfo.appName)
  const [saveLoading, setSaveLoading] = useState<boolean>(false)

  useEffect(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
      element: "rename_modal",
    })
  }, [])

  const handleClickSaveButton = useCallback(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "rename_modal_save",
    })
    if (appNewName === "" || appNewName.trim() === "") {
      message.error({
        content: t("dashboard.app.name_empty"),
      })
      return
    }
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.VALIDATE, {
      element: "rename_modal_save",
      parameter2: "suc",
      parameter3: appNewName.length,
    })
    BuilderApi.teamRequest(
      {
        url: `/apps/${appInfo.appId}`,
        method: "PUT",
        data: {
          appName: appNewName,
        },
      },
      (response) => {
        dispatch(appInfoActions.updateAppNameReducer(response.data))
        message.success({
          content: t("dashboard.app.rename_success"),
        })
        onSuccess()
      },
      (failure) => {
        message.error({
          content: t("dashboard.app.rename_fail"),
        })
      },
      (crash) => {
        message.error({
          content: t("network_error"),
        })
      },
      (loading) => {
        setSaveLoading(loading)
      },
    )
  }, [appInfo.appId, appNewName, dispatch, message, onSuccess, t])

  const handleOnNewNameChange = useCallback((value: string) => {
    setAppNewName(value.trim())
  }, [])

  return (
    <div css={appNameEditorWrapperStyle}>
      <div css={appNameInputWrapperStyle}>
        <span css={appNameInputLabelStyle}>Name</span>
        <Input onChange={handleOnNewNameChange} defaultValue={appNewName} />
      </div>
      <div css={appNameEditorSaveButtonWrapperStyle}>
        <Button
          fullWidth
          colorScheme="grayBlue"
          onClick={handleClickSaveButton}
          loading={saveLoading}
        >
          {t("preview.viewport.save")}
        </Button>
      </div>
    </div>
  )
}
