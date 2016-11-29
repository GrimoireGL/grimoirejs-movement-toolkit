import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import Vector3 from "grimoirejs-math/ref/Vector3";
import TransformComponent from "grimoirejs-fundamental/ref/Components/TransformComponent";
import Attribute from "grimoirejs/ref/Node/Attribute";
export default class LinearMotionComponent extends Component {

    public static componentName: string = "LinearMotionComponent";

    public static attributes: { [key: string]: IAttributeDeclaration } = {
        direction: {
            defaultValue: "1,0,0",
            converter: "Vector3"
        },
        speed: {
            defaultValue: 1,
            converter: "Number"
        }
    };
    private _transform: TransformComponent;
    private _direction: Vector3;
    private _speed: number;
    public $awake(): void {
        this.getAttribute("direction").boundTo("_direction");
        this._direction = this._direction.normalized;
        this.getAttribute("speed").boundTo("_speed");
        this._speed *= 0.05;
        this._transform = this.node.getComponent("Transform") as TransformComponent;
    }
    public $mount(): void {
    }
    public $update(): void {
        this._transform.localPosition = this._direction
            .normalized
            .multiplyWith(this._speed)
            .addWith(this._transform.localPosition);
    }
}
