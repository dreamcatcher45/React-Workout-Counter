import React, { useState, useEffect } from 'react';
import './style.css'

function CountdownApp() {
 const [count, setCount] = useState(50);
 const [isActive, setIsActive] = useState(false);
 const [intervalId, setIntervalId] = useState(null);
 const [intervalValue, setIntervalValue] = useState(5);
 const [currentInterval, setCurrentInterval] = useState(intervalValue);
 const [intervalCounter, setIntervalCounter] = useState(intervalValue);

 useEffect(() => {
    if (isActive && count > 0) {
      setIntervalId(setInterval(() => {
        setCount(count - 1);
      }, intervalValue * 1000));
    } else if (!isActive || count <= 0) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
 }, [isActive, count, intervalValue]);

 useEffect(() => {
    if (isActive) {
      const intervalCounterId = setInterval(() => {
        setIntervalCounter(currentInterval => currentInterval > 1 ? currentInterval - 1 : intervalValue);
      }, 1000);
      return () => clearInterval(intervalCounterId);
    }
 }, [isActive, intervalValue]);


 useEffect(() => {
    if (count > 0) {
      const audio = new Audio("src/assets/tick.mp3");
      audio.play();
    }
 }, [count]);

 const startCountdown = () => {
    setIsActive(true);
    setIntervalCounter(intervalValue);
 };

 const resetCountdown = () => {
    setIsActive(false);
    setCount(50);
    setIntervalCounter(intervalValue);
 };

 useEffect(() => {
  if (count === 0) {
     resetCountdown();
  }
 }, [count, resetCountdown]);
 

 return (
    <div>
      <div  className='upperdiv'>
        <div className='packdiv'>
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        className='input-t'
        />
      <p className='ptags'>counts</p>
      <input
        type="number"
        value={intervalValue}
        onChange={(e) => setIntervalValue(Number(e.target.value))}
        placeholder="Interval in seconds"
        className='input-st'
        />
      <p className='ptags'>seconds</p>
        </div>
        <div className='packdiv'>
      <button onClick={startCountdown}>Start</button>
      <button onClick={resetCountdown}>Reset</button>
        </div>
        </div>
      <div className='aligndiv'>
      <h1 className='count'>{count}</h1>
      <p className='subcount'>{intervalCounter}</p>
      </div>
    </div>
 );
}

export default CountdownApp;
