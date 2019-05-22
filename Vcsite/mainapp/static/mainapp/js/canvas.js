var pos = {
  drawable : false,
  x: -1,
  y: -1
};
var canvas, ctx;
function initDraw(event) {
  ctx.beginPath();
  pos.drawable = true;
  var coors = getPosition(event);
  pos.X = coors.X;
  pos.Y = coors.Y;
  ctx.moveTo(pos.X, pos.Y);
}
function draw(event){
  var coors = getPosition(event);
  ctx.lineTo(coors.X, coors.Y);
  pos.X = coors.X;
  pos.Y = coors.Y;
  ctx.stroke();
}
function finishDraw(){
  pos.drawable = false;
  pos.X = -1;
  pos.Y = -1;
}
function getPosition(event) {
  var x = event.pageX - canvas.offsetLeft;
  var y = event.pageY - canvas.offsetTop;
  return {X: x, Y: y};
}
window.onload = function(){
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.addEventListener("mousedown", listener);
  canvas.addEventListener("mousemove", listener);
  canvas.addEventListener("mouseup", listener);
  canvas.addEventListener("mouseout", listener);
}

function listener(event){
  switch(event.type){
      case "mousedown":
        initDraw(event);
        break;
      case "mousemove":
        if(pos.drawable)
          draw(event);
        break;
      case "mouseout":
      case "mouseup":
        finishDraw();
        break;
  }
}


function uploadCanvasData()
{
    var dataUrl = canvas.toDataURL();
    var blob = dataURItoBlob(dataUrl);
    var formData = new FormData();
    formData.append("file", blob);
    alert(dataUrl);
    console.log(formData);

    /*var request = new XMLHttpRequest();
    request.onload = completeRequest;
    request.open("POST", "mainapp:send");
    request.send(formData);*/
}

function dataURItoBlob(dataURI)
{
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++)
    {
        ia[i] = byteString.charCodeAt(i);
    }

    var bb = new Blob([ab], { "type": mimeString });
    return bb;
}
/*function send(){
    var canvas = document.getElementById('image');
    var dataURL = canvas.toDataURL();
    $.ajax({
        type: "POST",
        url: "mainapp:upload ",
        data: {
            imgBase64: dataURL
        }
    }).done(function(o) {
        console.log('saved');
    });
}
function sendBase64Img() {
    var canvas2 = document.getElementById('canvas2');
    var dataURL = canvas2.getContext("2d");
    var image = new Image();
    image.src = canvas.toDataURL();

    //var dataURL = canvas2.toDataURL();//이미지 데이터가 base64 문자열로 인코딩된 데이터
    // base64문자열의 첫 부분에 위치한 'https://t1.daumcdn.net/cfile/tistory/24343B4956E6601629"");
    $.ajax({
      type: "POST",
      url: "saveBase64.jsp",
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      data: { "imgBase64": dataURL }
    }).success(function(o) {
      alert('선택영역을 서버의 이미지 파일에 저장했습니다');
    });
}*/
