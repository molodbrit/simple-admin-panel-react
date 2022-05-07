export type ProgressBarApi = {
  start: () => void,
  finish: () => void
};

export type FieldType = 'robots' | 'redirects' | 'form-tags' | 'announce-b2c' | 'announce-b2b';

export type TokenType = string | null;

export type AnnounceData = {
  segment: string;
  entity: string;
  text: string;
};

export type SegmentType = 'b2c' | 'b2b';
