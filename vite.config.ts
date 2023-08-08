import solid from 'solid-start/vite'
import { defineConfig, PluginOption } from 'vite'
import civetPlugin from 'vite-plugin-civet'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    {
      ...civetPlugin({
        stripTypes: false,
        outputExtension: 'tsx',
        outputTransformerPlugin: 'solid',
      }) as PluginOption,
      enforce: 'pre',
    },
    solid({
      extensions: ['.civet'],
      rootEntry: '~/root.civet',
    }),
    Unocss({
      include: ["src/**/*.civet"]
    }),
    AutoImport({
      imports: [
        'solid-js',
      ],
      dts: true,
      dirs: [
        'src/primitives'
      ]
    }),
  ],
})
