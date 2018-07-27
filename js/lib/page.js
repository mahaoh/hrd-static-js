function page(pagepre ,pagecount, pageurl , numsize){
    var lastpage = null;
    var firstpage = null;
    var size = parseInt((numsize-1)/2);
    var pagetext = '<div class="page">';


    if(pagepre <= size ){
        firstpage = 1;
        lastpage = numsize;
    }else{
        firstpage = pagepre-size;
        lastpage =  pagepre+size;
    }
    if( lastpage>pagecount ){
        lastpage = pagecount;
    }
    if( pagecount-pagepre<=size ){
        firstpage = pagecount-numsize+1;
        lastpage = pagecount;
    }
    if( firstpage<1 ){
        firstpage = 1;
    }
    var pre_page = pageurl +  parseInt(pagepre-1);
    var nex_page = pageurl +  parseInt(pagepre+1);
    pagetext += "<a class='first' href='" +pageurl+ "1" + "'  style='display: none'>首页</a>";
    pagetext += (pagepre!=1) ? "<a href='"+pre_page+"' class='prev'><</a>":"<a href='javascript:;' class='prev disabled'><</a>";
    for(i=firstpage;i<=lastpage;i++){
        if( i==pagepre ){
            pagetext += "<a href='"+pageurl+i+"' class='current'>" + i + "</a>";
        }else{
            pagetext += "<a href='"+pageurl+i+"'>"+i+"</a>";
        }

    }
    if( pagecount > 5 ){
        pagetext += "<a class='total' href='" +pageurl + pagecount + "' >共" + pagecount +
            "页</a>";
    }

    pagetext += (pagepre!=pagecount) ? "<a class='next' href='"+nex_page+"' class='next'>></a>":"<a href='javascript:;' class='next disabled'>></a>";
    pagetext += "<a class='last' href='" +pageurl + pagecount + "' style='display: none'>末页</a></div>";

    return pagetext;

}
 if($(".page-nav").length != 0 ){

        if($('#page-nav').length == 0){
            $(".page-nav").html(page(pagepre, pagecount, pageurl, numsize));
            var width = $(".page").width();
            var left = parseInt($('.page-nav').width()-width)/2;
            $(".page").css({ width:width, marginLeft:left});
        }


    }