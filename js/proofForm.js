
let searchParams = new URLSearchParams(window.location.search)
console.log(searchParams)
let projectId = searchParams.get('project_id')
console.log(projectId)
let token = $.cookie('userToken');

axiosInstance.get('/project')
    .then(function (res) {
        let projects = res.data.data.projects;
        for(let i=0;i<projects.length;i++){
            if(projects[i].id == projectId){
                let thisProject = projects[i];
                $("h2 .title").text(thisProject.title)
                $(".imgBox img").attr('src',thisProject.img_url)
            }
            
        }
        $("#proofTodayBtn").click(function(){
            const form = new FormData();
            form.append('project_id',projectId)
            form.append('content',$("#proofContent").val())
            form.append('proof_images',$("#proofFile").val())

            axiosInstance.post('project_proof',form)
            .then(function(res){
                console.log("res",res)
                alert(res.data.message)
                $(location).attr('href',`./projectDetail.html?id=${projectId}`)
            })
            .catch(function(err){
                console.log("err",err)
                alert(err.response.data.message)
                $(location).attr('href',`./projectDetail.html?id=${projectId}`)
            })
        })
    })
    .catch(function (error) {
        console.log(error)
    })