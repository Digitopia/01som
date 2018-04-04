let config = {
    launch: {
    }
}

if (!process.env.CI) {
    config.launch.executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    config.launch.headless = false
}

module.exports = config
