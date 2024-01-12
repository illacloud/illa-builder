import { get } from "lodash-es"
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import useMeasure from "react-use-measure"
import { Trigger, isArray, isObject } from "@illa-design/react"
import {
  getHashCode,
  getPreColor,
} from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/utils"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import MorePanel from "./components/MorePanel"
import TagContainer from "./components/TagContainer"
import { GAP, OVERFLOW_GAP } from "./constants"
import { TagsWidgetProps, WrappedTagsProps } from "./interface"
import { wrapperContainerStyle } from "./style"
import { getSafeStringValue } from "./utils"

export const WrappedTags: FC<WrappedTagsProps> = (props) => {
  const { value = [], tagColor, allowWrap, alignment, handleOnSelect } = props

  const [sliceIndex, setSliceIndex] = useState(value.length)
  const tagColorMap = isObject(tagColor) ? tagColor : {}
  const widthArray = useRef<number[]>(new Array(value.length).fill(0))
  const overflowWidth = useRef<number>(OVERFLOW_GAP)

  const [container, containerBounds] = useMeasure()
  const containerWidth = containerBounds.width - 6

  const handleUpdateWithArray = useCallback(
    (width: number, index: number) => {
      if (width !== 0) {
        const array = widthArray.current
        const w =
          index === 0
            ? width
            : width + array[index - 1] + (index === value.length - 1 ? 0 : GAP)
        array[index] = w
        widthArray.current = array
      }
    },
    [value.length],
  )

  const realValue = useMemo(() => {
    if (allowWrap || sliceIndex === widthArray.current.length) {
      return value
    }
    return value.slice(0, sliceIndex + 1)
  }, [sliceIndex, value, allowWrap])

  useEffect(() => {
    if (allowWrap) return
    const dfs = (index: number) => {
      if (index < 0) return
      if (index === widthArray.current.length - 1) {
        if (widthArray.current[index] > containerWidth) {
          dfs(index - 1)
        } else {
          setSliceIndex(widthArray.current.length)
        }
      } else {
        if (
          widthArray.current[index] + GAP + overflowWidth.current >
          containerWidth
        ) {
          dfs(index - 1)
        } else {
          setSliceIndex(index)
        }
      }
    }
    dfs(widthArray.current.length - 1)
  }, [allowWrap, value.length, containerWidth])

  useEffect(() => {
    widthArray.current = new Array(value.length).fill(0)
    setSliceIndex(value.length)
  }, [value.length])

  return (
    <div
      css={wrapperContainerStyle(
        widthArray.current[0] + overflowWidth.current,
        alignment,
        allowWrap,
      )}
      ref={container}
    >
      {realValue.map((v, i) => {
        const s = getSafeStringValue(v)
        const c = get(tagColorMap, s) ?? getPreColor(getHashCode(s))
        if (!s) return null
        return (
          <TagContainer
            key={`${v}${i}`}
            c={c}
            v={s}
            allowWrap={allowWrap}
            handleUpdateWith={(w) => handleUpdateWithArray(w, i)}
            handleOnSelect={handleOnSelect}
          />
        )
      })}
      {!allowWrap && !!value.length && sliceIndex !== value.length && (
        <Trigger
          position="bottom"
          withoutPadding
          withoutShadow
          colorScheme="white"
          content={
            <MorePanel
              values={value.slice(sliceIndex + 1)}
              tagColorMap={tagColorMap}
              handleOnSelect={handleOnSelect}
            />
          }
        >
          <div>
            <TagContainer
              c={getPreColor(getHashCode(`${value.length - sliceIndex - 1}`))}
              v={`+${value.length - sliceIndex - 1}`}
              handleUpdateWith={(w) => (overflowWidth.current = w)}
            />
          </div>
        </Trigger>
      )}
    </div>
  )
}

WrappedTags.displayName = "WrappedTags"

export const TagsWidget: FC<TagsWidgetProps> = (props) => {
  const {
    displayName,
    tooltipText,
    disabled,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    handleUpdateMultiExecutionResult,
    triggerEventHandler,
    updateComponentHeight,
  } = props

  useEffect(() => {
    updateComponentRuntimeProps({
      setValue: (value: unknown) => {
        if (!isArray(value)) return
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: value || [],
            },
          },
        ])
      },
      clearValue: () => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: undefined,
            },
          },
        ])
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    deleteComponentRuntimeProps,
    displayName,
    handleUpdateMultiExecutionResult,
    updateComponentRuntimeProps,
  ])

  const handleOnSelect = useCallback(
    (value: string) => {
      if (disabled) return
      new Promise((resolve) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              selectedTag: value,
            },
          },
        ])
        resolve(true)
      }).then(() => {
        triggerEventHandler("select")
      })
    },
    [
      disabled,
      displayName,
      handleUpdateMultiExecutionResult,
      triggerEventHandler,
    ],
  )

  return (
    <AutoHeightContainer updateComponentHeight={updateComponentHeight}>
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <div>
          <WrappedTags {...props} handleOnSelect={handleOnSelect} />
        </div>
      </TooltipWrapper>
    </AutoHeightContainer>
  )
}
TagsWidget.displayName = "TagsWidget"
export default TagsWidget
