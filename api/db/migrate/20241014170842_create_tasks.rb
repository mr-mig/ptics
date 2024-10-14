class CreateTasks < ActiveRecord::Migration[7.2]
  def change
    create_table :tasks do |t|
      t.string :title
      t.string :state
      t.references :owner, null: false, foreign_key: { to_table: :users }
      t.references :list, null: false, foreign_key: true

      t.timestamps
    end
  end
end
