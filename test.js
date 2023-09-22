const {remote} = require('webdriverio');

const capabilities = {
    /* https://appium.io/docs/en/2.1/guides/caps/ */
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': '25141FDF6002B5',
  'appium:appPackage': 'com.rmj.doccoms.dev',
  'appium:appActivity': 'com.rmj.doccoms.MainActivity',
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  console.log('driver initialised');
  try {
    const loginButton = await driver.$('//android.widget.Button[@content-desc="Login"]');
    await loginButton.click();

    await driver.pause(1000);

    const usernameInput = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[1]/android.widget.FrameLayout[2]/android.webkit.WebView/android.view.View[2]/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText');

    await usernameInput.type('hello world')

  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);