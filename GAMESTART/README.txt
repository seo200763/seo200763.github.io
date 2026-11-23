GAMESTART - 웹 포팅 게임 런처
================================

목표
----
이 폴더는 Windows 3.1/95/98 등의 OS 에뮬레이터와 별개인 "웹 게임 전용" 런처입니다.
게임을 누르면 OS 바탕화면이 아니라 해당 게임의 웹 포트가 실행됩니다.

현재 포함된 예제
----------------
OpenTTD/
  game.json : 브라우저에서 실행할 OpenTTD WebAssembly 포트 정보

OpenTTD는 오픈소스 게임이며, 이 설정은 커뮤니티 웹 포트로 연결합니다.
웹 포트 주소: https://swords02.github.io/openttd-online/play
소스: https://github.com/swords02/openttd-online
처음 실행할 때 웹 포트가 무료 그래픽/사운드 파일을 내려받을 수 있습니다.
외부 프로젝트의 주소와 이용 가능 여부는 운영자가 변경할 수 있습니다.

새 게임 추가하기
----------------
1. GAMESTART 안에 게임별 폴더를 만듭니다. 예: GAMESTART/MyWebGame/
2. 해당 게임의 합법적인 웹 포트 파일을 폴더에 업로드합니다.
   - 정적 웹 게임이면 MyWebGame/index.html 및 관련 .js/.wasm/.data 파일
   - 외부에서 호스팅되는 웹 포트면 game.json에 launchUrl을 지정할 수 있습니다.
3. MyWebGame/game.json을 만듭니다.

예시:
{
  "id": "mywebgame",
  "title": "My Web Game",
  "subtitle": "설명",
  "platform": "PC · Browser",
  "engine": "WebAssembly",
  "status": "playable",
  "folder": "MyWebGame",
  "description": "브라우저에서 바로 실행합니다.",
  "emoji": "🎮"
}

외부 웹 포트 예시:
{
  "id": "example",
  "title": "Example",
  "launchUrl": "https://example.com/play",
  "engine": "WebAssembly",
  "status": "playable"
}

4. GAMESTART/games.json을 업데이트하면 런처에 표시됩니다.
   GitHub 저장소에 포함된 .github/workflows/gamestart-list.yml 및
   scripts/build_gamestart.py가 game.json을 읽어 games.json을 자동 생성합니다.

중요한 제한
------------
- PC용 .exe, .dll, .iso 파일을 이 폴더에 복사한다고 웹에서 자동 실행되지는 않습니다.
- 각 게임마다 WebAssembly/WebGL/HTML5 포트 또는 브라우저 호환 실행 엔진이 필요합니다.
- Windows 게임을 웹으로 포팅하려면 원본 소스 코드, 적법한 포팅 프로젝트 또는 별도의 호환 구현이 필요할 수 있습니다.
- 런처는 게임 파일을 변환하거나 에뮬레이터를 자동 생성하지 않습니다.
- 외부 웹 포트는 iframe 삽입을 차단할 수 있습니다. 이 경우 플레이어의 "새 탭" 또는 "게임 직접 열기"를 사용하세요.
- 게임과 리소스의 라이선스/배포 권한을 확인하세요. 상용 게임 원본 파일을 무단으로 서버에 배포하지 마세요.

기존 OS 폴더
------------
상위 폴더의 os/dos, os/win31, os/win95, os/win98 등은 기존 기능을 위해 그대로 유지됩니다.
GAMESTART는 OS 실행 없이 웹 포팅 게임을 실행하는 별도 영역입니다.
