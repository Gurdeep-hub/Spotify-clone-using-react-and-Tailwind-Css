import { Navbar } from "./Navbar";
import { albumsData,songsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
export function DisplayHome() {
    return(
        <>
            <Navbar></Navbar>
            <div className="nb-4">
                <h1 className="my-5 font-bold text2xl">Featured Charts</h1>
                <div className="flex overflow-auto">
                {albumsData.map((item,index)=>{
                  return ( <AlbumItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image}></AlbumItem>)
                })}
                </div>
            </div>
            <div className="nb-4">
                <h1 className="my-5 font-bold text2xl">Today's biggest hits</h1>
                <div className="flex overflow-auto">
                {songsData.map((item,index)=>{
                  return (<SongItem key={index} name={item.name} image={item.image} desc={item.desc} id={item.id}></SongItem>)
                })}
                </div>
            </div>
        </>
    )
}