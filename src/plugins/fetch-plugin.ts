
// 87. Refactoring to Multiple Plugins 강의에서 fetch-plugins.ts 생성함
import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';
const fileCache = localForage.createInstance({
    name: 'filecache',

});
export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onLoad({ filter: /.*/, }, async (args: any) => {

                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: inputCode,

                    };
                }

                //89. 강의에서 주석처리
                //  const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);


                //if (cachedResult) {
                //  return cachedResult;

                //}

                const { data, request } = await axios.get(args.path);

                //89. Configuring the Correct Loader
                const loader = args.path.match(/.css$/) ? 'css' : 'jsx'
                // console.log(args.path);
                const result: esbuild.OnLoadResult = {
                    // 88. Loading CSS Files
                    // loader: 'jsx'-> loader: 'css'

                    //89. Configuring the Correct Loader
                    // loader: 'jsx', -> loader 변경
                    loader,
                    contents: data,
                    resolveDir: new URL('./', request.responseURL).pathname,
                };

                await fileCache.setItem(args.path, result);
                return result;
            });

        }
    };
};