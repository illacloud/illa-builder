export interface Guide {
  currentStep: number
  isOpen: boolean
}

export const GuideInitialState: Guide = {
  currentStep: 6,
  isOpen: false,
}
