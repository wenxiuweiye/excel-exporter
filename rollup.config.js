import resolve from '@rollup/plugin-node-resolve';  
import commonjs from '@rollup/plugin-commonjs'; 
import json from '@rollup/plugin-json';
export default {
    input: './dist/cli/index.js',
	output: {
		file: './dist/build/cli/index.js',
		format: 'cjs'
	},
	plugins: [  
		resolve(), // 使用 node-resolve 插件  
		commonjs(), // 使用 commonjs 插件  
		// 其他插件...  
		json()
	  ],  
}