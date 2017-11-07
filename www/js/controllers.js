angular.module('starter.controllers', [])

//根作用域方法和属性的定义
.run(['$rootScope', 'Chats', function($rootScope, Chats, $ionicModal) {
  $rootScope.newChats = Chats.all();
  //刷新红色徽章的消息值
  $rootScope.refreshBadge = function(striples) {
    $rootScope.$watch(striples, function(newValue, oldValue) {
      $rootScope.badgeNum = 0;
      $rootScope.newChats = striples;
      for (var i = 0, len = striples.length; i < len; i++) {
        if (striples[i].state === "block") {
          $rootScope.badgeNum = $rootScope.badgeNum + striples[i].num;
        }
      };
    })
  };
  $rootScope.refreshBadge($rootScope.newChats);
  //主题
  $rootScope.theme = "royal";
  //打开app内嵌浏览器的方法定义
  $rootScope.openURL = function(url) {
    window.open(url, '_blank', 'location=yes');
  };
  //模拟后台微信消息假数据
  $rootScope.addChats = [{
    id: 4,
    name: '刘健',
    lastText: '[位置]',
    face: 'img/liujian.png',
    num:3,
    state:"block",
    bgColor: 'fff',
    priority:0,
  },{
    id: 5,
    name: 'QQ邮箱',
    lastText: '西安电子科技大学：魏天尧同学，母校诚挚邀请您参加学校研究生培养质量调查，帮助母校教改',
    face: 'img/qqmain.png',
    num: 2,
    state: "block",
    bgColor: 'fff',
    priority:0,
  }, {
    id: 6,
    name: '魏淑君',
    lastText: '恩，拜拜',
    face: 'img/shujun.png',
    num: 1,
    state: "block",
    bgColor: 'fff',
    priority:0,
  }, {
    id: 7,
    name: '王鑫',
    lastText: '好的，前段时间加班多，周五晚上联系你',
    face: 'img/wangxin.png',
    num: 1,
    state: "block",
    bgColor: 'fff',
    priority:0,
  }, {
    id: 8,
    name: '网易金融',
    lastText: '秒杀各宝宝，易钱袋收益率达10%！',
    face: 'img/wangyijinrong.png',
    num: 1,
    state: "block",
    bgColor: 'fff',
    priority:0,
  }, {
    id: 9,
    name: '相龙东',
    lastText: '嗯嗯，昨天他给我说了',
    face: 'img/longdong.png',
    num: 3,
    state: "block",
    bgColor: 'fff',
    priority:0,
  }, {
    id: 10,
    name: '王硕',
    lastText: '研究所不轻松的，我们经常加班。。。',
    face: 'img/wangshuo.png',
    num: 6,
    state: "block",
    bgColor: 'fff',
    priority:0,
  }, {
    id: 11,
    name: '翟华星',
    lastText: '恩，大爷好好休息，明天国考加油！',
    face: 'img/huaxing.png',
    num: 4,
    state: "block",
    bgColor: 'fff',
    priority:0,
  }, {
    id: 12,
    name: '陈昊',
    lastText: '行啊，不说了，你好好休息~',
    face: 'img/chenhao.png',
    num: 6,
    state: "block",
    bgColor: 'fff',
    priority:0,
  }, {
    id: 13,
    name: '常友辉',
    lastText: 'ok',
    face: 'img/youhui.png',
    num: 2,
    state: "block",
    bgColor: 'fff',
    priority:0,
  }, {
    id: 14,
    name: '曾峙垚',
    lastText: '拜拜',
    face: 'img/zhiyao.png',
    num: 1,
    state: "block",
    bgColor: 'fff',
    priority:0,
  }, {
    id: 15,
    name: '徐维佳',
    lastText: '下次一起打球啊~',
    face: 'img/weijia.png',
    num: 1,
    state: "block",
    bgColor: 'fff',
    priority:0,
  }];
}])

