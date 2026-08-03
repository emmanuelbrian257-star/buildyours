import {Html, useProgress} from "@react-three/drei"
import {ClipLoader} from 'react-spinners'

const CanvasLoader=()=>{
    const {progress}=useProgress();
    console.log(progress,"progress")
    return(
        <Html
            as="div"
            center
            style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'column'
            }}
        >
            <span className="canvas-loader"></span>
            <p>
                {progress.toFixed(2)}%
            </p>
        </Html>
    )
}

export default CanvasLoader;