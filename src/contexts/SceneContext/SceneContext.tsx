import React, { createContext } from "react";
import * as THREE from "three";

export type TSectionProps = {
    key: string;
    title: string;
    content: React.ReactNode;
    meshRef: React.RefObject<THREE.Mesh | THREE.Group>;
};

export type TSection = {
    meshRef: React.RefObject<THREE.Mesh | THREE.Group>;
    htmlRef: React.RefObject<HTMLElement | null>;
};

export type TSceneContext = {
    sections: TSection[];
    currentSection: TSection | null;
    addSection: (newSection: TSection) => void;
};

const SceneContext = createContext<TSceneContext | null>(null);

export default SceneContext;
