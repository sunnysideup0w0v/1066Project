$('.loginBtn').click(function() {

    // 서버에 입력한 이메일/비번으로 로그인 시도

    // 입력한 이메일 / 비번 변수에 저장
    let email = $('#idInputTxt').val()
    let pw = $('#pwInputTxt').val()

    // 로그인 요청 데이터를 담아둘 FormData 클래스
    const form = new FormData()
    form.append('email', email)
    form.append('password', pw)

    // 커스텀 axios로 실제 로그인 호출

    axiosInstance.post('/user', form)
        .then(function (res) {
            
            // 성공 응답에 담긴 토큰을 변수로 저장
            let token = res.data.data.token

            // 변수에 담아둔 토큰을 쿠키에 저장
            $.cookie('userToken', token)

            // 쿠키에 잘 저장되었는지 확인
            console.log('쿠키에 저장된 토큰 : ', $.cookie('userToken'))

            // 쿠키에 저장 : $.cookie('항목이름', 저장변수)
            // 쿠키에 있는 값 조회 : $.cookie('항목이름')

            $(location).attr('href', "index.html")

        })
        .catch(function (error) {
            // 실패시 error의 응답에 담긴 message를 얼럿으로
            alert(error.response.data.message)
        })



})

// 회원가입 버튼이 눌렸을때

$('#signUpButton').click(function() {

    // 회원가입 html파일로 이동
    $(location).attr('href', 'sign_up.html')

})

