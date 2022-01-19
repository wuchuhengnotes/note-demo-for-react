import React from "react";
import style from './style.module.scss';
import {useObserve} from "@wuchuheng/rxjs";
import Scheduler from "./Scheduler";

type BossPropsType = {name: string, quotes: string[]}
const bosses: BossPropsType[] = [
    {name: '雷不死', quotes: ['Hello!', 'Thank you very mach!', 'Are you ok!', '这他妈的绝对是来捣乱的！！!']},
    {name: '王一亿', quotes: ['定个小目标', '赚它一个亿']},
    {name: '杰克马', quotes: ['996是福报', '向社会输送人才']},
    {name: '麻花疼', quotes: ['充钱让你更强', '南山必胜客']},
]

const formatTime = (time: Date): string => `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`

const Boss = (props: BossPropsType): React.ReactElement => {
    const [message, dispatcher] = useObserve(Scheduler.chatGroupObserve)
    const handleChange = (e: string) => dispatcher.next(`${props.name}: ${e}`)

    return (
        <div className={style.bossWrapper}>
            <div>大佬: {props.name}</div>
            <div>
                <div>他想说:</div>
                <select onChange={(e) => handleChange(e.target.value) }>
                    {props.quotes.map(q => <option value={q} key={q}>{q}</option>)}
                </select>
                <div>最新消息: <span>{message}</span></div>
            </div>
            <div className={style.history}>
                <div>历史记录:</div>
                <div className={style.history}>
                    {
                        dispatcher.history.map(
                            (m, k) =>
                                <p key={k}>
                                    {formatTime(m.time)} {m.data}
                                </p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
const CustomRedux = (): React.ReactElement => {
    const BossesRender = (
        bosses.map(
            (bossInfo, k) => <Boss
                name={bossInfo.name}
                quotes={bossInfo.quotes} key={k}
            />
        )
    )
    return (
        <div className={style.main}>
            <h1>看看大佬们都说了什么？</h1>
            <div className={style.container}>
                {BossesRender}
            </div>
        </div>
    )
}

export default CustomRedux