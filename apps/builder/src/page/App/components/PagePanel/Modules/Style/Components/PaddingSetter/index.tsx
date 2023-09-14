import { ReactComponent as PartialIcon } from "@assets/rightPagePanel/partial.svg"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { RadioGroup } from "@illa-design/react"
import { ReactComponent as AllIcon } from "@/assets/rightPagePanel/all.svg"
import { PADDING_MODE } from "@/redux/currentApp/editor/components/componentsState"
import { getCurrentPageExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { componentsActions } from "../../../../../../../../redux/currentApp/editor/components/componentsSlice"
import { BASIC_CANVAS_PADDING } from "../../../../../DotPanel/constant/canvas"
import { PageLabel } from "../../../../Components/Label"
import {
  labelContainerStyle,
  sectionContainerStyle,
  setterContainerStyle,
} from "../../style"
import { DirectionPaddingSetter } from "../DirectionPaddingSetter"

const options = [
  {
    label: <AllIcon />,
    value: PADDING_MODE.ALL,
  },
  {
    label: <PartialIcon />,
    value: PADDING_MODE.PARTIAL,
  },
]

export const PaddingSetter: FC = () => {
  const { t } = useTranslation()

  const currentPage = useSelector(getCurrentPageExecutionResult)
  const {
    displayName,
    hasFooter,
    hasLeft,
    hasRight,
    hasHeader,
    style: currentPageStyle,
  } = currentPage

  const dispatch = useDispatch()

  const { padding: bodyPadding = {} } = currentPageStyle?.body ?? {}
  const { padding: headerPadding = {} } = currentPageStyle?.header ?? {}
  const { padding: leftPanelPadding = {} } = currentPageStyle?.leftPanel ?? {}
  const { padding: rightPanelPadding = {} } = currentPageStyle?.rightPanel ?? {}
  const { padding: footerPadding = {} } = currentPageStyle?.footer ?? {}

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
              leftPanel: {
                padding: {
                  mode: value,
                  size: result,
                },
              },
            },
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
              leftPanel: {
                padding: {
                  mode: value,
                  size: result,
                },
              },
            },
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
              rightPanel: {
                padding: {
                  mode: value,
                  size: result,
                },
              },
            },
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
              rightPanel: {
                padding: {
                  mode: value,
                  size: result,
                },
              },
            },
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
              header: {
                padding: {
                  mode: value,
                  size: result,
                },
              },
            },
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
              header: {
                padding: {
                  mode: value,
                  size: result,
                },
              },
            },
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
              footer: {
                padding: {
                  mode: value,
                  size: result,
                },
              },
            },
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
              footer: {
                padding: {
                  mode: value,
                  size: result,
                },
              },
            },
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
        console.log("result", result)

        dispatch(
          componentsActions.updateCurrentPageStyleReducer({
            pageName: displayName,
            style: {
              body: {
                padding: {
                  mode: value,
                  size: result,
                },
              },
            },
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
              body: {
                padding: {
                  mode: value,
                  size: result,
                },
              },
            },
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
          leftPanel: {
            padding: {
              size: value,
            },
          },
        },
      }),
    )
  }

  const handleChangeRightPaddingSize = (value: string) => {
    dispatch(
      componentsActions.updateCurrentPageStyleReducer({
        pageName: displayName,
        style: {
          rightPanel: {
            padding: {
              size: value,
            },
          },
        },
      }),
    )
  }

  const handleChangeHeaderPaddingSize = (value: string) => {
    dispatch(
      componentsActions.updateCurrentPageStyleReducer({
        pageName: displayName,
        style: {
          header: {
            padding: {
              size: value,
            },
          },
        },
      }),
    )
  }

  const handleChangeFooterPaddingSize = (value: string) => {
    dispatch(
      componentsActions.updateCurrentPageStyleReducer({
        pageName: displayName,
        style: {
          footer: {
            padding: {
              size: value,
            },
          },
        },
      }),
    )
  }

  const handleChangeBodyPaddingSize = (value: string) => {
    dispatch(
      componentsActions.updateCurrentPageStyleReducer({
        pageName: displayName,
        style: {
          body: {
            padding: {
              size: value,
            },
          },
        },
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
