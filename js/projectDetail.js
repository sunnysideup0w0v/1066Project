let searchParams = new URLSearchParams(window.location.search);
let projectId = searchParams.get('id');

axiosInstance.get('/project')
 .then(function(res){
    let projects = res.data.data.projects;
    console.log("projectId",projectId)
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
    $(".proofBtn").click(function(){
        $(location).attr('href',`proofForm.html?project_id=${projectId}`)
    })
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

$(".applyBtn").click(function(){
    const form = new FormData();
    form.append('project_id',projectId)

    axiosInstance.post('/project',form)
    .then(function(res){
        console.log(res)
        alert(res.data.message)
    })
    .catch(function(err){
        console.log(err)
        alert(err.response.data.message)
    })
})