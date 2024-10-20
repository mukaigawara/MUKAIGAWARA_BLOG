---
title: ActiveRecodeの基礎
---

# ActiveRecode の基礎 <Badge type="danger" text="WIP" />

## AcitiveRecord について

- ActiveRecord は、MVC の M
- ORM である。

::: warning ActiveModel との違いは？
ActiveModel は、DB がなくても良いオブジェクトのデータをモデル化するのに対し、ActiveRecord は、DB を使う必要があるオブジェクトを扱う。
:::

### ORM とは

- ORM は、オブジェクト/リレーショナルマッピング
- オブジェクトを、RDBMS のテーブルに接続する技術
- Rails アプリケーションの場合、Ruby オブジェクト

- SQL を書かずに、DB の操作を行える
  - モデルおよびモデル内のデータを表現する
  - モデル同士の関連付け（association: アソシエーション）を表現する
  - 関連付けられているモデル間の継承階層を表現する
  - データをデータベースで永続化する前にバリデーション（検証）を行なう
  - データベースをオブジェクト指向スタイルで操作する

## 命名規則

例えば、`Book`というモデルクラスがある場合、これに対応する DB のテーブルは、複数形の`books`になる。

これは ActiveSupport の`pluralize`メソッドが使われている。

モデルのクラス名が 2 語以上の複合語である場合、キャメルケースにする。

- モデルのクラス名: 単数形、語頭を大文字にする（例: BookClub）
- データベースのテーブル名: 複数形、語はアンダースコアで区切る（例: book_clubs）

| モデル / クラス | テーブル / スキーマ |
| --------------- | ------------------- |
| Article         | articles            |
| LineItem        | line_items          |
| Product         | products            |
| Person          | people              |

## スキーマの規約

- 主キー（primary key）: デフォルトでは、Active Record はテーブルの主キーとして id という名前の整数型カラムを利用
  - PostgreSQL、MySQL、MariaDB の場合は bigint 型、SQLite の場合は integer 型
- 外部キー（foreign key）:単数形のテーブル名\_id パターンに沿って命名する

  - （例: order_id、line_item_id）

- created_at: レコード作成時に現在の日付時刻が自動的に設定されます
- updated_at: レコード作成時や更新時に現在の日付時刻が自動的に設定されます
- lock_version: モデルに optimistic locking を追加します
- type: モデルで Single Table Inheritance（STI）を使う場合に指定します
- 関連付け名\_type: ポリモーフィック関連付けの種類を保存します
- テーブル名\_count: 関連付けにおいて、所属しているオブジェクトの個数をキャッシュするのに使われます。たとえば、Article クラスが has_many で Comment と関連付けられている場合、articles テーブルの comments_count カラムには記事ごとに既存のコメント数がキャッシュされます。

::: warning 予約語に気をつけて！
これらのカラム名はオプションであり、必須ではないが、Active Record で予約されている。特別な理由のない限り、これらの予約済みカラム名と同じカラム名の利用はしない。  
たとえば、type は STI を指定するために予約されている。 STI を使わない場合であっても、モデル化するデータを適切に表す別の語を検討する。
:::

## AcitiveRecord のモデルを生成する

```ruby
class Book < ApplicationRecord
end
```

上のコードで作成される Book モデルは、DB 内の books テーブルに対応付けられ、このテーブル内の各カラムが Book クラスの属性に対応付けられる。  
Book モデルの 1 個のインスタンスが、books テーブル内の 1 行を表現できる。  
id 、title 、author カラムを持つ books テーブルは、次のような SQL ステートメントで作成できる。

```sql
CREATE TABLE books (
  id int(11) NOT NULL auto_increment,
  title varchar(255),
  author varchar(255),
  PRIMARY KEY  (id)
);
```

これは通常 SQL を叩かずに、マイグレーションで作る。

```bash
$ bin/rails generate migration CreateBooks title:string author:string
```

これを実行すると、以下のマイグレーションが生成される。

