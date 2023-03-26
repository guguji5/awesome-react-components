import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { md } from './plugins/md';
const reactSvgPlugin = require('./plugins/svg');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [md(), reactRefresh(), reactSvgPlugin({ defaultExport: 'component' })],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
    ],
  },
  build: {
    chunkSizeWarningLimit: 601,
  },
  server: {
    proxy: {},
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "/src/global.variable.less";`,
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#1d1fa4',
          'primary-background': '#F0ECF9',
          'font-size-base': '12px',
        },
      },
    },
  },
});
