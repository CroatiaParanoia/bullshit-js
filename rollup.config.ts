import typescript from '@rollup/plugin-typescript'
import run from '@rollup/plugin-run'
import * as path from "path";

const dev = process.env.ROLLUP_WATCH === 'true';

export default {
    input: 'src/index.ts',
    plugins: [typescript({tsconfig: path.resolve(__dirname, './tsconfig.json')}), dev && run()],
    output: [
        {
            file: 'dist/bullshit-js.cjs.js',
            format: 'cjs'
        },
        {
            file: 'dist/bullshit-js.esm.js',
            format: 'esm'
        }
    ]
}
