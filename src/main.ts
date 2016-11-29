import gr from "grimoirejs";
import LinearMotionComponent from "./Components/LinearMotionComponent";
import RotateAroundComponent from "./Components/RotateAroundComponent";
import RotateSelfComponent from "./Components/RotateSelfComponent";
export default () => {
    gr.register(async () => {
        const _$ns = gr.ns("HTTP://GRIMOIRE.GL/NS/DEFAULT");
        gr.registerComponent(_$ns("LinearMotion"), LinearMotionComponent);
        gr.registerComponent(_$ns("RotateAround"), RotateAroundComponent);
        gr.registerComponent(_$ns("RotateSelf"), RotateSelfComponent);
        const primitive = [
            "triangle",
            "quad",
            "cube",
            "sphere",
            "circle",
            "cylinder",
            "cone",
            "plane"
        ];
        gr.componentDeclarations.get("GeometryRegistory").attributes["defaultGeometry"].defaultValue = primitive;
        for (let i = 0; i < primitive.length; i++) {
            gr.registerNode(primitive[i], [], {
                geometry: primitive[i],
                color: "#6a5acd"
            }, "mesh");
        }
    });
};
