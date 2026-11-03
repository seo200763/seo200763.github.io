[ROMS 폴더 사용법]
게임 파일을 아래 '기종 폴더'에 올리면, 그 기종 화면의 게임 목록에 자동으로 나타납니다.
(GitHub Pages 는 폴더 안 파일을 직접 볼 수 없어서 GitHub 의 파일 목록을 읽어 옵니다. 올린 직후엔 몇 분 걸릴 수 있어요 · 목록 오른쪽 위 ↻ 로 새로고침)
이름을 한글로 보이게 하려면 기종 폴더 안에 games.json 을 만들어 {"games":[{"file":"mario.sfc","title":"슈퍼 마리오 월드"}]} 처럼 적으세요.
게임 파일 하나는 GitHub 100MB 이하여야 합니다. (압축 .zip / .7z 가능)

■ 📱 스마트폰 · 태블릿 · PC 모두 원활한 기종  (스마트폰 화면에도 나옵니다)
  게임보이 어드밴스      → ROMS/GBA/
  닌텐도 DS         → ROMS/NDS/
  플레이스테이션        → ROMS/PSX/   (같은 뜻의 폴더 이름: PS1)
  패미컴            → ROMS/NES/   (같은 뜻의 폴더 이름: FC)
  슈퍼 패미컴         → ROMS/SNES/   (같은 뜻의 폴더 이름: SFC, SUPERFAMICOM)
  메가 드라이브        → ROMS/MD/   (같은 뜻의 폴더 이름: MEGADRIVE, GENESIS)
  세가 마스터 시스템     → ROMS/SMS/   (같은 뜻의 폴더 이름: MASTER, SEGAMS)
  게임보이           → ROMS/GB/   (같은 뜻의 폴더 이름: GAMEBOY)
  게임보이 컬러        → ROMS/GBC/   (같은 뜻의 폴더 이름: GAMEBOYCOLOR)
  게임기어           → ROMS/GG/   (같은 뜻의 폴더 이름: GAMEGEAR)
  PC엔진           → ROMS/PCE/   (같은 뜻의 폴더 이름: PCENGINE)
  네오지오 포켓        → ROMS/NGP/   (같은 뜻의 폴더 이름: NGPC, NEOGEOPOCKET)
  원더스완           → ROMS/WS/   (같은 뜻의 폴더 이름: WSC, WONDERSWAN)
  아타리 링스         → ROMS/LYNX/
  버추얼보이          → ROMS/VB/   (같은 뜻의 폴더 이름: VIRTUALBOY)
  아타리 2600       → ROMS/A2600/   (같은 뜻의 폴더 이름: ATARI2600)
  아타리 7800       → ROMS/A7800/   (같은 뜻의 폴더 이름: ATARI7800)
  콜레코비전          → ROMS/COLECO/   (같은 뜻의 폴더 이름: COLECOVISION)
  아케이드           → ROMS/MAME/   (같은 뜻의 폴더 이름: ARCADE)
  MS-DOS         → ROMS/DOS/   (같은 뜻의 폴더 이름: MSDOS)

■ 🖥️ PC 전용 기종  (PC 인터넷 권장 · 스마트폰 화면에는 나오지 않음)
  닌텐도 64         → ROMS/N64/   (같은 뜻의 폴더 이름: NINTENDO64)
  세가 새턴          → ROMS/SATURN/   (같은 뜻의 폴더 이름: SAT)
  세가 CD (메가 CD)  → ROMS/SEGACD/   (같은 뜻의 폴더 이름: MEGACD, SCD)
  세가 32X         → ROMS/32X/   (같은 뜻의 폴더 이름: S32X, SEGA32X)
  3DO            → ROMS/3DO/
  아타리 재규어        → ROMS/JAGUAR/   (같은 뜻의 폴더 이름: JAG)

* 윈도우 3.1 / 95 : os/win31/win31.zip , os/win95/win95.zip (이미지는 os/ 폴더)
* 윈도우 XP       : 이미지를 이 사이트에 올리지 않습니다. 윈도우 XP 화면에서 '다른 사이트의 이미지 주소(URL)'를 입력해 불러옵니다.
                    (winemu.html 안의 XP_DEFAULT_URL 에 주소를 적어 두면 열자마자 자동으로 받아옵니다)
* CD 기종(새턴·세가CD·3DO)은 BIOS/ 폴더에 바이오스가 필요합니다. → BIOS/README.txt


■ 🖼️ 게임 사진(표지) 넣는 법  (게임 목록 화면의 사진 칸)
  1) 게임 파일과 '같은 이름'의 사진(jpg · png · webp · gif)을 같은 폴더에 올리세요.
       예)  ROMS/GBA/젤다의 전설.gba  +  ROMS/GBA/젤다의 전설.jpg
     (게임이 .zip 이면  젤다의 전설.zip + 젤다의 전설.jpg  /  젤다의 전설.zip.jpg 도 인식합니다)
  2) 사진이 없는 게임은 '사진없음' 칸으로 표시됩니다.
  3) games.json 으로 직접 지정하려면  {"file":"zelda.gba","title":"젤다의 전설","cover":"zelda.jpg"}  처럼 cover 를 적으세요.
     장르·발매일·제작사·설명도 적을 수 있어요:  "genre":"액션","year":"1985년 9월 13일","maker":"닌텐도","desc":"한 줄 설명"
  4) 내 브라우저에서만 바로 넣고 싶으면: 게임을 고른 뒤 P 키 (또는 메뉴 → 이 게임 사진 넣기). 이 방식은 그 브라우저에만 저장됩니다.

■ ⌨️ 게임 목록 화면 조작키
  방향키 ← → ↑ ↓ : 게임 / 게임기 고르기     Enter · Space : 결정(게임 시작)     Esc · Backspace : 돌아가기
  F : 즐겨찾기   P : 사진 넣기   / : 검색   M : 메뉴      Home · End · PageUp · PageDown : 빠르게 이동
