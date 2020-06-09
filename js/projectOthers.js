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

let searchParams = new URLSearchParams(window.location.search);
let projectId = searchParams.get('project_id');
console.log("projectId",projectId);

axiosInstance.get('/project')
 .then(function(res){
    let projects = res.data.data.projects;
    for(let i=0;i<projects.length;i++){
        if(projects[i].id == projectId){
            let project = projects[i];
            $("h2 .title").text(` ${project.title} 프로젝트`);
            $(".desc").text(`${project.description}`)
        }
    }
    $(".seeOthersBtn").click(function(){
        // 주소창에 프로젝트id를 덧붙여서 상세화면으로 이동
        $(this).attr('project_id');
        console.log(projectId)
        $(location).attr('href', `projectOthers.html?project_id=${projectId}`)
    })
    
 })
 .catch(function(err){
     console.log(err)
 })

$("#dateInput").change(function(){
    let proofDate = $(this).val();
    axiosInstance.get(`/project/${projectId}?proof_date=${proofDate}`,{
        params: {
            //  일단 비워두기
        }
    })
        .then(function(res){
            let project = res.data.data.project.proofs;
            for(let i=0;i<project.length;i++){
                let images = project[i].images;
                if(images.length>0){
                    $(".others .list").append(`
                        <li class="others">
                            <div class="imgBox">
                                <img src="${project[i].images[0].img_url}" alt="">
                            </div>
                            <div class="txtBox">
                                <p>${project[i].content}</p>
                            </div>
                        </li>
                    `)
                } else {
                    $(".others .list").append(`
                        <li class="others">
                            <div class="imgBox">
                                <img src="../images/siriwan-arunsiriwattana-gs0coXLmjdI-unsplash.jpg" alt="">
                            </div>
                            <div class="txtBox">
                                <p>${project[i].content}</p>
                            </div>
                        </li>
                    `)
                }
            }
        })
        .catch(function(err){
            console.log(err)
        })
})



// $("#dateInput").change(function(){
//     let date = $(this).val();
//     console.log(date)
//     axiosInstance.get(`/project/${projectId}?proof_date=${date}`,{
//             params: {
//                 // 일단 첨부자료x 비워두기
//             }
//         })
//         .then(function(res){
//             console.log(res)
//         })
//         .catch(function(err){
//             console.log(err)
//         })
// })