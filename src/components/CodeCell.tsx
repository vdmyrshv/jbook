import bundle from "../bundler";

import { useState } from "react";

import CodeEditor from "../components/CodeEditor";
import Preview from "../components/Preview";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setInput(event.target.value);
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    // code for build file
    const result = await bundle(input);

    setCode(result);
  };
  return (
    <div>
      <CodeEditor
        initialValue="const a = 1;"
        onChange={(value) => setInput(value)}
      />
      <button onClick={handleClick}>Submit</button>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
