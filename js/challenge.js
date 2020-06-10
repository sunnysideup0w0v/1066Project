let list = $(".ingProject .list ul");

axiosInstance.get('/project')
 .then(function(res){
     console.log(res.data.data.projects)
     let listArray = res.data.data.projects;
    for(let i=0;i<listArray.length;i++){
         let title = listArray[i].title;
         let id = listArray[i].id;
         let img_url = listArray[i].img_url;
         let description = listArray[i].description;
         let proofMethod = listArray[i].proof_method;
         console.log(title,img_url,description,proofMethod)
         let li = `<li project_id=${id}>
                        <div class="imgBox">
                            <img src="${img_url}" alt="">
                        </div>
                        <div class="txtBox">
                            <p class="title">${title}</p>
                        </div>
                        <button>자세히 보기<i class="xi-angle-right-min"></i></button>
                    </li>`
        list.append(li);
    }
    $(".ingProject li").click(function(){
        // 눌린 줄 $(this) 의 속성중 project_id에 적힌 값이 뭔지 로그로 출력
        console.log($(this).attr('project_id'))
        // 눌린 줄 $(this) 의 속성중 project_id에 적힌 값을 변수로 저장

        let projectId = $(this).attr('project_id')

        // 주소창에 프로젝트id를 덧붙여서 상세화면으로 이동

        $(location).attr('href', `projectDetail.html?id=${projectId}`)
    })
 })
 .catch(function(err){
     console.log(err)
 })