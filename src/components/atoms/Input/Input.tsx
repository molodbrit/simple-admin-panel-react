import { ChangeEvent } from 'react';

type InputProps = {
  value: string;
  id: string;
  name?: string;
  type?: string;
  hasError?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  label?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function RtInput({
  value,
  id,
  name,
  type,
  label,
  hasError,
  errorMessage = '',
  disabled,
  onChange,
}: InputProps) {
  /* classes */
  const inputTagClassname = ['rt-font', 'rt-input__tag'];
  const inputLabelClassname = ['rt-input__label', 'rt-font'];
  if (value.length > 0) {
    inputLabelClassname.push('rt-input__label--small');
    if (hasError) {
      inputLabelClassname.push('rt-input__label--error');
    }
  }
  const inputClassname = ['rt-input'];
  if (hasError) {
    inputClassname.push('rt-input--error');
  }
  if (disabled) {
    inputClassname.push('rt-input--disabled');
  }

  /* elements */
  const ErrorMessage = errorMessage.length > 0 && hasError
    ? <p className="rt-input__error rt-font-label">{errorMessage}</p>
    : null;

  return (
    <div className={inputClassname.join()}>
      <input
        id={id}
        value={value}
        name={name}
        type={type}
        disabled={disabled}
        className={inputTagClassname.join()}
        onChange={onChange}
      />
      <label htmlFor={id} className={inputLabelClassname.join()}>{label}</label>
      <div className="rt-input__line" />
      <div className="rt-input-footer">
        {ErrorMessage}
      </div>
    </div>
  );
}

RtInput.defaultProps = {
  name: 'custom-field',
  type: 'text',
  hasError: false,
  errorMessage: 'Invalid data',
  disabled: false,
  label: 'Field',
};

export default RtInput;
