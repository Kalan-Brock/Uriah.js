$(function(){

    function getBrowserInfo(){
        var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
            return {name:'IE',version:(tem[1]||'')};
            }
        if(M[1]==='Chrome'){
            tem=ua.match(/\bOPR\/(\d+)/);
            if(tem!==null)   {return {name:'Opera', version:tem[1]};}
            }
        M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem=ua.match(/version\/(\d+)/i))!==null) {M.splice(1,1,tem[1]);}
        return {
          name: M[0],
          version: M[1]
        };
     }

     var browser = getBrowserInfo();

    function getBase64Image(img) {
            var canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            var dataURL;
            if(browser.name == "Chrome" || browser.name == "Opera"){
                dataURL = canvas.toDataURL("image/webp");
            }
            else {
                dataURL = canvas.toDataURL("image/png");
            }

            return dataURL;
    }


    var arr = $('img').map(function() { return this; }).get();

    $.each(arr, function(key, image){

        var uriah = localStorage.getItem($(image).attr('src'));

        if(uriah === null)
        {
            $(image).on('load', function(){
                var uri = getBase64Image(image);
                localStorage.setItem($(image).attr('src'), uri);
            });

            //For fast loading images.
            var uri = getBase64Image(image);
            localStorage.setItem($(image).attr('src'), uri);
        }
        else {
            $(image).attr('src', uriah);
        }
    });
});
