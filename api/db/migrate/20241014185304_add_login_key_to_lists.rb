class AddLoginKeyToLists < ActiveRecord::Migration[7.2]
  def change
    add_column :lists, :login_key, :string
  end
end
