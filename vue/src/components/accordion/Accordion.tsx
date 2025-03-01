import { definePropType } from "../../utils";
import { computed, ComputedRef, defineComponent, ExtractPublicPropTypes, provide } from "vue";
import cn from 'classnames'
import { accordionStyle } from "@shared/components/accordion";

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

export type AccordionProps = ExtractPublicPropTypes<typeof accordionProps>

export type AccordionEmitters = {
  toggle: (key?: string | symbol) => void
}

export type AccordionProvided = {
  openedKey: ComputedRef<string | symbol>
  emit: (event: "toggle", key?: string | symbol) => void
}

const accordionEmitters: AccordionEmitters = {
  toggle: (key) => typeof key === 'string' || typeof key === 'symbol' || typeof key === 'undefined'
}

export const $accordionSymbol = Symbol('accordion')

export const Accordion = defineComponent({
  name: 'Accordion',
  props: accordionProps,
  emits: accordionEmitters,
  setup(props, { slots, emit }) {
    const openedKey = computed(() => props.opened)
    provide<AccordionProvided>($accordionSymbol, { openedKey, emit })
    return () => (
      <div class={cn({[props.style]: props.style})}>
        {slots.default && slots.default()}
      </div>
    )
  }
})