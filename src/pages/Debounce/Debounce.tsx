import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {debounce} from "../../util/helper";
import styles from './styles.module.scss';
import CompareLogRender, {HistoryItemType} from "../../component/CompareLogRender";
import InputForDebounceAndThrottlingRender from "../../component/InputForDecounceAndThrottlingRender";

const Debounce = (): React.ReactElement => {
    const [debounceInputHistory, setDebounceInputHistory] =  useState<HistoryItemType[]>([])
    const [timer, setTimer] = useState<number>(1)
    const [debounceHistory, setDebounceHistoryDispatcher] = useReducer((state: HistoryItemType[]): HistoryItemType[]  => {
        if (
            debounceInputHistory.length === 0 ||
            debounceInputHistory.length > 0 && state.length > 0 && debounceInputHistory.slice(-1)[0].time === state.slice(-1)[0].time
        ) return state
        return [...state, Object.assign({},  debounceInputHistory.slice(-1)[0])]
    }, [])

    const debounceHandle = useCallback(
        debounce(() => {
            setDebounceHistoryDispatcher()
        }, timer * 1000)
        , [timer])

    useEffect(() => { debounceHandle() }, [debounceInputHistory])

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <InputForDebounceAndThrottlingRender
                    onChangeTextInput={(newHistory) => setDebounceInputHistory(() =>  [...debounceInputHistory, newHistory]) }
                    onChangeTimeout={(newTimer) => setTimer(newTimer)}
                    currentTimout={timer}
                    textInputLabel='防抖输入'
                />
                <CompareLogRender
                    debounceInputHistory={debounceInputHistory}
                    debounceHistory={debounceHistory}
                    leftTitle='历史用户输入记录'
                    rightTitle='实际防抖采样记录'
                />

          </div>
      </div>
  );
}

export default Debounce;
