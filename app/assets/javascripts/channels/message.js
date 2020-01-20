$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `
          <div class="chat-main__message-list__upper-message">
            <div class="chat-main__message-list__upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="chat-main__message-list__upper-message__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__lower-message">
            <p class="chat-main__message-list__lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        `
      return html;
    } else {
      var html =
       `
          <div class="chat-main__message-list__upper-message">
            <div class="chat-main__message-list__upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="chat-main__message-list__upper-message__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__lower-message">
            <p class="chat-main__message-list__lower-message__content">
              ${message.content}
            </p>
          </div>
        `
      return html;
    };
  }  
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $('chat-main__message-form__new-message__submit-btn__send').removeAttr('data-disable-with')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('form')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  return false;
  });
});