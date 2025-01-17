require('dotenv').config()
require('coffeescript/register')

const path = require('path')
const ffmpeg = require('ffmpeg-downloader')
const Azarasi = require('azarasi')

const focaBot = new Azarasi({
  name: 'Tamago-Music',
  version: '0.1.4 (alpha)',
  prefix: process.env.BOT_PREFIX,
  token: process.env.BOT_TOKEN,
  owner: JSON.parse(process.env.BOT_OWNER),
  admins: JSON.parse(process.env.BOT_ADMINS),
  adminRoles: JSON.parse(process.env.BOT_ADMIN_ROLES),
  djRoles: JSON.parse(process.env.BOT_DJ_ROLES),
  debug: !!process.env.DEBUG,
  modulePath: path.join(__dirname, 'modules/'),
  localePath: path.join(__dirname, 'locales/'),
  locale: 'es_ES',
  watch: true,
  dbFile: process.env.DB_FILE || 'data.db',
  dbPort: process.env.DB_PORT || 12920,
  ffmpegBin: process.env.FFMPEG_BIN || ffmpeg.path,
  ffprobeBin: process.env.FFPROBE_BIN || ffmpeg.probePath,
  redis: process.env.USE_REDIS,
  redisURL: process.env.REDIS_URL
})

// These modules go first.
focaBot.modules.load(['util'])

// Common parameters
focaBot.settings.register('autoDel', { type: Boolean, def: true })

// Load the translations
const translations = ['ar_SA', 'cs_CZ', 'de_DE', 'en_US', 'eo_UY', 'es_ES', 'fr_FR', 'ko_KR', 'nl_NL', 'ja_JP', 'pt_PT']
translations.forEach(t => focaBot.locales.loadLocale(t))

// Load the modules.
focaBot.modules.load(JSON.parse(process.env.BOT_MODULES))

// Let the seals in!!
focaBot.establishConnection()

if (Core.shard.id) {
  focaBot.log(`Shard ${Core.shard.id} started!`)
} else {
  focaBot.log(`Started!`)
  focaBot.bot.on('ready', () => {
    if (!focaBot.bot.user.bot) {
      focaBot.log('Running FocaBot in a non-bot user account. This is discouraged.', 2)
    }
  })
}
