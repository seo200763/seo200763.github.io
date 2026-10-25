[GAMEROM 폴더 사용법]

기종에 맞는 폴더에 롬 파일을 올리면, 사이트 하단 독의 '게임' → 해당 기종 아이콘을 눌렀을 때
목록에 자동으로 나타나고, 게임을 누르면 바로 실행됩니다. (GitHub Pages 에 올리면 끝)

폴더            기종              넣을 수 있는 파일
-----------------------------------------------------------------
NES             NES               .nes .fds .unf .zip
SNES            SNES              .sfc .smc .fig .swc .zip
GBC             게임보이 컬러      .gbc .gb .zip
GBA             게임보이 어드밴스   .gba .zip
N64             닌텐도 64          .z64 .n64 .v64 .zip
NDS             닌텐도 DS          .nds .zip
GENESIS         세가 제네시스       .md .gen .smd .bin .zip
MASTERSYSTEM    세가 마스터시스템   .sms .zip
SEGACD          세가 CD            .chd .iso .zip (cue+bin 은 zip 으로 묶기)
SEGA32X         세가 32X           .32x .bin .md .smd .zip
SATURN          세가 새턴          .chd .iso .zip (cue+bin 은 zip 으로 묶기)
NEOGEO          네오지오           .zip (롬은 압축을 풀지 말고 zip 그대로)
MAME            마메게임           .zip .7z (압축을 풀지 말고 그대로)
DOS             MS-DOS            .zip (안에 exe / com / bat 가 있는 게임 폴더를 zip 으로)
WIN31           윈도우 3.1         win31.zip (기본 포함) 또는 다른 .img .iso .zip
WIN95           윈도우 95          win95.zip (기본 포함) 또는 다른 .img .iso .zip

[바이오스]  GAMEROM/_BIOS/
- neogeo.zip   : 네오지오 게임용 (기본 포함, 자동으로 합쳐져 실행됩니다)
- 세가 CD      : bios_CD_U.bin (또는 bios_CD_E.bin / bios_CD_J.bin) 를 넣으세요. 이름이 segacd 또는 bios_cd 로 시작해야 인식됩니다.
- 세가 새턴    : saturn_bios.bin 또는 sega_101.bin 등 (이름이 saturn / sega_101 로 시작). 없어도 실행되는 게임이 있습니다.

[참고]
- 게임 파일 하나는 GitHub 100MB 이하여야 합니다. (큰 CD 게임은 .chd 로 변환하면 작아집니다)
- 올린 직후에는 목록 반영에 1~2분 걸릴 수 있습니다. 목록 오른쪽 위 ⟳ 로 새로고침하세요.
- 게임 이름을 한글로 보이게 하려면 GAMEROM/titles.json 을 만드세요.
    {"Super_Mario.nes":"슈퍼 마리오", "kof98":"킹 오브 파이터즈 98"}
  (파일 이름 전체 또는 확장자를 뺀 이름 둘 다 쓸 수 있습니다)
- GitHub 요청 한도(시간당 60회)를 넘어 목록이 안 뜨면, 각 폴더에 list.json 을 두면 대신 읽습니다.
    ["Super_Mario.nes","Contra.nes"]
- 롬 파일은 본인이 합법적으로 보유한 것만 사용하세요. 이 저장소에는 게임 롬이 들어 있지 않습니다.
- 에뮬레이터 엔진: EmulatorJS (인터넷 연결 필요, cdn.emulatorjs.org) · DOS: js-dos · 윈도우: v86 (emu-v86 폴더)
