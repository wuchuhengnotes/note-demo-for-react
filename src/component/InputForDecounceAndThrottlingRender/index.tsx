import React from "react";
import styles from "./styles.module.scss";
import {HistoryItemType} from "../CompareLogRender";

const getTimeFormat = (): string => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`
}

type InputForDebounceAndThrottlingRenderPropsType = {
    onChangeTextInput:(newText: HistoryItemType) => void
    onChangeTimeout: (timer: number) => void
    currentTimout: number
    textInputLabel: string
}
const InputForDebounceAndThrottlingRender = (props: InputForDebounceAndThrottlingRenderPropsType): React.ReactElement => {
    const handleDebounceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChangeTextInput({time: getTimeFormat(), record: e.target.value})
    }

    const OptionRender = (): React.ReactElement => {
        const options = [0.1, 0.5, 1, 2, 3, 4, 5, 6]
        return <>
            <label>间隔时长:</label>
            <select
                value={props.currentTimout}
                onChange={(e) => {props.onChangeTimeout( Number(e.target.value))} }
            >
                {options.map((i) => <option value={i} key={i}>{i}秒</option>)}
            </select>
        </>
    }

    return <div className={styles.inputWrapper}>
        <OptionRender />
        <label>{props.textInputLabel}:</label>
        <input onChange={handleDebounceInputChange}
               placeholder='请输入点什么'
        />
    </div>


}

export default InputForDebounceAndThrottlingRender
