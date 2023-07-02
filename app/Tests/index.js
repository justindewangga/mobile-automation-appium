const { remote } = require('webdriverio');
const { wdOpts } = require('../Config/config.js')
const objectRepo = require('../Utils/Object Repository/objectRepo.js');
const logWithHeader = require('../Utils/Utils/logUtils')

// 5 Scenario Login Teman Diabetes Apps

async function runTest() {
  const driver = await remote(wdOpts);

  const loginData = [
    { email: 'Username1@gmail.com', password: 'Password1', type: 'negative' },
    { email: '', password: 'Password2', type: 'negative' },
    { email: 'Username3@gmail.com', password: '', type: 'negative' },
    { email: 'indo.traveler14@gmail.com', password: 'Password4', type: 'negative' },
    { email: 'indo.traveler14@gmail.com', password: '$Katasandi123', type: 'positive' },
  ];

  try {

    const onboardLoginButtonElement = await driver.$(objectRepo.onboardLoginButton);

    if (onboardLoginButtonElement.isExisting()) {
      await onboardLoginButtonElement.click();
      logWithHeader('Clicked on onboardLoginButton - PASSED');
    } else {
      logWithHeader('onboardLoginButton not found - SKIPPED');
    }

    for (const data of loginData) {
      const { email, password, type } = data;

      switch (type) {
        case 'positive':

          await driver.$(objectRepo.emailInput).setValue(email);
          logWithHeader('Entered Email - PASSED');

          await driver.$(objectRepo.passwordInput).setValue(password);
          logWithHeader('Entered Password - PASSED');

          await driver.$(objectRepo.submitButton).click();
          logWithHeader('Clicked on Login Button - PASSED');

          await driver.pause(5000);

          await driver.$(objectRepo.agreementUser).click();
          logWithHeader('TnC checkbox has been Checked - PASSED');

          await driver.$(objectRepo.agreementButton).click();
          logWithHeader('Clicked on Agreement Button - PASSED');

          await driver.$(objectRepo.tabProfile).click();
          logWithHeader('Clicked on Bottom Menu Profile - PASSED');

          await driver.pause(5000);

          const userEmailTxt = await driver.$(objectRepo.userEmailTxt).getText();
          const startIndex = userEmailTxt.indexOf(':') + 2;
          const userEmail = userEmailTxt.substring(startIndex).trim();

          await driver.pause(5000);

          if (userEmail != email) {
            logWithHeader('User Email is not match - FAILED');
          } else {
            logWithHeader( userEmail + ' - User Email is match - PASSED');

          }

          await driver.pause(5000);

          break;

        case 'negative':

          await driver.$(objectRepo.emailInput).setValue(email);
          logWithHeader('Entered Email - PASSED');

          await driver.$(objectRepo.passwordInput).setValue(password);
          logWithHeader('Entered Password - PASSED');

          await driver.$(objectRepo.submitButton).click();
          logWithHeader('Clicked on submitButton - PASSED');

          await driver.pause(2000);

          const toastElement = await driver.$(objectRepo.errorToastLogin)
          if (toastElement.isExisting()) {
            logWithHeader('Toast Message has been Display - PASSED');
          } else {
            logWithHeader('Toast Message not Display - FAILED');
          }

          await driver.pause(5000);

          break;

        default:
          logWithHeader('Unknown Type -- SKIPPED');
          break;
      }
    }
  } catch (error) {

    console.error('Test Login Error:', error);

  } finally {
    logWithHeader('Test Login - FINISHED');
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest()