# 1주차 4일: REST 설계와 todos CRUD

## 한 줄 요약

할 일(todo)을 메모리 배열에 두고 목록, 단건 조회, 생성, 수정, 삭제 API를 REST 방식으로 만들었다.

## 새로 안 것

- REST는 주소가 자원(명사)을, 메서드가 동작(동사)을 나타낸다. 주소는 `/todos`와 `/todos/:id` 두 종류면 된다.

  | 동작 | 메서드와 주소       | 성공 코드 |
  | ---- | ------------------- | --------- |
  | 목록 | `GET /todos`        | 200       |
  | 단건 | `GET /todos/:id`    | 200       |
  | 생성 | `POST /todos`       | 201       |
  | 수정 | `PATCH /todos/:id`  | 200       |
  | 삭제 | `DELETE /todos/:id` | 204       |

- 주소에 동사를 넣는 방식(`POST /createTodo`)은 RPC다. gRPC, tRPC가 이 계열이다. 로그인처럼 자원으로 표현하기 어색한 것만 동사 주소를 쓴다.
- 완료 처리는 `PATCH /todos/3`에 `{ "done": true }`를 보낸다. 주소를 새로 만들지 않는다.
- 404는 두 가지다. 그런 주소가 없을 때, 그리고 주소는 맞는데 그 데이터가 없을 때.
- 400과 404의 구분: `/todos/abc`는 형식이 틀려서 400, `/todos/999`는 없어서 404.
- 204는 "성공했고 본문은 없다". 삭제하면 돌려줄 게 없어서 쓴다.
- 주소의 `:id`는 문자열로 들어온다(`request.params.id`). `parseInt("1abc")`는 `1`이 되므로 `Number`와 `Number.isInteger`로 검사한다.
- `id`, `done`처럼 서버가 정해야 하는 값은 본문에서 받지 않는다. `title`만 골라 쓴다.
- 검사를 전부 끝낸 뒤에 반영한다. 실패한 요청은 아무것도 바꾸면 안 된다.

## 막힌 것과 원인

- `POST /todos`가 200: `reply.code(201)`을 빠뜨렸다. 본문은 똑같이 나오므로 응답 첫 줄을 봐야 안다.
- 본문 없는 `PATCH`가 500: `request.body`가 `undefined`였다. `const body = request.body ?? {}`로 해결.
- `{"title":"바뀜","done":"yes"}`를 보내면 400인데 제목은 바뀌어 있었다. `title`을 반영한 뒤에 `done`을 검사했기 때문. 검사와 반영을 분리했다.

## 쓸모 있던 명령

```bash
# 엉뚱하게 고친 파일을 커밋된 상태로 되돌리기
git restore week01/day3

# server.ts를 돌리는 Node 프로세스만 모두 끄기 (PowerShell)
Get-CimInstance Win32_Process -Filter "Name='node.exe'" | Where-Object CommandLine -match 'server\.ts' | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
```

## 아직 모르겠는 것

-

## 실행

```bash
npm install --prefix week01/day4
npm run dev --prefix week01/day4
npm run typecheck --prefix week01/day4
```
