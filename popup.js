
document.getElementById("saveTweet").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
});


document.getElementById("saveTweet").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (/^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\//.test(tab.url)) 
    {
    chrome.runtime.sendMessage({ tweetUrl: tab.url }, () => {
      document.getElementById("status").style.display = "block";
    });
  } else {
    alert("Not a Twitter page!");
  }
});


