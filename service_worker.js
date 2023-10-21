const iconNormalPath = {
  path: {
    16: "/images/icon-16.png",
    32: "/images/icon-32.png",
    128: "/images/icon-128.png",
  },
};

const iconAlertPath = {
  path: {
    16: "/images/icon-alert-16.png",
    32: "/images/icon-alert-32.png",
    128: "/images/icon-alert-128.png",
  },
};

function alertIcon(message) {
  if (message.alert) {
    chrome.action.setIcon(iconAlertPath);
  } else {
    chrome.action.setIcon(iconNormalPath);
  }
}

chrome.runtime.onMessage.addListener(alertIcon);
