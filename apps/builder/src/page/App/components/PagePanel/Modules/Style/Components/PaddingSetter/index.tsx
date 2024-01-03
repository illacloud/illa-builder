import PartialIcon from "@assets/rightPagePanel/partial.svg?react"
import { PADDING_MODE } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { RadioGroup } from "@illa-design/react"
import AllIcon from "@/assets/rightPagePanel/all.svg?react"
import { BASIC_CANVAS_PADDING } from "@/page/App/components/DotPanel/constant/canvas"
import { PageLabel } from "@/page/App/components/PagePanel/Components/Label"
import {
  labelContainerStyle,
  sectionContainerStyle,
  setterContainerStyle,
} from "@/page/App/components/PagePanel/Modules/Style/style"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import {
  getCurrentPageBodySection,
  getCurrentPageExecutionResult,
  getCurrentPageFooterSection,
  getCurrentPageHeaderSection,
  getCurrentPageLeftSection,
  getCurrentPageRightSection,
} from "@/redux/currentApp/executionTree/executionSelector"
import { DirectionPaddingSetter } from "../DirectionPaddingSetter"
import { optionsIconHotSpotStyle } from "./style"

const options = [
  {
    label: (
      <div css={optionsIconHotSpotStyle}>
        <AllIcon />
      </div>
    ),
    value: PADDING_MODE.ALL,
  },
  {
    label: (
      <div css={optionsIconHotSpotStyle}>
        <PartialIcon />
      </div>
    ),
    value: PADDING_MODE.PARTIAL,
  },
]

