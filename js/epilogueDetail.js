let searchParams = new URLSearchParams(window.location.search);
let projectId = searchParams.get('review_id');

console.log(projectId)

axiosInstance.get(`/review/${projectId}`)
.then(function(res){
    let review = res.data.data.review;
    console.log(review)
    $(".infoBox .projectBox .project").text(review.project.title)
    $(".infoBox .titleBox .title").text(review.title)
    $(".infoBox .writerBox .writer").text(review.writer.nick_name);
    $(".contentBox .content").text(review.content)
})
.catch(function(err){
    console.log(err)
})

$("#okBtn").click(function(){
    window.history.back();
})