# Active Record の関連付け <Badge type="danger" text="WIP" />

## 関連付けの例

Article モデル : Comment モデル = 1 : 他 で関連づける例

```ruby
class Comment < ApplicationRecord
  belongs_to :article # [!code highlight]
end
```

migaration ファイルは以下のようになる。

```ruby
class CreateComments < ActiveRecord::Migration[7.2]
  def change
    create_table :comments do |t|
      t.string :commenter
      t.text :body
      t.references :article, null: false, foreign_key: true # [!code highlight]

      t.timestamps
    end
  end
end
```

t.references という行は、article_id という名前の integer 型カラムとそのインデックス、そして articles の id カラムを指す外部キー制約を設定する。

英語にするとわかりやすいらしい。

- 1 件のコメントは 1 件の記事に属する（Each comment belongs to one article）。
- 1 件の記事はコメントを複数持てる（One article can have many comments）。

Article は Comment を複数持つので、以下のようにする。

```ruby
class Article < ApplicationRecord
  has_many :comments # [!code highlight]

  validates :title, presence: true
  validates :body, presence: true, length: { minimum: 10 }
end
```

@article.comments と書くだけでその記事に関連付けられているコメントをすべて取得できる。

## WIP

TODO: https://railsguides.jp/association_basics.html を読んで続きを書く
