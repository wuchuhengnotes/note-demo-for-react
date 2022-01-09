import React, {useCallback, useState} from "react";

const UseCallbackDemo = (): React.ReactElement => {
    const [count, setCount] = useState<number>(0)

    const callback = useCallback(() => {
        console.log("callback的内部访问到的count值: " + count)
        // todo some thing ...
    }, [])

    return (
        <>
            <p>count: {count}</p>
            <button onClick={() => setCount(() => count + 1) }>修改count</button>
            <button onClick={callback}>在useCallback内部打印count</button>
        </>
    )
}

export default UseCallbackDemo