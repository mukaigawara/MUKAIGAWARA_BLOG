# rails 小言メモ

## model のバリデーションの発火タイミング

```ruby
 def create
    @article = Article.new(article_params) # [!code highlight]

    if @article.save # [!code error]
      redirect_to @article
    else
      render :new, status: :unprocessable_entity
    end
  end
```

Article に validation がある時、new のタイミングでは validation によりエラーにはならない。

save のタイミングで valdation によりエラーになる。  
[参考 : Rails ガイド 7.4 記事を更新する](https://railsguides.jp/getting_started.html#%E8%A8%98%E4%BA%8B%E3%82%92%E6%9B%B4%E6%96%B0%E3%81%99%E3%82%8B)

## generate model で生成されるファイル群

example :

```bash
$ bin/rails generate model Comment commenter:string body:text article:references
```

result :
| ファイル | 目的 |
| --- | --- |
| db/migrate/<タイムスタンプ>\_create_comments.rb | データベースにコメント用のテーブルを作成するためのマイグレーションファイル |
| app/models/comment.rb | Comment モデル |
| test/models/comment_test.rb | Comment モデルをテストするためのハーネス |
| test/fixtures/comments.yml | テストで使うサンプルコメント |
