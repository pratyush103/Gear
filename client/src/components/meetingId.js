import React from 'react'

import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  12,
);

export function meetingId() {
  return nanoid();
}


export default meetingId