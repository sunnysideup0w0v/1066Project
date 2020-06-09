console.log('쿠키에 저장된 토큰 : ', $.cookie('userToken'))
  if($.cookie('userToken') == null || $.cookie('userToken') == undefined ){
    console.log("not null")
    $("#header .util .nick").hide();
  } else {
    $("#header .util .login").hide();
  }

  $("#header .util .nick").click(function(){
    if(confirm("로그아웃 하시겠습니까?")){
      $.removeCookie('userToken');
      $("#header .util .login").show();
      $("#header .util .nick").hide();
    }

}); 

axiosInstance.get('/project')
 .then(function(res){
    let projects = res.data.data.projects;
    let searchParams = new URLSearchParams(window.location.search);
    let projectId = searchParams.get('id');
    for(let i=0;i<projects.length;i++){
        if(projects[i].id == projectId){
            console.log(projects[i])
            let project = projects[i];
            $("h2 .title").text(` ${project.title} 프로젝트`);
            $(".imgBox img").attr('src',`${project.img_url}`)
            $(".proof_method").text(`인증 방법: ${project.proof_method}`)
            $(".desc").text(`${project.description}`)
        }
    }
    
 })
 .catch(function(err){
     console.log(err)
 })