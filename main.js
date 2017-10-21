var request = require("request");
var cheerio = require("cheerio");
var readline = require('readline');

// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// var pageNumber;
// rl.question("要讀幾頁的表特版？ ", function(answer) {
//   if(answer<1){
//     console.log("低於一頁，自動設定為讀取一頁！");
//     pageNumber=1;
//   }else{
//     pageNumber=answer;
//   }
  
//   rl.close();
// });

function getPosts(pageNumber, callback){
  callback(pageNumber);
}

getPosts(10, function(pageNumber){
  var post = [];
    request({
      url: "https://www.ptt.cc/bbs/Beauty/index2294.html",
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
        post.push("https://www.ptt.cc" + $(titles[i]).attr("href"));
      }
      console.log(post);
      return post;
    });
  }
);


