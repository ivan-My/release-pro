import { execSync } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'

export const exec = promisify(execSync);




export const readJSON = file => JSON.parse(fs.readFileSync(file, 'utf8'));
