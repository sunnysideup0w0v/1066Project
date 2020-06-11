let setting = function() {
    axiosInstance.get('/my_info',{
        params:{
            // 
        }
    })
    .then(function(res){
        console.log(res)
        let userInfo = res.data.data.user
        console.log(userInfo)
        $(".nick").text(userInfo.nick_name);
        $(".email").text(userInfo.email)
        $(".imgBox img").attr('src',userInfo.profile_images[(userInfo.profile_images.length)-1].img_url)
    })
    .catch(function(err){
        console.log(err)
    })
}

setting();

$(".imgBox button").click(function(){
    $("#fileInput").trigger('click');
})

$("#fileInput").on("change",function(){
    const form = new FormData($("#fileForm")[0])
    console.log(form)
    axiosInstance.put('/user_profile_image',form)
    .then(function(res){
        console.log(res)
        setting();
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
        axiosInstance.patch('/user',{
            params: {
                "nick_name":true
            }
        })
        .then(function(){
            console.log(res)
        })
        .catch(function(err){
            console.log(err)
        })
    }
})