# 인수인계: seo200763.github.io 디자인 작업 (2026-11-13)

## 완료
1. index.html -> '영호의 게임세상' 네온 픽셀 시안 적용 (menuicons/n-*.webp 사용, 메뉴 버튼 안에 설치/세이브/사용법/공지/RomSite/WEBGAMES/방문자/캐쉬삭제/데이터삭제 유지)
2. emulator.html 의 #rp(기종 선택 홈) -> 파란 애니 캐릭터 시안 적용
   - 시안(emuicons/bg.webp)을 16:9 배경으로 쓰고, 패널 영역만 실제 스크롤 그리드로 덮음 (좌표는 1672x941 기준 --u 단위)
   - 타일 이미지 11장(emuicons/*.webp): atari2600 nes sms pce md gb lynx snes gg segacd 3do
   - 이미지 없는 기종(jaguar, psx 등)과 PC/도구는 기존 아이콘을 파란 카드로 표시
   - 세로 화면은 emuicons/title.webp + 2열 그리드로 별도 배치
   - JS는 tile()/IMGT 만 수정, 나머지 기능(openEmu 등) 그대로

## 남은 일 / 메모
- Atari Jaguar 등 나머지 기종 타일 이미지 미제공 (받으면 emuicons/<id>.webp 추가 + emulator.html 의 IMGT 에 id 추가)
- 실제 화면 캡처 확인은 못 함 (패널 위치가 어긋나면 .pn/.sc/.stt 좌표 조정)
- 사용자 선호: 수정본은 먼저 아티팩트 미리보기로, 파일은 요청 시에만 전달
- 원본 zip(seo200763_github_io-main.zip)과 시안/타일 원본 이미지는 이 압축에 없음 (다시 업로드 필요)
