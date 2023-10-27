import { FC } from "react"
import { useTranslation } from "react-i18next"
import { PanelBar } from "@/components/PanelBar"
import { LIBRARIES } from "./constants"
import { LibrariesItem } from "./item"
import { libraryContainerStyle } from "./style"

export const LibrarySpaceTree: FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <PanelBar
        title={`${t("editor.data_work_space.library")}`}
        destroyChildrenWhenClose
      >
        <div css={libraryContainerStyle}>
          {LIBRARIES.map((library) => (
            <LibrariesItem
              key={library.title}
              title={library.title}
              docLink={library.docLink}
              alias={library.alias}
            />
          ))}
        </div>
      </PanelBar>
    </>
  )
}
