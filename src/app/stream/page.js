function Chatbox() {
  return (
    <div className="chatbox">
      
<iframe
  title="KCHUNG Radio chat room"
  src="https://app.radiocult.fm/embed/chat/kchung-radio-01e54a81?theme=custom&primaryColor=%23ffffff&corners=sharp&playerDisplay=metadata&ptc=%23000000&stc=%23000000&bc=%23ff0000&font=Courier%2BPrime&inmc=%235de2ff&outmc=%23ff98f2&stationmc=%238dff57&sepc=%231f3045"
  width="100%"
  height="600px"
  scrolling="no"
  frameborder="0"
  seamless
  allowtransparency="true"
></iframe>
    </div>
  )
}

export default function StreamPage() {
  return (
    <div id="main">
      <Chatbox />
    </div>
  )
}
