chrome.contextMenus.create({
  "title": "Open with Lori",
  "contexts": ["image"],
  "id": "import_link"
});

let windowId = 0;

chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId === 'import_link') {
    // console.log(info);

    // see if there is a window
    chrome.windows.get(windowId, new Object(), function (window) {
      if (window) {
        chrome.windows.remove(windowId)
      }

      chrome.windows.create({
        url: "popup.html#/?link=" + encodeURIComponent(info.srcUrl),
        focused: true,
        type: 'popup',
        width: 816,
        height: 640
      }, function (window) {
        windowId = window.id;
      });
    })



  }
});