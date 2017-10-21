var request = require("request");
var cheerio = require("cheerio");



const MAXBeautyPage = 2299;

//GetPostList
function getPosts(wantPageNumber, callback){
    callback(wantPageNumber);
  }
  
for(var pagePointer = 0; pagePointer< wantPageNumber ; pagePointer++){
    var pageNumber = MAXBeautyPage - pagePointer;
    getPosts(pageNumber, function(pageNumber){
        var post = [];
        request({
        url: "https://www.ptt.cc/bbs/Beauty/index"+pageNumber+".html",
        method: "GET"
        }, function(e,r,b) {
        
        if(e || !b) 
        { 
            console.log("資料擷取錯誤！");
            return; 
        }
        
        var $ = cheerio.load(b);
        var titles = $(".title a");
        for(var i=0;i<titles.length;i++) {
            var path = "https://www.ptt.cc" + $(titles[i]).attr("href");
            console.log("來源：" + path);
            downloadImage.get(path);
        }
        });
    });
}

  module.exports = {
    get: getPosts
  }