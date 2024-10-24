# クエリについて <Badge type="danger" text="WIP" />

クエリは、要素を見つける方法。
いくつか種類がある。

要素を取得し、それに対して Events API なのでユーザー操作をシュミレートし、テストしていく。  
なので、まずは要素の取得が必須である。

## クエリの種類

取得のクエリはいろいろある。  
<Spacer height={40} />
以下は使うべき優先度順である。

| クエリタイプ    | 0 件一致       | 1 件一致   | 複数件一致     | リトライ（Async/Await） |
| --------------- | -------------- | ---------- | -------------- | ----------------------- |
| **単一の要素**  |                |            |                |                         |
| `getBy...`      | エラーを投げる | 要素を返す | エラーを投げる | いいえ                  |
| `queryBy...`    | `null`を返す   | 要素を返す | エラーを投げる | いいえ                  |
| `findBy...`     | エラーを投げる | 要素を返す | エラーを投げる | はい                    |
| **複数の要素**  |                |            |                |                         |
| `getAllBy...`   | エラーを投げる | 配列を返す | 配列を返す     | いいえ                  |
| `queryAllBy...` | `[]`を返す     | 配列を返す | 配列を返す     | いいえ                  |
| `findAllBy...`  | エラーを投げる | 配列を返す | 配列を返す     | はい                    |

### getByRole

- アクセシブルな名前で取得できる
  - ここの要素 https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree
  - 例：button input など
- 最優先で使うべきである。
- これが使えないなら、アクセシブルでない可能性あり.

### getByLabelText

- フォームフィールドに最適である。
- area-label="あああ"　とかから、あああで取得できる

### getByText

- フォーム以外の、テキストコンテンツを見つける。
- 非インタラクティブな要素 (div、span、段落など) を見つけるために使用できる。

### getByDisplayValue

- フォーム要素の現在の値は、入力された値を使用してページをナビゲートするときに役立ちます。とのこと。どゆこと？

## クエリの使用例

### 単一要素の検索

```js
import { render, screen } from "@testing-library/react";

test("ログインフォームが表示されること", () => {
  render(<Login />);
  const input = screen.getByLabelText("Username");
  // イベントやアサーションの処理...
});
```

### 複数要素の検索

```js
const items = screen.getAllByRole("listitem");
```
