import fs from 'fs'
import { execSync } from 'child_process'
import { promisify } from 'util'
import semverInc from 'semver/functions/inc';



export const exec = promisify(execSync);

export const readJSON = file => JSON.parse(fs.readFileSync(file, 'utf8'));

export const getVersion = currentVersion => ({
  patch: semverInc(currentVersion, 'patch'),
  minor: semverInc(currentVersion, 'minor'),
  major: semverInc(currentVersion, 'major')
})



