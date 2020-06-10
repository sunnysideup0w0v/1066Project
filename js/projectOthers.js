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
let projectTitle;
console.log("projectId",projectId);

axiosInstance.get('/project')
 .then(function(res){
    let projects = res.data.data.projects;
    for(let i=0;i<projects.length;i++){
        if(projects[i].id == projectId){
            let project = projects[i];
            projectTitle = project.title;
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

let now = new Date();
let year = now.getFullYear();
let month = String(now.getMonth()+1).padStart(2,'0')
let date = String(now.getDate()).padStart(2,'0')

let todayFullDate = `${year}-${month}-${date}`
console.log(todayFullDate)

$("#dateInput").change(function(){
    let proofDate = $(this).val();
    axiosInstance.get(`/project/${projectId}?proof_date=${proofDate}`,{
        params: {
            //  일단 비워두기
        }
    })
        .then(function(res){
            let project = res.data.data.project.proofs;
            $(".others .list").empty();
            console.log(project)
            for(let i=0;i<project.length;i++){
                let count = project[i].like_count;
                console.log(count)
                let buttonTitle = "♡";
                let replyCount = project[i].reply_count;

                if (project[i].my_like) {
                    buttonTitle = "♥"
                }
                let images = project[i].images;
                if(replyCount>0){
                    if(images.length>0){
                        $(".others .list").append(`
                            <li class="others" proof_id=${project[i].id}>
                                <div class="imgBox">
                                    <img src="${project[i].images[0].img_url}" alt="">
                                </div>
                                <div class="txtBox">
                                    <p class="nick">${project[i].user.nick_name}</p>
                                    <p class="content">${project[i].content}</p>
                                    <button class="reply">Reply(${replyCount})</button>
                                    <button class="likeBtn"><span class="btnTitle">${buttonTitle}</span><span class="likeCount">${count}</span></button>
                                </div>
                            </li>
                        `)
                    } else {
                        $(".others .list").append(`
                            <li class="others" proof_id=${project[i].id}>
                                <div class="imgBox">
                                    <img src="../images/siriwan-arunsiriwattana-gs0coXLmjdI-unsplash.jpg" alt="">
                                </div>
                                <div class="txtBox">
                                    <p class="nick">${project[i].user.nick_name}</p>
                                    <p class="content">${project[i].content}</p>
                                    <button class="reply">Reply(${replyCount})</button>
                                    <button class="likeBtn"><span class="btnTitle">${buttonTitle}</span><span class="likeCount">${count}</span></button>
                                </div>
                            </li>
                        `)
                    }
                } else {
                    if(images.length>0){
                        $(".others .list").append(`
                            <li class="others" proof_id=${project[i].id}>
                                <div class="imgBox">
                                    <img src="${project[i].images[0].img_url}" alt="">
                                </div>
                                <div class="txtBox">
                                    <p class="nick">${project[i].user.nick_name}</p>
                                    <p class="content">${project[i].content}</p>
                                    <button class="reply">Reply</button>
                                    <button class="likeBtn"><span class="btnTitle">${buttonTitle}</span><span class="likeCount">${count}</span></button>
                                </div>
                            </li>
                        `)
                    } else {
                        $(".others .list").append(`
                            <li class="others" proof_id=${project[i].id}>
                                <div class="imgBox">
                                    <img src="../images/siriwan-arunsiriwattana-gs0coXLmjdI-unsplash.jpg" alt="">
                                </div>
                                <div class="txtBox">
                                    <p class="nick">${project[i].user.nick_name}</p>
                                    <p class="content">${project[i].content}</p>
                                    <button class="reply">Reply</button>
                                    <button class="likeBtn"><span class="btnTitle">${buttonTitle}</span><span class="likeCount">${count}</span></button>
                                </div>
                            </li>
                        `)
                    }
                }
            }
            $('.likeBtn').click(function() {
                let proofId = $(this).closest('li').attr('proof_id')
                // 인증글 좋아요에 필요한 데이터를 담아둘 FormData 클래스
                const form = new FormData()
                // 인증글 ID만 첨부
                form.append('proof_id', proofId)

                // 좋아요 버튼을 별개 변수에 저장 => 서버 호출 결과 안에서 사용하려고
                let likeBtnTitle = $(this).children('.btnTitle');
                let likeCountTxt = $(this).children('.likeCount');
                console.log($(this),likeBtnTitle, likeCountTxt)
                // 커스텀 axios로 실제 인증글 좋아요 호출
                axiosInstance.post('/like_proof', form)
                    .then(function (res) {
                        
                        // 서버에서 주는 메세지 (좋아요 등록 / 취소 여부) 출력
                        alert(res.data.message)


                        // 변경되어야 할 값들을 체크
                        // 좋아요 몇개인지?
                        let count = res.data.data.like.like_count

                        // 좋아요인지 / 좋아요 취소인지
                        let buttonTitle = "♡"
                        if (res.data.data.like.my_like) {
                            buttonTitle = "♥"
                        }

                        // 좋아요 버튼의 문구 변경
                        likeBtnTitle.text(buttonTitle)

                        // 그 옆의 (형제/사촌) 좋아요 갯수 변경
                        console.log("changedCount",count)
                        console.log(likeCountTxt)
                        likeCountTxt.text(`${count}`)



                    })
                    .catch(function (error) {
                        // 실패시 error의 응답에 담긴 message를 얼럿으로
                        alert(error.response.data.message)
                    })
            })
            $('.reply').click(function() {
                        
                // 어떤 인증글을 상세히 보러 이동할건지 id를 추출
                // 눌린 버튼의 조상중 li를 찾고, 그 속성중 proof_id 에 적힌 값 추출
                let proofId = $(this).parents('li').attr('proof_id')
                console.log('눌린 버튼의 인증글id : ', proofId)

                // 해당 인증글 상세보기 화면으로 이동.
                // query파라미터로 몇번글인지 전달.
                $(location).attr('href', `replies.html?project_id=${projectTitle}&proof_id=${proofId}`) 

            })
            
        })
        .catch(function(err){
            console.log(err)
        })
})


$("#dateInput").val(todayFullDate)
$("#dateInput").trigger('change')


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