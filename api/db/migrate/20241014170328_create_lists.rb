class CreateLists < ActiveRecord::Migration[7.2]
  def change
    create_table :lists do |t|
      t.string :title
      t.references :owner, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
