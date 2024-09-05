chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      id: "translateText",
      title: "Translate Selected Text (EN to KO)",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "translateText") {
      let selectedText = info.selectionText;
      let url = `https://translate.google.com/?sl=en&tl=ko&text=${encodeURIComponent(selectedText)}&op=translate`;
      chrome.tabs.create({ url: url });
    }
  });
  