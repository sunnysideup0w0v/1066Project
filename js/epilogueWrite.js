$('#okBtn').click(function () {
    // 정말 작성할건지?

    let ok = confirm('리뷰를 등록 하시겠습니까? 한번 올린 리뷰는 수정 할 수 없습니다.')

    if (ok) {
        // 입력한 내용들을 FormData에 담자
        // select로 선택한 항목의 val?

        const form = new FormData()
        form.append('title', $('#titleBox').val())
        form.append('content', $('#contentBox').val())
        // select 태그에서 선택된 값 가져와서 사용
        form.append('project_apply_id', $('#projectList option:selected').val())

        axiosInstance.post('/review', form)
        .then(function (res) {
            alert('리뷰를 작성해 주셔서 감사합니다.')
            location.href = 'epilogue.html'
        })
        .catch(function (err) {
            alert(err.response.data.message)
        })

    }
})

// 내가 완료한 프로젝트들이 어떤게 있는지
axiosInstance.get('/my_info', {
    params: {
        'project_status': 'COMPLETE'
    }
})
.then(function (res) {
    console.log(res)

    res.data.data.projects.COMPLETE.forEach(project => {
        
        console.log(project)

        let option = $(`
        <option value='${project.my_last_apply.id}'>${project.title}</option>
        `)

        $('#projectList').append(option)

    });
})

// localStorage에 저장된 사용자정보 (String) 를 확인.
// 저장된 정보를 => JSONObject로 변경 => 화면에 뿌려주기

// JSON.parse로 String을 JSON으로 변환.
// 사용자 정보 객체가 loginUser 에 담겨있게 된다.
let loginUser = JSON.parse(localStorage.getItem('userInfo')) 


// 닉네임 반영 처리

$('#nickNameTxt').text(`닉네임 : ${loginUser.nick_name}`)