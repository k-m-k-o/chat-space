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

  function memberAddHTML(id,name){
    var html = `<div class='chat-group-user'>
                  <input name="group[user_ids][]" value=${id} type="hidden" ></input>
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

  $("#user-search-field").on("keyup", function(e){
    if (e.keyCode === 8 || e.keyCode === 46){
      return false;
    };
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
        var user_id = $(this).data("user-id");
        var user_name = $(this).data("user-name");
        memberAddHTML(user_id,user_name);
      });
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました")
    });
  });

  $(document).on("click", ".js-remove-btn", function(){
    $(this).parent().remove();
  });
});