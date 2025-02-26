import { Meta, StoryObj } from "@storybook/react";
import { NotifyProvider } from "../provider";
import { FC, PropsWithChildren, useState } from "react";
import { wrapperStyle } from "./styles.css";
import { useNotify } from "../useNotify";
import { Input } from "../../../components/Input";
import { Checkbox } from '../../../components/Checkbox'
import { Button } from '../../../components/Button'

const meta: Meta<typeof NotifyProvider> = {
  title: 'Plugins/Notify',
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof NotifyProvider>

const Root: FC<PropsWithChildren> = ({ children }) => (
  <NotifyProvider>
    {children}
  </NotifyProvider>
)

const Contents: FC = () => {
  const notify = useNotify()
  const [title, setTitle] = useState('Short descriptive message')
  const [text, setText] = useState('Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.')
  const [autohide, setAutohide] = useState(true)
  const [closable, setClosable] = useState(true)
  const [toasts, setToasts] = useState<string[]>([])
  const call = () => {
    const toastId = notify.push({
      position: 'topLeft',
      title,
      summary: text,
      autoHide: autohide,
      closable
    })
    const updatedToasts = [...toasts]
    updatedToasts.push(toastId)
    setToasts(updatedToasts)
  }
  const remove = () => {
    const lastToastId = toasts[toasts.length - 1]
    notify.remove(lastToastId)
    const updatedToasts = [...toasts]
    updatedToasts.splice(toasts.length - 1, 1)
    setToasts(updatedToasts)
  }
  return (
    <div className={wrapperStyle}>
      <Input value={title} onChange={setTitle} />
      <Input value={text} onChange={setText} />
      <Checkbox label={'autoHide'} value={autohide} onChange={setAutohide} />
      <Checkbox label={'closable'} value={closable} onChange={setClosable} />
      <Button onClick={call}>show toast</Button>
      <Button onClick={remove}>hide last toast</Button>
    </div>
  )
}

export const Default: Story = {
  render() {
    return <Root>
      <Contents />
    </Root>
  }
}