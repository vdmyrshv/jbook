import bundle from '../bundler';

import { useState } from 'react';

import CodeEditor from '../components/CodeEditor';
import Preview from '../components/Preview';
import Resizable from './Resizable';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    // code for build file
    const result = await bundle(input);

    setCode(result);
  };
  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
