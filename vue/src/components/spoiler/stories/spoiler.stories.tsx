import { Meta, StoryObj } from "@storybook/vue3";
import { Spoiler } from "../Spoiler";
import { ref } from "vue";

const meta: Meta<typeof Spoiler> = {
  title: 'Components/Spoiler',
  component: Spoiler,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large'],
      default: 'medium',
    },
    title: {
      control: {
        type: 'text'
      },
    },
    disabled: {
      control: {
        type: 'boolean'
      },
      default: false
    },
  },
  args: {
    title: 'Default spoiler title',
    size: 'medium',
    disabled: false
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: (args) => ({
    components: { Spoiler },
    setup() {
      const opened = ref<boolean>(false)
      const toggle = (value: boolean) => opened.value = value

      return () => <Spoiler
        title={args.title}
        size={args.size}
        disabled={args.disabled}
        opened={opened.value}
        onToggle={toggle}
      >
        <p>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Apurus est convallis arcu sodales sem ullamcorper risus. Aenean sagittis risus blandit luctus mattis massa efficitur tortor. Rutrum class nulla taciti amet aliquet proin sem. Leo finibus parturient accumsan semper torquent adipiscing est natoque. Netus nisl tortor enim volutpat ut congue. Dictumst per malesuada primis curabitur elementum urna. Tellus per urna parturient at sociosqu ut rhoncus. Ad facilisi senectus primis nullam ultricies donec suspendisse penatibus.
        </p>
        <p>
          Urna nisl molestie duis; potenti montes leo massa. Nulla consequat non quam penatibus dictum ad tempus. Donec laoreet taciti pretium aptent aliquet adipiscing mauris venenatis consequat. Magnis magnis euismod arcu aptent egestas consequat. Parturient proin lacinia ligula fermentum felis? Aliquet mus ac rutrum luctus eget imperdiet, quam semper. Tempor rutrum eros maximus facilisis erat posuere. Justo vulputate dapibus lectus non id felis ante. Justo lobortis penatibus pretium sapien consectetur adipiscing potenti. Asodales maximus hac ultrices purus eget aliquam luctus mauris.
        </p>
      </Spoiler>
    }
  })
}