import { defineComponent } from 'vue'

export const iconComponentProps = {
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  stroke: {
    type: Number,
    required: true,
  },
}

export default defineComponent({
  props: iconComponentProps,
  setup(props) {
    return () => (
      <svg
        id="ri-checkbox-line"
        fill="currentColor"
        viewBox="0 0 24 24"
        width={props.width}
        height={props.height}
      >
        <g>
          <path fill="none"
            d="M0 0h24v24H0z"
          ></path>
          <path
            d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"
          ></path>
        </g>
      </svg>
    )
  },
})
