import { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "../Accordion";
import { useState } from "react";
import { Spoiler } from "../../Spoiler";

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    opened: {
      control: {
        type: 'select',
      },
      options: ['first', 'second', 'third'],
      default: '',
    },
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: (args) => {
    const [openedKey, setOpenedKey] = useState<string | symbol | undefined>(args.opened)
    return <Accordion
      opened={openedKey}
      onToggle={setOpenedKey}
    >
      <Spoiler
        title={'First title'}
        groupKey={'first'}
      >
        <p>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Apurus est convallis arcu sodales sem ullamcorper risus. Aenean sagittis risus blandit luctus mattis massa efficitur tortor. Rutrum class nulla taciti amet aliquet proin sem. Leo finibus parturient accumsan semper torquent adipiscing est natoque. Netus nisl tortor enim volutpat ut congue. Dictumst per malesuada primis curabitur elementum urna. Tellus per urna parturient at sociosqu ut rhoncus. Ad facilisi senectus primis nullam ultricies donec suspendisse penatibus.
        </p>
        <p>
          Urna nisl molestie duis; potenti montes leo massa. Nulla consequat non quam penatibus dictum ad tempus. Donec laoreet taciti pretium aptent aliquet adipiscing mauris venenatis consequat. Magnis magnis euismod arcu aptent egestas consequat. Parturient proin lacinia ligula fermentum felis? Aliquet mus ac rutrum luctus eget imperdiet, quam semper. Tempor rutrum eros maximus facilisis erat posuere. Justo vulputate dapibus lectus non id felis ante. Justo lobortis penatibus pretium sapien consectetur adipiscing potenti. Asodales maximus hac ultrices purus eget aliquam luctus mauris.
        </p>
      </Spoiler>
      <Spoiler
        title={'Second title'}
        groupKey={'second'}
      >
        <p>
        Vulputate auctor sodales ornare urna dui ultrices. Magna risus praesent in cursus mollis vitae felis. Conubia aenean nunc velit parturient; dignissim ut. Ligula iaculis efficitur lacinia commodo ut. Massa interdum vitae orci laoreet lacus eget cras. Eleifend vitae euismod laoreet lorem luctus sit porttitor tempor. Consectetur purus sagittis malesuada magnis laoreet facilisi maximus.
        </p>
        <p>
          Cursus tristique mi tempor ante primis habitasse eleifend dictum. Habitasse suspendisse tempor magnis, mi dapibus pharetra montes proin. Tellus magna dictumst vivamus primis tellus himenaeos dignissim molestie. Dapibus lacinia porta felis, vel tristique habitant. Pretium conubia suspendisse vestibulum cubilia inceptos fermentum feugiat cubilia. Senectus velit pulvinar aenean feugiat aptent. Dis pellentesque augue class sollicitudin lacinia laoreet diam. Vehicula pretium ad augue viverra potenti semper.
        </p>
      </Spoiler>
      <Spoiler
        title={'Third title'}
        groupKey={'third'}
      >
        <p>
          Id erat vel porttitor donec magnis. Sagittis dapibus parturient mattis porttitor neque proin. Magna morbi finibus potenti ridiculus nulla. Faucibus sit venenatis orci, eu dolor eget ut. Arcu vitae ornare leo senectus integer convallis. Netus conubia sem purus libero ultricies elit pretium dapibus ultricies. Primis accumsan ut purus amet maecenas faucibus ligula rutrum placerat. Maecenas luctus in ligula efficitur a lobortis gravida lectus nec.
        </p>
        <p>
          Non natoque ultrices donec dui semper risus sodales libero. Pulvinar integer gravida bibendum risus molestie facilisis posuere. Inceptos inceptos penatibus scelerisque eget nostra magna magnis. Himenaeos eu porttitor leo et curae quam nostra. Elit ridiculus posuere risus ornare; ex curae. Fames luctus ac imperdiet luctus nulla venenatis litora lectus.
        </p>
      </Spoiler>
    </Accordion>
  }
}