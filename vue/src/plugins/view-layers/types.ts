import { VNode } from "vue"

export type LayerView = {
  el: HTMLDivElement
  vNode: VNode
  destroy: () => void
}