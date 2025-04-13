document.getElementById("saveBtn").addEventListener("click", () => {
  const token = document.getElementById("token").value;
  const pageId = document.getElementById("pageId").value;

  chrome.storage.local.set({ NOTION_TOKEN: token, NOTION_PAGE_ID: pageId }, () => {
    window.close();
  });
});
