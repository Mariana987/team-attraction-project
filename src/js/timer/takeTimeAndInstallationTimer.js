import { CountdownTimer } from './timerBody';

function onTimer(arr) {
  const timer1 = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date(arr.date +'T'+ arr.time),
  });

  timer1.timeStart()
}

export { onTimer };