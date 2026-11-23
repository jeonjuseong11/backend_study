# 1주차 2일: Fastify로 옮기기

## 한 줄 요약

1일차에 `node:http`로 만든 `/hello`, `/time`, `/echo`를 Fastify로 다시 만들고 둘을 비교했다.

## 새로 안 것

- 1일차에 직접 만든 것을 Fastify가 대신한다.

  | 1일차 | Fastify |
  |---|---|
  | `if (req.url ...)`, `if (req.method ...)` | `app.get()`, `app.post()` |
  | `sendJson(res, 200, {...})` | `return {...}` |
  | `data`/`end` + `JSON.parse` | `request.body` |
  | `try/catch` → 400 | 자동 |
  | 맨 끝 `else` → 404 | 자동 |

- Fastify는 메서드와 주소를 묶어 하나의 라우트로 본다. 그래서 `POST /hello`는 405가 아니라 404가 나온다.
- 라우트 안에서 에러가 나도 Fastify가 잡아서 500으로 응답하고 서버는 죽지 않는다.
- `return`만 하면 200이다. 다른 상태 코드는 `reply.code(201)`처럼 직접 정한다.
- 응답 모양(API 계약)을 바꾸면 그 API를 쓰는 프론트가 깨진다.
- `.js`에서 `import`를 쓰려면 `package.json`에 `"type": "module"`이 필요하다.

## 막힌 것과 원인

- `/echo`에 `{"age":20}`을 보냈는데 201이 나왔다. `reply.code(201)`만 넣고 `name` 검사를 안 넣었기 때문.
- 본문 없이 `POST /echo`를 보내니 500, `Cannot read properties of undefined (reading 'hasOwnProperty')`. 본문이 없으면 `request.body`가 `undefined`다. `request.body?.hasOwnProperty("name")`로 고쳐 400이 나오게 했다.
- 프레임워크가 서버를 살려 주긴 하지만, 올바른 상태 코드를 고르는 건 내 몫이다. 클라이언트 잘못은 500이 아니라 400.

## 기타

- 같은 포트를 두 프로그램이 쓰면 `EADDRINUSE` 에러가 난다. 1일차 서버를 끄고 실행한다.
- Node `v24.13.0`은 보안 패치가 밀린 버전이었다. 같은 24 계열 최신으로 올린다: `winget upgrade --id OpenJS.NodeJS.24`

## 아직 모르겠는 것

-

## 실행

```bash
cd week01/day2
npm install
node --watch server.js
```
