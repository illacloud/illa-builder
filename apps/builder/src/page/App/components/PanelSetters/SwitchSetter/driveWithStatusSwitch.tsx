import { debounce } from "lodash"
import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Switch, useModal } from "@illa-design/react"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { dynamicWidthStyle } from "@/page/App/components/PanelSetters/style"
import {
  fetchAnonymousPermission,
  fetchCloseAnonymousPermission,
  fetchOpenAnonymousPermission,
} from "@/services/drive"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { DriveWithStatusSwitchSetterProps } from "./interface"

const DriveWithStatusSwitchSetter: FC<DriveWithStatusSwitchSetterProps> = (
  props,
) => {
  const { value, attrName, handleUpdateDsl, widgetType } = props
  const anonymousPermission = useRef<boolean>(true)
  const modal = useModal()
  const { t } = useTranslation()
  const switchPermission = useCallback(
    async (_v: boolean) => {
      if (_v && !anonymousPermission.current) {
        modal.show({
          id: "switchPermission",
          title: t(
            "editor.inspect.setter_option.drive_builder.anonymous_modal.title",
          ),
          children: t(
            "editor.inspect.setter_option.drive_builder.anonymous_modal.desc",
          ),
          okText: t(
            "editor.inspect.setter_option.drive_builder.anonymous_modal.submitBtn",
          ),
          cancelText: t(
            "editor.inspect.setter_option.drive_builder.anonymous_modal.cancelBtn",
          ),
          onOk: async () => {
            try {
              await fetchOpenAnonymousPermission()
              anonymousPermission.current = true
              handleUpdateDsl(attrName, _v)
            } catch (e) {}
          },
        })
      } else if (!_v && anonymousPermission.current) {
        try {
          await fetchCloseAnonymousPermission()
          anonymousPermission.current = false
          handleUpdateDsl(attrName, _v)
        } catch (e) {}
      } else {
        handleUpdateDsl(attrName, _v)
      }
    },
    [attrName, handleUpdateDsl, modal, t],
  )
  const debounceHandleOnSwitch = useMemo(() => {
    return debounce(async (_v: boolean) => {
      try {
        await switchPermission(_v)
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
          element: "component_inspect_radio",
          parameter1: widgetType,
          parameter2: attrName,
        })
      } catch (e) {}
    }, 500)
  }, [attrName, switchPermission, widgetType])

  useEffect(() => {
    const request = async () => {
      try {
        const res = await fetchAnonymousPermission()
        anonymousPermission.current = res.data?.anonymous
        // handleUpdateDsl(attrName, anonymousPermission.current)
      } catch (e) {}
    }
    request()
  }, [attrName])

  return (
    <div css={dynamicWidthStyle}>
      <Switch
        onChange={debounceHandleOnSwitch}
        checked={value}
        colorScheme="techPurple"
      />
    </div>
  )
}

DriveWithStatusSwitchSetter.displayName = "BaseSwitchSetter"
export default DriveWithStatusSwitchSetter
