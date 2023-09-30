const byteSize = (str) => new Blob([str]).size;
const browserAPI = window.browser ? browser : chrome;

let [tab] = await browserAPI.tabs.query({ active: true, currentWindow: true });

let results = await browserAPI.scripting.executeScript({
  target: { tabId: tab.id },
  func: () => {
    return document.querySelector("#__OSVSTATE").value;
  },
});

results.then(
  results[0].result
    ? browserAPI.storage.local.get(["maxsize"]).then((storage) => {
        document.querySelector("#placeholder").textContent =
          byteSize(results[0].result) / 1000 +
          "kB" +
          "\n maxsize is " +
          storage.maxsize +
          "kB";
      })
    : (document.querySelector("#placeholder").textContent =
        "OS Viewstate not found")
);
