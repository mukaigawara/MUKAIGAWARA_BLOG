# Active Record の関連付け

## 関連付けの例

Comment モデルと Article を 1 対 1 で関連づける例

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
