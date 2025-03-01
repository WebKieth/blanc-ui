import { definePropType } from "../../utils";
import { computed, defineVaporComponent, provide } from "vue";
import cn from 'classnames'
import { accordionStyle } from "./styles.css";
import { AccordionEmitters, AccordionProvided } from "./types";

const accordionProps = {
  style: {
    type: String,
    default: accordionStyle
  },
  opened: {
    type: definePropType<string | symbol>(String),
    default: ''
  }
}



const accordionEmitters: AccordionEmitters = {
  toggle: (key) => typeof key === 'string' || typeof key === 'symbol' || typeof key === 'undefined'
}

export const $accordionSymbol = Symbol('accordion')

export const Accordion = defineVaporComponent({
  name: 'Accordion',
  props: accordionProps,
  emits: accordionEmitters,
  setup(props, { slots, emit }) {
    const openedKey = computed(() => props.opened)
    provide<AccordionProvided>($accordionSymbol, { openedKey, emit })
    return (
      <div class={cn({[props.style]: props.style})}>
        {slots.default && slots.default()}
      </div>
    )
  }
})
