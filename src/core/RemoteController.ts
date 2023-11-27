// Libs
import type { ISheet } from '@theatre/core';
import studio from '@theatre/studio';
// Core
import Application from './Application';
import { ToolEvents, debugDispatcher } from '@/editor/global';
import type { BroadcastData, EditorEvent } from './types';

export default function RemoteController(app: Application) {
  let activeSheet: ISheet | undefined = undefined;
  const mode = app.editor ? 'editor' : 'app';

  // Handlers

  function handleAppBroadcast(msg: BroadcastData) {
    let value = undefined;

    switch (msg.event) {
      case 'custom':
        debugDispatcher.dispatchEvent({ type: ToolEvents.CUSTOM, value: msg.data });
        break;

      // Components
      case 'selectComponent':
        debugDispatcher.dispatchEvent({ type: ToolEvents.SELECT_DROPDOWN, value: msg.data });
        break;
      case 'draggableListUpdate':
        debugDispatcher.dispatchEvent({ type: ToolEvents.DRAG_UPDATE, value: msg.data });
        break;

      // GUI
      case 'addFolder':
        app.components.get('debug')?.addFolder(msg.data.name, msg.data.params, msg.data.parent);
        break;
      case 'bindObject':
        app.components.get('debug')?.bind(msg.data.name, msg.data.params, msg.data.parent);
        break;
      case 'updateBind':
        app.components.get('debug')?.triggerBind(msg.data.id, msg.data.value);
        break;
      case 'addButton':
        app.components.get('debug')?.button(msg.data.name, msg.data.callback, msg.data.parent);
        break;
      case 'clickButton':
        app.components.get('debug')?.triggerButton(msg.data.id);
        break;

      // Theatre
      case 'setSheet':
        value = app.components.get('theatre')?.sheets.get(msg.data.sheet);
        if (value !== undefined) {
          activeSheet = value;
          studio.setSelection([value]);
        }
        break;
      case 'setSheetObject':
        value = app.components.get('theatre')?.sheetObjects.get(`${msg.data.sheet}_${msg.data.key}`);
        if (value !== undefined) {
          studio.setSelection([value]);
        }
        break;
      case 'updateSheetObject':
        value = app.components.get('theatre')?.sheetObjectCBs.get(msg.data.sheetObject);
        if (value !== undefined) value(msg.data.values);
        break;
      case 'updateTimeline':
        activeSheet = app.components.get('theatre')?.sheets.get(msg.data.sheet);
        if (activeSheet !== undefined) {
          activeSheet.sequence.position = msg.data.position;
        }
        break;

      // Three
      case 'getScene':
        debugDispatcher.dispatchEvent({ type: ToolEvents.GET_SCENE });
        break;
      case 'getObject':
        debugDispatcher.dispatchEvent({ type: ToolEvents.GET_OBJECT, value: msg.data });
        break;
      case 'updateObject':
        debugDispatcher.dispatchEvent({ type: ToolEvents.UPDATE_OBJECT, value: msg.data });
        break;
    }
  }

  function handleEditorBroadcast(msg: BroadcastData) {
    switch (msg.event) {
      case 'custom':
        debugDispatcher.dispatchEvent({ type: ToolEvents.CUSTOM, value: msg.data });
        break;

      // Three
      case 'setObject':
        debugDispatcher.dispatchEvent({ type: ToolEvents.SET_OBJECT, value: msg.data });
        break;
      case 'setScene':
        debugDispatcher.dispatchEvent({ type: ToolEvents.SET_SCENE, value: msg.data });
        break;
    }
  }

  // App type

  function AppControl() {
    studio.ui.hide();
  }

  function EditorControl() {
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
            activeSheet = app.components.get('theatre')?.sheets.get(obj.address.sheetId);
            break;
  
          case 'Theatre_SheetObject_PublicAPI':
            type = 'setSheetObject';
            id += `_${obj.address.objectKey}`;
            data = {
              id: id,
              sheet: obj.address.sheetId,
              key: obj.address.objectKey,
            };
            break;
        }
        app.send({ event: type, target: 'app', data: data });
      });
    });
  
    // Timeline
    let position = 0;
    const onRafUpdate = () => {
      if (
        activeSheet !== undefined &&
        position !== activeSheet.sequence.position
      ) {
        position = activeSheet.sequence.position;
        const t = activeSheet as ISheet;
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
  }

  // Begin app

  app.listen((msg: BroadcastData) => {
    if (mode === 'app') {
      handleAppBroadcast(msg);
    } else {
      handleEditorBroadcast(msg);
    }
  });

  app.editor ? EditorControl() : AppControl();
}
