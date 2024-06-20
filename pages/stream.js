function Chatbox() {
  return (
    <div className="chatbox">
      <iframe
        src="https://embed.tlk.io/kchung?custom_css_path=https://www.kchungradio.org/css/chat-style.css&amp;theme=theme--minimal"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ height: '400px' }}
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