//侧边栏controller定义
.controller('sideMenu', function($scope, $rootScope, $ionicModal, $ionicSideMenuDelegate, $ionicPopup, $cordovaDialogs, $cordovaCamera, $cordovaImagePicker) {
  $scope.newUser = {
    account: "",
    password: "",
    validate: ""
  };
  $scope.isLogin = false;
  $scope.flag1 = false;
  $scope.flag2 = false;
  $scope.flag3 = false;
  $scope.avatar = 'img/self.png';
  $ionicModal.fromTemplateUrl("my-modal.html", {
    scope: $scope,
    animation: "slide-in-up"
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
    $ionicSideMenuDelegate.toggleLeft();
  };
  //Cleanup the modal when we are done with it!
  // Execute action on remove modal
  $scope.$on("$destroy", function() {
    // console.log('modal.$destroy');
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on("modal.hidden", function() {
    // Execute action
    // console.log('modal.hidden');
  });
  $scope.login = function() {
    // console.log($scope.newUser.account);
    if ($scope.newUser.account == "ionic" && $scope.newUser.password == "123456" && $scope.newUser.validate == "g8pk") {
      $scope.isLogin = true;
      $scope.modal.hide();
      $ionicSideMenuDelegate.toggleLeft(true);
    } else {
      $scope.isLogin = false;
    }
  };
  $scope.showConfirm = function() {
    $ionicPopup.confirm({
      title: "温馨提示：",
      template: "您确定要注销登录？",
      okText:"确定",
      cancelText:"取消"
    })
    .then(function(res) {
      if(res) {
        $scope.isLogin = false;
        //清空登录信息
        $scope.newUser.account = "";
        $scope.newUser.password = "";
        $scope.newUser.validate = "";
      } else {
        $scope.isLogin = true;
      }
    });
  };
  document.addEventListener("deviceready", function() {
    $scope.changeAvat = function(event){
    $cordovaDialogs.confirm('请选择上传头像方式', '温馨提示：', ['照相机','图片库'])
     .then(function(buttonIndex) {
       var btnIndex = buttonIndex;
       if(btnIndex == 1){
         $scope.takePhoto();
       }else if(btnIndex == 2){
        $scope.pickAlbum();
       };
     });
    };
    $scope.takePhoto = function(){
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 65,
        targetHeight: 65,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:true
      };
      $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.avatar = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        console.log(err);
      });
    };
    $scope.pickAlbum = function(){
      var options = {
         maximumImagesCount: 1,
         width: 65,
         height: 65,
         quality: 80
        };
        $cordovaImagePicker.getPictures(options)
          .then(function (result) {
            $scope.avatar = result[0];
          }, function(error) {
            alert(error);
          });
    };
  }, false);
  $scope.allThemes = ['royal', 'assertive', 'energized', 'balanced', 'calm', 'positive'];
  $scope.changeTheme = function(theme) {
    var index = $scope.allThemes.indexOf(theme);
    var len = $scope.allThemes.length;
    if(index == len-1 || index == -1){
      $rootScope.theme = $scope.allThemes[0];
    }else{
      $rootScope.theme = $scope.allThemes[index + 1];
    }
  };
})

