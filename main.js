var request = require("request");
var cheerio = require("cheerio");
var readline = require('readline');
var fs = require('fs');
var readlineSync = require('readline-sync');

const MAXBeautyPage = 2299;
console.log("-----------------------------");
console.log("|                           |");
console.log("|  表特圖片爬蟲 ver. 0.0.1  |");
console.log("|                           |");
console.log("|  作者：EricWu             |");
console.log("|                           |");
console.log("-----------------------------");

// Wait for user's response. 
var wantPageNumber = readlineSync.question('你要下載最新的幾頁？');

//GetPostList
function getPosts(pageNumber, callback){
  callback(pageNumber);
}

for(var pagePointer = 0; pagePointer< wantPageNumber ; pagePointer++){
  pageNumber = MAXBeautyPage - pagePointer;
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
        getPostImage(path);
      }
    });
  });
  
}


//Function: Download Image 
var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

//Function: Get Post Image 
function getPostImage(path){
  request({
    url: path,
    method: "GET"
  }, function(e,r,b) {
    
    if(e || !b) 
    { 
      console.log("圖片擷取錯誤！");
      return; 
    }
    
    var $ = cheerio.load(b);
    var imgPath = $(".richcontent a");
    for(var i=0 ; i<imgPath.length ;i++) {
      console.log('下載.....');
      var str = $(imgPath[i]).attr("href")
      var res = str.replace("//imgur.com/", "");
      var newRes = res.replace(res, "https://i.imgur.com/"+res+".jpg");
      download(newRes, 'download/'+res+'.jpg', function(){
      });
    }
  });
}