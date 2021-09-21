import './preview.css';

import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
}

const html = `
<html>
  <headd>
  </head>
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

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    // instead of updating state for the code string, a postMessage is sent to the iframe to communicate the code
    // instead of using source doc
    iframeRef.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return (
    <div className="wrapper">
      <iframe
        title="preview"
        srcDoc={html}
        sandbox="allow-scripts"
        ref={iframeRef}
      ></iframe>
    </div>
  );
};

export default Preview;
