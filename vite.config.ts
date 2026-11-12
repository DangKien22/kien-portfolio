import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, unlinkSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

function excludePrivateCv(): Plugin {
  let outputDirectory = ''

  return {
    name: 'exclude-private-cv',
    configResolved(config) {
      outputDirectory = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const cvPath = resolve(outputDirectory, 'CV_Dang_Trung_Kien_FE.pdf')
      if (existsSync(cvPath)) unlinkSync(cvPath)
    },
  }
}

export default defineConfig({
  plugins: [react(), excludePrivateCv()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
