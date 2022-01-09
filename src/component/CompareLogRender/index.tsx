import React, {useState} from "react";
import styles from "./styles.module.scss";

export type HistoryItemType = {time: string; record: string}

type CompareLogRenderPropsType = {
    debounceInputHistory: HistoryItemType[]
    debounceHistory: HistoryItemType[]
    leftTitle: string
    rightTitle: string
}
const CompareLogRender = ({debounceHistory, debounceInputHistory, ...props}: CompareLogRenderPropsType): React.ReactElement => {
    const [activeHistory, setActiveHistory] = useState<string>('');

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

    return (
        <div className={styles.logWrapper}>
            <div>
                <p>{props.leftTitle}:</p>
                <ul>
                    <ListRender historyItems={debounceInputHistory} />
                </ul>
            </div>
            <div>
                <p>{props.rightTitle}</p>
                <ul>
                    <ListRender historyItems={debounceHistory} />
                </ul>
            </div>
        </div>
    )
}
export default CompareLogRender
