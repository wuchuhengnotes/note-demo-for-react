import React, {useCallback, useEffect, useReducer, useRef, useState} from 'react';
import {debounce, throttling} from "../../util/helper";
import styles from './styles.module.scss';

const getTimeFormat = (): string => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`
}

type HistoryItemType = {time: string; record: string}
const Debounce = (): React.ReactElement => {
    const [debounceInputHistory, setDebounceInputHistory] =  useState<HistoryItemType[]>([])
    const [activeHistory, setActiveHistory] = useState<string>('');
    const [timeout, setTimeout] = useState<number>(1)
    const [debounceHistory, setDebounceHistoryDispatcher] = useReducer((state: HistoryItemType[], newDebounceHistory: HistoryItemType): HistoryItemType[]  => {
        if (
            debounceInputHistory.length === 0 ||
            debounceInputHistory.length > 0 && state.length > 0 && debounceInputHistory.slice(-1)[0].time === state.slice(-1)[0].time
        ) return state
        return [...state, Object.assign({},  debounceInputHistory.slice(-1)[0])]
    }, [])
    const inputEl = useRef<HTMLInputElement>(null)

    const debounceHandle = useCallback(
        debounce(() => {
            setDebounceHistoryDispatcher({time: getTimeFormat(), record: inputEl.current?.value as string})
        }, timeout * 1000)
        , [timeout])

    const handleDebounceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDebounceInputHistory(() => {
            return [...debounceInputHistory, {time: getTimeFormat(), record: e.target.value}];
        })
    }

    useEffect(() => {
        debounceHandle()
    }, [debounceInputHistory])
    const ListRender = ({historyItems}: {historyItems: HistoryItemType[]}): React.ReactElement =>  {
        return (
        <>
            {(JSON.parse(JSON.stringify(historyItems)) as HistoryItemType[]).reverse().map(i => (
                <li
                    key={i.time}
                    onMouseEnter={() => setActiveHistory(i.time)}
                    className={i.time == activeHistory ? styles.activeHistory : ''}
                >
                    <div>{i.time}</div>
                    <div>{i.record}</div>
                </li>
            ))}
        </>
    )}

    const OptionRender = (): React.ReactElement => {
        const options = [0.1, 0.5, 1, 2, 3, 4, 5, 6]
        return <>
            <label>间隔时长:</label>
            <select
                value={timeout}
                onChange={(e) => { setTimeout( Number(e.target.value))} }
            >
                {options.map((i) => <option value={i} key={i}>{i}秒</option>)}
            </select>
        </>
    }

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.inputWrapper}>
                    <OptionRender />
                    <label>防抖输入:</label>
                  <input onChange={handleDebounceInputChange} ref={inputEl}
                         placeholder='请输入点什么'
                  />
              </div>
              <div className={styles.logWrapper}>
                  <div>
                      <p>用户输入记录:</p>
                      <ul>
                          <ListRender historyItems={debounceInputHistory} />
                      </ul>
                  </div>
                  <div>
                      <p>实际防抖采样记录:</p>
                      <ul>
                          <ListRender historyItems={debounceHistory} />
                      </ul>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default Debounce;
