import React from "react";
import {useRoutes} from "react-router-dom";
import Layout from "../container/Layout";
import Debounce from "../pages/Debounce/Debounce";
import Throttling from "../pages/Throttling";
import UseCallbackDemo from "../pages/UseCallbackDemo";

const Routes = (): React.ReactElement => {
    const res = useRoutes([
        { path: '/UseCallbackDemo', element: <UseCallbackDemo/>  },
        {
            path: '/', element: <Layout />, children: [
                {path: 'debounce', element: <Debounce/>},
                {path: 'throttling', element: <Throttling />}
            ]
        },

    ])

    return res as React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

export default Routes;