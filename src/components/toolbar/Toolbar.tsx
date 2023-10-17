import { Radio } from 'antd';
import { EditorContext } from '../../context';
import { useContext } from 'react';
const Toolbar = () => {
  const editor = useContext(EditorContext);
  const onChange = (e) => {
    switch (e.target.value as string) {
      case 'move':
        break;
      case 'rect':
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

  const getZoom = () => {
    return 1;
  };
  return (
    <div>
      <Radio.Group onChange={onChange} defaultValue='rect' buttonStyle='solid'>
        <Radio.Button value='move'>move</Radio.Button>
        <Radio.Button value='rect'>rect</Radio.Button>
        <Radio.Button value='zoomIn'>+</Radio.Button>
        <Radio.Button value='zoomIn' disabled>
          {`${getZoom() * 100}%`}
        </Radio.Button>
        <Radio.Button value='zoomOut'>-</Radio.Button>
        <Radio.Button value='zoomReset'>reset</Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default Toolbar;
