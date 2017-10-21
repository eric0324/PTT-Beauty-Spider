var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');
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

  module.exports = {
    get: getPostImage
  }