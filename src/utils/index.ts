import { execSync } from 'child_process'
import { promisify } from 'util'

export const exec = promisify(execSync);
