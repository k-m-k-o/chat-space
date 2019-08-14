json.body @message.body
json.user_name @message.user.name
json.image  @message.image.url
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.group_id @message.group.id