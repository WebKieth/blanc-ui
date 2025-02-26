import { Meta, StoryObj } from "@storybook/react";
import { ViewLayersContext, ViewLayersProvider } from "../provider";
import { FC, PropsWithChildren, useContext } from "react";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";

const meta: Meta<typeof ViewLayersProvider> = {
  title: 'Plugins/ViewLayers',
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ViewLayersProvider>

type WarningModalProps = {
  title?: string
  content?: string
  onClose?: () => void
}

const WarningModal: FC<WarningModalProps> = ({
  title = '',
  content = '',
  onClose
}) => (
  <Modal title={title} content={content} onClose={onClose} />
)

const Root: FC<PropsWithChildren> = ({children}) => (
  <ViewLayersProvider>
    {children}
  </ViewLayersProvider>
)

const Contents: FC = () => {
  const { open } = useContext(ViewLayersContext)
  const openWarning = () => {
    open(WarningModal, {
      title: 'Warning title',
      content: 'Warning content'
    })
  }
  return <div style={{width: '100%', height: '100vh'}}>
    <Button onClick={openWarning}>open</Button>
  </div>
}

export const Default: Story = {
  render() {
    return <Root>
      <Contents />
    </Root>
  }
}