//主页菜单controller定义
.controller('HomeCtrl', function($state, $scope, $timeout) {
  //滑动手势切换页面
  $scope.switchRight = function() {
    $state.go('tab.dash')
  };
  $scope.sites = [{
    srcL: "img/05.jpg",
    introL: '台湾环岛8日7晚跟团游(3钻)·1晚住圆山 爸妈放心游A线 泡汤享乐',
    priceL: 5080,
    srcR: "img/06.jpg",
    introR: '泰国清迈6日4晚自由行·吉祥直飞 春节/寒假畅销产品',
    priceR: 2086,
  }, {
    srcL: "img/07.jpg",
    introL: '日本东京+箱根+京都+大阪6日5晚跟团游(4钻)·2天自由 新宿连住 温泉 神户牛',
    priceL: 6999,
    srcR: "img/08.jpg",
    introR: '韩国济州岛+首尔5日4晚跟团游(4钻)·上海名牌 三飞纯玩好评如潮 旅游狂欢月',
    priceR: 3799,
  }];
  $scope.addSites = [{
    srcL: "img/09.jpg",
    introL: '马尔代夫四季兰达吉拉瓦鲁岛Landaa Giraavaru自由行(5钻)·6日4晚 2沙2水 水飞上岛',
    priceL: 19874,
    srcR: "img/10.jpg",
    introR: '法国尼斯+巴黎自由行·9日7晚 蔚蓝海岸',
    priceR: 5743,
  }, {
    srcL: "img/11.jpg",
    introL: '海南三亚6日5晚跟团游(5钻)·携程自研 五星度假世界 金牌纯玩+99升海景',
    priceL: 3400,
    srcR: "img/12.jpg",
    introR: '鼓浪屿+厦门4日自由行·双飞 1晚鼓浪屿+2晚厦门 0元接机',
    priceR: 626,
  }, {
    srcL: "img/13.jpg",
    introL: '丽江+香格里拉+玉龙雪山5日4晚跟团游(5钻)·[高端特色客栈]避寒真纯玩&暖阳礼包&减1000',
    priceL: 3548,
    srcR: "img/14.jpg",
    introR: '北京5日跟团游(5钻)·出游首选好评如潮 5星万豪/香格里拉/威斯汀',
    priceR: 3446,
  }, {
    srcL: "img/15.jpg",
    introL: '成都+九寨沟+乐山+峨眉山7日6晚跟团游(4钻)·品质全景 THEME西姆2.0+特色餐+晚会 特卖汇',
    priceL: 2403,
    srcR: "img/16.jpg",
    introR: '桂林+漓江+阳朔+龙脊梯田4日3晚跟团游(4钻)·【私家定制】总统之旅 一价全包 春节热卖团',
    priceR: 2269,
  }];
  //上拉刷新
  $scope.load_more = function() {
    $timeout(function() {
      $scope.$apply(function() {
        if ($scope.addSites.length > 0) {
          var Arr = $scope.addSites.splice(0,2);
          $scope.sites = $scope.sites.concat(Arr);
          // console.log($scope.sites);
        }
      })
    }, 400);
    $scope.$broadcast("scroll.infiniteScrollComplete");
  };
})

