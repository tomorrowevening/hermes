import type { ISheet } from '@theatre/core';
import { Application } from '../core/Application';
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

// Call this after the Theatre's studio has inited (onload is good)
export async function customizeTheatreElements() {
  // Wait until it's loaded
  while (!document.getElementById('theatrejs-studio-root')) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  // Should exist
  const root = document.getElementById('theatrejs-studio-root');
  if (root === null) return;
  
  if (root.shadowRoot === null) return;
  
  const pointerRoot = root.shadowRoot.getElementById('pointer-root');
  if (pointerRoot === null) return;
  
  const theatreEl = pointerRoot.children[0];
  if (theatreEl === null) return;

  const headerEl = theatreEl.children[1] as HTMLDivElement;
  headerEl.style.justifyContent = 'left';

  try {
    const rightBtns = headerEl.children[1] as HTMLDivElement;
    rightBtns.style.transform = 'translateX(10px)';
    while (rightBtns.children.length > 1) {
      rightBtns.removeChild(rightBtns.children[0]);
    }
  } catch (_) {
    //
  }

  try {
    const exportEl = theatreEl.children[3] as HTMLDivElement;
    exportEl.style.top = '0';
    exportEl.style.right = '300px';
  } catch (_) {
    //
  }
}
