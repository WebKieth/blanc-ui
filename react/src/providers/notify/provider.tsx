import { createContext, FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import cn from 'classnames'
import { v4 as uuidv4 } from 'uuid'
import { notificatorStyles, notificatorVariants } from '@shared/plugins/notify/styles.css'
import { NotifyPosition } from "@shared/plugins/notify/types";
import { NotifyOptions, NotifyProvided, Toasts, ToastTimeouts } from "./types";
import { Toast } from "../../components/Toast";

export const NotifyContext = createContext<NotifyProvided>({
  push: () => '',
  remove: () => {}
})

export const NotifyProvider: FC<PropsWithChildren> = ({ children }) => {
  const [toasts, setToasts] = useState<Toasts>({})

  const remove = (id: string) => {
    const updatedToasts = {...toasts}
    delete updatedToasts[id]
    setToasts(updatedToasts)
  }
  const push = (
    options: NotifyOptions = {
      title: '',
      summary: '',
      position: 'bottom',
      renderer: null,
    }
  ) => {
    const autoHide = options.autoHide === undefined
      ? true
      : options.autoHide
    const closable = options.closable === undefined
      ? true
      : options.closable
    const position = options.position || 'topLeft'
    const id = uuidv4()
    const Component = options.renderer?.component || Toast
    const props = options.renderer?.props || {
      title: options.title,
      message: options.summary,
      onClose: closable
        ? () => remove(id)
        : undefined
    }
    const updatedToasts = {
      [id]: { Component, props, position, autoHide },
      ...toasts,
    }
    setToasts(updatedToasts)
    return id
  }

  const timeouts = useRef<ToastTimeouts>({})
  const toastsRef = useRef<Toasts>({})

  const removeByAutohide = (id: string) => {
    const updatedToasts = {...toastsRef.current}
    delete updatedToasts[id]
    delete toastsRef.current[id]
    setToasts(updatedToasts)
    clearTimeout(timeouts.current[id])
    delete timeouts.current[id]
  }

  useEffect(() => {
    let ts: ToastTimeouts = {}
    Object.keys(toasts).forEach((id) => {
      if (timeouts.current[id]) return
      const t = setTimeout(() => {
        removeByAutohide(id)
      }, 5000)
      ts[id] = t
    })
    timeouts.current = ts
    toastsRef.current = toasts
  }, [toasts])



  return <NotifyContext.Provider value={{
    push, remove
  }}>
    {children}
    {Object.keys(notificatorVariants).map((posKey) => (
      <div
        key={posKey}
        className={cn(
          {
            [notificatorStyles]: notificatorStyles
          },
          notificatorVariants[posKey as NotifyPosition]
        )}
      >
        {Object.keys(toasts).map((id) => {
          const toast = toasts[id]
          const { Component, position, props } = toast
          const passedProps = props && typeof props === 'object'
            ? props
            : {}
          if (position !== posKey as NotifyPosition) {
            return null
          }
          return <Component
            key={id}
            {...passedProps}
          />
        })}
      </div>
    ))}
  </NotifyContext.Provider>
}