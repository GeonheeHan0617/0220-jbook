// 생성 순서

// 5  esbuild
import * as esbuild from 'esbuild-wasm';
// 4
import { useState, useEffect, useRef } from 'react';
// 1

/* 단축키 종류 */

// 먼저 ES7+ React/Redux/React-Native snippets 설치함
// Simple React Snippets 설치


// imrr
// import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
// imrm
// import React, { memo } from 'react'
// ima
// import { second as third } from 'first'
// imbr
// import { BrowserRouter as Router } from 'react-router-dom'
// imrs
// import * as React from 'react';
// import { useState } from 'react';


import ReactDOM from "react-dom";
// 6 플러그인 생성한 후
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';


// 2 
const App = () => {
    const ref = useRef<any>();
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        });

        /*
        const service = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        });
           console.log(service);
          console.log(service.serve.name); */

    };

    useEffect(() => {
        startService();

    }, []);

    const onClick = async () => {
        // submit 확인 버톤
        // console.log(input)
        if (!ref.current) {
            return;
        }


        /*       { build: ƒ, serve: ƒ, transform: ƒ, stop: ƒ }
              build: S => (g(), $.build(S))
              serve: ƒ serve(S, k)
              stop: ƒ stop()
              transform: ƒ transform(S, k)
              [[Prototype]]: Object */
        //        console.log(ref.current);

        // plugins 폴더 생성후 주석 처리함 
        // const result = await ref.current.transform(input, {
        //     loader: 'jsx',
        //     target: 'es2015'
        // });

        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(input )],
            // 79. Defines During Bundling
            // define section  url: https://esbuild.github.io/api/#define
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window',
            }

        });

        // console.log(result);
        newFunction_1();

        /* { warnings: Array(0), code: '', map: '' }
        code: ""
        map: ""
        warnings: []
        [[Prototype]]: Object */
        //        console.log(result);
        // setCode(result.code);
        setCode(result.outputFiles[0].text);

        function newFunction_1() {
            newFunction(result);


        }

    };

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
function newFunction(result: any) {
    // console.log(result);
}

