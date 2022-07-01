export interface DependenciesState {
  [key: string]: string[]
}

export type DependencyMap = DependenciesState

export interface SetDependenciesActionPayload {
  dependencies: DependencyMap
}

export const dependenciesInitialState: DependenciesState = {}
