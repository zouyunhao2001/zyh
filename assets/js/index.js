$(function () {
  // 调用getSuggestList获取用户基本信息
  getSuggestList()

})
// 获取用户基本信息
function getSuggestList() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization:localStorage.getItem('token') || ''
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      // 调用render 渲染用户头像
      render(res.data)
    },
    // 不论成功还是失败 都会调用complete回调函数
    // complete: function (res) {
    //   // console.log('执行了回调函数');
    //   // console.log(res);
    //   // 在complete中 可以使用res.responseJSON拿到服务器响应回来到数据
    //      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     // 1. 强制清空 token
    //     localStorage.removeItem('token')
    //     // 2. 强制跳转到登录页面
    //     location.href = 'login.html'
    //   }
    // }
  })
}
// 渲染用户头像
function render(user) {
  // 获取用户的名称
  var name = user.nickname || user.username
  // 设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 按需渲染用户头像
  if (user.user_pic !== null) {
    // 渲染用户头像
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    // 渲染文本头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
  var layer = layui.layer
  // 点击按钮实现页面退出功能
  $('#btnget').on('click', function (e) {
    // 提示用户是否确认退出
    layer.confirm('确定退出登陆?', { icon: 3, title: '提示' }, function (index) {
      // 1.清空本地存储的token 信息
      localStorage.removeItem('token')
      // 2.跳转到登陆页面
      location.href = 'login.html'
      // 关闭confirm询问框
      layer.close(index);

    });
    
  })
}