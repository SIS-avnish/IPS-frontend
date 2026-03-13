import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

const isWin = process.platform === 'win32'

async function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', shell: isWin })
    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with code ${code}`))
      } else {
        resolve()
      }
    })
  })
}

async function build() {
  console.log('🔨 Building client...')
  try {
    // Build client
    await runCommand('npx', [
      'vite',
      'build',
      '--outDir',
      'dist/client',
      '--ssrManifest'
    ])

    console.log('✅ Client build complete')
    console.log('🔨 Building server...')

    // Build server
    await runCommand('npx', [
      'vite',
      'build',
      '--ssr',
      'src/entry-server.jsx',
      '--outDir',
      'dist/server'
    ])

    console.log('✅ Server build complete')
    console.log('🎉 SSR build successful!')
  } catch (error) {
    console.error('❌ Build failed:', error.message)
    process.exit(1)
  }
}

build()
