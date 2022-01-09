import React, {useState} from "react";

const Children1 = () => {
    console.log('Children1 reload.')
    return <>Children1</>
}
const Children2 = React.memo(() => {
    console.log('Children2 reload.')
    return <>Children1</>
})

const MemoDemo = (): React.ReactElement => {
    const [count, setCount] = useState<number>(0)
    console.log("Parent component reload." + count)
    return (<>
        <Children1 />
        <br />
        <Children2 />
        <br/>
        <button onClick={() => setCount(() => count + 1)}>Reload component</button>
    </>)
}

export default MemoDemo;