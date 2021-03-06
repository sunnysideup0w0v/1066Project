let indexNum = 1;
let epilogueList = $(".epilogueList");
let i=0;
let reviewListView = function(indexNum){
    axiosInstance.get('/review',{
        params: {
            page_num: indexNum
        }
    })
    .then(function(res){
        let data = res.data.data.reviews;
        data.forEach((item,index) => {
            i = ((indexNum-1)*10) + index + 1;
            let li = `<li review_id=${item.id}>
            <span class="no">${i}</span>
            <span class="title">${item.title}</span>
            <span class="writer">${item.writer.nick_name}</span>
            <span class="date">2020-06-09</span>
            </li>`
            epilogueList.append(li)
            return i;
            
        })
        $(".epilogueList li").click(function(){
            console.log("hi")
            $(location).attr('href',`epilogueDetail.html?review_id=${$(this).attr('review_id')}`)
        })
    })
    .catch(function(err){
        console.log(err)
    })
}
axiosInstance.get('/review',{
    params: {
        page_num: indexNum
    }
})
.then(function(res){
    let totalPage = res.data.data.total_page;
    for(let j=0;j<totalPage;j++){
        $(".page .pageList").append($(`<li>${j+1}</li>`))
    }
    let pageList = $(".page .pageList li");
    console.log(indexNum)
    pageList.eq(indexNum-1).addClass("on")

    $(".page .pageList li").click(function(){
        let pageIndex = $(this).text();
        epilogueList.children().not(epilogueList.children()[0]).remove();
        reviewListView(pageIndex);
        $(".pageList li").removeClass("on")
        $(this).addClass("on")
    })
})
.catch(function(err){
    console.log(err)
})

reviewListView(1);

$(".epilogueRegisterBtn").click(function(){
    $(location).attr('href','epilogueWrite.html')
})
