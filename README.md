# 영호의 게임에뮬레이터 (새 디자인)
- index.html : 로그인 (비밀번호 찾기 = GitHub 토큰 확인) · 아이디/비밀번호는 auth.js 의 ACC 에서 변경
- home.html  : 홈 / 게임찾기 / 즐겨찾기 / 설정 / 기종별 게임 목록 (PC·태블릿·스마트폰 반응형)
- gamehub.js : 기종 10개 설정 + ROMS/<기종>/ 폴더 목록 읽기
- mplay.html : 스마트폰용 게임 실행 (기존 emuhost.html 에뮬레이터 사용)
- pcplay.html: PC·태블릿용 게임 실행 (EmulatorJS 전체화면 · 키보드/게임패드)
- winemu.html + winemu-luxe.css : 윈도우 3.1 / 95 에뮬레이터 (고급스러운 새 디자인)
- ROMS/<GBA|NDS|PSX|NES|MAME|SMS|PCE>/ : 게임 파일을 올리는 폴더 (자세한 방법은 폴더 안 README.txt)
- index-old.html : 예전 첫 화면(보관용)

---
# 영호의 게임에뮬레이터
정적 사이트(PHP 없음) — GitHub Pages에 그대로 업로드하세요.
- index.html : 사이트 전체 (콘솔 + 마메게임 EmulatorJS + DOS/Windows v86)
- dex.html   : 바탕화면 모드 (DeX 스타일 · 앱 서랍(게임 에뮬레이터 2D 아이콘 · 기종 검색) · 소프트키 · 시작 메뉴 · 키 없이 쓰는 유튜브 게임 검색 브라우저)
- mamegame.js: 마메게임 공통 코드 (게임 목록 · 네오지오 바이오스 자동 합치기 · 코어 자동 전환)
- MAME/      : 마메게임 롬(zip) 폴더 (바이오스는 MAME/_bios/neogeo.zip)
- os/        : DOS·Windows 이미지 폴더 (예: os/win31/win31.zip)
- v86/       : (선택) v86 로컬 파일

[윈도우 에뮬레이터]
- 윈도우/DOS 에뮬레이터는 index.html 안의 PC 에뮬레이터 화면(test1206 버전)을 사용합니다. (pcemu 폴더는 제거됨)
- index 접속 시에는 os/ 폴더의 이미지를 불러오지 않습니다.
- 윈도우 항목을 눌러 에뮬레이터에 들어가는 순간, 해당 버전의 이미지(os/<id>/<id>.zip)만 서버에서 받으며 진행률·남은 시간이 표시된 뒤 자동으로 시작합니다.
- Windows 95 이미지: os/win95/win95.zip

[마메게임]
- MAME/ 폴더에 롬(zip)을 올리면 '마메게임' 화면 목록에 자동으로 나타납니다. (자세한 방법: MAME/README.txt)
- 네오지오 게임은 MAME/_bios/neogeo.zip 이 자동으로 합쳐져 실행됩니다.
- 내 기기의 롬(zip)을 직접 불러와 실행할 수도 있습니다.
- 엔진: FinalBurn Neo → MAME 2003-Plus (시작이 안 되면 자동 전환, 화면 위 '코어' 버튼으로 수동 변경)

[PC용 추가 기종] (10월 29일)
- 추가된 기종: 세가 CD · 3DO · 아타리 재규어 · 세가 새턴 · 세가 32X  (PC 사양에 맞춘 설정 적용, 처음 실행할 때 PC용 안내창 표시)
- 준비중 카드: 드림캐스트 · PS2 · 게임큐브 · Wii — 사용 중인 엔진(EmulatorJS)에 코어가 없어 아직 실행할 수 없습니다.
- emudata.js 항목의 pc:1 = PC용 안내·PC 옵션 적용, soon:1 = 준비중. (공통 코드: pcnotice.js)
- BIOS/ 폴더에 바이오스를 올려 두면 자동으로 사용합니다. (BIOS/README.txt)
- 저사양 전용 화면(lowend.html)에는 PC용·준비중 기종이 나오지 않습니다.

[레트로 스킨 / 고전게임런처] (11월 2일)
- pixel.css : 로그인(index.html)·홈(home.html)·런처 공용 레트로 아케이드 스킨 (CRT 주사선, 도트 테두리, 네온 색). 각 html 의 pixel.css 링크를 지우면 원래 디자인으로 돌아갑니다.
- winemu-luxe.css : 윈도우 에뮬레이터(winemu.html) 레트로 스킨
- winlauncher.html : 두기의 고전게임런처 방식 — Windows 95 / 3.1 아이콘을 누르면 윈도우가 바로 켜지지 않고 이 화면이 열립니다.
  게임 이미지를 고른 뒤 [게임 실행]을 누르면 서버의 윈도우 이미지(os/win95/win95.zip)를 받아 부팅하면서, 고른 이미지를 CD-ROM 또는 플로피(A:)에 자동으로 넣습니다.
- 게임 이미지 폴더 : ROMS/WIN95/ , ROMS/WIN31/  (자세한 방법은 폴더 안 README.txt)
- 한글 도트 폰트(Galmuri11 등)를 쓰려면 fonts/Galmuri11.woff2 파일을 넣으세요.
