/*
 * @Description: vite config
 * @Author: MADAO
 * @Date: 2023-12-07 17:49:15
 * @LastEditors: MADAO
 * @LastEditTime: 2023-12-07 17:52:17
 */
import { defineConfig } from 'vite';
import { createVuePlugin as vue } from 'vite-plugin-vue2';
const path = require('path');

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  }
})