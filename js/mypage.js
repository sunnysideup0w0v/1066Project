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
        $(".imgBox img").attr('src',userInfo.profile_images[0].img_url)
    })
    .catch(function(err){
        console.log(err)
    })
}

setting();

$(".imgBox button").click(function(){
    $("#fileInput").trigger('click');
    const form = new FormData($("#fileForm")[0])
    console.log(form)
    axiosInstance.put('/user_profile_image',form)
    .then(function(res){
        console.log(res)
    })
    .catch(function(err){
        console.log(err)
    })
})

// $("#fileInput").on("change",function(){
//     let image = $("#fileInput").val();
//     const form = new FormData();
//     form.append('profile_images',image)
//     console.log(image)
//     axiosInstance.put('/user_profile_image',form)
//     .then(function(res){
//         console.log(res)
//     })
//     .catch(function(err){
//         console.log(err)
//         alert(err)
//     })
// })

$("#fileInput").click(function(){
    const form = new FormData($("#fileForm")[0])

    axiosInstance.put('/user_profile_image',form)
    .then(function(res){
        console.log(res)
    })
    .catch(function(err){
        console.log(err)
    })
})