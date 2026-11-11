[ROMS 폴더 사용법]  — 서버에 롬을 올려 두고 사이트에서 골라서 플레이

1) 기종 폴더에 롬 파일을 올리세요.
   ROMS/
   ├ ATARI2600       아타리 2600        .a26 .bin
   ├ NES             패미컴 / NES       .nes .zip
   ├ MASTERSYSTEM    마스터 시스템      .sms .zip
   ├ PCENGINE        PC 엔진            .pce .zip
   ├ MEGADRIVE       메가드라이브       .md .gen .bin .zip
   ├ GAMEBOY         게임보이           .gb .zip
   ├ LYNX            아타리 링스        .lnx .zip
   ├ SNES            슈퍼패미컴 / SNES  .sfc .smc .zip
   ├ GAMEGEAR        게임기어           .gg .zip
   ├ SEGACD          세가 CD            .iso .chd .zip
   ├ 3DO             3DO                .iso .chd
   ├ JAGUAR          아타리 재규어      .j64 .jag .rom .zip
   ├ PLAYSTATION     플레이스테이션     .iso .img .chd .pbp .zip
   ├ SEGASATURN      세가 새턴          .iso .chd .zip
   ├ SEGA32X         세가 32X           .32x .bin .md .zip
   ├ VIRTUALBOY      버추얼보이         .vb .zip
   ├ NINTENDO64      닌텐도 64          .z64 .n64 .v64 .zip
   ├ NEOGEOPOCKET    네오지오 포켓      .ngp .ngc .zip
   ├ GAMEBOYCOLOR    게임보이 컬러      .gbc .zip
   ├ GAMEBOYADVANCE  게임보이 어드밴스  .gba .zip
   └ NINTENDODS      닌텐도 DS          .nds .zip
   * 마메게임(오락실)은 기존처럼 MAME/ 폴더를 그대로 사용합니다.  (네오지오 바이오스: MAME/_bios/neogeo.zip)
   * 폴더 이름은 위와 똑같이(대문자) 사용해야 합니다.

2) 사이트에서 기종을 누르면 그 폴더의 게임 목록이 나타나고, 게임을 누르면 서버에서 받아 바로 실행됩니다.
   - 게임 하는 중에 위쪽 '게임불러오기' 를 누르면 목록이 다시 나타납니다. (✕ 닫기 로 돌아가기)
   - 목록 오른쪽 위 ↻ 버튼으로 새로고침 (올린 직후엔 1~2분 걸릴 수 있어요)
   - '내 기기의 롬 불러오기' 버튼으로 기존처럼 내 기기의 파일도 계속 쓸 수 있습니다.

3) 한글 게임 이름 (선택)
   ROMS/titles.json 에 아래처럼 적으면 목록에 한글 이름으로 나옵니다. (적지 않으면 파일 이름이 그대로 나옴)
   {
     "NES":  { "super_mario_bros.nes": "슈퍼 마리오 브라더스" },
     "SNES": { "zelda.sfc": "젤다의 전설" }
   }

4) 주의
   - 파일 하나는 GitHub 100MB 이하입니다. (웹 화면에서 올릴 때는 25MB 이하 → 큰 파일은 GitHub Desktop / git 으로)
   - CD 게임(PS1·세가CD·새턴·3DO)은 용량이 커서 100MB 를 넘는 경우가 많아요. .chd 로 줄이면 올릴 수 있는 게임이 있습니다.
     (.cue/.bin 은 zip 한 개로 묶어 올리세요. .cue, .bin 단독 파일은 목록에 나오지 않습니다)
   - CD 기종 바이오스는 BIOS/ 폴더 (BIOS/README.txt).
   - 저장소 전체 용량은 1GB 안쪽을 권장합니다.
   - 게임/바이오스 파일은 본인이 합법적으로 소유한 것만 사용하세요.

5) 목록이 안 뜰 때 (GitHub 목록 조회 횟수 제한 등)
   - ROMS/list.json 이 대신 사용됩니다. 이 파일은 .github/workflows/roms-list.yml 이 롬을 올릴 때마다 자동으로 만들어 줍니다.
   - 자동 생성이 켜져 있지 않다면, 목록이 안 뜨는 동안 '내 기기의 롬 불러오기' 를 쓰면 됩니다.
