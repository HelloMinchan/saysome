// public/electron.ts
import { app, BrowserWindow } from "electron";
import * as isDev from "electron-is-dev";
import * as path from "path";

// Gabage Collection 방지 위해 함수 외부 선언
let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    //alwaysOnTop: true,
    //fullscreen: true,
    //kiosk: !isDev,

    // 실행 시 창 가운데 위치
    center: true,
    // 브라우저 크기 조절 허용
    resizable: true,

    // 브라우저 기본 높이
    width: 900,
    // 브라우저 최소 높이
    height: 600,
    // 브라우저 최소 넓이
    minWidth: 900,
    // 브라우저 최소 높이
    minHeight: 600,

    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (isDev) {
    // 개발 중에는 개발 도구에서 호스팅하는 주소에서 로드
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  } else {
    // 프로덕션 환경에서는 패키지 내부 리소스에 접근
    mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
  }

  // 창 꺼지면 종료
  mainWindow.on("closed", () => {
    mainWindow = undefined!;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
