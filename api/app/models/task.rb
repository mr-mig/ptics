class Task < ApplicationRecord
  belongs_to :owner, class_name: "User"
  belongs_to :list
end
