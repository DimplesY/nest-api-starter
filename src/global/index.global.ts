import path from 'node:path'
import gradient from 'gradient-string'
import fs from 'node:fs'
import { SYSTEM } from '~/app.config'

export const showBanner =
  typeof SYSTEM.banner === 'function' ? SYSTEM.banner() : SYSTEM.banner

export function logBanner() {
  const root = path.resolve(process.cwd())
  const bannerPath = path.resolve(root, 'banner.txt')
  if (showBanner && fs.existsSync(bannerPath)) {
    const banner = fs.readFileSync(path.resolve(root, 'banner.txt'), 'utf-8')

    console.log(
      `${gradient([
        { color: '#ABE188', pos: 0 },
        { color: '#F7EF99', pos: 0.1 },
        { color: '#F78E69', pos: 1 },
      ]).multiline(banner)}`,
    )
  }
}
