import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import { EditorContext } from './context';
import Editor from './editor/editor';
import Toolbar from './components/toolbar/Toolbar';

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [editor, setEditor] = useState<Editor | null>(null);
  useEffect(() => {
    if (containerRef && containerRef.current) {
      const _editor = new Editor({
        container: containerRef.current,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).editor = _editor;
      const changeViewport = _.throttle(() => {}, 150, { leading: false });
      window.addEventListener('resize', changeViewport);
      setEditor(_editor);
    }
  }, [containerRef]);
  return (
    <div id='container'>
      <EditorContext.Provider value={editor}>
        <div className='header'>
          <Toolbar />
        </div>
        <div className='body'>
          <div className='body-left'></div>
          <div className='body-center' ref={containerRef}></div>
          <div className='body-right'></div>
        </div>
      </EditorContext.Provider>
    </div>
  );
}

export default App;
