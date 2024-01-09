// importing the selenium webdriver
const { Builder, By, Key, until } = require('selenium-webdriver')

async function function1() {
  // load the web driver for chrome
  const driver = await new Builder().forBrowser('chrome').build()

  // browser a website
  driver.get(
    'file:///Volumes/Data/sunbeam/2022/fulltime/sdm/Day3/code/app/index.html'
  )

  // wait for 5 seconds till the window title changes to Google
  await driver.wait(until.titleIs('Document'), 5000)

  // find an email input element
  const elementEmail = await driver.findElement(By.id('email'))
  await elementEmail.sendKeys('amit@test.com')

  // find an password input element
  const elementPassword = await driver.findElement(By.id('password'))
  await elementPassword.sendKeys('test')

  // find an button login
  const elementButton = await driver.findElement(By.id('login'))

  // click the button programmatically
  await elementButton.click()

  // wait for 5000
  await driver.wait(until.titleIs('Document'), 5000)

  // close the browser
  driver.quit()
}

function1()
