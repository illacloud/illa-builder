export interface Guide {
  currentStep: number
  isOpen: boolean
}

export const GuideInitialState: Guide = {
  currentStep: 9,
  isOpen: false,
}
