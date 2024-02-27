import studio from '@theatre/studio';
import type { ISheet } from '@theatre/core';
import Application from '../Application';
import RemoteTheatre from './RemoteTheatre';
import type { BroadcastData } from '../types';

// Remote Controller

// Receives App events
export function theatreApp(app: Application, remote: RemoteTheatre, msg: BroadcastData) {
  let value: any = undefined;
  switch (msg.event) {
    case 'setSheet':
      value = remote.sheets.get(msg.data.sheet);
      if (value !== undefined) {
        remote.activeSheet = value as ISheet;
        studio.setSelection([value]);
      }
      break;
    case 'setSheetObject':
      value = remote.sheetObjects.get(`${msg.data.sheet}_${msg.data.key}`);
      if (value !== undefined) {
        studio.setSelection([value]);
      }
      break;
    case 'updateSheetObject':
      value = remote.sheets.get(msg.data.sheet); // pause current animation
      if (value !== undefined) value.sequence.pause();
      value = remote.sheetObjectCBs.get(msg.data.sheetObject);
      if (value !== undefined) value(msg.data.values);
      break;
    case 'updateTimeline':
      value = remote.sheets.get(msg.data.sheet);
      if (remote.activeSheet !== undefined) {
        remote.activeSheet.sequence.position = msg.data.position;
      }
      break;
  }
}

// Receives Editor events
export function theatreEditor(app: Application, remote: RemoteTheatre, msg: BroadcastData) {
  if (app.editor) {
    switch (msg.event) {
      case 'playSheet':
        remote.sheet(msg.data.sheet)?.sequence.play(msg.data.value);
        break;
      case 'pauseSheet':
        remote.sheet(msg.data.sheet)?.sequence.pause();
        break;
    }
  }
}