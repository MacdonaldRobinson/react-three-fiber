import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ScrollBehavior = () => {
    // const scroll = useScroll();
    // useFrame((state) => {
    //     if (!scroll) return;

    //     const startZ = 5; // camera start position
    //     const endZ = 2; // camera end position when fully scrolled
    //     const targetZ = startZ + (endZ - startZ) * scroll.offset;

    //     state.camera.position.z = THREE.MathUtils.lerp(
    //         state.camera.position.z,
    //         targetZ,
    //         0.1 // smoothness
    //     );
    // });
    return null;
};

export default ScrollBehavior;
