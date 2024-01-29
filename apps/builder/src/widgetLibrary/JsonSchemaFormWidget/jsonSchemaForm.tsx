import FormRef from "@rjsf/core"
import { debounce } from "lodash-es"
import { FC, useCallback, useEffect, useRef } from "react"
import { isObject } from "@/utils/typeHelper"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { JsonSchemaFormWidgetProps } from "./interface"
import { WrapperSchemaForm } from "./wrapperSchemaForm"

export const JsonSchemaFormWidget: FC<JsonSchemaFormWidgetProps> = (props) => {
  const {
    displayName,
    dynamicHeight,
    updateComponentHeight,
    triggerEventHandler,
    handleUpdateMultiExecutionResult,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
  } = props

  const enableAutoHeight = dynamicHeight !== "fixed"
  const formRef = useRef<FormRef>(null)
  const onChangeRef = useRef(
    debounce((formData: unknown) => {
      if (isObject(formData)) {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              formData,
            },
          },
        ])
      }
    }, 180),
  )

  const handleValidate = useCallback(() => {
    return new Promise((resolve, reject) => {
      const result = formRef.current?.validateForm()
      if (result) {
        resolve(true)
      } else {
        reject(formRef.current?.state.errors)
      }
    })
  }, [])

  const handleOnSubmit = useCallback(() => {
    triggerEventHandler("submit")
  }, [triggerEventHandler])

  useEffect(() => {
    updateComponentRuntimeProps({
      submit: () => {
        handleValidate().then(() => {
          formRef.current?.submit()
        })
      },
      setValue: (formData: unknown) => {
        if (isObject(formData)) {
          handleUpdateMultiExecutionResult([
            {
              displayName,
              value: {
                formData,
              },
            },
          ])
        }
      },
      clearValue: () => {
        formRef.current?.reset()
      },
    })

    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    deleteComponentRuntimeProps,
    displayName,
    handleUpdateMultiExecutionResult,
    handleValidate,
    updateComponentRuntimeProps,
  ])

  return (
    <AutoHeightContainer
      updateComponentHeight={updateComponentHeight}
      enable={enableAutoHeight}
    >
      <WrapperSchemaForm
        ref={formRef}
        {...props}
        handleOnChange={onChangeRef.current}
        handleOnSubmit={handleOnSubmit}
      />
    </AutoHeightContainer>
  )
}

JsonSchemaFormWidget.displayName = "JsonSchemaFormWidget"
export default JsonSchemaFormWidget
