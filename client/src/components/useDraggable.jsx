import { useEffect, useRef } from 'react';

//The throttle function is also defined to throttle the handleDrag function to prevent it from being called too frequently.
const throttle = (fn, delay) => {
  let time = Date.now();

  return (arg) => {
    if (time + delay - Date.now() <= 0) {
      fn(arg);
      time = Date.now();
    }
  };
};

const useDraggable = (element) => {
  const dragStart = useRef(null);

  useEffect(() => {
    if (!element) return;

    const handleMouseDown = (event) => {
      if (!(event.button === 0 && event.buttons === 1)) return;
      const { left, top } = element.getBoundingClientRect();
      dragStart.current = { x: event.clientX - left, y: event.clientY - top };
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleDrag);
      dragStart.current = null;
    };

    const handleDrag = (event) => {
      if (!dragStart.current) return;
      const deltaX = event.pageX - dragStart.current.x;
      const deltaY = event.pageY - dragStart.current.y;
      element.style.left = deltaX + 'px';
      element.style.top = deltaY + 'px';
    };

    element.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', throttle(handleDrag, 100));

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleDrag);
    };
  }, [element]);
};

export default useDraggable;