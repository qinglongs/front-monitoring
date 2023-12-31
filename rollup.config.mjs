import typescript from '@rollup/plugin-typescript';


export default {
    input: 'src/index.ts',
    output: {
        file: 'build/index.js',
        format: 'umd'
    },
    plugins: [typescript({ compilerOptions: { lib: ["es5", "es6", "dom"], target: "es5" } })]
};