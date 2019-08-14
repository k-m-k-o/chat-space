$(function(){
  function buildHTML(message){
    var input_imgtag = (message.image) ? `<img src=${message.image}></img>`: "";
    var html = `<div class ="main__chat__posts">
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
  $(".new_message").on("submit",function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url:  url,
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
      $(".main__footer__output__form__textarea__text").val("");
      $(".main__footer__output__form__submit").prop("disabled", false);
    })
    .fail(function(){
      alert("投稿に失敗しました");
    });
  });
});