export const PaddingSetter: FC = () => {
  const { t } = useTranslation()

  const currentPage = useSelector(getCurrentPageExecutionResult)
  const { displayName, hasFooter, hasLeft, hasRight, hasHeader } = currentPage

  const bodySection = useSelector(getCurrentPageBodySection)
  const rightSection = useSelector(getCurrentPageRightSection)
  const leftSection = useSelector(getCurrentPageLeftSection)
  const headerSection = useSelector(getCurrentPageHeaderSection)
  const footerSection = useSelector(getCurrentPageFooterSection)
  const { style: bodyStyle } = bodySection ?? {}
  const { style: rightStyle } = rightSection ?? {}
  const { style: leftStyle } = leftSection ?? {}
  const { style: headerStyle } = headerSection ?? {}
  const { style: footerStyle } = footerSection ?? {}

  const dispatch = useDispatch()

  const { padding: bodyPadding = {} } = bodyStyle ?? {}
  const { padding: headerPadding = {} } = headerStyle ?? {}
  const { padding: leftPanelPadding = {} } = leftStyle ?? {}
  const { padding: rightPanelPadding = {} } = rightStyle ?? {}
  const { padding: footerPadding = {} } = footerStyle ?? {}

  const bodyPaddingMode = bodyPadding.mode ?? PADDING_MODE.ALL
  const headerPaddingMode = headerPadding.mode ?? PADDING_MODE.ALL
  const leftPanelPaddingMode = leftPanelPadding.mode ?? PADDING_MODE.ALL
  const rightPanelPaddingMode = rightPanelPadding.mode ?? PADDING_MODE.ALL
  const footerPaddingMode = footerPadding.mode ?? PADDING_MODE.ALL

  const bodyPaddingSize = bodyPadding.size ?? `${BASIC_CANVAS_PADDING}`
  const headerPaddingSize = headerPadding.size ?? `${BASIC_CANVAS_PADDING}`
  const leftPaddingSize = leftPanelPadding.size ?? `${BASIC_CANVAS_PADDING}`
  const rightPaddingSize = rightPanelPadding.size ?? `${BASIC_CANVAS_PADDING}`
  const footerPaddingSize = footerPadding.size ?? `${BASIC_CANVAS_PADDING}`

  const changeLeftPaddingMode = (value: PADDING_MODE) => {
    if (leftPanelPaddingMode === value) return
    switch (value) {
      case PADDING_MODE.ALL: {
        let result = leftPaddingSize
        const partialSize = Array.from(new Set(leftPaddingSize.split(" ")))
        if (partialSize.length === 1) {
          result = partialSize[0]
        }

        dispatch(
          componentsActions.updateCurrentPageStyleReducer({
            pageName: displayName,
            style: {
              padding: {
                mode: value,
                size: result,
              },
            },
            sectionName: "leftSection",
          }),
        )
        break
      }
      case PADDING_MODE.PARTIAL: {
        const partialSize = leftPaddingSize.split(" ")
        let result = leftPaddingSize
        if (partialSize.length === 1) {
          result = `${partialSize[0]} ${partialSize[0]} ${partialSize[0]} ${partialSize[0]}`
        }
        if (partialSize.length === 4) {
          result = `${partialSize[0]} ${partialSize[1]} ${partialSize[2]} ${partialSize[3]}`
        }

        dispatch(
          componentsActions.updateCurrentPageStyleReducer({
            pageName: displayName,
            style: {
              padding: {
                mode: value,
                size: result,
              },
            },
            sectionName: "leftSection",
          }),
        )
        break
      }
    }
  }

  const changeRightPaddingMode = (value: PADDING_MODE) => {
    if (rightPanelPaddingMode === value) return
    switch (value) {
      case PADDING_MODE.ALL: {
        let result = rightPaddingSize
        const partialSize = Array.from(new Set(rightPaddingSize.split(" ")))
        if (partialSize.length === 1) {
          result = partialSize[0]
        }

        dispatch(
          componentsActions.updateCurrentPageStyleReducer({
            pageName: displayName,
            style: {
              padding: {
                mode: value,
                size: result,
              },
            },
            sectionName: "rightSection",
          }),
        )
        break
      }
      case PADDING_MODE.PARTIAL: {
        const partialSize = rightPaddingSize.split(" ")
        let result = rightPaddingSize
        if (partialSize.length === 1) {
          result = `${partialSize[0]} ${partialSize[0]} ${partialSize[0]} ${partialSize[0]}`
        }
        if (partialSize.length === 4) {
          result = `${partialSize[0]} ${partialSize[1]} ${partialSize[2]} ${partialSize[3]}`
        }

        dispatch(
          componentsActions.updateCurrentPageStyleReducer({
            pageName: displayName,
            style: {
              padding: {
                mode: value,
                size: result,
              },
            },
            sectionName: "rightSection",
          }),
        )
        break
      }
    }
  }

  const changeHeaderPaddingMode = (value: PADDING_MODE) => {
    if (headerPaddingMode === value) return
    switch (value) {
      case PADDING_MODE.ALL: {
        let result = headerPaddingSize
        const partialSize = Array.from(new Set(headerPaddingSize.split(" ")))
        if (partialSize.length === 1) {
          result = partialSize[0]
        }

        dispatch(
          componentsActions.updateCurrentPageStyleReducer({
            pageName: displayName,
            style: {
              padding: {
                mode: value,
                size: result,
              },
            },
            sectionName: "headerSection",
          }),
        )
        break
      }
      case PADDING_MODE.PARTIAL: {
        const partialSize = headerPaddingSize.split(" ")
        let result = headerPaddingSize
        if (partialSize.length === 1) {
          result = `${partialSize[0]} ${partialSize[0]} ${partialSize[0]} ${partialSize[0]}`
        }
        if (partialSize.length === 4) {
          result = `${partialSize[0]} ${partialSize[1]} ${partialSize[2]} ${partialSize[3]}`
        }

        dispatch(
          componentsActions.updateCurrentPageStyleReducer({
            pageName: displayName,
            style: {
              padding: {
                mode: value,
                size: result,
              },
            },
            sectionName: "headerSection",
          }),
        )
        break
      }
    }
  }

  const changeFooterPaddingMode = (value: PADDING_MODE) => {
    if (footerPaddingMode === value) return
    switch (value) {
      case PADDING_MODE.ALL: {
        let result = footerPaddingSize
        const partialSize = Array.from(new Set(footerPaddingSize.split(" ")))
        if (partialSize.length === 1) {
          result = partialSize[0]
        }

        dispatch(
          componentsActions.updateCurrentPageStyleReducer({
            pageName: displayName,
            style: {
              padding: {
                mode: value,
                size: result,
              },
            },
            sectionName: "footerSection",
          }),
        )
        break
      }
      case PADDING_MODE.PARTIAL: {
        const partialSize = footerPaddingSize.split(" ")
        let result = footerPaddingSize
        if (partialSize.length === 1) {
          result = `${partialSize[0]} ${partialSize[0]} ${partialSize[0]} ${partialSize[0]}`
        }
        if (partialSize.length === 4) {
          result = `${partialSize[0]} ${partialSize[1]} ${partialSize[2]} ${partialSize[3]}`
        }

        dispatch(
          componentsActions.updateCurrentPageStyleReducer({
            pageName: displayName,
            style: {
              padding: {
                mode: value,
                size: result,
              },
            },
            sectionName: "footerSection",
          }),
        )
        break
      }
    }
  }

  const changeBodyPaddingMode = (value: PADDING_MODE) => {
    if (bodyPaddingMode === value) return
    switch (value) {
      case PADDING_MODE.ALL: {
        let result = bodyPaddingSize
        const partialSize = Array.from(new Set(bodyPaddingSize.split(" ")))
        if (partialSize.length === 1) {
          result = partialSize[0]
        }

        dispatch(
          componentsActions.updateCurrentPageStyleReducer({
            pageName: displayName,
            style: {
              padding: {
                mode: value,
                size: result,
              },
            },
            sectionName: "bodySection",
          }),
        )
        break
      }
      case PADDING_MODE.PARTIAL: {
        const partialSize = bodyPaddingSize.split(" ")
        let result = bodyPaddingSize
        if (partialSize.length === 1) {
          result = `${partialSize[0]} ${partialSize[0]} ${partialSize[0]} ${partialSize[0]}`
        }
        if (partialSize.length === 4) {
          result = `${partialSize[0]} ${partialSize[1]} ${partialSize[2]} ${partialSize[3]}`
        }

        dispatch(
          componentsActions.updateCurrentPageStyleReducer({
            pageName: displayName,
            style: {
              padding: {
                mode: value,
                size: result,
              },
            },
            sectionName: "bodySection",
          }),
        )
        break
      }
    }
  }

  const handleChangeLeftPaddingSize = (value: string) => {
    dispatch(
      componentsActions.updateCurrentPageStyleReducer({
        pageName: displayName,
        style: {
          padding: {
            size: value,
          },
        },
        sectionName: "leftSection",
      }),
    )
  }

  const handleChangeRightPaddingSize = (value: string) => {
    dispatch(
      componentsActions.updateCurrentPageStyleReducer({
        pageName: displayName,
        style: {
          padding: {
            size: value,
          },
        },
        sectionName: "rightSection",
      }),
    )
  }

  const handleChangeHeaderPaddingSize = (value: string) => {
    dispatch(
      componentsActions.updateCurrentPageStyleReducer({
        pageName: displayName,
        style: {
          padding: {
            size: value,
          },
        },
        sectionName: "headerSection",
      }),
    )
  }

  const handleChangeFooterPaddingSize = (value: string) => {
    dispatch(
      componentsActions.updateCurrentPageStyleReducer({
        pageName: displayName,
        style: {
          padding: {
            size: value,
          },
        },
        sectionName: "footerSection",
      }),
    )
  }

  const handleChangeBodyPaddingSize = (value: string) => {
    dispatch(
      componentsActions.updateCurrentPageStyleReducer({
        pageName: displayName,
        style: {
          padding: {
            size: value,
          },
        },
        sectionName: "bodySection",
      }),
    )
  }

  return (
    <section css={sectionContainerStyle}>
      <div css={labelContainerStyle}>
        <PageLabel
          labelName={t("editor.inspect.setter_group.padding")}
          size="big"
        />
      </div>
      <div css={setterContainerStyle}>
        <PageLabel labelName={t("editor.page.label_name.body")} size="small" />
        <RadioGroup
          type="button"
          options={options}
          value={bodyPaddingMode}
          onChange={changeBodyPaddingMode}
          size="small"
          w="105px"
          forceEqualWidth
        />
      </div>
      <DirectionPaddingSetter
        isAll={bodyPaddingMode === PADDING_MODE.ALL}
        value={bodyPaddingSize}
        handleUpdateValue={handleChangeBodyPaddingSize}
      />
      {hasHeader && (
        <>
          <div css={setterContainerStyle}>
            <PageLabel
              labelName={t("editor.page.label_name.header")}
              size="small"
            />
            <RadioGroup
              type="button"
              options={options}
              value={headerPaddingMode}
              onChange={changeHeaderPaddingMode}
              size="small"
              w="105px"
              forceEqualWidth
            />
          </div>
          <DirectionPaddingSetter
            isAll={headerPaddingMode === PADDING_MODE.ALL}
            value={headerPaddingSize}
            handleUpdateValue={handleChangeHeaderPaddingSize}
          />
        </>
      )}
      {hasLeft && (
        <>
          <div css={setterContainerStyle}>
            <PageLabel
              labelName={t("editor.page.label_name.left_panel")}
              size="small"
            />
            <RadioGroup
              type="button"
              options={options}
              value={leftPanelPaddingMode}
              onChange={changeLeftPaddingMode}
              size="small"
              w="105px"
              forceEqualWidth
            />
          </div>
          <DirectionPaddingSetter
            isAll={leftPanelPaddingMode === PADDING_MODE.ALL}
            value={leftPaddingSize}
            handleUpdateValue={handleChangeLeftPaddingSize}
          />
        </>
      )}
      {hasRight && (
        <>
          <div css={setterContainerStyle}>
            <PageLabel
              labelName={t("editor.page.label_name.right_panel")}
              size="small"
            />
            <RadioGroup
              type="button"
              options={options}
              value={rightPanelPaddingMode}
              onChange={changeRightPaddingMode}
              size="small"
              w="105px"
              forceEqualWidth
            />
          </div>
          <DirectionPaddingSetter
            isAll={rightPanelPaddingMode === PADDING_MODE.ALL}
            value={rightPaddingSize}
            handleUpdateValue={handleChangeRightPaddingSize}
          />
        </>
      )}
      {hasFooter && (
        <>
          <div css={setterContainerStyle}>
            <PageLabel
              labelName={t("editor.page.label_name.footer")}
              size="small"
            />
            <RadioGroup
              type="button"
              options={options}
              value={footerPaddingMode}
              onChange={changeFooterPaddingMode}
              size="small"
              w="105px"
              forceEqualWidth
            />
          </div>
          <DirectionPaddingSetter
            isAll={footerPaddingMode === PADDING_MODE.ALL}
            value={footerPaddingSize}
            handleUpdateValue={handleChangeFooterPaddingSize}
          />
        </>
      )}
    </section>
  )
}
