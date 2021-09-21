import './preview.css';

import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
  error: string;
}

const html = `
<html>
  <headd>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = ( error ) => {
        const rootElement = document.querySelector('#root');
        rootElement.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
        console.error(error);
      }

      window.addEventListener('error', (event) => {
          // event.preventDefault(); can be used here to prevent error message from being thrown
          event.preventDefault();
          handleError(event.error);
      })

      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (error) {
          handleError(error);
        }
      }, false)
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    // instead of updating state for the code string, a postMessage is sent to the iframe to communicate the code
    // instead of using source doc
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="wrapper">
      <iframe
        title="preview"
        srcDoc={html}
        sandbox="allow-scripts"
        ref={iframeRef}
      ></iframe>
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

export default Preview;
