import * as esbuild from "esbuild-wasm";
import { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

import CodeEditor from "./components/CodeEditor";

const App = () => {
  // remember with typescript you have to assign a ref type
  const serviceRef = useRef<any>();

  const iframeRef = useRef<any>();

  const [input, setInput] = useState("");
  // const [code, setCode] = useState("");

  const startService = async () => {
    serviceRef.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });

    console.log(serviceRef.current);
  };

  useEffect(() => {
    startService();
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setInput(event.target.value);
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    // remember: this is a type guard
    if (!serviceRef.current) return;

    iframeRef.current.srcdoc = html;

    try {
      // code for transform
      // const result = await serviceRef.current.transform(input, {
      //   loader: "jsx",
      //   target: "es2015",
      // });

      // code for build file
      const result = await serviceRef.current.build({
        entryPoints: ["index.js"],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(input)],
        define: { "process.env.NODE_ENV": '"production"', global: "window" },
      });

      // setCode(result.outputFiles[0].text);
      // instead of updating state for the code string, a postMessage is sent to the iframe to communicate the code
      // instead of using source doc
      iframeRef.current.contentWindow.postMessage(
        result.outputFiles[0].text,
        "*"
      );
    } catch (error) {
      alert(error);
    }
  };

  const html = `
  <html>
    <headd></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (error) {
            const rootElement = document.querySelector('#root');
            rootElement.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
            console.error(error);
          }
        }, false)
      </script>
    </body>
  </html>
  `;

  return (
    <div>
      <CodeEditor
        initialValue="const a = 1;"
        onChange={(value) => setInput(value)}
      />
      <textarea
        cols={50}
        rows={10}
        onChange={handleChange}
        value={input}
      ></textarea>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <iframe
        title="preview"
        srcDoc={html}
        sandbox="allow-scripts"
        ref={iframeRef}
      ></iframe>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
