const req = new XMLHttpRequest();
const baseUrl = "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyCCuyFht3j5OBrLNiRo688gwpD7ZGtrADM";
const urlParams = JSON.stringify({
    "client": {
      "clientId": "BlueMarlin",
      "clientVersion": "0.0.1"
    },
    "threatInfo": {
      "threatTypes":      ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
      "platformTypes":    ["ANY_PLATFORM"],
      "threatEntryTypes": ["URL"],
      "threatEntries": [
        {"url": window.location.href}
      ]
    }
  })

req.open("POST", baseUrl, true);
req.setRequestHeader("Content-type", "application/json");
req.send(urlParams);

req.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE) {
        const response = JSON.parse(this.responseText)
        if (response && Object.keys(response).length) {
            window.stop();
            const threatUrl = response.matches[0].threat.url;
            const typeOfThreat = response.matches[0].threatType;
            location.replace('https://google.com');
            const message = "BlueMarlin warning!!\n " + threatUrl.toString() + "\n is considered a " + typeOfThreat.toString() + " threat.";
            alert(message);
        }
    }
}