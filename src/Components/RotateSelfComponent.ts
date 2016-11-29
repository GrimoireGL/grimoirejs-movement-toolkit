import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import Vector3 from "grimoirejs-math/ref/Vector3";
import Quaternion from "grimoirejs-math/ref/Quaternion"
import TransformComponent from "grimoirejs-fundamental/ref/Components/TransformComponent";
import Attribute from "grimoirejs/ref/Node/Attribute";
export default class RotateSelfComponent extends Component {

    public static componentName: string = "RotateSelfComponent";

    public static attributes: { [key: string]: IAttributeDeclaration } = {
        speed: {
            defaultValue: 1,
            converter: "Number"
        },
        axis: {
            defaultValue: "0,1,0",
            converter: "Vector3"
        }
    };
    private _speed: number;
    private _axis: Vector3;
    private _transform: TransformComponent;
    public $awake(): void {
        this.getAttribute("speed").boundTo("_speed");
        this._speed *= 0.01;
        this.getAttribute("axis").boundTo("_axis");
        this._axis = this._axis.normalized;
        this._transform = this.node.getComponent("Transform") as TransformComponent;
    }
    public $mount(): void {
    }
    public $update(): void {
        this._transform.localRotation = Quaternion.multiply(
            Quaternion.angleAxis(this._speed, this._axis), this._transform.localRotation);
    }
}
