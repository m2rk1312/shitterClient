// Fork of JANREX - https://github.com/giantninja908/JANREX

const { app, BrowserWindow, screen } = require("electron");
const path = require('path');

const { shell } = require('electron');

let win;

const init =
  () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    win = new BrowserWindow({
      width: width,
      height: height,
      fullscreen: true,
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      }
    })

    win.removeMenu();
    win.loadURL('https://krunker.io');

    win.once("ready-to-show", () => { win.show(); });
    win.webContents.on('before-input-event', (event, input) => {
      if (input.key === "F11") { win.setFullScreen(!win.isFullScreen()); event.preventDefault() }
      if (input.key === "F5") { win.reload(); event.preventDefault() }
    });
    win.on('close', () => { app.quit() });
    win.webContents.on('new-window', (event, url, _, __, options) => {
      if (!url)
        return;
      if (url.startsWith('https://twitch.tv/') ||
        url.startsWith('https://www.twitch.tv') ||
        url.startsWith('https://www.youtube.com/')) {
        event.preventDefault();
        shell.openExternal(url);
        return;
      } else {
        event.preventDefault();
        const newWin = new BrowserWindow({
          width: width * 0.75,
          height: height * 0.9,
          webContents: options.webContents,
          show: false,
          autoHideMenuBar: true,
        });
        win.on('close', () => {
          if (newWin)
            newWin.close()
        })
        newWin.once('ready-to-show', () => newWin.show());
        if (!options.webContents) {
          newWin.loadURL(url);
        }
        event.newGuest = newWin;
      }
    });
  }

const addSwitches =
  () => {
      app.commandLine.appendSwitch("force_high_performance_gpu");
      app.commandLine.appendSwitch("force-high-performance-gpu");
      app.commandLine.appendSwitch("disable-breakpad");
      app.commandLine.appendSwitch("disable-component-update");
      app.commandLine.appendSwitch("disable-print-preview");
      app.commandLine.appendSwitch("disable-metrics");
      app.commandLine.appendSwitch("disable-metrics-repo");
      app.commandLine.appendSwitch("enable-javascript-harmony");
      app.commandLine.appendSwitch("enable-future-v8-vm-features");
      app.commandLine.appendSwitch("enable-webgl2-compute-context");
      app.commandLine.appendSwitch("disable-hang-monitor");
      app.commandLine.appendSwitch("no-referrers");
      app.commandLine.appendSwitch("renderer-process-limit", 100);
      app.commandLine.appendSwitch("max-active-webgl-contexts", 100);
      app.commandLine.appendSwitch("enable-quic");
      app.commandLine.appendSwitch("high-dpi-support", 1);
      app.commandLine.appendSwitch("ignore-gpu-blacklist");
      app.commandLine.appendSwitch("disable-2d-canvas-clip-aa");
      app.commandLine.appendSwitch("disable-bundled-ppapi-flash");
      app.commandLine.appendSwitch("disable-logging");
      app.commandLine.appendSwitch("disable-web-security");
      app.commandLine.appendSwitch("webrtc-max-cpu-consumption-percentage=100");
      app.commandLine.appendSwitch('disable-frame-rate-limit');
      app.commandLine.appendSwitch("disable-gpu-vsync");
      app.commandLine.appendSwitch("in-process-gpu");
  }

addSwitches();
app.on('ready', init);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
