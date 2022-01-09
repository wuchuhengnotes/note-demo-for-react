import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {throttling} from "../../util/helper";
import styles from '../Debounce/styles.module.scss';
import CompareLogRender, {HistoryItemType} from "../../component/CompareLogRender";
import InputForDebounceAndThrottlingRender from "../../component/InputForDecounceAndThrottlingRender";

const Debounce = (): React.ReactElement => {
    const [throttlingInputHistory, setThrottlingInputHistory] =  useState<HistoryItemType[]>([])
    const [timer, setTimer] = useState<number>(1)
    const [debounceHistory, setDebounceHistoryDispatcher] = useReducer((state: HistoryItemType[]): HistoryItemType[]  => {
        if (
            throttlingInputHistory.length === 0 ||
            throttlingInputHistory.length > 0 && state.length > 0 && throttlingInputHistory.slice(-1)[0].time === state.slice(-1)[0].time
        ) return state
        return [...state, Object.assign({},  throttlingInputHistory.slice(-1)[0])]
    }, [])

    const debounceHandle = useCallback(
        throttling(() => setDebounceHistoryDispatcher(), timer * 1000)
        , [timer])

    useEffect(() => { debounceHandle() }, [throttlingInputHistory])

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <InputForDebounceAndThrottlingRender
                    onChangeTextInput={(newHistory) => setThrottlingInputHistory(() =>  [...throttlingInputHistory, newHistory]) }
                    onChangeTimeout={(newTimer) => setTimer(newTimer)}
                    currentTimout={timer}
                    textInputLabel='节流输入'
                />
                <CompareLogRender
                    debounceInputHistory={throttlingInputHistory}
                    debounceHistory={debounceHistory}
                    leftTitle='用户输入历史记录'
                    rightTitle='实际节流采样记录'
                />

            </div>
        </div>
    );
}

export default Debounce;
