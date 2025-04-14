document.getElementById("saveBtn").addEventListener("click", () => {
  const token = document.getElementById("token").value.trim();
  const pageId = document.getElementById("pageId").value.trim();
  const statusMsg = document.getElementById("statusMsg");

  if (!token || !pageId) {
    statusMsg.textContent = "Both fields are required.";
    statusMsg.style.color = "red";
    return;
  }

  chrome.storage.local.set(
    { NOTION_TOKEN: token, NOTION_PAGE_ID: pageId },
    () => {
      statusMsg.textContent = "SAVED SUCCESSFULY!!";
      statusMsg.style.color = "green";
      setTimeout(() => window.close(), 1000); 
    }
  );
});
