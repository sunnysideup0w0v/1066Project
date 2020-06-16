$("#header .util .nick").click(function(){
  $(".quick").toggleClass("on")
}); 

$(".nick").click(function(){
  $(location).attr('href','./myPage.html')
})
$(".pwChange").click(function(){
  $(location).attr('href','./myPage.html')
})
$(".logOut").click(function(){
  if(confirm("정말 로그아웃하시겠습니까?")){
    $.removeCookie('userToken');
    $(location).attr('href','./index.html')
  }
})

let setting = function() {
  axiosInstance.get('/my_info',{
      params:{
          // 
      }
  })
  .then(function(res){
      let userInfo = res.data.data.user
      $("#header .nick").text(userInfo.nick_name);
      $("#header .email").text(userInfo.email)
  })
  .catch(function(err){
      console.log(err)
  })
}

setting();

if($.cookie('userToken') == null || $.cookie('userToken') == undefined ){
    $("#header .util .nick").hide();
  } else {
    $("#header .util .login").hide();
  }