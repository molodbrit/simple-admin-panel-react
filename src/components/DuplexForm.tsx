import { useState, useEffect } from 'react';
import RtInput from './atoms/Input/Input.js';
import RtTextarea from './atoms/Textarea/Textarea.js';
import RtButton from './atoms/Button/Button.js';
import { session } from '../helpers/storage.js';
import {
  TokenType, FieldType, AnnounceData, SegmentType,
} from '../types/index.js';

type PropsType = {
  type: FieldType;
  segment: SegmentType;
  label: string;
  onSubmit: (data: AnnounceData) => void;
  // eslint-disable-next-line no-unused-vars
  onAuthenticate: (state: boolean, token?: TokenType) => void;
  getInitial: (token: TokenType) => any;
};

export default function DuplexForm({
  type, segment, label, onSubmit, onAuthenticate, getInitial,
}: PropsType) {
  const [titleValue, setTitleValue] = useState('');
  const [textValue, setTextValue] = useState('');

  const [titleTouched, setTitleTouched] = useState(false);
  const [textTouched, setTextTouched] = useState(false);

  async function initState() {
    try {
      const token: TokenType = session.get('user-token');
      if (!token) throw new Error();

      const { data } = await getInitial(token);
      if (data?.status === 'ok') {
        setTitleValue(data.title);
        setTextValue(data.text);
      }
    } catch (err) {
      onAuthenticate(false);
    }
  }

  async function submitForm() {
    if (titleTouched) {
      await onSubmit({
        segment,
        entity: 'title',
        text: titleValue,
      });
      setTitleTouched(false);
    }
    if (textTouched) {
      await onSubmit({
        segment,
        entity: 'text',
        text: textValue,
      });
      setTextTouched(false);
    }
  }

  function changeTitleValue(value: string) {
    setTitleValue(value);
    setTitleTouched(true);
  }
  function changeTextValue(value: string) {
    setTitleValue(value);
    setTextTouched(true);
  }

  useEffect(() => {
    initState();
  }, []);

  return (
    <article className="card pv-1 ph-1">
      <h4>{ label }</h4>
      <form>
        <RtInput
          id={type}
          value={titleValue}
          label="Edit title"
          onChange={(e) => changeTitleValue(e.target.value)}
        />
        <RtTextarea
          value={textValue}
          label="Edit text"
          onChange={(e) => changeTextValue(e.target.value)}
        />

        <RtButton
          text="Submit"
          customClasses="mt-1"
          onClick={() => submitForm()}
        />
      </form>
    </article>
  );
}
