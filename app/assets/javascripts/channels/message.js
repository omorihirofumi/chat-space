$(function(){
  function buildHTML(message){
    if (message.content && message.image) {
      var html =`<div class="message" data-message-id=` + message.id + `>
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
            <img src="` + message.image + `" class="chat-main__message-list__lower-message__image" >
        </div>
      </div>`
    } else if (message.content) {
      var html =`<div class="message" data-message-id=` + message.id + `>
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
      </div>`
    } else if (message.image) {
      var html =`<div class="message" data-message-id=` + message.id + `>
        <div class="chat-main__message-list__upper-message">
          <div class="chat-main__message-list__upper-message__user-name">
            ${message.user_name} 
          </div>
          <div class="chat-main__message-list__upper-message__date">
            ${message.created_at} 
          </div>
        </div>
        <div class="chat-main__message-list__lower-message">
          <img src="` + message.image + `" class="chat-main__message-list__lower-message__image" >
        </div>
      </div>`
    };
    return html;
  };
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

  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      console.log('alert');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});