import { useMemo, useState } from "react";
import type { TSceneContext, TSection } from "./SceneContext";
import SceneContext from "./SceneContext";

type TSceneContextProvider = {
    children: React.ReactNode;
};

const SceneContextProvider = ({ children }: TSceneContextProvider) => {
    const [sections, setSections] = useState<TSection[]>([]);

    const addSection = (newSection: TSection) => {
        setSections((prev) => [...prev, newSection]);
    };

    const newContext: TSceneContext = useMemo(() => {
        return {
            addSection: addSection,
            sections: sections,
            currentSection: null,
        };
    }, [sections]);

    return (
        <SceneContext.Provider value={newContext}>
            {children}
        </SceneContext.Provider>
    );
};
export default SceneContextProvider;
