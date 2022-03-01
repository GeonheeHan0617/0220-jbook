import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
/* import { ReactDOM } from 'react-dom'; */
export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                console.log('onResolve', args);

                if (args.path === 'index.js') {
                    return { path: args.path, namespace: 'a' };
                }
                // else if (args.path === 'tiny-test-pkg') {
                //     return {
                //         path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js'
                //         , namespace: 'a'
                //     };
                // }

                if (args.path.includes('./') || args.path.includes('../')) {
                    return {
                        namespace: 'a',
                        /* path: new URL(args.path, args.importer + '/').href */
                        path: new URL(
                            args.path, 'https://unpkg.com/' + args.resolveDir + '/'
                        ).href,
                    };
                }
                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`,
                }
            });


            build.onLoad({ filter: /.*/, /* namespace: 'b'  */ }, async (args: any) => {
                console.log('onLoad', args);

                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',

                        // 78. It Works!
                        // react-dom 오류 403 나옴
                        // require('변경할 message')  medium-test-pkg -> react -> react-dom -> axios -> lodash -> 
                        // 
                        contents: `
                        import React,{ useState} from 'react';
                        console.log(React, useState);
                        
                        `,
                        /*     contents: `
                            const react = require('react');
                            const reactDOM =require('react-dom');
                            console.log(react, reactDOM);
                            
                            `, */

                        /*                         contents: `
                                                const message = require('medium-test-pkg');
                                                console.log(message);
                                                `, */

                        /*         contents: `
                        import message from './message';
                      console.log(message);
                    `, */
                        /*   contents: `
                  import message from 'tiny-test-pkg';
                console.log(message);
              `, */
                    };
                }

                /* else {
                    return {
                        loader: 'jsx',
                        contents: 'export default "hi there!~~how are you?"',
                    };
                } */

                const { data, request } = await axios.get(args.path);

                // console.log(request);

                // console.log(request); 를 shift +ctrl + R 눌러서 newFunction (request); 생성함
                // newFunction(request);
                // console.log(data);
                return {
                    loader: 'jsx',
                    contents: data,
                    resolveDir: new URL('./', request.responseURL).pathname,
                }
            });

            // function newFunction(request: any) {
            //     console.log(request);
            // }
        },
    };
};