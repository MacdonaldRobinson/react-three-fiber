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
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import ScrollBehavior from "./ScrollBehavior/ScrollBehavior";
import Section from "./Sections/Section/Section";
import { SectionsWrapper } from "./CanvasContent.styles";

const CanvasContent = () => {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const [avatarRef, setAvatarRef] =
        useState<React.RefObject<THREE.Object3D | null>>();
    const [chairRef, setChairRef] =
        useState<React.RefObject<THREE.Object3D | null>>();
    const [phoneRef, setPhoneRef] =
        useState<React.RefObject<THREE.Object3D | null>>();
    const [monitorRef, setMonitorRef] =
        useState<React.RefObject<THREE.Object3D | null>>();
    const [pictureFrameRef, setPictureFrameRef] =
        useState<React.RefObject<THREE.Object3D | null>>();

    useEffect(() => {
        if (chairRef?.current && avatarRef?.current && cameraRef?.current) {
            chairRef.current.position.z -= 0.2;
            // Get chair world position
            const worldPos = new THREE.Vector3();
            chairRef.current.getWorldPosition(worldPos);

            // Set avatar to world position
            avatarRef.current.position.copy(worldPos);
            avatarRef.current.position.y += 0.5; // offset to sit on chair

            const chairForward = new THREE.Vector3(0, 0, -1); // chair’s local front
            const worldForward = chairForward.applyQuaternion(
                chairRef.current.quaternion
            );

            avatarRef.current.lookAt(
                chairRef.current.position.clone().add(worldForward)
            );
        }
    }, [chairRef, avatarRef, cameraRef]);

    useFrame(() => {
        if (chairRef?.current && avatarRef?.current && cameraRef?.current) {
            cameraRef.current.lookAt(avatarRef.current.position);
        }
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
            <group position={[0, -0.99, -0.1]}>
                <RoomScene
                    onReady={(returnRefs: TOnReadyReturn) => {
                        console.log(returnRefs);
                        setChairRef(returnRefs.chairRef);
                        setPhoneRef(returnRefs.phoneRef);
                        setMonitorRef(returnRefs.monitorRef);
                        setPictureFrameRef(returnRefs.pictureFrameRef);
                    }}
                />
                <Avatar
                    animation={animation}
                    onReady={(avatarRef) => {
                        setAvatarRef(avatarRef);
                    }}
                />
            </group>
            <ScrollControls pages={3}>
                <Scroll html>
                    <SectionsWrapper>
                        <Section
                            key="home"
                            title="Home Section"
                            content={"Home Section"}
                            meshRef={
                                monitorRef as React.RefObject<THREE.Object3D>
                            }
                        />
                        <Section
                            key="about"
                            title="About Section"
                            content={"About Section"}
                            meshRef={
                                pictureFrameRef as React.RefObject<THREE.Object3D>
                            }
                        />
                        <Section
                            key="contact"
                            title="Contact Section"
                            content={"Contact Section"}
                            meshRef={
                                undefined as unknown as React.RefObject<THREE.Object3D>
                            }
                        />
                    </SectionsWrapper>
                </Scroll>
                <ScrollBehavior />
            </ScrollControls>

            {/* <OrbitControls /> */}
            <PerspectiveCamera
                ref={cameraRef}
                makeDefault
                position={[5, 2, 5]}
            />
        </>
    );
};

export default CanvasContent;
