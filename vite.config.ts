import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import * as path from 'path'

export default defineConfig({
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                exportType: 'named',
                ref: true,
                svgo: false,
                titleProp: true
            },
            include: '**/*.svg',
        })
    ],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    build: {
        commonjsOptions: {
            transformMixedEsModules: true
        }
    },
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: 'globalThis'
            }
        }
    }
})
