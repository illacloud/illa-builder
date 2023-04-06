import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import { Steps } from "@illa-design/react"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import {
  StepsMappedOptionType,
  StepsOptionsType,
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
    currentKey,
    current,
    linkWidgetDisplayName,
    defaultStep,
    updateComponentHeight,
    handleUpdateMultiExecutionResult,
    optionConfigureMode,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    handleUpdateDsl,
  } = props

  const isMappedOption = optionConfigureMode === "dynamic"

  const transformedContainerList = useMemo(() => {
    return (viewList ?? [])
      .map((item) => {
        const { key, ...others } = item
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

  const currentStepIndex = useMemo(() => {
    if (linkContainer) {
      return transformedContainerList.findIndex(
        (item) => item.value === currentKey,
      )
    }
    if (current !== undefined) {
      return current
    }
    if (isMappedOption) {
      return (formatOptionConfigData as StepsMappedOptionType).values.findIndex(
        (item) => item?.value === defaultStep,
      )
    }
    return (formatOptionConfigData as StepsOptionsType[]).findIndex(
      (item) => item?.value === defaultStep,
    )
  }, [
    current,
    currentKey,
    defaultStep,
    formatOptionConfigData,
    isMappedOption,
    linkContainer,
    transformedContainerList,
  ])

  /*
   * items: StepItem[]
   * uniqueOptions: array of value that with hidden option filtered
   */
  const { items, uniqueOptions } = useMemo(() => {
    if (!linkContainer) {
      return formatStepsData(optionConfigureMode, formatOptionConfigData)
    }
    const results = transformedContainerList.map((item, index) => {
      const { label, value, caption, tooltip = "" } = item
      const titleContent = label || value || index
      return {
        title: getStepItemTitle(titleContent, tooltip),
        description: caption,
      }
    })
    return {
      items: results,
      uniqueOptions: transformedContainerList.map((item) => item.value),
    }
  }, [
    linkContainer,
    transformedContainerList,
    optionConfigureMode,
    formatOptionConfigData,
  ])

  const handleUpdateMultiExecutionResults = useCallback(
    (updateSliceItem: Record<string, any>) => {
      let items = [
        {
          displayName,
          value: updateSliceItem,
        },
      ]
      if (linkWidgetDisplayName) {
        items.push({
          displayName: linkWidgetDisplayName,
          value: updateSliceItem,
        })
      }
      handleUpdateMultiExecutionResult(items)
    },
    [displayName, handleUpdateMultiExecutionResult, linkWidgetDisplayName],
  )

  const handleStepsChange = useCallback(
    (current: number) => {
      const value = {
        currentKey: uniqueOptions?.[current],
        currentIndex: current,
      }
      if (linkContainer && linkWidgetDisplayName) {
        handleUpdateMultiExecutionResults(value)
      } else {
        handleUpdateDsl({
          current,
        })
      }
    },
    [
      handleUpdateDsl,
      handleUpdateMultiExecutionResults,
      linkContainer,
      linkWidgetDisplayName,
      uniqueOptions,
    ],
  )

  const handleSetStepsValue = useCallback(
    (value: any) => {
      const index = uniqueOptions?.findIndex((item) => item === value)
      if (linkContainer && linkWidgetDisplayName) {
        const updateValue = {
          currentKey: uniqueOptions[index],
          currentIndex: index,
        }
        handleUpdateMultiExecutionResults(updateValue)
      } else {
        handleUpdateDsl({ current: index })
      }
    },
    [
      handleUpdateDsl,
      handleUpdateMultiExecutionResults,
      linkContainer,
      linkWidgetDisplayName,
      uniqueOptions,
    ],
  )

  const handleResetStepsValue = useCallback(() => {
    if (linkContainer) {
      return
    }
    handleUpdateDsl({
      current: uniqueOptions?.findIndex((item) => item === defaultStep),
    })
  }, [defaultStep, handleUpdateDsl, linkContainer, uniqueOptions])

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      setValue: (value: any) => {
        handleSetStepsValue(value)
      },
      resetValue: () => {
        handleResetStepsValue()
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    handleDeleteGlobalData,
    handleResetStepsValue,
    handleSetStepsValue,
    handleUpdateGlobalData,
  ])

  return (
    <AutoHeightContainer
      updateComponentHeight={updateComponentHeight}
      dynamicOptions={{}}
    >
      <WrappedSteps
        {...props}
        items={items}
        current={currentStepIndex}
        handleStepsChange={handleStepsChange}
      />
    </AutoHeightContainer>
  )
}
