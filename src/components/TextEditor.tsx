import { useState, useEffect, useRef } from 'react';
import { useActions } from '../hooks/useActions';

import MDEditor from '@uiw/react-md-editor';
import './text-editor.css';

import { Cell } from '../state';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const previewRef = useRef<HTMLDivElement | null>(null);

  const { updateCell } = useActions();

  const [editing, setEditing] = useState(false);

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
        <MDEditor
          value={cell.content}
          onChange={(newValue) => updateCell(cell.id, newValue || '')}
        />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  );
};

export default TextEditor;
