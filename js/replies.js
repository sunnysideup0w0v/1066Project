let searchParams = new URLSearchParams(window.location.search);
let projectId = searchParams.get('project_id')
let proofId = searchParams.get('proof_id');
console.log("proof_id",proofId,'project_id',projectId);

let makeView = function(){
    axiosInstance.get(`/project_proof/${proofId}`)
    .then(function(res){
        let proof =res.data.data.project;
        console.log(proof)
        $("h2 .title").text(projectId)
        $(".origin .txtBox .content").text(proof.content)
        $(".origin .txtBox .nick").text(proof.user.nick_name)
        $(".origin .txtBox .date").text(proof.proof_time)
        if(proof.images.length>0){
            $(".origin .imgBox img").attr('src',proof.images[(proof.images.length)-1].img_url)
        } else {
            $(".origin .imgBox img").attr('src',"../images/siriwan-arunsiriwattana-gs0coXLmjdI-unsplash.jpg")
        }

        if(proof.replies.length>0){
            proof.replies.forEach(function(el){
                console.log(el)
                let imgSrc = "../images/siriwan-arunsiriwattana-gs0coXLmjdI-unsplash.jpg";

                if(el.user.profile_images.length>0){
                    imgSrc = `"${el.user.profile_images[el.user.profile_images.length-1].img_url}"`
                }

                let li = `<li>
                                <div class="imgBox">
                                    <img src=${imgSrc} alt="">
                                </div>
                                <div class="txtBox">
                                    <p class="nick"><span class="nick">${el.user.nick_name}</span> <span class="replyDate">${el.created_at}</span></p>
                                    <p class="content">${el.content}</p>
                                </div>
                            </li>`
                $(".list ul").append(li)
            })
        }
    })
    .catch(function(err){
        console.log(err)
    })
}

makeView();

$(".inputBox .replyBtn").click(function(){
    const form = new FormData();
    form.append('proof_id',proofId)
    form.append('content',$(".inputBox input").val())
    axiosInstance.post('/proof_reply',form)
    .then(function(res){
        console.log(res)
        alert(res.data.message)
        $(".list ul").empty();
        $("input").val("")
        makeView();
    })
    .catch(function(err){
        console.log(err)
    })
})