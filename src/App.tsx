import React from 'react';
import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Debounce from "./pages/Debounce/Debounce";
import styles from "./pages/Home/styles.module.scss";

function App() {
    return (<>
            <main className={styles.mainWrapper}>
                <div>
                    <h2>测试示例</h2>
                </div>
                <nav>
                    <Link to="/">首页</Link>
                    <Link to="/debounce">防抖示例</Link>
                    <Link to="/debounce">防抖示例</Link>
                </nav>
                <Routes>
                    <Route  path="/" element={<Home />}/>
                    <Route path="/debounce" element={<Debounce />} />
                </Routes>
            </main>
    </>
)
}

export default App;
