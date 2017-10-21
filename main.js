var request = require("request");
var cheerio = require("cheerio");
var readlineSync = require('readline-sync');

var downloadImage = require("./downloadImage.js");

const MAXBeautyPage = 2295;
console.log("-----------------------------");
console.log("|                           |");
console.log("|  表特圖片爬蟲 ver. 0.0.1  |");
console.log("|                           |");
console.log("|  作者：EricWu             |");
console.log("|                           |");
console.log("----------------------------");

// Wait for user's response. 
var wantPageNumber = readlineSync.question('你要下載最新的幾頁？');

//GetPostList
function getPosts(pageNumber, callback){
  callback(pageNumber);
}

for(var pagePointer = 0; pagePointer< wantPageNumber ; pagePointer++){
  pageNumber = MAXBeautyPage - pagePointer;
  getPosts(pageNumber, function(pageNumber){
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