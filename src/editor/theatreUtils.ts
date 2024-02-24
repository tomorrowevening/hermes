import type { ISheet } from '@theatre/core';
import Application from '../core/Application';
import RemoteTheatre from '../core/remote/RemoteTheatre';
import type { EditorEvent }  from '../core/types';

export function theatreEditorApp(app: Application, theatre: RemoteTheatre, studio: any) {
  if (app.editor) {
    studio.ui.restore();
    studio.onSelectionChange((value: any[]) => {
      if (value.length < 1) return;

      value.forEach((obj: any) => {
        let id = obj.address.sheetId;
        let type: EditorEvent = 'setSheet';
        let data = {};
        switch (obj.type) {
          case 'Theatre_Sheet_PublicAPI':
            type = 'setSheet';
            data = {
              sheet: obj.address.sheetId,
            };
            theatre.activeSheet = theatre.sheets.get(obj.address.sheetId);
            break;

          case 'Theatre_SheetObject_PublicAPI':
            type = 'setSheetObject';
            id += `_${obj.address.objectKey}`;
            data = {
              id: id,
              sheet: obj.address.sheetId,
              key: obj.address.objectKey,
            };
            theatre.activeSheet = theatre.sheets.get(obj.address.sheetId);
            break;
        }
        app.send({ event: type, target: 'app', data: data });
      });
    });

    // Timeline
    let position = -1;
    const onRafUpdate = () => {
      RemoteTheatre.rafDriver?.tick(performance.now());

      if (
        theatre.activeSheet !== undefined &&
        position !== theatre.activeSheet.sequence.position
      ) {
        position = theatre.activeSheet.sequence.position;
        const t = theatre.activeSheet as ISheet;
        app.send({
          event: 'updateTimeline',
          target: 'app',
          data: {
            position: position,
            sheet: t.address.sheetId,
          },
        });
      }
    };
    const onRaf = () => {
      onRafUpdate();
      requestAnimationFrame(onRaf);
    };
    onRafUpdate(); // Initial position
    onRaf();
  } else {
    studio.ui.hide();
  }
}
