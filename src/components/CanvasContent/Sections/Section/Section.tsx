import { SectionWrapper } from "./Section.styles";
import { useContext, useEffect, useRef } from "react";
import SceneContext, {
    type TSectionProps,
} from "../../../../contexts/SceneContext/SceneContext";

const Section = ({ id, title, content, object3d }: TSectionProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const sceneContext = useContext(SceneContext);

    useEffect(() => {
        if (!sceneContext) return;

        if (!sectionRef || !sectionRef.current) {
            return;
        }

        if (!object3d) {
            return;
        }
        sceneContext.addSection({
            id: id,
            htmlElement: sectionRef.current,
            object3d: object3d,
        });
    }, [id, object3d, sceneContext, sectionRef, title]);

    const OnViewportEnter = () => {
        const found = sceneContext?.sections.find((s) => s.id == id);
        if (found) {
            sceneContext?.setActiveSection(found);
        }
    };

    return (
        <SectionWrapper ref={sectionRef} onViewportEnter={OnViewportEnter}>
            <h2>{title}</h2>
            <div>{content}</div>
        </SectionWrapper>
    );
};

export default Section;
