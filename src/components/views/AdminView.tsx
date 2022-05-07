import { AxiosResponse } from 'axios';
import DuplexForm from '../DuplexForm.js';
import EditForm from '../EditForm.js';
import {
  setRobots, getRobots, getRedirects, getFormTags, getAnnounceB2C, getAnnounceB2B,
  setRedirects, setFormTags, setAnnounce,
} from '../../api/index.js';
import {
  FieldType, TokenType, AnnounceData, SegmentType,
} from '../../types/index.js';
import { session } from '../../helpers/storage.js';

type PropsType = {
  // eslint-disable-next-line no-unused-vars
  onAuthenticate: (state: boolean, token?: TokenType) => void
};

type SubmitType = (value: string, token: TokenType) => Promise<AxiosResponse<any, any>>;
type SubmitAnnounceType =
  (data: AnnounceData, token: TokenType) => Promise<AxiosResponse<any, any>>;

type FormConfigType = {
  isDuplex?: boolean;
  segment?: SegmentType;
  type: FieldType;
  label: string;
  onSubmit: SubmitType | SubmitAnnounceType;
  getInitial: (token: TokenType) => any
};

export default function AdminView({ onAuthenticate }: PropsType) {
  const token: TokenType = session.get('user-token');

  const formConfigs: FormConfigType[] = [
    {
      type: 'robots',
      label: 'robots.txt',
      onSubmit: setRobots,
      getInitial: getRobots,
    },
    {
      type: 'redirects',
      label: 'redirects.txt',
      onSubmit: setRedirects,
      getInitial: getRedirects,
    },
    {
      type: 'form-tags',
      label: 'form-tags.txt',
      onSubmit: setFormTags,
      getInitial: getFormTags,
    },
    {
      isDuplex: true,
      segment: 'b2c',
      type: 'announce-b2c',
      label: 'Announce B2C',
      onSubmit: setAnnounce,
      getInitial: getAnnounceB2C,
    },
    {
      isDuplex: true,
      segment: 'b2b',
      type: 'announce-b2b',
      label: 'Announce B2B',
      onSubmit: setAnnounce,
      getInitial: getAnnounceB2B,
    },
  ];

  return (
    <div className="col s8">
      {
        formConfigs.map((form) => (
          form.isDuplex
            ? (
              <DuplexForm
                key={form.type}
                segment={form.segment}
                type={form.type}
                label={form.label}
                onSubmit={(data: AnnounceData) => form.onSubmit(data, token)}
                onAuthenticate={(state: boolean) => onAuthenticate(state)}
                getInitial={() => form.getInitial(token)}
              />
            ) : (
              <EditForm
                key={form.type}
                type={form.type}
                label={form.label}
                onSubmit={(type, value) => form.onSubmit(value, token)}
                onAuthenticate={(state) => onAuthenticate(state)}
                getInitial={() => form.getInitial(token)}
              />
            )
        ))
      }
    </div>
  );
}
