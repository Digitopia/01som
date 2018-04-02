const url = "http://localhost:8080"

// const timeout = 10*1000 // 10 seconds
const timeout = 8*60*60*1000 // 8 hours
jest.setTimeout(timeout)

const allSessions = ["S1", "S2", "S3", "S4", "S5"]

xdescribe("No syntatic errors", () => {

    const sessions = allSessions

    sessions.forEach(session => {
        test(`${session}`, async () => {
            await page.goto(`${url}/${session}`)
        })
    })

})

xdescribe('Full page height', () => {

    const sessions = allSessions

    sessions.forEach(session => {
        test(`${session}`, async () => {
            await page.goto(`${url}/${session}`)
            page.setViewport({ width: 1280, height: 1024 })
            const viewportHeight = await page.evaluate(() => document.documentElement.clientHeight)
            const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight)
            expect(viewportHeight).toEqual(fullHeight)
        })
    })

})

xdescribe("Shake", () => {

    const sessions = ["S1", "S2", "S3"]

    sessions.forEach(session => {

        test(`${session}`, async () => {

            // Go to url
            await page.goto(`${url}/${session}`)

            // Bypass help message
            await page.keyboard.press("Escape")

            // Set bpm
            await page.click("button[value='44']")

            // Click arround
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

            // Play for 2 seconds
            await page.click("#btnPlay")
            await page.waitFor(2*1000)

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
    })

})

xdescribe("S3 - Sequencer", () => {

    let session = "S3"

    test("", async () => {
        await page.goto(`${url}/${session}`)
        await page.keyboard.press("Escape")
        await page.evaluate(() => {
            let evt = document.createEvent("SVGEvents")
            evt.initEvent("click", true, true)
            app.circles[0].groups.sequencer[1].node.dispatchEvent(evt)
        })
        // await page.waitFor(timeout)
    })

})
