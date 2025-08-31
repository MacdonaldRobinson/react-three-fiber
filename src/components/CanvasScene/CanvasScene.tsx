import { Canvas } from "@react-three/fiber";
import { CanvasWrapper } from "./CanvasScene.styles";
import CanvasContent from "../CanvasContent/CanvasContent";

const CanvasScene = () => {
    return (
        <CanvasWrapper>
            <Canvas shadows>
                <CanvasContent />
            </Canvas>
        </CanvasWrapper>
    );
};

export default CanvasScene;
