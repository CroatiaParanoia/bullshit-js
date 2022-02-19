import run from '@rollup/plugin-run'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import path from 'path'

const dev = process.env.ROLLUP_WATCH === 'true';

export default {
    input: 'src/index.ts',
    plugins: [
        typescript({
            tsconfig: path.resolve(__dirname, './tsconfig.json')
        }),
        json(),
        dev && run()
    ],
    output: [
        {
            file: 'lib/index.cjs.js',
            format: 'cjs'
        },
        !dev && {
            file: 'lib/index.esm.js',
            format: 'esm'
        }
    ]
}
