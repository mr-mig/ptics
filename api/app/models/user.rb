class User < ApplicationRecord
  validates :name, presence: true

  def self.fresh
    User.new(name: Faker::Adjective.positive + " " + Faker::Creature::Animal.name)
  end
    
end
