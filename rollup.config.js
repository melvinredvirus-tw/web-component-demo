/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import summary from 'rollup-plugin-summary';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import minifyHTML from 'rollup-plugin-minify-html-literals'; // For HTML/CSS in template literals
import typescript from '@rollup/plugin-typescript'; // Import the TypeScript plugin

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.bundled.ts',
    format: 'es',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({ preventAssignment: false, 'Reflect.decorate': 'undefined' }),
    resolve(),
    typescript({
      tsconfig: './tsconfig.json' // Point to your tsconfig.json
    }),
    minifyHTML.default(), // Minify HTML and CSS in tagged template literals (before terser)
    /**
     * This minification setup serves the static site generation.
     * For bundling and minification, check the README.md file.
     */
    terser({
      ecma: 2021,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
      output: {
        comments: false, // Remove all comments
      },
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        dead_code: true,
      },
    }),
    summary(),
  ],
};
