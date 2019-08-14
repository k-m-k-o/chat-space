
json.body @message.body
json.name @message.user.name
json.image  @message.image.url
json.time @message.created_at.strftime("%Y/%m/%d %H:%M")
json.group_id @message.group.id