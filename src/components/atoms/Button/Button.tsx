import { MouseEvent } from 'react';

type RtButtonProps = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  text?: string;
  color?: string;
  customClasses?: string[] | string;
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: MouseEvent<HTMLElement>) => void
};

function RtButton({
  type, disabled = false, text, color, customClasses, onClick,
}: RtButtonProps) {
  const classes = ['btn', 'waves-effect', 'waves-light'];
  if (color && color.length > 0) {
    classes.push(color);
  }
  if (customClasses) {
    if (Array.isArray(customClasses)) {
      classes.push(...customClasses);
    } else {
      classes.push(customClasses);
    }
  }

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={classes.join(' ')}
      disabled={disabled}
      onClick={type !== 'submit' ? onClick : () => {}}
    >
      {text}
    </button>
  );
}

RtButton.defaultProps = {
  type: 'button',
  disabled: false,
  text: 'Send',
  color: '',
  customClasses: '',
  onClick: () => {},
};

export default RtButton;
