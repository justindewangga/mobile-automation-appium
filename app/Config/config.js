const {remote} = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'RRCW401R6AV',
  'appium:appPackage': 'com.temandiabetes.android',
  'appium:appActivity': '.MainActivity',
  "appium:newCommandTimeout": 3600,
  "appium:connectHardwareKeyboard": true,
  "appium:autoGrantPermissions": true,
};

const wdOpts = {
  host: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities: capabilities,
};

module.exports = {
    wdOpts,
}
