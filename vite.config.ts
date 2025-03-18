import { defineConfig, loadEnv, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import dynamicImport from 'vite-plugin-dynamic-import';


// https://vite.dev/config/
export default ({ mode } : { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react({ babel: {
                        plugins: [
                          'babel-plugin-macros'
                        ]
                      }
              }), 
              dynamicImport()
    ],
    base: `${env.VITE_APP_BASE_URL}`,
    server: {
      port: 5175
    },
    assetsInclude: ['**/*.md'],
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
        '@assets': path.join(__dirname, 'src/assets')
      }
    },
    build: {
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: () => ("assets/js/[name]-[hash].js"),
          chunkFileNames: () => ("assets/js/[name]-[hash].js"),
          assetFileNames: (chunkInfo) => {
            const assetNames = chunkInfo.names;
            if(assetNames && assetNames.length > 0){
              const assetSubPath = chunkInfo.originalFileNames[0]
                                            .replace('src/', '')
                                            .replace(assetNames[0], '');
              const ext = chunkInfo.names[0];
              if (/\.(png|jpe?g|gif|svg)$/i.test(ext)) {
                return `${assetSubPath}[name]-[hash][extname]`;
              } else if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i.test(ext)) {
                return `assets/media/[name]-[hash][extname]`;
              } else if (/\.(woff2?|woff|eot|ttf|otf)$/i.test(ext)) {
                return `assets/fonts/[name]-[hash][extname]`;
              }
              else if (/\.(css)$/i.test(ext)){
                return `assets/css/[name]-[hash][extname]`;
              }
            }
          return `assets/[name]-[hash][extname]`;
          },
        }
      }
    }
  });
}