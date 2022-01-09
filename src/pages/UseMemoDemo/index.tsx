import React, {useMemo, useState} from "react";
type InfoType = {text: string}
type ChildrenPropsType = {info: InfoType}
const Children1 = () => {
    console.log('Children1 reload.')
    return <>Children2</>
}
const Children2 = React.memo(({info}: ChildrenPropsType) => {
    console.log('Children2 reload.' + JSON.stringify(info))
    return <>Children3</>
})
const Children3 = React.memo(({info}: ChildrenPropsType) => {
    console.log('Children3 reload.' + JSON.stringify(info))
    return <>Children1</>
})
const UseMemoDemo = (): React.ReactElement => {
    const [count, setCount] = useState<number>(0)
    console.log("Parent component reload." + count)
    const text2: InfoType = {text: 'text2'}
    const text3 = useMemo((): InfoType => ({text: "text3"}), [])
    return (<>
        <Children1 />
        <br />
        <Children2 info={text2} />
        <br/>
        <Children3 info={text3} />
        <button onClick={() => setCount(() => count + 1)}>Reload component</button>
    </>)
}

export default UseMemoDemo;