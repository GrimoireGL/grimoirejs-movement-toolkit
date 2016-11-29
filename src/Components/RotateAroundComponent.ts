import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import Vector3 from "grimoirejs-math/ref/Vector3";
import Quaternion from "grimoirejs-math/ref/Quaternion";
import Matrix from "grimoirejs-math/ref/Matrix";
import TransformComponent from "grimoirejs-fundamental/ref/Components/TransformComponent";
import Attribute from "grimoirejs/ref/Node/Attribute";
export default class RotateAroundComponent extends Component {

    public static componentName: string = "RotateAroundComponent";

    public static attributes: { [key: string]: IAttributeDeclaration } = {
        center: {
            defaultValue: "0,0,0",
            converter: "Vector3"
        },
        speed: {
            defaultValue: 1,
            converter: "Number"
        },
        axis: {
            defaultValue: "0,1,0",
            converter: "Vector3"
        }
    };
    private _transform: TransformComponent;
    private _center: Vector3;
    private _speed: number;
    private _axis: Vector3;
    private distance: number;
    public $awake(): void {
        this.getAttribute("center").boundTo("_center");
        this.getAttribute("speed").boundTo("_speed");
        this._speed *= 0.05;
        this.getAttribute("axis").boundTo("_axis");
        this._axis = this._axis.normalized;
        this._transform = this.node.getComponent("Transform") as TransformComponent;
    }
    public $mount(): void {
        this.distance = this._transform.localPosition
            .subtractWith(this._center)
            .magnitude;
    }
    public $update(): void {
      const rotationMat = Matrix.rotationQuaternion(Quaternion.angleAxis(this._speed, this._axis));
      this._transform.localPosition = Matrix.transformNormal(rotationMat,this._transform.localPosition.subtractWith(this._center)).addWith(this._center);
    }
}
