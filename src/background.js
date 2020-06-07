chrome.contextMenus.create({
  "title": "Open with Lori",
  "contexts": ["image"],
  "id": "import_link"
});

let windowId = 0;

function openLoriWindow(url) {
  // see if there is a window
  chrome.windows.get(windowId, new Object(), function (window) {
    if (window) {
      chrome.windows.remove(windowId);
    }

    let location = "popup.html";
    if(url) {
      location += "#/?link=" + encodeURIComponent(url);
    }

    chrome.windows.create({
      url: location,
      focused: true,
      type: 'popup',
      width: 1024,
      height: 640
    }, function (window) {
      windowId = window.id;
    });
  })
}

chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId === 'import_link') {

    openLoriWindow(info.srcUrl);
  }
});

chrome.browserAction.onClicked.addListener(function () {
  openLoriWindow();
});