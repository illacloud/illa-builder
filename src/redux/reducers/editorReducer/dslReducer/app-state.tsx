import { DslState } from "./dsl-state"
import { MenuState } from "./menu-state"

export interface AppState {
  dslState: DslState
  menuState: MenuState
}
