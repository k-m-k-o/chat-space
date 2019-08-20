$(function(){
  function buildHTML(message){
    var input_imgtag = (message.image) ? `<img src=${ message.image }></img>`: "";
    var html = `<div class ="main__chat__posts" data-id=${message.id}>
                  <div class="main__chat__posts__left">
                    <p class="main__chat__posts__left__username">
                      ${ message.name }
                    </p>
                    <p class="main__chat__posts__left__time">
                      ${ message.time }
                    </p>
                  </div>
                  <div class="main__chat__posts__bottom">
                    <p class="main__chat__posts__bottom__text">
                      ${ message.body }
                    </p>
                    ${ input_imgtag }
                  </div>
                </div>`
    return html;          
  }
  function makeFlash(message){
    var html = `<div class='notification'>
                  <div class="notice">${message}</div>
                </div>`
    return html;
  }
  function afterPosting(){
    $(".main__footer__output__form__textarea__text").val("");
      $(".main__footer__output__form__textarea__picture--btn").val("");
      $(".main__footer__output__form__submit").prop("disabled", false);
      $(".main__footer__output__form__submit").attr('data-disable-with');
  }
  $(".new_message").on("submit",function(e){
    e.preventDefault();
    $(".main__footer__output__form__submit").removeAttr('data-disable-with');
    $(".main__footer__output__form__submit").prop("disabled", true);
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      contentType: false,
      processData: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".main__chat__after").before(html);
      $(".main__chat").animate({scrollTop: $('.main__chat')[0].scrollHeight});
      afterPosting();
    })
    .fail(function(){
      alert("投稿に失敗しました");
      afterPosting();
    });
  });
  var reloadMessages = function(){
    var last_message_id = $(".main__chat__posts:last").data("id");
    $.ajax({
      url: "api/messages",
      type: "get",
      dataType: "json",
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0){ 
        var insertHTML = '';
        messages.forEach(function(message){
          var html = buildHTML(message);
          insertHTML = insertHTML + html;
          $(".main__chat__after").before(insertHTML);
        });
        $(".main__chat").animate({scrollTop: $('.main__chat')[0].scrollHeight});
      };
    })
    .fail(function(){
      var html = makeFlash("自動更新に失敗しました")
      if ($(".notification").size() === 0){
        $(".container").before(html);
      };
    });
  };
  if ($(".main__chat").size() !== 0){
    setInterval(reloadMessages, 5000);
  };
});