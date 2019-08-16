json.array! @messages do |message|
  json.body message.body
  json.image message.image.url
  json.time message.created_at.strftime("%Y/%m/%d %H:%M")
  json.name message.user.name
  json.id message.id
  json.group_id message.group_id
end