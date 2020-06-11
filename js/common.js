  if($.cookie('userToken') == null || $.cookie('userToken') == undefined ){
    console.log("not null")
    $("#header .util .nick").hide();
  } else {
    $("#header .util .login").hide();
  }


$("#header .util .nick").click(function(){
  $(".quick").toggleClass("on")
}); 

$(".myPage").click(function(){
  $(location).attr('href','./myPage.html')
})
$(".pwChange").click(function(){
  $(location).attr('href','./changePw.html')
})
$(".logOut").click(function(){
  if(confirm("정말 로그아웃하시겠습니까?")){
    console.log("넹!")
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
      console.log(res)
      let userInfo = res.data.data.user
      console.log(userInfo)
      $(".nick").text(userInfo.nick_name);
      $(".email").text(userInfo.email)
      $(".imgBox img").attr('src',userInfo.profile_images[(userInfo.profile_images.length)-1].img_url)
  })
  .catch(function(err){
      console.log(err)
  })
}

setting();