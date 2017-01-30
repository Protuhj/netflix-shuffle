// Saves options to chrome.storage
function save_options() {
  var usePlaylistCurrent = document.getElementById('cbUsePlaylist').checked;
  var textPlaylistCurrent = document.getElementById('textPlaylist').value.trim();
  var textHistoryCurrent = document.getElementById('textHistory').value.trim();
  chrome.storage.sync.set({
    usePlaylist: usePlaylistCurrent,
    playlistText: textPlaylistCurrent,
    historyText: textHistoryCurrent
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}


function restore_options() {
  chrome.storage.sync.get({
    usePlaylist: false,
    playlistText: '',
    historyText: ''
  }, function(items) {
    document.getElementById('cbUsePlaylist').checked = items.usePlaylist;
    document.getElementById('textPlaylist').value = items.playlistText;
    document.getElementById('textHistory').value = items.historyText;
  });
}

function clear_history() {
  var usePlaylistCurrent = document.getElementById('cbUsePlaylist').checked;
  var textPlaylistCurrent = document.getElementById('textPlaylist').value.trim();
  document.getElementById('textHistory').value = '';
  chrome.storage.sync.set({
    historyText: ''
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'History cleared.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('textHistory').addEventListener('click', clear_history);