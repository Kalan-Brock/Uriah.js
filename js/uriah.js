$(function(){

    function getBase64Image(img) {
            var canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL("image/png");

            return dataURL;
    }


    var arr = $('img').map(function() { return this; }).get().reverse();

    $.each(arr, function(key, image){
        var uriah = localStorage.getItem($(image).attr('src'));

        if(!uriah)
        {
            image.onload = function(){
                var uri = getBase64Image(image);
                localStorage.setItem($(image).attr('src'), uri);
            };
        }
        else {
            $(image).attr('src', uriah);
        }
    })
});
