import {ftruncate} from "fs";

type DebounceFunType  = () => void
type DebounceWaitType  = number

export const debounce = (func: DebounceFunType, wait: DebounceWaitType): () => void => {
    let timer: ReturnType<typeof setTimeout>;

    return () => {
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            func()
        }, wait)
    }
}

type throttlingFunType = () => void;
type throttlingWaitType = number;

export const throttling = (fun: throttlingFunType, wait: throttlingWaitType) => {
    type TimeOutType  = ReturnType<typeof setTimeout> ;
    let timer: TimeOutType | boolean
    return () => {
        if (!timer) {
            timer = setTimeout(() => {
                fun()
                clearTimeout(timer as TimeOutType)
                timer = false
            }, wait)
        }
    }
}