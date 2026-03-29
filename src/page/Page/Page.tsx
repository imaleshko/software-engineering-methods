import styles from "./Page.module.css";
import { type ChangeEvent, useState } from "react";
import calculateConstantAccelerationMotion from "@/utils/calculateConstantAccelerationMotion.ts";
import calculateProjectileMotion from "@/utils/calculateProjectileMotion.ts";
import Visualization from "../../blocks/Visualization/Visualization.jsx";
import Input from "../../blocks/Input/Input";

export interface MotionParameters {
  x0: number;
  y0: number;
  z0: number;
  v0: number;
  theta: number;
  phi: number;
  totalTime: number;
  a: number;
  m: number;
  k: number;
}

export type MotionType = "acceleration" | "projectile";

const Page = () => {
  const [parameters, setData] = useState<MotionParameters>({
    x0: 0,
    y0: 0,
    z0: 0,
    v0: 0,
    theta: 0,
    phi: 0,
    totalTime: 0,
    a: 0,
    m: 1,
    k: 0.1,
  });

  const [motionType, setMotionType] = useState<MotionType>("acceleration");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: Number(value),
    }));
  };

  const trajectoryData = motionType === "acceleration" ? calculateConstantAccelerationMotion() ? calculateProjectileMotion(parameters);

  return (
    <div className={styles.page}>
      <Input parameters={parameters} motionType={motionType} onMotionChange={setMotionType} handleChange={handleChange} />
      <Visualization trajectory_data={trajectoryData} />
    </div>
  );
};

export default Page;
