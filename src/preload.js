// preload stuff

window.OffCliV = "" // get rid of client unsupported message

document.addEventListener("keydown", (event) => {
  if (event.code == "Escape") {
    document.exitPointerLock();
  }
})

window.prompt = () => { // import settings fix
  var tempHTML = '<div class="setHed">Import Settings</div>';
  tempHTML +=
      '<div class="settName" id="importSettings_div" style="display:block">Settings String<input type="url" placeholder="Paste Settings String Here" name="url" class="inputGrey2" id="settingString"></div>';
  tempHTML += '<a class="+" id="importBtn">Import</a>';
  menuWindow.innerHTML = tempHTML;
  importBtn.addEventListener('click',
                             () => { parseSettings(settingString.value); });

  function parseSettings(string) {
    if (string && string != '') {
      try {
        var json = JSON.parse(string);
        for (var setting in json) {
          setSetting(setting, json[setting]);
          showWindow(1);
        }
      } catch (err) {
        console.error(err);
        alert('Error importing settings.');
      }
    }
  }
};
