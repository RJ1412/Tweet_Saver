
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.tweetUrl) {
    fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        "Authorization": "Bearer INTEGRATION_LINK", //Enter your integration id
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
      },
      body: JSON.stringify({
        parent: { page_id: "PAGE ID" }, //Enter your page id
        properties: {
          title: [{ text: { content: message.tweetUrl } }]
        }
      })
    })
    .then(response => response.json())
    .then(data => console.log("Saved to Notion:", data))
    .catch(error => console.error("Notion API Error:", error));
  }
});
