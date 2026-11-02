[ROMS 폴더 사용법]
기종별 폴더에 게임 파일을 그대로 올리면 홈 > 해당 기종 아이콘 > 게임 목록에 자동으로 나타납니다.
  ROMS/GBA   게임보이 어드밴스   .gba .zip
  ROMS/NDS   닌텐도 DS          .nds .zip
  ROMS/PSX   플레이스테이션      .chd .pbp .iso .zip (bin+cue 는 zip 으로 묶기)
  ROMS/NES   패미컴             .nes .zip
  ROMS/MAME  마메(아케이드)      .zip (롬 그대로, 바이오스는 MAME/_bios/neogeo.zip)
  ROMS/SMS   세가 마스터 시스템   .sms .zip
  ROMS/PCE   PC 엔진            .pce .zip
- 파일 이름이 그대로 게임 제목이 됩니다. (예: ROMS/GBA/포켓몬스터.gba)
- 파일 1개는 100MB 이하여야 GitHub 에 올릴 수 있어요.
- 목록이 안 뜨면 해당 폴더에 games.json 을 만들어 적으세요.
    {"games":[{"file":"포켓몬스터.gba","title":"포켓몬스터 루비"}]}
- 마메는 기존 MAME/ 폴더의 롬도 함께 보여줍니다.
