var isExtensionOn = true;

var button = document.getElementById("switchButton");

chrome.storage.local.get(["blueMarlinStatus"]).then((result) => {
    if (result && result.blueMarlinStatus != false) {
        button.textContent = "Disable";
        chrome.runtime.sendMessage({cmd: "setOnState"});
    } else {
        button.textContent = "Enable";
        chrome.runtime.sendMessage({cmd: "setOffState"});
    }
});

function toggleButton() {

    if (button.textContent === "Disable") {
        button.textContent = "Enable";
        chrome.runtime.sendMessage({cmd: "setOffState"}); 
        alert("BlueMarlin was set to sleep.")
    } else {
        button.textContent = "Disable";
        chrome.runtime.sendMessage({cmd: "setOnState"});
        alert("BlueMarlin had awakened.");
    }
}

button.onclick = toggleButton;