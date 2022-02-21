// 생성 순서

// 5  esbuild
import * as esbuild from 'esbuild-wasm';
// 4
import { useState, useEffect } from 'react';

// 1
import ReactDOM from "react-dom";

// 2 
const App = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const startService = async () => {
        const service = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        });
        console.log(service);
    }

    const onClick = () => {
        console.log(input)
    };
    useEffect(() => {
        startService();

    }, []);


    return <div>
        <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
        <div>
            <button onClick={onClick}>submit</button>
        </div>
        <pre>{code}</pre>
    </div>;
};

// 3 
ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
