import { Button, Radio } from 'antd';
import { EditorContext } from '../../context';
import { useContext, useEffect, useState } from 'react';
import { EToolType } from '../../editor/type';
const Toolbar = () => {
  const editor = useContext(EditorContext);
  const [zoom, setZoom] = useState<number>(1);
  useEffect(() => {
    editor &&
      editor.zoomManager.on('zoomChange', (zoom, prevZoom) => {
        setZoom(zoom);
      });
  }, [editor]);
  const onChange = (e) => {
    switch (e.target.value as string) {
      case 'move':
        editor?.toolManager.setActiveTool(EToolType.DragCanvas);
        break;
      case 'select':
        editor?.toolManager.setActiveTool(EToolType.Select);
        break;
      case 'rect':
        editor?.toolManager.setActiveTool(EToolType.DrawRect);
        break;
      case 'ellipse':
        editor?.toolManager.setActiveTool(EToolType.DrawEllipse);
        break;
      case 'zoomIn':
        editor?.zoomIn();
        break;
      case 'zoomOut':
        editor?.zoomOut();
        break;
      case 'zoomReset':
        editor?.zoomReset();
        break;
    }
  };

  const onClick = (type: string) => {
    switch (type as string) {
      case 'zoomIn':
        editor?.zoomIn();
        break;
      case 'zoomOut':
        editor?.zoomOut();
        break;
      case 'zoomReset':
        editor?.zoomReset();
        break;
    }
  };
  return (
    <div>
      <Radio.Group onChange={onChange} defaultValue='rect' buttonStyle='solid'>
        <Radio.Button value='move'>move</Radio.Button>
        <Radio.Button value='select'>select</Radio.Button>
        <Radio.Button value='rect'>rect</Radio.Button>
        <Radio.Button value='ellipse'>ellipse</Radio.Button>
      </Radio.Group>
      <Button.Group>
        <Button onClick={() => onClick('zoomIn')}>+</Button>
        <Button onClick={() => onClick('zoomSet')} disabled>
          {`${Math.floor(zoom * 100)}%`}
        </Button>
        <Button onClick={() => onClick('zoomOut')}>-</Button>
        <Button onClick={() => onClick('zoomReset')}>reset</Button>
      </Button.Group>
    </div>
  );
};

export default Toolbar;
