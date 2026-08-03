import ReactPlayer from "react-player"
import {MediaController, MediaControlBar, MediaTimeRange, MediaTimeDisplay, MediaVolumeRange, MediaPlaybackRateButton, MediaPlayButton,  MediaSeekBackwardButton, MediaSeekForwardButton, MediaMuteButton, MediaFullscreenButton} from "media-chrome/react"

const Player=({src})=>{
    return(
        <div>
            <MediaController className="h-full" style={{width:'100%', cursor:'grab', aspectRatio:'16/9'}}>
                <ReactPlayer
                    slot="media"
                    src={src}
                    controls={false}
                    loop={true}
                    playing={true}
                    muted={true}
                    style={{width:'100%',height:'100%'}}
                    onReady={()=>console.log('i am ready to start playing...')}
                >
                </ReactPlayer>
            </MediaController>
        </div>
    )
}

export default Player
