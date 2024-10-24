# Lexical で Composer を使用せず LexicalEditor を使用する

:::info Version
"lexical": "^0.17.1"
:::

## 解決したいこと

**DB に保存された editorState の Json 文字列を、editor や LexicalComposer の外部で変換処理を行いたい場合**

## 問題点

例えば、Module: @lexical/html の、`$generateHtmlFromNodes`は 以下の特徴がある。

- LexicalEditor を引数にとる

| Name       | Type                  |
| ---------- | --------------------- |
| editor     | LexicalEditor         |
| selection? | null \| BaseSelection |

- その LexicalEditor は、通常 LexicalComposer は、`LexicalComposer`内の Context から以下のように取得する。

```ts [~~plugin.tsx]
const [editor] = useLexicalComposerContext();
```

- $イベント系は、editor.read()や update()などの callback 内でしか使えない。

これらの問題点により、ComposerContext の外部で editor をどう使えば良いのか。

## 解決策

### コード全文

```ts
const editor = createEditor({
  ...initialEditorConfig,
  namespace: "forArticle",
});
const parsedEditorState = editor.parseEditorState(lexicalJsonString);

const texts = parsedEditorState.read(() => {
  const htmlText = $generateHtmlFromNodes(editor);
  const plainText = $rootTextContent();
  return { htmlText, plainText };
});
console.log(texts);
```

### createEditor で LexicalEditor の editor を取得する

```ts
const editor = createEditor({
  ...initialEditorConfig,
  namespace: "forArticle",
});
```

この createEditor は lexical から import する。  
lexical/react を使用して、Composer を使用しているなら、本来は内部的に実行されるため使わないメソッドである。

これにより、editor を作成することが可能である。

:::warning nodes の指定に注意
initialConfig の記載を省略しているが、その config には、適用したい Node を全て含むようにしてください。
そうしないと、書式が失われます。

例えば、 `nodes: [AutoLinkNode, HeadingNode]`を Editor で使用しているなら、それらをここの createEditor の initialEditorConfig に含めなければいけません。
:::

### editor.parseEditorState(lexicalJsonString)で editorState を取得する

```ts
const parsedEditorState = editor.parseEditorState(lexicalJsonString);
```

lexicalJsonString は、Lexical による Json の文字列です。  
これにより、それから EditorState を作成することができます。

### parsedEditorState.read コールバックで、$イベントを使う

あとはお好きなイベントを、read のコールバック内で呼び出します。  
EditorState から read することに気をつけてください。

```ts
parsedEditorState.read(() => {
  const htmlText = $generateHtmlFromNodes(editor);
  const plainText = $rootTextContent();
  return { htmlText, plainText };
});
```
