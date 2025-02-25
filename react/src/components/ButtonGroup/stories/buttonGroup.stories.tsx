import { Meta, StoryObj } from '@storybook/react'
import { ButtonGroup } from '../ButtonGroup'
import { Button } from '../../Button'
import { useState } from 'react'

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
  title: 'Components/ButtonGroup',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: {
        type: 'text'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <ButtonGroup value={args.value}>
      <Button>one</Button>
      <Button>two</Button>
      <Button>three</Button>
    </ButtonGroup>
  )
}

export const RadioChoosen: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState('one')
    return <ButtonGroup
      value={selectedKey}
      onChange={(value) => setSelectedKey(value as string)}
    >
      <Button groupKey={'one'}>one</Button>
      <Button groupKey={'two'}>two</Button>
      <Button groupKey={'three'}>three</Button>
    </ButtonGroup>
  }
}