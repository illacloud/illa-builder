import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CloseIcon, InputNumber, useMessage } from "@illa-design/react"
import {
  BODY_MIN_HEIGHT,
  BODY_MIN_WIDTH,
  FOOTER_MIN_HEIGHT,
  HEADER_MIN_HEIGHT,
  LEFT_MIN_WIDTH,
  RIGHT_MIN_WIDTH,
} from "@/page/App/components/DotPanel/renderSection"
import {
  closeIconStyle,
  inputAreaLabelWrapperStyle,
  inputAreaWrapperStyle,
} from "@/page/App/components/PageNavBar/style"
import { getViewportSizeSelector } from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"

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
  const viewportSize = useSelector(getViewportSizeSelector)
  const { viewportWidth, viewportHeight } = viewportSize

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
          min={BODY_MIN_HEIGHT + HEADER_MIN_HEIGHT + FOOTER_MIN_HEIGHT}
        />
      </div>
    </div>
  )
}
