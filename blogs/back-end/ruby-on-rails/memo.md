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

## 簡単に作れる BASIC 認証

Controller ごとに BASIC 認証を作れる。
Rails の `http_basic_authenticate_with` メソッドを使う

```ruby
class ArticlesController < ApplicationController
  http_basic_authenticate_with name: "dhh", password: "secret", except: [:index, :show] # [!code highlight]

  def index
    @articles = Article.all
  end

  #（以下省略）
end
```

## destroy_by が便利

where + destroy_all を、素早くかける
https://api.rubyonrails.org/classes/ActiveRecord/Relation.html#method-i-destroy_by

```ruby
# == FlowProcess.where(name: delete_flow_process_labels).destroy_all
FlowProcess.destroy_by(flow_id: id, name: delete_flow_process_labels)
```
