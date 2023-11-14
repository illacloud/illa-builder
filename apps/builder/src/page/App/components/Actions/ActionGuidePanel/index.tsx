import { isCloudVersion } from "@illa-public/utils"
import { FC, memo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Loading } from "@illa-design/react"
import PanelSection from "./components/ActionSection"
import {
  MORE_DATA_TYPE_SELF_HOST,
  RECOMMEND_RESOURCES_CLOUD,
  RECOMMEND_RESOURCES_SELF_HOST,
} from "./constans"
import {
  guidePanelContainerStyle,
  guidePanelOutContainerStyle,
  loadingContainerStyle,
} from "./style"

const ActionGuidePanel: FC = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <div css={guidePanelOutContainerStyle}>
        <div css={guidePanelContainerStyle}>
          {!isCloudVersion ? (
            <>
              <PanelSection
                title={t(
                  "editor.action.panel.label.general.connect-data-source",
                )}
                actionTypes={RECOMMEND_RESOURCES_SELF_HOST}
                changeLoading={setIsLoading}
                hasMore
              />
              <PanelSection
                title={t("editor.action.panel.label.general.more-type")}
                actionTypes={MORE_DATA_TYPE_SELF_HOST}
                changeLoading={setIsLoading}
                hasMore={false}
              />
            </>
          ) : (
            <>
              <PanelSection
                title={t(
                  "editor.action.panel.label.general.connect-data-source",
                )}
                actionTypes={RECOMMEND_RESOURCES_CLOUD}
                changeLoading={setIsLoading}
                hasMore
              />
            </>
          )}
          {isLoading && (
            <div css={loadingContainerStyle}>
              <Loading colorScheme="techPurple" />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default memo(ActionGuidePanel)
