chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.tweetUrl && message.tweetText) {
    chrome.storage.local.get(["NOTION_TOKEN", "NOTION_PAGE_ID"], (data) => {
      const token = data.NOTION_TOKEN;
      const pageId = data.NOTION_PAGE_ID;

      if (!token || !pageId) {
        alert("Please set your Notion Integration Token and Page ID from the extension popup.");
        return;
      }

      fetch(`https://api.notion.com/v1/blocks/${pageId}/children`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28"
        },
        body: JSON.stringify({
          children: [
            {
              object: "block",
              type: "bulleted_list_item",
              bulleted_list_item: {
                rich_text: [
                  {
                    type: "text",
                    text: {
                      content: `Tweet: ${message.tweetText}`
                    }
                  }
                ]
              }
            },
            {
              object: "block",
              type: "bulleted_list_item",
              bulleted_list_item: {
                rich_text: [
                  {
                    type: "text",
                    text: {
                      content: "Link",
                      link: {
                        url: message.tweetUrl
                      }
                    }
                  }
                ]
              }
            },
            {
              object: "block",
              type: "paragraph",
              paragraph: {
                rich_text: []
              }
            }
          ]
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log("Tweet snippet saved to Notion:", data);
          sendResponse({ success: true });
        })
        .catch(error => {
          console.error("Notion API Error:", error);
          sendResponse({ success: false });
        });
    });

    return true; // Important to keep message channel open
  }
});
