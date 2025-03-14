import { App as Application } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { mount } from '../../utils/mount'
import { layerRootVariants, layerModalWrapper } from '@shared/plugins/view-layers/styles.css'
import { LayerView } from './types'

export const $viewLayers = Symbol('view-layers')

export class ViewLayers {
  app: Application
  root: HTMLDivElement
  layers: Record<string, LayerView>
  constructor(app: Application) {
    this.root = document.createElement('div')
    document.body.appendChild(this.root)
    this.app = app
    this.layers = new Proxy<Record<string, LayerView>>({}, {
      set: (target, prop: string, value) => {
        target[prop] = value
        this.root.classList.add(`${layerRootVariants.contented}`)
        return true
      },
      deleteProperty: (target, prop: string) => {
        if (prop in target) {
          delete target[prop];
          if (!Object.keys(target).length) {
            this.root.classList.remove(`${layerRootVariants.contented}`)
          }
        }
        return true
      }
    })
  }
  public open(Component: unknown, props?: Object) {
    const wrapper = document.createElement('div')
    wrapper.classList.add(layerModalWrapper)
    this.root.append(wrapper)
    const id = uuidv4()
    // @ts-expect-error
    this.layers[id] = mount(Component, {
      props: {
        ...props,
        onClose: this.remove.bind(this, id)
      },
      element: wrapper,
      app: this.app,
    })
    wrapper.style.zIndex = `${Object.keys(this.layers).length}`
  }
  public close(componentName: string) {
    const layerIdsToRemove: string[] = []
    for (const id in this.layers) {
      const { vNode } = this.layers[id]
      if (!vNode.component?.type.name) continue
      if (componentName === vNode.component.type.name) layerIdsToRemove.push(id)
    }
    if (!layerIdsToRemove.length) {
      console.warn(`[Blanc UI View Layer] No layers with component named "${componentName}" found! Be sure you provide correct name to your layer component!`)
      return
    }
    layerIdsToRemove.forEach((id) => this.remove(id))
  }
  private remove(id: string) {
    if (!this.layers[id]) return
    const { destroy, el } = this.layers[id]
    destroy()
    this.root.removeChild(el)
    delete this.layers[id]
  }
}