import * as esbuild from 'esbuild-wasm';

// 87 fetch-plugins.ts 만든후 import axios from 'axios'; 주석처리
// import axios from 'axios';
/* import { ReactDOM } from 'react-dom'; */

// 83. Caching with Key-Value Pairs
// 87 fetch-plugins.ts 만든후 import localForage from 'localforage'; 주석처리
// import localForage from 'localforage';

// 83. Caching with Key-Value Pairs
// 87 fetch-plugins.ts 만든후 const fileCache 주석처리
// const fileCache = localForage.createInstance({
//     name: 'filecache',

// });

// (async () => {
//     await fileCache.setItem('color', 'blue');

//     const color = await fileCache.getItem('color');

//     console.log(color);
// })()

// 87 강의에서 inputCode: string 지움
export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {
            // 86. Breaking Up Resolve Logic With Filters
            // Handle root entry file of 'index.js'
            build.onResolve({ filter: /(^index\.js$)/ }, () => {
                return { path: 'index.js', namespace: 'a' };

            });

            // 86. Breaking Up Resolve Logic With Filters
            // Handle relative paths in a module
            build.onResolve({ filter: /^\.+\// }, (args: any) => {
                return {
                    namespace: 'a',
                    path: new URL(
                        args.path, 'https://unpkg.com/' + args.resolveDir + '/'
                    ).href,
                };
            });


            // 86. Breaking Up Resolve Logic With Filters -> 87 차례 22-03-14


            // Handel main file of a module
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                // console.log('onResolve', args);

                // if (args.path === 'index.js') {
                //     return { path: args.path, namespace: 'a' };
                // }
                // else if (args.path === 'tiny-test-pkg') {
                //     return {
                //         path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js'
                //         , namespace: 'a'
                //     };
                // }

                // 86. Breaking Up Resolve Logic With Filters
                /*      if (args.path.includes('./') || args.path.includes('../')) {
                              return {
                                   namespace: 'a',
           
                                   path: new URL(
                                       args.path, 'https://unpkg.com/' + args.resolveDir + '/'
                                   ).href,
                               }; 
                     } */

                // 86. console.log
                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`,
                }
            });
            // const message = require('nested-test-pkg');

            // console.log(message);

            // 87. fetch-plugin.ts 생성뒤 주석처리함
            // //84. Fixing a TypeScript Error
            // build.onLoad({ filter: /.*/, /* namespace: 'b'  */ }, async (args: any) => {
            //     // 87. Refactoring to Multiple Plugins
            //     // console.log('onLoad', args);

            //     if (args.path === 'index.js') {
            //         return {
            //             loader: 'jsx',

            //             // 78. It Works!
            //             // react-dom 오류 403 나옴
            //             // require('변경할 message')  medium-test-pkg -> react -> react-dom -> axios -> lodash -> 
            //             // 


            //             //85. Bundling User Inp
            //             contents: inputCode,
            //             // 81. Crazy Numbers of Request 
            //             // 변경한 순서 react, react-dom -> react-select
            //             /*          contents: `

            //                      import React,{ useState} from 'react-select';

            //                      console.log(React, useState);

            //                      `, */
            //             // 
            //             /*     contents: `
            //                 const react = require('react');
            //                 const reactDOM =require('react-dom');
            //                 console.log(react, reactDOM);

            //                 `, */

            //             /*                         contents: `
            //                                     const message = require('medium-test-pkg');
            //                                     console.log(message);
            //                                     `, */

            //             /*         contents: `
            //             import message from './message';
            //           console.log(message);
            //         `, */
            //             /*   contents: `
            //       import message from 'tiny-test-pkg';
            //     console.log(message);
            //   `, */
            //         };
            //     }

            //     /* else {
            //         return {
            //             loader: 'jsx',
            //             contents: 'export default "hi there!~~how are you?"',
            //         };
            //     } */

            //     //83. Caching with Key-Value Pairs

            //     // Check to see if we have already fetched this file
            //     // and if it is in the cache
            //     const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

            //     // if it is, return it immediately
            //     if (cachedResult) {
            //         return cachedResult;

            //     }



            //     const { data, request } = await axios.get(args.path);

            //     // console.log(request);

            //     // console.log(request); 를 shift +ctrl + R 눌러서 newFunction (request); 생성함
            //     // newFunction(request);
            //     // console.log(data);

            //     // return { 
            //     const result: esbuild.OnLoadResult = {
            //         loader: 'jsx',
            //         contents: data,
            //         resolveDir: new URL('./', request.responseURL).pathname,
            //     };
            //     // 83. Caching with Key-Value Pairs
            //     // store response in cache
            //     await fileCache.setItem(args.path, result);

            //     return result;
            // });

            // function newFunction(request: any) {
            //     console.log(request);
            // }
        },
    };
};