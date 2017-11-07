angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array
  // Some fake testing data
  var chats = [{
    id: 0,
    name: '炊事班',
    lastText: '现在看着挺low的，哈哈',
    face: 'img/cuishiban.png',
    num:6,
    state:"none",
    bgColor: 'fff',
    priority:0,
  }, {
    id: 1,
    name: '邓俊海',
    lastText: '拜了个拜，下次聊~',
    face: 'img/dengjh.png',
    num:8,
    state:"none",
    bgColor: 'fff',
    priority:0,
  }, {
    id: 2,
    name: '李卿',
    lastText: '哈哈哈',
    face: 'img/liqing.png',
    num:2,
    state:"none",
    bgColor: 'fff',
    priority:0,
  },{
    id: 3,
    name: '微信团队',
    lastText: '帐号保护功能已开启。换用其他手机登录微信时，需验证手机号。如果你当前与微信绑定的手机号已不再使用，请立即更换。',
    face: 'img/weixintuandui.png',
    num:1,
    state:"none",
    bgColor: 'fff',
    priority:0,
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chats, chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chats, chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
