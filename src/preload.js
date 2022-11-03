// preload stuff

window.OffCliV = "" // get rid of client unsupported message

document.addEventListener("keydown", (event) => {
  if (event.code == "Escape") {
    document.exitPointerLock();
  }
})
