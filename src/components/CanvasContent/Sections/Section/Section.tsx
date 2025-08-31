import { SectionWrapper } from "./Section.styles";
import { useContext, useEffect, useRef } from "react";
import SceneContext, {
    type TSectionProps,
} from "../../../../contexts/SceneContext/SceneContext";
import { useThree } from "@react-three/fiber";

const Section = ({ title, content, meshRef }: TSectionProps) => {
    const { camera } = useThree();
    const sectionRef = useRef<HTMLDivElement>(null);
    const sceneContext = useContext(SceneContext);

    useEffect(() => {
        if (!sceneContext) return;

        if (!sectionRef || !sectionRef.current) {
            return;
        }

        if (!meshRef || !meshRef.current) {
            return;
        }

        sceneContext.addSection({
            htmlRef: sectionRef,
            meshRef: meshRef,
        });
    }, [meshRef, sceneContext, sectionRef]);

    return (
        <SectionWrapper
            ref={sectionRef}
            onViewportEnter={() => {
                console.log(camera);
            }}
        >
            <h2>{title}</h2>
            <div>{content}</div>
        </SectionWrapper>
    );
};

export default Section;
