import { AppWrapper } from "./App.styles";
import CanvasScene from "./components/CanvasScene/CanvasScene";
import SceneContextProvider from "./contexts/SceneContext/SceneContextProvider";

function App() {
    return (
        <SceneContextProvider>
            <AppWrapper>
                <CanvasScene />
            </AppWrapper>
        </SceneContextProvider>
    );
}

export default App;
