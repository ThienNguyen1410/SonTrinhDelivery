import {useEffect, useRef, useState} from 'react';

export const useCountDown = (duration: number) => {
  const [countDown, setCountDown] = useState(duration);
  const intervalRef = useRef<NodeJS.Timer>();

  const startCountdown = () => {
    setCountDown(duration);
    if (intervalRef.current) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setCountDown(val => (val - 1 < 0 ? 0 : val - 1));
    }, 1000);
  };

  useEffect(() => {
    startCountdown();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
  }, []);

  let completed = countDown === 0;

  return {countDown, completed, startCountdown};
};
