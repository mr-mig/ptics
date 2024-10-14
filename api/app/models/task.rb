class Task < ApplicationRecord
  include AASM 

  belongs_to :owner, class_name: "User"
  belongs_to :list

  aasm column: 'state' do
    state :todo, initial: true
    state :ongoing
    state :done

    event :start do
      transitions from: :todo, to: :ongoing
    end
    
    event :complete do
      transitions from: :ongoing, to: :done
    end

    event :reopen do
      transitions from: :done, to: :ongoing
    end

    event :reset do
      transitions from: :ongoing, to: :todo
    end
  end
end
