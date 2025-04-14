function createIconButton(tweetUrl, tweetElement) {
  const btn = document.createElement("div");
  btn.className = "save-to-notion-button";
  btn.style.display = "flex";
  btn.style.alignItems = "center";
  btn.style.justifyContent = "center";
  btn.style.cursor = "pointer";
  btn.style.marginLeft = "12px";

  const icon = document.createElement("span");
  icon.textContent = "💾";
  icon.style.fontSize = "16px";
  icon.title = "Save to Notion";

  btn.appendChild(icon);

  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    chrome.runtime.sendMessage(
      { tweetUrl }, 
      (response) => {
        if (response?.success) {
          showToast("Tweet embedded in Notion!");
        } else {
          showToast("Failed to save.");
        }
      }
    );
  });

  return btn;
}

function injectButtons() {
  const tweets = document.querySelectorAll("article");

  tweets.forEach((tweet) => {
    if (tweet.querySelector(".save-to-notion-button")) return;

    const tweetLink = tweet.querySelector('a[href*="/status/"]');
    const tweetUrl = tweetLink ? `${window.location.origin}${tweetLink.getAttribute("href")}` : null;
    if (!tweetUrl) return;

    const actionBar = tweet.querySelector('[role="group"]');
    if (actionBar) {
      const saveBtn = createIconButton(tweetUrl, tweet);
      actionBar.appendChild(saveBtn);
    }
  });
}

function showToast(msg) {
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#1d9bf0";
  toast.style.color = "white";
  toast.style.padding = "10px 15px";
  toast.style.borderRadius = "6px";
  toast.style.zIndex = 9999;
  toast.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
  toast.style.fontSize = "14px";
  toast.style.fontWeight = "500";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

const observer = new MutationObserver(injectButtons);
observer.observe(document.body, { childList: true, subtree: true });
injectButtons();
