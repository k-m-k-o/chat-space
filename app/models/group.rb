class Group < ApplicationRecord
  has_many :users,through: :members
  has_many :members
  has_many :messages

  def show_group_users
    text = "Member: "
    users.each do |user|
      text += user.name + " "
    end
    return text
  end  
  def show_last_messages
    if (last_message = messages.last).present?
      last_message.body? ? last_message.body : "画像が投稿されています"
    else
      "まだメッセージはありません"
    end
  end  
end
