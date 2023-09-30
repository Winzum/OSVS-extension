const browserAPI = window.browser ? browser : chrome; //determine browser namespace

// Function to save options
function saveOptions(element) {
  element.preventDefault();
  let maxsize = document.querySelector("#vs-maxsize").value;
  browserAPI.storage.local.set({ maxsize: maxsize });
}

// Function to restore options
function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#vs-maxsize").value = result.maxsize || 1000;
  }

  browserAPI.storage.local.get(["maxsize"], (result) => {
    if (browserAPI.runtime.lastError) {
      console.error(
        "Error retrieving maximum size",
        browserAPI.runtime.lastError
      );
    } else {
      setCurrentChoice(result);
    }
  });
}

// Add event listeners
document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
