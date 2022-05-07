import { ChangeEvent } from 'react';
import './Textarea.css';

interface TextareaProps {
  value: string;
  hasError?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  label?: string;
  customClasses?: string | string[];
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

function RtTextarea({
  value, label, hasError, errorMessage, disabled, customClasses, onChange,
}: TextareaProps) {
  /* classes */
  const textareaTagClassname = ['materialize-textarea', 'custom-textarea'];
  if (customClasses) {
    if (Array.isArray(customClasses)) {
      textareaTagClassname.push(...customClasses);
    } else {
      textareaTagClassname.push(customClasses);
    }
  }
  const textareaLabelClassname = ['rt-textarea__label', 'rt-font'];
  if (value.length > 0) {
    textareaLabelClassname.push('rt-textarea__label--small');
    if (hasError) {
      textareaLabelClassname.push('rt-textarea__label--error');
    }
  }
  const textareaClassname = ['input-field'];
  if (hasError) {
    textareaClassname.push('rt-textarea--error');
  }
  if (disabled) {
    textareaClassname.push('rt-textarea--disabled');
  }

  /* elements */
  const ErrorMessage = errorMessage && errorMessage.length > 0 && hasError
    ? <p className="rt-textarea__error rt-font-label">{errorMessage}</p>
    : null;

  return (
    <div className={textareaClassname.join(' ')}>
      <textarea
        value={value}
        disabled={disabled}
        className={textareaTagClassname.join(' ')}
        onChange={onChange}
        style={{ height: '10rem' }}
      />
      <p className={textareaLabelClassname.join(' ')}>{label}</p>
      <div className="rt-textarea__line" />
      <div className="rt-textarea-footer">
        {ErrorMessage}
      </div>
    </div>
  );
}

RtTextarea.defaultProps = {
  hasError: false,
  errorMessage: 'Invalid data',
  disabled: false,
  label: 'Textarea Field',
  customClasses: '',
};

export default RtTextarea;
