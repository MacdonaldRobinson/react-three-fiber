import {
    Environment,
    PerspectiveCamera,
    Scroll,
    ScrollControls,
    Sky,
} from "@react-three/drei";
import { Avatar } from "../Avatar/Avatar";
import { useControls } from "leva";
import { RoomScene, type TOnReadyReturn } from "../RoomScene/RoomScene";
import { useContext, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import ScrollBehavior from "./ScrollBehavior/ScrollBehavior";
import Section from "./Sections/Section/Section";
import { SectionsWrapper } from "./CanvasContent.styles";
import SceneContext from "../../contexts/SceneContext/SceneContext";

const CanvasContent = () => {
    const sceneContext = useContext(SceneContext);
    //const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const { camera } = useThree();
    const [avatar, setAvatar] = useState<THREE.Object3D>();
    const [chair, setChair] = useState<THREE.Object3D>();
    const [monitor, setMonitor] = useState<THREE.Object3D>();
    const [pictureFrame, setPictureFrame] = useState<THREE.Object3D>();
    const [phone, setPhone] = useState<THREE.Object3D>();

    useEffect(() => {
        if (chair && avatar && camera) {
            chair.position.z -= 0.2;
            // Get chair world position
            const worldPos = new THREE.Vector3();
            chair.getWorldPosition(worldPos);

            // Set avatar to world position
            avatar.position.copy(worldPos);
            avatar.position.y += 0.5; // offset to sit on chair

            const chairForward = new THREE.Vector3(0, 0, -1); // chair’s local front
            const worldForward = chairForward.applyQuaternion(chair.quaternion);

            avatar.lookAt(chair.position.clone().add(worldForward));
        }
    }, [chair, avatar, camera]);

    useFrame(() => {
        if (!sceneContext || sceneContext.sections.length == 0 || !camera)
            return;

        if (!sceneContext.currentSection) {
            sceneContext.setActiveSection(sceneContext.sections[0]);
        }

        if (!sceneContext.currentSection) return;

        const targetPos = new THREE.Vector3();
        sceneContext.currentSection.object3d.getWorldPosition(targetPos);

        //console.log(sceneContext.currentSection.object3d.position);

        camera.position.lerp(
            {
                x: targetPos.x,
                y: targetPos.y + 1,
                z: targetPos.z + 1,
            },
            0.05
        );

        const targetDirection = new THREE.Vector3();
        sceneContext.currentSection.object3d.getWorldDirection(targetDirection);

        // Current look-at point
        const currentLookAt = new THREE.Vector3();
        camera.getWorldDirection(currentLookAt); // gets forward unit vector
        currentLookAt.add(camera.position); // convert to actual point in space

        // Smoothly interpolate the look-at point toward the target
        currentLookAt.lerp(targetPos, 0.03); // 0.05 = speed

        // Rotate camera to look at the new interpolated point
        camera.lookAt(currentLookAt);
    });

    const { animation } = useControls({
        animation: {
            value: "Typing",
            options: ["Typing", "Standing", "Falling"],
        },
    });

    return (
        <>
            <Sky />
            <Environment preset="sunset" background />
            <directionalLight castShadow intensity={1} position={[2, 5, 5]} />
            <ScrollControls pages={3}>
                <group position={[0, -0.99, -0.1]}>
                    <RoomScene
                        onReady={(returnObjs: TOnReadyReturn) => {
                            setChair(returnObjs.chair);
                            setMonitor(returnObjs.monitor);
                            setPictureFrame(returnObjs.pictureFrame);
                            setPhone(returnObjs.phone);
                        }}
                    />
                    <Avatar
                        animation={animation}
                        onReady={(avatarRef) => {
                            setAvatar(avatarRef);
                        }}
                    />
                </group>
                <Scroll html>
                    <SceneContext.Provider value={sceneContext}>
                        <SectionsWrapper>
                            {monitor && (
                                <Section
                                    id="home"
                                    title="Home Section"
                                    content={"Home Section"}
                                    object3d={monitor}
                                />
                            )}
                            {pictureFrame && (
                                <Section
                                    id="about"
                                    title="About Section"
                                    content={"About Section"}
                                    object3d={pictureFrame}
                                />
                            )}
                            {phone && (
                                <Section
                                    id="contact"
                                    title="Contact Section"
                                    content={"Contact Section"}
                                    object3d={phone}
                                />
                            )}
                        </SectionsWrapper>
                    </SceneContext.Provider>
                </Scroll>
                <ScrollBehavior />
            </ScrollControls>

            {/* <OrbitControls /> */}
            <PerspectiveCamera makeDefault position={[5, 2, 5]} />
        </>
    );
};

export default CanvasContent;
