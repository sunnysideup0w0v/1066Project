$('.signupBtn').click(function() {
    // 이메일 / 비번 / 닉네임 입력값을 각각의 변수에 저장
    let email = $('#emailEdt').val()
    let pw = $('#pwReEdt').val()
    let nick = $('#nickEdt').val()

    // 받아낸 값들을 폼데이터에 담아두자. => PUT으로 전송 예정
    const form = new FormData()
    form.append('email', email)
    form.append('password', pw)
    form.append('nick_name', nick)

    // 가져온 스크립트에 있는 axiosInstance를 이용해 회원가입 요청 실행
    axiosInstance.put('/user', form)
        .then(function (res) {
            // 성공시 얼럿 띄우고 로그인화면으로
            if (res.data.code == 200) {
                alert('회원가입 성공')
                $(location).attr('href', "login.html")
            }

        })
        .catch(function (error) {
            // 실패시 error의 응답에 담긴 message를 얼럿으로
            alert(error.response.data.message)
        })

})