import MDEditor from '@uiw/react-md-editor';
import './text-editor.css';

import { useState, useEffect, useRef } from 'react';

const TextEditor: React.FC = () => {
  const previewRef = useRef<HTMLDivElement | null>(null);

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('# Header');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log(event.target);
      // guard clause
      if (!previewRef.current || !event.target) return;
      // if not typed as Node event.target will get an error thrown
      if (!previewRef.current.contains(event.target as Node)) setEditing(false);
    };
    document.addEventListener('click', handleClickOutside, { capture: true });
    return () => {
      document.removeEventListener('click', handleClickOutside, {
        capture: true,
      });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={previewRef}>
        <MDEditor value={value} onChange={(newValue) => setValue(newValue || '')} />
      </div>
    );
  }

  return (
    <div className="text-editor" onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={value} />
    </div>
  );
};

export default TextEditor;
