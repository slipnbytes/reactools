import { forwardRef, Ref, HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLButtonElement>;

const ForwardButton = (
  props: Props,
  ref: Ref<HTMLButtonElement>,
): JSX.Element => (
  <button type="button" ref={ref} {...props}>
    Button
  </button>
);

export const Button = forwardRef(ForwardButton);
