import { Button, Radio } from 'antd';
import { EditorContext } from '../../context';
import { useContext } from 'react';
import { ToolType } from '../../editor/type';
const Toolbar = () => {
  const editor = useContext(EditorContext);
  const onChange = (e) => {
    switch (e.target.value as string) {
      case 'move':
        editor?.toolManager.setActiveTool(ToolType.DragCanvas);
        break;
      case 'rect':
        editor?.toolManager.setActiveTool(ToolType.DrawRect);
        break;
      case 'ellipse':
        editor?.toolManager.setActiveTool(ToolType.DrawEllipse);
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

  const getZoom = () => {
    return 1;
  };
  return (
    <div>
      <Radio.Group onChange={onChange} defaultValue='rect' buttonStyle='solid'>
        <Radio.Button value='move'>move</Radio.Button>
        <Radio.Button value='rect'>rect</Radio.Button>
        <Radio.Button value='ellipse'>ellipse</Radio.Button>
      </Radio.Group>
      <Button.Group>
        <Button onClick={() => onClick('zoomIn')}>+</Button>
        <Button onClick={() => onClick('zoomSet')} disabled>
          {`${getZoom() * 100}%`}
        </Button>
        <Button onClick={() => onClick('zoomOut')}>-</Button>
        <Button onClick={() => onClick('zoomReset')}>reset</Button>
      </Button.Group>
    </div>
  );
};

export default Toolbar;
