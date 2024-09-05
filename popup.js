document.getElementById('translateButton').addEventListener('click', () => {
    chrome.tabs.executeScript({
        code: "window.getSelection().toString();"
    }, function(selection) {
        let selectedText = selection[0];
        if (selectedText) {
            let url = `https://translate.google.com/?sl=en&tl=ko&text=${encodeURIComponent(selectedText)}&op=translate`;
            chrome.tabs.create({ url: url });
        } else {
            alert("No text selected.");
        }
    });
});
