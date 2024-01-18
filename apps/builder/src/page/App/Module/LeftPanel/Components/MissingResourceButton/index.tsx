import IconHotSpot from "@illa-public/icon-hot-spot"
import { t } from "i18next"
import { FC, memo, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { QuestionCircleIcon, Trigger, getColor } from "@illa-design/react"
import MissingResourceModal from "@/page/App/components/MissingRosourceModal"
import { getHasMissingResourceAction } from "@/redux/currentApp/action/actionSelector"

const MissingResourceButton: FC = () => {
  const hasMissingResources = useSelector(getHasMissingResourceAction)

  const [shownMissingResource, setShownMissingResource] =
    useState(hasMissingResources)
  const [shownTooltip, setShownTooltip] = useState(false)

  useEffect(() => {
    setShownMissingResource(hasMissingResources)
  }, [hasMissingResources])

  const handleClickMissingResourceIcon = () => {
    setShownMissingResource(true)
  }

  const handleCloseModal = (shown: boolean) => {
    if (shown) {
      setShownMissingResource(true)
    } else {
      setShownMissingResource(false)
      setShownTooltip(true)
      setTimeout(() => {
        setShownTooltip(false)
      }, 1500)
    }
  }

  return (
    hasMissingResources && (
      <>
        <Trigger
          content={t("flow.editor.flow.tooltips.missing_resources")}
          position="right"
          popupVisible={shownTooltip}
          onVisibleChange={setShownTooltip}
        >
          <IconHotSpot onClick={handleClickMissingResourceIcon}>
            <QuestionCircleIcon color={getColor("orange", "03")} />
          </IconHotSpot>
        </Trigger>
        <MissingResourceModal
          shown={shownMissingResource}
          changeShown={handleCloseModal}
        />
      </>
    )
  )
}

export default memo(MissingResourceButton)
