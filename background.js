chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.tweetUrl) {
    chrome.storage.local.get(["NOTION_TOKEN", "NOTION_PAGE_ID"], (data) => {
      const token = data.NOTION_TOKEN;
      const pageId = data.NOTION_PAGE_ID;

      if (!token || !pageId) {
        alert("Please set your Notion Integration Token and Page ID from the extension popup.");
        return;
      }

      const { tweetUrl } = message;

      const children = [
        {
          object: "block",
          type: "embed",
          embed: {
            url: tweetUrl
          }
        }
      ];

      fetch(`https://api.notion.com/v1/blocks/${pageId}/children`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28"
        },
        body: JSON.stringify({
          children
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log("Tweet embedded in Notion:", data);
          sendResponse({ success: true });
        })
        .catch(error => {
          console.error("Notion API Error:", error);
          sendResponse({ success: false });
        });
    });

    return true;
  }
});
