
import { useContext } from "react"
import { Display } from "./components/display"
import { Player } from "./components/player"
import { Sidebar } from "./components/sidebar"
import { PlayerContext } from "./context/PlayerContext";
function App() {
  const {audioRef,track} = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black" >
      <div className="h-[90%] flex">
        <Sidebar></Sidebar>
        <Display></Display>
      </div>
    <Player></Player>
    <audio src={track?.file} preload="auto" ref={audioRef}></audio>
    </div>
     
  )
}

export default App
