import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { debounce } from "lodash-es"
import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Switch, useModal } from "@illa-design/react"
import { dynamicWidthStyle } from "@/page/App/components/InspectPanel/PanelSetters/style"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"
import {
  fetchAnonymousPermission,
  fetchCloseAnonymousPermission,
  fetchOpenAnonymousPermission,
} from "@/services/drive"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { BaseSwitchProps } from "./interface"
import { setterContainerStyle } from "./style"

const DriveWithStatusSwitchSetter: FC<BaseSwitchProps> = (props) => {
  const {
    value,
    attrName,
    handleUpdateDsl,
    widgetType,
    handleUpdateMultiAttrDSL,
    isSetterSingleRow,
    labelDesc,
    labelName,
    labelSize,
  } = props
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
              const updateSlice: Record<string, unknown> = {
                [attrName]: _v,
              }
              if (_v) {
                updateSlice.ILLADriveFolder = ""
              }
              handleUpdateMultiAttrDSL?.(updateSlice)
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
        const updateSlice: Record<string, unknown> = {
          [attrName]: _v,
        }
        if (_v) {
          updateSlice.ILLADriveFolder = ""
        }
        handleUpdateMultiAttrDSL?.(updateSlice)
      }
    },
    [attrName, handleUpdateDsl, handleUpdateMultiAttrDSL, modal, t],
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
      } catch (e) {}
    }
    request()
  }, [attrName])

  return (
    <div css={setterContainerStyle(isSetterSingleRow)}>
      <span>
        {labelName && (
          <PanelLabel
            labelName={labelName}
            labelDesc={labelDesc}
            labelSize={labelSize}
          />
        )}
      </span>
      <div css={dynamicWidthStyle}>
        <Switch
          onChange={debounceHandleOnSwitch}
          checked={value}
          colorScheme="techPurple"
        />
      </div>
    </div>
  )
}

DriveWithStatusSwitchSetter.displayName = "DriveWithStatusSwitchSetter"
export default DriveWithStatusSwitchSetter
