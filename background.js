chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.tweetUrl) {
    chrome.storage.local.get(["NOTION_TOKEN", "NOTION_PAGE_ID"], (data) => {
      const token = data.NOTION_TOKEN;
      const pageId = data.NOTION_PAGE_ID;

      if (!token || !pageId) {
        alert("Please set your Notion Integration Token and Page ID from the extension popup.");
        return;
      }

      fetch("https://api.notion.com/v1/pages", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28"
        },
        body: JSON.stringify({
          parent: { page_id: pageId },
          properties: {
            title: [
              {
                text: { content: "Tweet: " + message.tweetUrl }
              }
            ]
          }
        })
      })
      .then(response => response.json())
      .then(data => console.log("Saved to Notion:", data))
      .catch(error => console.error("Notion API Error:", error));
    });
  }
});
