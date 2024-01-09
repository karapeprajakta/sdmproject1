// importing the selenium webdriver
const { Builder, By, Key, until } = require('selenium-webdriver')

async function function1() {
  // load the web driver for chrome
  const driver = await new Builder().forBrowser('chrome').build()

  // browser a website
  driver.get('https://google.co.in')

  // wait for 2 seconds till the window title changes to Google
  await driver.wait(until.titleIs('Google'), 2000)

  // find an element (input) having name as q
  const element = await driver.findElement(By.name('q'))

  // enter iphone 13 in the search input and press enter key programmatically
  await element.sendKeys('iphone 13', Key.RETURN)

  // wait for 1000
  await driver.wait(until.titleIs('iphone 13 - Google Search'), 2000)

  // close the browser
  driver.quit()
}

function1()
