import { get } from "lodash-es"
import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import { Steps } from "@illa-design/react"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import {
  StepsWidgetProps,
  WrappedStepsProps,
} from "@/widgetLibrary/StepsWidget/interface"
import {
  formatStepsData,
  getFormatOptionConfigData,
  getStepItemTitle,
} from "@/widgetLibrary/StepsWidget/util"

export const WrappedSteps: FC<WrappedStepsProps> = (props) => {
  const { direction, items, current, handleStepsChange } = props

  return (
    <Steps
      direction={direction}
      items={items}
      type="line"
      current={current}
      onChange={handleStepsChange}
    />
  )
}

export const StepsWidget: FC<StepsWidgetProps> = (props) => {
  const {
    manualOptions,
    mappedOption,
    displayName,
    linkContainer,
    viewList,
    currentIndex,
    linkWidgetDisplayName,
    defaultStep,
    disabled,
    updateComponentHeight,
    handleUpdateMultiExecutionResult,
    handleUpdateOriginalDSLOtherMultiAttr,
    optionConfigureMode,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    handleUpdateDsl,
  } = props

  const preLinkContainer = useRef<boolean>(false)
  const executionResult = useSelector(getExecutionResult)

  const isLinkedContainer = useMemo(
    () => linkContainer && !!linkWidgetDisplayName,
    [linkContainer, linkWidgetDisplayName],
  )

  const transformedContainerList = useMemo(() => {
    return (viewList ?? [])
      .map((item) => {
        const { key: _key, ...others } = item
        return {
          value: item.key,
          ...others,
        }
      })
      .filter((item) => !item?.hidden)
  }, [viewList])

  const formatOptionConfigData = useMemo(() => {
    return getFormatOptionConfigData(
      optionConfigureMode,
      optionConfigureMode === "static" ? manualOptions : mappedOption,
    )
  }, [manualOptions, mappedOption, optionConfigureMode])

  /*
   * items: StepItem[]
   * uniqueOptions: array of value that with hidden option filtered
   */
  const { items, uniqueOptions } = useMemo(() => {
    if (!isLinkedContainer) {
      return formatStepsData(
        optionConfigureMode,
        formatOptionConfigData,
        disabled,
      )
    }
    const results = transformedContainerList.map((item, index) => {
      const { label, value, caption, tooltip = "" } = item
      const titleContent = label || value || index
      return {
        title: getStepItemTitle(titleContent, tooltip),
        description: caption,
        disabled,
      }
    })
    return {
      items: results,
      uniqueOptions: transformedContainerList.map((item) => item.value),
    }
  }, [
    isLinkedContainer,
    transformedContainerList,
    optionConfigureMode,
    formatOptionConfigData,
    disabled,
  ])

  const handleUpdateMultiExecutionResults = useCallback(
    (updateSliceItem: Record<string, any>) => {
      if (linkWidgetDisplayName) {
        handleUpdateOriginalDSLOtherMultiAttr(
          linkWidgetDisplayName,
          updateSliceItem,
          true,
        )
      }
      handleUpdateOriginalDSLOtherMultiAttr(displayName, updateSliceItem, true)
    },
    [displayName, handleUpdateOriginalDSLOtherMultiAttr, linkWidgetDisplayName],
  )

  const handleStepsChange = useCallback(
    (current: number) => {
      const value = {
        currentKey: uniqueOptions?.[current],
        currentIndex: current,
      }
      if (isLinkedContainer) {
        handleUpdateMultiExecutionResults(value)
      } else {
        handleUpdateDsl(value)
      }
    },
    [
      handleUpdateDsl,
      handleUpdateMultiExecutionResults,
      isLinkedContainer,
      uniqueOptions,
    ],
  )

  const handleSetStepsValue = useCallback(
    (value: any) => {
      const index = uniqueOptions?.findIndex((item) => item === value)
      const updateValue = {
        currentKey: uniqueOptions[index],
        currentIndex: index,
      }
      if (isLinkedContainer) {
        handleUpdateMultiExecutionResults(updateValue)
      } else {
        handleUpdateDsl(updateValue)
      }
    },
    [
      handleUpdateDsl,
      handleUpdateMultiExecutionResults,
      isLinkedContainer,
      uniqueOptions,
    ],
  )

  const handleResetStepsValue = useCallback(() => {
    if (linkContainer) {
      return
    }
    handleUpdateDsl({
      currentIndex: uniqueOptions?.findIndex((item) => item === defaultStep),
      currentKey: defaultStep,
    })
  }, [defaultStep, handleUpdateDsl, linkContainer, uniqueOptions])

  useEffect(() => {
    if (preLinkContainer.current !== linkContainer && linkWidgetDisplayName) {
      preLinkContainer.current = linkContainer
      if (linkContainer) {
        const defaultIndex = get(
          executionResult,
          `${linkWidgetDisplayName}.currentIndex`,
        )
        const defaultKey = get(
          executionResult,
          `${linkWidgetDisplayName}.currentKey`,
        )
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              currentIndex: defaultIndex,
              currentKey: defaultKey,
            },
          },
        ])
      } else {
        const defaultStepIndex = uniqueOptions?.findIndex(
          (item) => item === defaultStep,
        )
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              currentIndex: defaultStepIndex < 0 ? 0 : defaultStepIndex,
              currentKey: defaultStep,
            },
          },
        ])
        if (linkWidgetDisplayName) {
          handleUpdateOriginalDSLOtherMultiAttr(
            linkWidgetDisplayName,
            {
              linkWidgetDisplayName: undefined,
            },
            true,
          )
        }
        handleUpdateOriginalDSLOtherMultiAttr(
          displayName,
          {
            linkWidgetDisplayName: undefined,
          },
          true,
        )
      }
    }
  }, [
    defaultStep,
    displayName,
    executionResult,
    handleUpdateMultiExecutionResult,
    handleUpdateOriginalDSLOtherMultiAttr,
    linkContainer,
    linkWidgetDisplayName,
    uniqueOptions,
  ])

  useEffect(() => {
    updateComponentRuntimeProps({
      setValue: (value: any) => {
        handleSetStepsValue(value)
      },
      resetValue: () => {
        handleResetStepsValue()
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    deleteComponentRuntimeProps,
    handleResetStepsValue,
    handleSetStepsValue,
    updateComponentRuntimeProps,
  ])

  return (
    <AutoHeightContainer updateComponentHeight={updateComponentHeight}>
      <WrappedSteps
        {...props}
        items={items}
        current={currentIndex}
        handleStepsChange={handleStepsChange}
      />
    </AutoHeightContainer>
  )
}
export default StepsWidget
