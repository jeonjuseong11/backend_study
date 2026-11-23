# 1주차 1일: HTTP와 node:http 첫 서버

## 한 줄 요약

프레임워크 없이 `node:http`만으로 `/hello`, `/time`, `/echo` 세 엔드포인트를 만들었다.

## 새로 안 것

- HTTP 요청은 메서드 + 경로 + 헤더 + 본문, 응답은 상태 코드 + 헤더 + 본문으로 된 글자다.
- 404와 405는 서버가 알아서 주지 않는다. `req.url`과 `req.method`를 보고 직접 써야 한다(라우팅).
- 404는 "그런 주소가 없다", 405는 "주소는 있는데 그 메서드는 안 받는다".
- 본문은 조각으로 와서 `data`/`end` 이벤트로 모아야 하고, 문자열이라 `JSON.parse`를 직접 해야 한다.
- 처리 안 한 에러 하나가 서버 전체를 죽인다. 잘못된 입력에는 `try/catch`로 400을 돌려준다.

## 막힌 것과 원인

- `ReferenceError: res is not defined`: `sendJson`을 콜백 밖으로 옮기면서 `res`를 인자로 받지 않았다. 콜백 안의 변수는 밖에서 안 보인다.
- `sendJson(200, {...})`로 호출해서 인자가 한 칸씩 밀렸다. 함수 인자를 바꾸면 호출하는 곳도 전부 바꿔야 한다.
- `/echo` 응답의 `data`가 객체가 아니라 문자열로 나갔다. `body`를 `JSON.parse` 없이 그대로 넣었기 때문.
- PowerShell 7에서 `curl.exe -d`에 JSON을 넘길 때는 `'{"name":"test"}'`처럼 역슬래시 없이 쓴다.

## 에러 읽는 법

- `curl: Connection was reset`: 서버가 요청을 받았다가 처리 중 죽었다.
- `curl: Failed to connect`: 서버가 아예 안 떠 있다.
- 스택 트레이스는 `server.mjs:4:3`처럼 내 파일 이름이 나오는 줄부터 본다.

## 아직 모르겠는 것

-

## 실행

```bash
node --watch week01/day1/server.mjs
```
