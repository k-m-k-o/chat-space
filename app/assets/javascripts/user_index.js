$(function(){
  var searchHtml = $("#user-search-result");
  var findMemberHtml = $(".chat__members");
  function addHTML(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                  </div>`;
    searchHtml.append(html);
  };
  function memberaddHTML(id,name){
    var html = `<div class='chat-group-user'>
                  <input name='user_ids' type='hidden' value=${id}>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    findMemberHtml.append(html)
  };
  function adderrHTML(message){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${message}</p>
                </div>`
    return html;           
  };
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $.ajax({
      url: "/users",
      type: "GET",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          addHTML(user);
        });
      }
      else{
        adderrHTML("一致するユーザーがいません");
      };
      $(".user-search-add").on("click", function(){
        $(this).parent().remove();
        console.log(this);
        var user_id = $(this).data("user-id");
        var user_name = $(this).data("user-name");
        memberaddHTML(user_id,user_name);
        $(".js-remove-btn").on("click", function(){
          $(this).parent().remove();
        });
      });
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました")
    });
  });
  $(".js-remove-btn").on("click", function(){
    $(this).parent().remove();
  });
});