```ruby
# Note:
# The `id` column, as the primary key, is automatically created by convention.
# Columns `created_at` and `updated_at` are added by `t.timestamps`.

# db/migrate/20240220143807_create_books.rb
class CreateBooks < ActiveRecord::Migration[7.2]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author

      t.timestamps
    end
  end
end
```

これらの属性にアクセスするには、以下のようにする。

```bash
irb> book = Book.new
=> #<Book:0x00007fbdf5e9a038 id: nil, title: nil, author: nil, created_at: nil, updated_at: nil>

irb> book.title = "The Hobbit"
=> "The Hobbit"
irb> book.title
=> "The Hobbit"
```

## 名前空間付きモデルを作成する

デフォルトの Active Record モデルは、app/models ディレクトリの下に配置される。  
ただし、互いによく似たいくつかのモデルを独自のフォルダと名前空間の下にまとめて配置して、モデルを整理することも可能。

たとえば、app/models/book ディレクトリの下に order.rb ファイルと review.rb ファイルを置いて、それぞれ Book::Order と Book::Review という名前空間付きのクラス名を付けるというように、Active Record では名前空間モデルを作成できる。

Book という名前のモジュールがまだ存在していなければ、以下のように generate コマンドですべてを作成できる。

```bash
$ bin/rails generate model Book::Order
      invoke  active_record
      create    db/migrate/20240306194227_create_book_orders.rb
      create    app/models/book/order.rb
      create    app/models/book.rb
      invoke    test_unit
      create      test/models/book/order_test.rb
      create      test/fixtures/book/orders.yml
```

::: warning Book という名前のモジュールがすでに存在する場合
以下のように、名前空間の衝突を解決するように求められる。

```bash
$ bin/rails generate model Book::Order
      invoke  active_record
      create    db/migrate/20240305140356_create_book_orders.rb
      create    app/models/book/order.rb
    conflict    app/models/book.rb
  Overwrite /Users/bhumi/Code/rails_guides/app/models/book.rb? (enter "h" for help) [Ynaqdhm]
```

:::

名前空間付きモデルの生成が成功すると、以下のような Book クラスと Order クラスが作成される。

```ruby
# app/models/book.rb
module Book
  def self.table_name_prefix
    "book_"
  end
end
```

```ruby
# app/models/book/order.rb
class Book::Order < ApplicationRecord
end
```

Book モデルに `table_name_prefix` を設定しておくと、Order モデルのデータベーステーブル名を単なる `orders` ではなく `book_orders` という名前空間を取り込んだテーブル名にできる。

:::info モデルを上書きしたくない場合
別の可能性として、app/models ディレクトリの下に既に Book モデルが存在しており、このモデルを上書きしたくない場合は、プロンプトで n を選択すれば、generate コマンドで book.rb を上書きしなくなります。 この場合は、table_name_prefix を必要とせずに、引き続き Book::Order クラスに対応する名前空間付きテーブル名が利用できます。

```ruby
# app/models/book.rb
class Book < ApplicationRecord
  # existing code
end

Book::Order.table_name
# => "book_orders"
```

:::

## 命名規約を上書きする

`ActiveRecord::Base.table_name=`メソッドで明示的に指定できる。

```ruby
class Book < ApplicationRecord
  self.table_name = "my_books"
end
```

::: warning 上書きした場合のテストにて
テーブル名をこのように上書き指定する場合は、テストの定義で set_fixture_class メソッドを使い、フィクスチャ (my_books.yml) に対応するクラス名を別途定義しておく必要があル。

```ruby
# test/models/book_test.rb
class BookTest < ActiveSupport::TestCase
  set_fixture_class my_books: Book
  fixtures :my_books
  # ...
end
```

:::
また、`ActiveRecord::Base.primary_key=`メソッドを用いて、テーブルの主キーに使われるカラム名を上書きすることもできる。

```ruby
class Book < ApplicationRecord
  self.primary_key = "book_id"
end
```

::: danger id という名前
Active Record では、id という名前を「主キー以外のカラム」で用いることは推奨されていない。
:::

## CRUD について

### Create

TODO: ここから続き
