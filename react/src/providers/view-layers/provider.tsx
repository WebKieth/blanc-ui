import { createContext, FC, PropsWithChildren, useState } from "react";
import { ViewLayers, ViewLayersProvided } from "./types";
import cn from 'classnames'
import { v4 as uuidv4 } from 'uuid'
import { layerRootVariants, layerModalWrapper } from '@shared/plugins/view-layers/styles.css'

export const ViewLayersContext = createContext<ViewLayersProvided>({
  open: () => {},
  close: () => {}
})

export const ViewLayersProvider: FC<PropsWithChildren> = ({ children }) => {

  const [layers, setLayers] = useState<ViewLayers>({})
  const isContented = Boolean(Object.keys(layers).length)

  const remove = (id: string) => {
    if (!layers[id]) return
    const updatedLayers = {...layers}
    delete updatedLayers[id]
    setLayers(updatedLayers)
  }

  const close = (componentName: string) => {
    const layerIdsToRemove: string[] = []
    for (const id in layers) {
      const { Component } = layers[id]
      if (componentName === Component.name) layerIdsToRemove.push(id)
    }
    if (!layerIdsToRemove.length) {
      console.warn(`[Blanc UI View Layer] No layers with component named "${componentName}" found! Be sure you provide correct name to your layer component!`)
      return
    }
    layerIdsToRemove.forEach((id) => remove(id))
  }

  const open = (Component: FC, props?: unknown) => {
    const id = uuidv4()
    const updatedLayers = {
      ...layers,
      [id]: { Component, props }
    }
    setLayers(updatedLayers)
  }

  return <ViewLayersContext.Provider value={{
    open,
    close
  }}>
    {children}
    <div
      className={cn({
        [layerRootVariants.contented]: isContented
      })}
    >
      {Object.keys(layers).map((layerId, index) => {
        const { Component, props } = layers[layerId]
        const passedProps = props && typeof props === 'object'
          ? props
          : {}
        return <div
          key={layerId}
          className={layerModalWrapper}
          style={{zIndex: index}}
        >
          <Component
            //@ts-ignore
            onClose={() => close(Component.name)}
            {...passedProps}
          />
        </div>
      })}
    </div>
  </ViewLayersContext.Provider>
}