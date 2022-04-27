interface ISelectOptions {
  key: string
  value: string
}

export interface ILabelProps {
  labelName: string
  labelDesc?: string
}

export interface IFxbuttonProps {
  isCustom: boolean
  updateCustomModal: (isCustom: boolean) => void
}

export interface ISelectInputProps extends ILabelProps {
  canCustom?: boolean
  isCustom?: boolean
  value?: string
  placeholder?: string
  isDoubleRow?: boolean
  options: ISelectOptions[]
}

export interface ISimpleInputProps extends ILabelProps {
  value?: string
  placeholder?: string
  isDoubleRow?: boolean
}

export interface ISwitchInputProps extends ILabelProps {
  canCustom?: boolean
  isCustom?: boolean
  switchValue?: boolean
  inputValue?: string
}
