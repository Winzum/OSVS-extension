const byteSize = (str) => new Blob([str]).size;
const browserAPI = window.browser ? browser : chrome;

function openOptions() {
  browserAPI.runtime.openOptionsPage();
}

const optionButton = document.getElementById("options");
optionButton.addEventListener("click", openOptions);

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
        // comparison of sizes is hardcoded to kilobytes here
        let osvsSize = byteSize(results[0].result) / 1000;
        let maxSize = storage.maxsize;

        document.querySelector("#placeholder").textContent =
          "VS: " + osvsSize + "kB" + "\n Max: " + maxSize + "kB";
        browserAPI.runtime.sendMessage({
          alert: osvsSize > maxSize,
          api: browserAPI,
        });
      })
    : (document.querySelector("#placeholder").textContent =
        "OS Viewstate not found")
);
