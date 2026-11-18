[js-dos 엔진을 내 서버에 올려두는 방법]  (한 번만 하면 외부 사이트 없이 바로 실행됩니다)

1) PC에서 받기 (둘 중 하나)
   - 주소창에 https://v8.js-dos.com/latest/js-dos.js 와 js-dos.css 를 열어 각각 다른 이름으로 저장
     + 같은 주소의 /emulators/ 폴더 안 파일들(wdosbox.js, wdosbox.wasm, dosbox.js, dosbox.wasm 등)
   - 또는 npm 으로:  npm i js-dos   →  node_modules/js-dos/dist 폴더 통째로 사용

2) 닷홈 FTP 로 이렇게 올리기
   assets/jsdos/js-dos.js
   assets/jsdos/js-dos.css
   assets/jsdos/emulators/   (폴더째)

dos.html 은 이 폴더를 가장 먼저 찾고, 없으면 외부 주소를 차례로 시도합니다.