//状态菜单controller定义
.controller('DashCtrl', function($state, $scope, $rootScope, $cordovaDevice, $cordovaVibration, $cordovaDeviceMotion, $cordovaDialogs, $cordovaBarcodeScanner, $cordovaNativeAudio, $ionicActionSheet) {
  $scope.switchRight = function() {
    $state.go('tab.chats')
  };
  $scope.switchLeft = function() {
    $state.go('tab.home')
  };
  document.addEventListener("deviceready", function() {
    $scope.scan = function() {
      $cordovaBarcodeScanner
        .scan()
        .then(function(result) {
          if(result.cancelled == false){
            $cordovaDialogs.confirm('网址：' + result.text, '扫描结果', ['打开','复制'])
             .then(function(buttonIndex) {
               var btnIndex = buttonIndex;
               if(btnIndex == 1){
                 $rootScope.openURL(result.text);
               }else if(btnIndex == 2){
                  // window.clipboardData.setData("Text", result.text); 这个可以省略，该插件已经默认复制好了
                  $cordovaDialogs.alert('复制成功！', '温馨提示：', '确定')
                    .then(function() {
                      // callback success
                    });
               }
             });
          }
        }, function(error) {
          alert("Scanning failed: " + error);
        });
      };
    $scope.alert = function() {
      $cordovaDialogs.alert('这是小米2S手机', '温馨提示', '返回')
        .then(function() {
          // callback success
        });
    };
    $scope.version = $cordovaDevice.getVersion();
    var options = { frequency: 1000 };
    var watch = $cordovaDeviceMotion.watchAcceleration(options);
        watch.then(
          null,
          function(error) {
          // An error occurred
          },
          function(result) {
            $scope.timeStamp = new Date(parseInt(result.timestamp)).toLocaleString().replace(/\//g, "-");
            $scope.X = (result.x).toFixed(2);
            $scope.Y = (result.y).toFixed(2);
            $scope.Z = (result.z).toFixed(2);
          $scope.clearWatch = function() {
            watch.clearWatch();
          }
        });

    // 震动0.6秒
    $scope.vibrate = function() {
      $cordovaVibration.vibrate(600);
    };
    $cordovaNativeAudio
      .preloadSimple('click', 'lib/audio/lbxx.mp3')
      .then(function (msg) {
        // console.log(msg);
      }, function (error) {
        alert(error);
      });
    $scope.audio = function() {
        $cordovaNativeAudio.play('click');
    };
  }, false);
})

//微信菜单controller定义
.controller('ChatsCtrl', function($state, $scope, $rootScope, Chats, $ionicActionSheet) {
  $scope.switchRight = function() {
    $state.go('tab.account')
  };
  $scope.switchLeft = function() {
    $state.go('tab.dash')
  };
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    // console.log(chat);
    // console.log(Chats.all());
    //修改被置顶的chat的index值，这样取消置顶之后正确返回原来位置
    var index = $scope.chats.indexOf(chat);
    console.log("sss"+index);
    for(var i=0,len=$scope.chats.length; i<len; i++){
      if($scope.chats[i].priority==1 && $scope.chats[i].index>=index){
        $scope.chats[i].index = $scope.chats[i].index-1;
      }
    }
    Chats.remove($scope.chats, chat);
    $rootScope.refreshBadge($scope.chats);
  };
  $scope.flag = {
    showDelete: false,
    showReorder: false
  };
  $scope.move = function(chat, fromIndex, toIndex) {
    // console.log(fromIndex);
    // console.log(toIndex);
    // console.log(chat);
    $scope.chats.splice(fromIndex, 1);
    $scope.chats.splice(toIndex, 0, chat);
    // console.log(chat);
  };
  $scope.changeBadge = function(chat) {
    if (chat.state === "block") {
      $scope.state = "none";
      $rootScope.badgeNum = $rootScope.badgeNum - chat.num;
    }
  };
  $scope.doRefresh = function() {
    if ($rootScope.addChats.length != 0) {
      var delArr = $rootScope.addChats.splice(0, 3);
      // console.log(delArr);
      // console.log($rootScope.addChats);
      var priority1Array = [];
      var priority0Array = [];
      for(var i=0,len=$scope.chats.length; i<len; i++){
        if($scope.chats[i].priority == 1){
          priority1Array.push($scope.chats[i]);
          //新加进来三个，所以以前置顶的chat的index要加3，这样取消置顶之后正确返回原来位置
          $scope.chats[i].index = $scope.chats[i].index + 3;
        }else if($scope.chats[i].priority == 0){
          priority0Array.push($scope.chats[i]);
        }
      };
      $scope.chats = priority1Array.concat(delArr.concat(priority0Array));
      $rootScope.refreshBadge($scope.chats);
    }
    $scope.$broadcast("scroll.refreshComplete");
  };
  $scope.showSheet = function(chat) {
    if (chat.state == 'none' && chat.priority == 0) {
      // Show the action sheet
      $ionicActionSheet.show({
        cancelOnStateChange: true,
        buttons: [{
          text: "标记为未读"
        }, {
          text: "置顶聊天"
        }, ],
        buttonClicked: function(index) {
          if (index == 0) {
            console.log("标记为未读");
            chat.state = "block";
            chat.num = 1;
            $rootScope.refreshBadge($scope.chats);
          } else if (index = 1) {
            console.log("置顶聊天");
            chat.priority = 1;
            chat.bgColor = 'eee';
            //记住chat的位置，方便下次取消置顶之后回到原来位置
            chat.index = $scope.chats.indexOf(chat);
            $scope.move(chat, chat.index, 0);
          };
          return true;
        },
        destructiveText: "删除该聊天",
        destructiveButtonClicked: function() {
          console.log("删除该聊天");
          $scope.remove(chat);
          return true;
        }
      });
    }
    else if (chat.state == 'none' && chat.priority == 1) {
      // Show the action sheet
      $ionicActionSheet.show({
        cancelOnStateChange: true,
        buttons: [{
          text: "标记为未读"
        }, {
          text: "取消置顶"
        }, ],
        buttonClicked: function(index) {
          if (index == 0) {
            console.log("标记为未读");
            chat.state = "block";
            chat.num = 1;
            $rootScope.refreshBadge($scope.chats);
          } else if (index = 1) {
            console.log("取消置顶");
            chat.priority = 0;
            chat.bgColor = 'fff';
            var index = $scope.chats.indexOf(chat);
            $scope.move(chat, index, chat.index);
          };
          return true;
        },
        destructiveText: "删除该聊天",
        destructiveButtonClicked: function() {
          console.log("删除该聊天");
          $scope.remove(chat);
          return true;
        }
      });
    }
    else if (chat.state == 'block' && chat.priority == 0) {
      // Show the action sheet
      $ionicActionSheet.show({
        cancelOnStateChange: true,
        buttons: [{
          text: "标记为已读"
        }, {
          text: "置顶聊天"
        }, ],
        buttonClicked: function(index) {
          if (index == 0) {
            console.log("标记为已读");
            chat.state = "none";
            $rootScope.refreshBadge($scope.chats);
          } else if (index = 1) {
            console.log("置顶聊天");
            chat.priority = 1;
            chat.bgColor = 'eee';
            chat.index = $scope.chats.indexOf(chat);
            $scope.move(chat, chat.index, 0);
          };
          return true;
        },
        destructiveText: "删除该聊天",
        destructiveButtonClicked: function() {
          console.log("删除该聊天");
          $scope.remove(chat);
          return true;
        }
      });
    }
    else if(chat.state == 'block' && chat.priority == 1) {
      // Show the action sheet
      $ionicActionSheet.show({
        cancelOnStateChange: true,
        buttons: [{
          text: "标记为已读"
        }, {
          text: "取消置顶"
        }, ],
        buttonClicked: function(index) {
          if (index == 0) {
            console.log("标记为已读");
            chat.state = "none";
            $rootScope.refreshBadge($scope.chats);
          } else if (index = 1) {
            console.log("取消置顶");
            chat.priority = 0;
            chat.bgColor = 'fff';
            var index = $scope.chats.indexOf(chat);
            $scope.move(chat, index, chat.index);
          };
          return true;
        },
        destructiveText: "删除该聊天",
        destructiveButtonClicked: function() {
          console.log("删除该聊天");
          $scope.remove(chat);
          return true;
        }
      });
    }
  };
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  //Chats对象在services.js里边定义的

  //红色徽章的拖拽效果
  $scope.clientX = 48;
  $scope.clientY = 10;
  $scope.dragStart = function(event){
    var e = event || window.event;
        $(e.target).css({'transition': ' transform 0s', 'transform': 'rotate(720deg)'});
        $scope.pageX=e.touches[0].pageX; 
        $scope.pageY=e.touches[0].pageY;
  };
  $scope.dragMove = function(event, chat){
    var a = $scope.clientX;
    var b = $scope.clientY;
    var c = $scope.pageX;
    var d = $scope.pageY;
    var e = event || window.event;
    //z-index只对position为relative、absolute和fixed元素有效。
    //在实际开发中，div+css经常会碰到层级的问题
    // 其中有个很头痛的就是z-index控制层级时，老是发现z-index不起作用
    // 依据自己的经验，总结出以下步骤：
    // 1、判断被覆盖的层（想要置顶的层）的postion是否也为relative或者absolute
    // 2、如果1成立，则判断是否此层的z-index比误覆盖的层的z-index数值大
    // 3、如果2成立，判断是否此层的父级元素比误覆盖的层的z-index数值大
    // 4、如果3成立，判断是否此层的父级元素比误覆盖的层的父级层的z-index数值大
    // 到此为止，99%的该问题会得到解决！
    // 内容不多，可是会非常实用！
    // 将红色徽章的父级元素z-index值设置成最大
    chat.zindex = 5;
    switch (e.type){
      case "touchmove":
        // $(e.target).css("left", a + e.touches[0].pageX - c) ; 
        // $(e.target).css("top", b + e.touches[0].pageY - d) ; 
        $scope.f = e.touches[0].pageX;
        $scope.g = e.touches[0].pageY;
        var deltaX = $scope.f - c;
        var deltaY = $scope.g - d;
        var deg = Math.atan(deltaY/deltaX)*180/Math.PI;
        $scope.deg = deg + (deltaX > 0 ? 90 : -90);
        // console.log($scope.deg);
        $(e.target).css({'transform': 'rotate('+$scope.deg+'deg)', "left": a + e.touches[0].pageX - c, "top": b + e.touches[0].pageY - d});
        if(Math.pow(($scope.f - c), 2) + Math.pow(($scope.g - d), 2) >= 1000){
          $(e.target).css('backgroundColor', '#0ECC3E');
        }else{
          $(e.target).css('backgroundColor', '#ef473a');
        }
        break;
      case "touchend":
        // console.log($scope.f - c,$scope.g - d);
        if(Math.pow(($scope.f - c), 2) + Math.pow(($scope.g - d), 2) <= 1000){
          $(e.target).animate({left: a+"px", top: b+"px"}, 400);
          $(e.target).css({'transition': ' transform 0.4s', 'transform': 'rotate(720deg)'});
          // 将红色徽章的父级元素z-index值重置
          chat.zindex = 2;
        }else{
          $(e.target).css({'transition': ' transform 0.4s', 'transform': 'rotate(720deg)'});
          $(e.target).fadeOut(400, function(){
            //立即生效，注意apply作用！
            $scope.$apply(function() {
              chat.num = 0;
              chat.state = "none";
              $rootScope.refreshBadge($scope.chats);
              // 将红色徽章的父级元素z-index值重置
              chat.zindex = 2;
            });
          });
        };
        break;
    }
  };
})

