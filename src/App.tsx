import React, {useCallback, useEffect, useReducer, useRef, useState} from 'react';
import './App.css';
import {debounce, throttling} from "./util/helper";
import styles from './styles.module.scss';

const getTimeFormat = (): string => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`
}
function App() {
    const [debounceInputHistory, setDebounceInputHistory] =  useState<string[]>([])
    const [debounceHistory, setDebounceHistoryDispatcher] = useReducer((state: string[], newDebounceHistory: string): string[]  => {
           return [...state, newDebounceHistory]
    }, [])
    const inputEl = useRef<HTMLInputElement>(null)

    const debounceHandle = useCallback(
        debounce(() => {
            const newHistory = `${getTimeFormat()} ${inputEl.current?.value}`
            setDebounceHistoryDispatcher(newHistory)
        }, 1000)
        , [])

    const handleDebounceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDebounceInputHistory(() => {
            const newHistory = `${getTimeFormat()} ${e.target.value}`
            return [...debounceInputHistory, newHistory];
        })
    }

    useEffect(() => {
        debounceHandle()
    }, [debounceInputHistory])

  return (
      <div className={styles.main}>
          <div className={styles.container}>
              <div className={styles.inputWrapper}>
                  <label>防抖输入: &emsp; </label>
                  <input onChange={handleDebounceInputChange} ref={inputEl}
                         placeholder='请输入点什么'
                  />
              </div>
              <div className={styles.logWrapper}>
                  <div>
                      <p>用户输入记录:</p>
                      <ul>
                          {debounceInputHistory.map(i => (
                              <li key={i} >{i}</li>
                          ))}
                      </ul>
                  </div>
                  <div>
                      <p>实际防抖彩样记录:</p>
                      <ul>
                          {debounceHistory.slice(1).map(i => (
                              <li key={i} >{i}</li>
                          ))}
                      </ul>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default App;
