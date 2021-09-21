import './resizable.css';

import { useEffect, useState } from 'react';

import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizeableProps: ResizableBoxProps;
  let timer: any;

  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);

  const [width, setWidth] = useState<number>(window.innerWidth * 0.75);

  useEffect(() => {
    const listener = () => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        setInnerWidth(window.innerWidth);
        setInnerHeight(window.innerHeight);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  // IMPORTANT! cool section on how to conditionally insert props into a component

  if (direction === 'horizontal') {
    resizeableProps = {
      className: 'resize-horizontally',
      width,
      height: Infinity,
      resizeHandles: ['e'],
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      onResizeStop: (event, data) => {
        console.log(data);
        setWidth(data.size.width);
      },
    };
  } else {
    resizeableProps = {
      className: 'resize-vertically',
      width: Infinity,
      height: 300,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 24],
    };
  }
  // spreading the object depending on horizontal or vertical
  return <ResizableBox {...resizeableProps}>{children}</ResizableBox>;
};

export default Resizable;