//微信详情页controller定义
.controller('ChatDetailCtrl', function($state, $rootScope, $scope, $stateParams, Chats) {
  $scope.chat = Chats.get($rootScope.newChats, $stateParams.chatId);
  $scope.switchLeft = function() {
    $state.go('tab.chats')
  };
})

//设置菜单controller定义
.controller('AccountCtrl', function($state, $scope, $ionicPopup, $cordovaVibration, $cordovaNativeAudio, $timeout, $cordovaMedia) {
  $scope.switchLeft = function() {
    $state.go('tab.chats')
  };
  $scope.items = [{
    text: "接受新消息通知",
    selected: true
  }, {
    text: "通知显示消息详情",
    selected: true
  }, {
    text: "朋友圈照片更新",
    selected: true
  }];
  document.addEventListener("deviceready", function() {
    $cordovaNativeAudio
      .preloadSimple('toggle', 'lib/audio/apple.mp3')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        alert(error);
      });
    $scope.play = function(value1) {
      if (value1) {
        $cordovaNativeAudio.play('toggle');
      }else{
        $cordovaNativeAudio.stop('toggle');
      }
    };
    $scope.vibrate = function(value2) {
      if (value2) {
        $cordovaVibration.vibrate(1000);
      }else{
        $cordovaVibration.vibrate(0);
      }
    };
  }, false);
  $scope.banners = [{
    label: "HTML5"
  }, {
    label: "CSS3"
  }, {
    label: "ES6"
  }, {
    label: "JQuery"
  }, {
    label: "AngularJS"
  }, {
    label: "Ionic"
  }, {
    label: "Phonegap"
  }, {
    label: "React"
  }, {
    label: "Bootstrap"
  }, {
    label: "Vue.js"
  }, ];
  $scope.flag = false;
  $scope.chooseAll = function() {
    $scope.flag = !$scope.flag;
    for (var i = 0, len = $scope.banners.length; i < len; i++) {
      $scope.banners[i].selected = $scope.flag;
    };
  };
  $scope.reverseChoose = function() {
    for (var i = 0, len = $scope.banners.length; i < len; i++) {
      $scope.banners[i].selected = !$scope.banners[i].selected;
    };
  };
  $scope.showResult = function() {
    var num = 0;
    for (var i = 0, len = $scope.banners.length; i < len; i++) {
      num = $scope.banners[i].selected ? num + 1 : num;
      // console.log(num);
    };
    if (num >= 8) {
      //警告弹出框
      $ionicPopup.alert({
        title: "Excellent！",
        template: "大神，请收下我的膝盖~"
      })
    } else if (num > 4 && num < 8) {
      $ionicPopup.alert({
        title: "Good！",
        template: "您是一个合格的web前端开发工程师~"
      })
    } else if (num <= 4 && num > 0) {
      $ionicPopup.alert({
        title: "Just so so！",
        template: "作为菜鸟的你，请问你每天的压力大不大~"
      })
    } else if (num == 0) {
      $ionicPopup.alert({
        title: "Oh NO！",
        template: "请至少选择一个吧，亲~"
      })
    }
  };
});
