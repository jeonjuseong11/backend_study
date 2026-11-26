# 1주차 3일: TypeScript와 라우트 파일 나누기

## 한 줄 요약

2일차 Fastify 서버를 TypeScript로 옮기고, 라우트를 `routes/` 아래 파일로 나눴다.

## 새로 안 것

- Node는 `.ts`의 타입을 지우고 실행만 한다. 타입 검사는 하지 않는다. 그래서 확장자만 바꿔도 그냥 동작한다.
- 실행(`npm run dev`)과 타입 검사(`npm run typecheck` = `tsc --noEmit`)는 별개다. 타입 오류가 있어도 서버는 201을 준다.
- `request.body`의 타입은 `unknown`이다. `.name`을 꺼내려면 `app.post<{ Body: { name: string } }>`처럼 모양을 알려 줘야 한다.
- 타입 표기는 약속이지 검사가 아니다. `name: string`이라고 적어도 `{"name":123}`이 그대로 들어와 201이 나왔다.
- 밖에서 온 값은 `typeof`처럼 실행 중에 직접 확인해야 한다.
- 라우트를 `async function xxxRoutes(app: FastifyInstance)`로 묶어 파일로 빼고 `app.register()`로 등록한다. 다른 파일에서는 `app`이 안 보이므로 인자로 받는다.
- 타입만 가져올 때는 `import type`, 파일을 가져올 때는 경로에 `.ts` 확장자를 붙인다.

## 막힌 것과 원인

- `npm error code ENOENT ... backend_study\package.json`: 저장소 최상위에서 `npm run`을 실행했다. `npm run`은 현재 폴더의 `package.json`을 읽는다. `npm run typecheck --prefix week01/day3`으로 해결.
- `Error: listen EADDRINUSE: address already in use ::1:3000`: 서버가 이미 떠 있는데 한 번 더 띄웠다. 포트 하나는 한 프로그램만 쓸 수 있다.
- `/hello`, `/time`을 `server.ts`에 남겨 둔 채 끝난 줄 알았다. 동작은 같아도 구조가 목표와 달랐다.

## tsconfig 옵션 메모

- `strict`: 엄격한 검사. 항상 켠다.
- `noEmit`: `.js`를 만들지 않고 검사만 한다.
- `allowImportingTsExtensions`: `import "./routes/echo.ts"`처럼 확장자를 쓸 수 있게 한다.
- `verbatimModuleSyntax`: 타입은 `import type`으로 가져오게 강제한다.

## 아직 모르겠는 것

-

## 실행

```bash
npm install --prefix week01/day3
npm run dev --prefix week01/day3
npm run typecheck --prefix week01/day3
```
