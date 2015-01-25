<input id="connect" value="connect" type="button">
<input id="send" value="send" type="button"/>
<script>
function connect(){
  var  wsServer = 'ws://localhost:8080/myHandler.html';
  var  websocket = new WebSocket(wsServer);
  websocket.onopen = function (evt) { onOpen(evt) };
  websocket.onclose = function (evt) { onClose(evt) };
  websocket.onmessage = function (evt) { onMessage(evt) };
  websocket.onerror = function (evt) { onError(evt) };
  function onOpen(evt) {
    console.log("Connected to WebSocket server.");
  }
  function onClose(evt) {
    console.log("Disconnected");
  }
  function onMessage(evt) {
    console.log('Retrieved data from server: ' + evt.data);
  }
  function onError(evt) {
    console.log('Error occured: ' + evt.data);
  }

  window.webSocketObj = websocket;
}
var connectBtn = document.getElementById("connect");
connectBtn.addEventListener("click", function () {
  connect();
});
document.getElementById("send").addEventListener("click",function(){
  webSocketObj.send("send message");
})
</script>