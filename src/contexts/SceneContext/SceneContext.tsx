import React, { createContext } from "react";
import * as THREE from "three";

export type TSectionProps = {
    id: string;
    title: string;
    content: React.ReactNode;
    object3d: THREE.Object3D;
};

export type TSection = {
    id: string;
    object3d: THREE.Object3D;
    htmlElement: HTMLElement;
};

export type TSceneContext = {
    sections: TSection[];
    currentSection: TSection | null;
    addSection: (newSection: TSection) => void;
    setActiveSection: (section: TSection) => void;
};

const SceneContext = createContext<TSceneContext | null>(null);

export default SceneContext;
