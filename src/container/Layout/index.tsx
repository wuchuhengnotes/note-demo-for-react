import React from "react";
import {Link, Outlet} from "react-router-dom";
import styles from "./styles.module.scss"

const Layout = (): React.ReactElement => {
    return (
        <main className={styles.mainWrapper}>
            <div>
                <h2>测试示例</h2>
            </div>
            <nav>
                <Link to="/">首页</Link>
                <Link to="/debounce">防抖示例</Link>
                <Link to="/throttling">节流示例</Link>
            </nav>
            <Outlet />
        </main>
    )
}

export default Layout;
