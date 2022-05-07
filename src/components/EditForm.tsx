import { useState, ChangeEvent, useEffect } from 'react';
import RtTextarea from './atoms/Textarea/Textarea.js';
import RtButton from './atoms/Button/Button.js';
import { session } from '../helpers/storage.js';
import { TokenType, FieldType } from '../types/index.js';

type PropsType = {
  type: FieldType;
  label: string;
  onSubmit: (type: FieldType, value: string) => void;
  // eslint-disable-next-line no-unused-vars
  onAuthenticate: (state: boolean, token?: TokenType) => void;
  getInitial: (token: TokenType) => any;
};

export default function EditForm({
  type, label, onSubmit, onAuthenticate, getInitial,
}: PropsType) {
  const [value, setValue] = useState('');

  function changeFieldHandler(e: ChangeEvent<HTMLTextAreaElement>): void {
    setValue(e.target.value);
  }

  async function initState() {
    try {
      const token: TokenType = session.get('user-token');
      if (!token) throw new Error();

      const response = await getInitial(token);
      if (response?.data?.text) setValue(response.data.text);
    } catch (err) {
      onAuthenticate(false);
    }
  }

  useEffect(() => {
    initState();
  }, []);

  return (
    <article className="card pv-1 ph-1">
      <h4>{ label }</h4>
      <form>
        <RtTextarea
          value={value}
          label={`Edit ${label}`}
          onChange={(e) => changeFieldHandler(e)}
        />

        <RtButton
          text="Submit"
          customClasses="mt-1"
          onClick={() => onSubmit(type, value)}
        />
      </form>
    </article>
  );
}
