let config = {
    launch: {
        headless: process.env.CI,
        devtools: true,
        args: ["--window-size=1280,1024"]
    }
}

if (!process.env.CI) config.launch.executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

module.exports = config
