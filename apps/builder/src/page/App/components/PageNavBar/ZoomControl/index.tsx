import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, MinusIcon, PlusIcon } from "@illa-design/react"
import { getScale } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { controlStyle, numStyle } from "./style"

export const ZoomControl: FC = (props) => {
  const dispatch = useDispatch()
  const scale = useSelector(getScale)
  return (
    <div css={controlStyle}>
      <Button
        colorScheme="grayBlue"
        size="small"
        onClick={() => {
          dispatch(configActions.plusScale())
        }}
        leftIcon={<PlusIcon size="8px" />}
      />
      <span css={numStyle}>{scale}%</span>
      <Button
        colorScheme="grayBlue"
        size="small"
        onClick={() => {
          dispatch(configActions.minusScale())
        }}
        leftIcon={<MinusIcon size="8px" />}
      />
    </div>
  )
}

ZoomControl.displayName = "ZoomControl"
