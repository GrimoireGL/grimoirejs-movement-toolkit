  import ComponentsLinearMotionComponent from "./Components/LinearMotionComponent";
  import ComponentsRotateAroundComponent from "./Components/RotateAroundComponent";
  import ComponentsRotateSelfComponent from "./Components/RotateSelfComponent";

import __MAIN__ from "./main"

var __EXPOSE__ = {
  "Components": {
    "LinearMotionComponent": ComponentsLinearMotionComponent,
    "RotateAroundComponent": ComponentsRotateAroundComponent,
    "RotateSelfComponent": ComponentsRotateSelfComponent
  }
};

let __BASE__ = __MAIN__();

Object.assign(__BASE__|| {},__EXPOSE__);

window["GrimoireJS"].lib.movement_toolkit = __EXPOSE__;

export default __BASE__;
