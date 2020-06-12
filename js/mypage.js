let settingMyPage = function() {
    axiosInstance.get('/my_info',{
        params:{
            // 
        }
    })
    .then(function(res){
        console.log(res)
        let userInfo = res.data.data.user
        console.log(userInfo)
        $(".infoBox .nick").text(userInfo.nick_name);
        $(".email").text(userInfo.email)
        $(".imgBox img").attr('src',userInfo.profile_images[0].img_url)
    })
    .catch(function(err){
        console.log(err)
    })
}
settingMyPage();

$(".profileEdt").click(function(){
    $("#main").addClass("edt")
})

$(".imgBox button").click(function(){
    $("#fileInput").trigger('click');
})

$("#fileInput").on("change",function(){
    const form = new FormData($("#fileForm")[0])
    console.log(form)
    axiosInstance.put('/user_profile_image',form)
    .then(function(res){
        console.log(res)
        location.reload();
    })
    .catch(function(err){
        console.log(err)
    })
})

$(".nickEdt").click(function(){
    if($(".nick").hasClass("on")){
        $(".nick").removeClass("on")
        $(".nickInput").addClass("on")
    } else {
        console.log("else")
        let newNick = $(".nickInput").val();

        if(newNick.length===0){
            if(confirm("닉네임 변경을 취소하시겠습니까?")){
                $(".nick").addClass("on")
                $(".nickInput").removeClass("on")
                $(".nickInput").val("")
                $("#main").removeClass("edt")
            }
        } else if(newNick.length<5){
            alert("닉네임을 5글자 이상으로 작성해주세요.")
        } else {
            const form = new FormData();
            form.append('nick_name',newNick);
    
            axiosInstance.patch('/user',form)
            .then(function(res){
                console.log(res)
            })
            .catch(function(err){
                console.log(err)
            })
            $(".nick").addClass("on")
            $(".nickInput").removeClass("on")
            $(".nickInput").val("")
            $("#main").removeClass("edt")
            location.reload();
        }
    }
})

$(".pwEdt").click(function(){
    $(".popupWrap").addClass("show")
    let currentPwInput = $("#originPw");
    let newPwInput = $("#newPw");
    let checkPwInput = $("#checkNewPw");
    let pwLength = false;
    let pwMatch = false;
    let newPwInputValue;
    let checkNewPwInputValue;

    let checkMatch = function(){
        newPwInputValue = newPwInput.val();
        checkNewPwInputValue = checkPwInput.val();
        if(newPwInputValue === checkNewPwInputValue){
            $(".checkNewPwNotice").text("비밀번호가 일치합니다.")
            pwMatch = true;
            
        } else {
            $(".checkNewPwNotice").text("비밀번호가 일치하지않습니다.")
            pwMatch = false;
        }
    }

    newPwInput.keyup(function(){
        pwLength = false;
        if(newPwInput.val().length >= 8){
            $(".newPwNotice").text("사용해도 좋은 비밀번호입니다.")
            checkMatch();
            pwLength = true;
        } else {
            $(".newPwNotice").text("비밀번호는 8자리 이상으로 설정해주세요.")
        }
    })
    checkPwInput.keyup(function(){
        checkMatch();
    })       
    
    $(".btnChange").click(function(){
        if(pwLength&&pwMatch){
            console.log("both are true")
            const form = new FormData();
            form.append('current_password',currentPwInput.val())
            form.append('new_password',newPwInputValue)
            axiosInstance.patch('/user',form)
            .then(function(res){
                console.log(res)
                alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.")
                $.removeCookie('userToken')
                $(location).attr('href','./index.html')
            })
            .catch(function(err){
                alert("기존 비밀번호가 일치하지 않습니다.")
                currentPwInput.val("")
            })
        } else {
            if(newPwInputValue.length<8){
                alert("새로운 비밀번호의 길이를 확인해주세요")
            } else {
                alert("비밀번호가 서로 일치하지 않습니다.")
            }
        }
    })
})



$(".popupWrap .btnClose").click(function(){
    if(confirm("비밀번호 변경을 취소하시겠습니까?")){
        $(".popupWrap").removeClass("show")
        $("#originPw").val("")
        $("#newPw").val("")
        $("#checkNewPw").val("")
    }
})