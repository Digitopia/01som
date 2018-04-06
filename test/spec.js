const baseUrl = "http://localhost:8080"

// const timeout = 10*1000 // 10 seconds
const timeout = 8 * 60 * 60 * 1000 // 8 hours
jest.setTimeout(timeout)

page.setViewport({ width: 1280, height: 1024 })
// page.setViewport({ width: 1280, height: 1343 })

/** Utils function to stop the browser and manually inspect */
async function wait() {
    await page.waitFor(timeout)
}

const sessions = ["S1", "S2", "S3"]
sessions.forEach(session => {

    describe(session, () => {

        test("check for syntax errors", async () => {
            await page.goto(`${baseUrl}/${session}`)
        })

        test("bypass help", async () => {
            await page.keyboard.press("Escape")
        })

        test("full page height", async () => {
            const viewportHeight = await page.evaluate(() => document.documentElement.clientHeight)
            const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight)
            expect(viewportHeight).toEqual(fullHeight)
            // wait()
        })

        test("bpm", async () => {
            await page.click("button[value='44']")
        })

        test("click some points", async () => {

            await page.evaluate(() => {

                let evt = document.createEvent("SVGEvents")
                evt.initEvent("click", true, true)
                app.circles[0].groups.points[0].node.dispatchEvent(evt)
                app.circles[0].groups.points[1].node.dispatchEvent(evt)
                app.circles[0].groups.points[1].node.dispatchEvent(evt)
                app.circles[0].groups.points[2].node.dispatchEvent(evt)
                app.circles[0].groups.points[2].node.dispatchEvent(evt)
                app.circles[0].groups.points[2].node.dispatchEvent(evt)
            })

            // Get state variables (after clicking)
            let states = await page.evaluate(() => [
                app.circles[0].points[0].state,
                app.circles[0].points[1].state,
                app.circles[0].points[2].state
            ])

            // Compare expected output
            expect(states[0]).toBe(0)
            expect(states[1]).toBe(1)
            expect(states[2]).toBe(2)

        })

        test("play", async () => {
            await page.click("#btnPlay")
            await page.waitFor(2 * 1000)
            await page.click("#btnPlay")
        })

        test("shake", async () => {

            // Shake it
            await page.evaluate(() => { app.circles[0].shaked() })

            // Get state variables (after shaking)
            states = await page.evaluate(() => [
                app.circles[0].points[0].state,
                app.circles[0].points[1].state,
                app.circles[0].points[2].state
            ])

            // Check shaked cleared
            expect(states[0]).toBe(-1)
            expect(states[1]).toBe(-1)
            expect(states[2]).toBe(-1)

        })

        test("record", async () => {
            await page.click("#btnRecord")
            await page.waitFor(2 * 1000)
        })

    })

    if (session === "S3") {
        test("sequencer", async () => {
            await page.evaluate(() => {
                let evt = document.createEvent("SVGEvents")
                evt.initEvent("click", true, true)
                app.circles[0].groups.sequencer[1].node.dispatchEvent(evt)
            })
            // wait()
        })
    }
})

describe("S4", () => {

    const session = "S4"
    test("check for syntax errors", async () => {
        await page.goto(`${baseUrl}/${session}`)
    })

    test("full page height", async () => {
        const viewportHeight = await page.evaluate(() => document.documentElement.clientHeight)
        const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight)
        expect(viewportHeight).toEqual(fullHeight)
    })

    // TODO: more to come...

})

describe("S5", () => {

    const session = "S5"

    test("check for syntax errors", async () => {
        await page.goto(`${baseUrl}/${session}`)
    })

    test("full page height", async () => {
        const viewportHeight = await page.evaluate(() => document.documentElement.clientHeight)
        const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight)
        expect(viewportHeight).toEqual(fullHeight)
    })

    // TODO: more to come...

})
