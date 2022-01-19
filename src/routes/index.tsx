import React from "react";
import {useRoutes} from "react-router-dom";
import Layout from "../container/Layout";
import Debounce from "../pages/Debounce/Debounce";
import Throttling from "../pages/Throttling";
import UseCallbackDemo from "../pages/UseCallbackDemo";
import MemoDemo from "../pages/MemoDemo";
import UseMemoDemo from "../pages/UseMemoDemo";
import CustomRedux from "../pages/CustomRedux";

const Routes = (): React.ReactElement => {
    const res = useRoutes([
        { path: '/UseCallbackDemo', element: <UseCallbackDemo/>  },
        { path: '/memoDemo', element: <MemoDemo/>  },
        { path: '/useMemoDemo', element: <UseMemoDemo/>  },
        {
            path: '/', element: <Layout />, children: [
                {path: 'debounce', element: <Debounce/>},
                {path: 'throttling', element: <Throttling />},
                {path: 'customRedux', element: <CustomRedux />}
            ]
        },

    ])

    return res as React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

export default Routes;
