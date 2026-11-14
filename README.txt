[윈도우95 게임 런처]
- 기종 선택에서 Windows 95 를 누르면 바로 윈도우가 켜지지 않고 이 게임 목록이 먼저 나옵니다.
- 게임을 고르면 os/win95/win95.zip (윈도우 이미지 1개)로 윈도우가 열리고, 고른 게임 하나만 자동 실행됩니다.

[올릴 파일]
  os/win95/win95.zip      윈도우95 이미지 (zip 안에 .img, 파일명은 소문자 win95.zip)
  WINGAMES/aceman.zip     파이팅 에이스맨 (zip 안에 .img)
  WINGAMES/hschj.zip      환세취호전   (zip 안에 .img)
  WINGAMES/games.json     게임 목록 (이 파일)

[게임 추가하는 법]  games.json 에 항목 하나 추가
  id        영문 구분 이름
  title     목록에 보이는 이름
  file      WINGAMES 안의 zip 파일 이름
  exe       게임 실행파일 전체 경로 (D:\폴더\파일.EXE, 8.3 짧은 이름 권장)
  dir       게임 작업 폴더 (D:\폴더\)
  ram       게임별 메모리 MB (기본 64)
  ramMobile 폰에서 쓸 메모리 MB (기본 32)
  vga       화면 메모리 MB (기본 8)

* 윈도우 이미지는 부팅 시 C:\GAME.TXT 에 적힌 게임을 시작프로그램(Autorun)이 실행하는 구조입니다.
  런처가 고른 게임의 경로를 GAME.TXT 에 메모리 상에서 기록합니다. (원본 이미지는 바뀌지 않음)
* GitHub 는 파일 하나 100MB 이하여야 합니다.
