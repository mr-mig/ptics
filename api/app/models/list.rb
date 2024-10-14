class List < ApplicationRecord
  belongs_to :owner, class_name: "User"
  has_many :tasks, dependent: :destroy

  validates :title, presence: true
end
