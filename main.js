const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')
const urlParse = require('url-parse');


let win

function createWindow() {
   win = new BrowserWindow({ width: 800, height: 600 })
   win.loadURL(url.format({
      pathname: path.join(__dirname, '/dist/electron-app/index.html'),
      //pathname: path.join(__dirname, 'index.html'), 
      protocol: 'file:',
      slashes: true
   }))
}

function printURL() {
   win.webContents.openDevTools();
   win.webContents.executeJavaScript(`console.log("here1")`);
   let numArgs = process.argv.length;
   win.webContents.executeJavaScript(`console.log("${numArgs}")`);
   win.webContents.executeJavaScript(`console.log("First Arg: ${process.argv[0]}")`);
   if (process.argv.length >= 2) {
      // app was launched from web browser using custom protocol handeler vymv://
      // process.argv[1] contains the entire url
      win.webContents.executeJavaScript(`console.log("URL: ${process.argv[1]}")`);
      var FullUrl = new urlParse(process.argv[1]);
      var hostname = FullUrl.hostname;
      var pathname = FullUrl.pathname;

      win.webContents.executeJavaScript(`console.log("hostname: ${hostname}")`);
      win.webContents.executeJavaScript(`console.log("pathname: ${pathname}")`);

      // parse url
      let array = pathname.split('/');
      win.webContents.executeJavaScript(`console.log("All parameters below:")`);
      array.forEach(element => {
         win.webContents.executeJavaScript(`console.log("${element}")`);
      });
   }
}



const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
   app.quit()
} else {
   // currrent curring instance
   app.on('second-instance', (event, commandLine, workingDirectory) => {
      // Someone tried to run a second instance, we should focus our window.
      if (win) {
         if (win.isMinimized()) win.restore()
         win.focus()
      }
   })


   app.on('ready', createWindow);
   app.on('ready', printURL);

}


