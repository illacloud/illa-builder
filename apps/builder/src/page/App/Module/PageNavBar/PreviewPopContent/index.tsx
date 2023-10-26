import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CloseIcon, InputNumber, useMessage } from "@illa-design/react"
import {
  closeIconStyle,
  inputAreaLabelWrapperStyle,
  inputAreaWrapperStyle,
} from "@/page/App/Module/PageNavBar/style"
import {
  BODY_MIN_HEIGHT,
  BODY_MIN_WIDTH,
  FOOTER_MIN_HEIGHT,
  HEADER_MIN_HEIGHT,
  LEFT_MIN_WIDTH,
  RIGHT_MIN_WIDTH,
} from "@/page/App/components/DotPanel/constant/canvas"
import { getViewportSizeSelector } from "@/redux/currentApp/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { trackInEditor } from "@/utils/mixpanelHelper"

const validateHeight = (currentHeight: number | undefined) => {
  return !(
    currentHeight != undefined &&
    currentHeight < BODY_MIN_HEIGHT + HEADER_MIN_HEIGHT + FOOTER_MIN_HEIGHT
  )
}

const validateWidth = (currentWidth: number | undefined) => {
  return !(
    currentWidth != undefined &&
    currentWidth < BODY_MIN_WIDTH + LEFT_MIN_WIDTH + RIGHT_MIN_WIDTH
  )
}

export const PreviewPopContent = () => {
  const { viewportWidth, viewportHeight } = useSelector(getViewportSizeSelector)

  const [inputWidth, setInputWidth] = useState(viewportWidth)
  const [inputHeight, setInputHeight] = useState(viewportHeight)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const message = useMessage()

  const width = validateWidth(inputWidth) ? inputWidth : viewportWidth
  const height = validateHeight(inputHeight) ? inputHeight : viewportHeight

  const saveNewViewportSize = useCallback(() => {
    dispatch(
      componentsActions.updateViewportSizeReducer({
        viewportWidth: width,
        viewportHeight: height,
        viewportSizeType: "custom",
      }),
    )
  }, [dispatch, height, width])

  const handleUpdateInputWidth = useCallback((value?: number) => {
    setInputWidth(value)
  }, [])

  const handleUpdateInputHeight = useCallback((value?: number) => {
    setInputHeight(value)
  }, [])

  const handleOnBlurInputHeight = useCallback(() => {
    const isValidate = validateHeight(inputHeight)
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
      element: "custom_size_input",
      parameter2: "h",
      parameter3: inputHeight,
    })
    if (!isValidate) {
      message.error({
        content: t("frame_size.invalid_tips", {
          size: BODY_MIN_HEIGHT + HEADER_MIN_HEIGHT + FOOTER_MIN_HEIGHT,
        }),
      })
      return
    }
    saveNewViewportSize()
  }, [inputHeight, message, saveNewViewportSize, t])

  const handleOnBlurInputWidth = useCallback(() => {
    const isValidate = validateWidth(inputWidth)
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
      element: "custom_size_input",
      parameter2: "w",
      parameter3: inputWidth,
    })
    if (!isValidate) {
      message.error({
        content: t("frame_size.invalid_tips", {
          size: BODY_MIN_WIDTH + LEFT_MIN_WIDTH + RIGHT_MIN_WIDTH,
        }),
      })
      return
    }
    saveNewViewportSize()
  }, [inputWidth, message, saveNewViewportSize, t])

  const handleOnFocusOnWidth = useCallback(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.FOCUS, {
      element: "custom_size_input",
      parameter2: "w",
    })
  }, [])

  const handleOnFocusOnHeight = useCallback(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.FOCUS, {
      element: "custom_size_input",
      parameter2: "h",
    })
  }, [])

  return (
    <div css={inputAreaWrapperStyle}>
      <div css={inputAreaLabelWrapperStyle}>
        <span>W</span>
        <CloseIcon css={closeIconStyle} />
        <span>H:</span>
      </div>
      <div css={inputAreaLabelWrapperStyle}>
        <InputNumber
          w="100px"
          colorScheme="techPurple"
          value={inputWidth}
          placeholder="--"
          onChange={handleUpdateInputWidth}
          onBlur={handleOnBlurInputWidth}
          onFocus={handleOnFocusOnWidth}
          min={BODY_MIN_WIDTH + LEFT_MIN_WIDTH + RIGHT_MIN_WIDTH}
          suffix="px"
          hideControl
        />
        <CloseIcon css={closeIconStyle} />
        <InputNumber
          w="100px"
          colorScheme="techPurple"
          value={inputHeight}
          placeholder="--"
          suffix="px"
          hideControl
          onChange={handleUpdateInputHeight}
          onBlur={handleOnBlurInputHeight}
          onFocus={handleOnFocusOnHeight}
          min={BODY_MIN_HEIGHT + HEADER_MIN_HEIGHT + FOOTER_MIN_HEIGHT}
        />
      </div>
    </div>
  )
}
