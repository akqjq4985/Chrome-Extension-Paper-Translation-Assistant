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
    chrome.windows.create({ url: url, type: 'popup', width: 800, height: 600 });
  }
});

chrome.commands.onCommand.addListener(function(command) {
  if (command === "translate_shortcut") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs[0]) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => window.getSelection().toString()
        }, function(results) {
          let selectedText = results[0].result;
          if (selectedText) {
            let url = `https://translate.google.com/?sl=en&tl=ko&text=${encodeURIComponent(selectedText)}&op=translate`;
            chrome.windows.create({ url: url, type: 'popup', width: 800, height: 600 });
          } else {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              func: () => alert("No text selected.")
            });
          }
        });
      } else {
        console.error('No active tab found');
      }
    });
  }
});


