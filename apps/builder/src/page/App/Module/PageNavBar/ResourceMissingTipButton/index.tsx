import { FC, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useSelector } from "react-redux"
import { QuestionCircleIcon, getColor } from "@illa-design/react"
import MissingResources from "@/page/App/components/MIssingResources"
import { getHasMissingResourceAction } from "@/redux/currentApp/action/actionSelector"
import { missingButtonStyle } from "./style"

export const ResourceMissingTipButton: FC = () => {
  const hasMissingResources = useSelector(getHasMissingResourceAction)
  const [shown, setShown] = useState(hasMissingResources)

  useEffect(() => {
    setShown(hasMissingResources)
  }, [hasMissingResources])

  return (
    hasMissingResources && (
      <>
        <button
          css={missingButtonStyle}
          onClick={() => {
            setShown(true)
          }}
        >
          <QuestionCircleIcon color={getColor("orange", "03")} size="16px" />
          Resource Missing
        </button>
        {shown &&
          createPortal(
            <MissingResources shown={shown} changeShown={setShown} />,
            document.body,
          )}
      </>
    )
  )
}
