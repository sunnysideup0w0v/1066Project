
  if($.cookie('userToken') == null || $.cookie('userToken') == undefined ){
    console.log("not null")
    $("#header .util .nick").hide();
  } else {
    $("#header .util .login").hide();
  }

  $("#header .util .nick").click(function(){
    // if(confirm("로그아웃 하시겠습니까?")){
    //   $.removeCookie('userToken');
    //   $("#header .util .login").show();
    //   $("#header .util .nick").hide();
    // }
    $(location).attr('href','./myPage.html')
}); 