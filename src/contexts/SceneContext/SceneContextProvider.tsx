import { useState } from "react";
import type { TSceneContext, TSection } from "./SceneContext";
import SceneContext from "./SceneContext";

type TSceneContextProvider = {
    children: React.ReactNode;
};

const SceneContextProvider = ({ children }: TSceneContextProvider) => {
    const [sections, setSections] = useState<TSection[]>([]);
    const [currentSection, setCurrentSection] = useState<TSection | null>(null);

    const addSection = (newSection: TSection) => {
        const found = sections.find((section) => section.id == newSection.id);

        if (!found) {
            setSections((prev) => [...prev, newSection]);
        }
    };

    const setActiveSection = (section: TSection) => {
        const found = sections.find((s) => s.id == section.id);

        if (found) {
            setCurrentSection(found);
        }
    };

    const newContext: TSceneContext = {
        addSection: addSection,
        setActiveSection: setActiveSection,
        sections: sections,
        currentSection: currentSection,
    };

    return (
        <SceneContext.Provider value={newContext}>
            {children}
        </SceneContext.Provider>
    );
};
export default SceneContextProvider;
