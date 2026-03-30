import styles from "./Page.module.css";
import { type ChangeEvent, useState } from "react";
import Visualization from "@/blocks/Visualization/Visualization";
import Input from "@/blocks/Input/Input";
import calculateMotion from "@/utils/calculateMotions";

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

export interface TrajectoryData {
  xValues: number[];
  yValues: number[];
  zValues: number[];
}

const Page = () => {
  const [parameters, setData] = useState<MotionParameters>({
    x0: 0,
    y0: 0,
    z0: 0,
    v0: 5,
    theta: 45,
    phi: 45,
    totalTime: 10,
    a: 2,
    m: 5,
    k: 0.5,
  });

  const [motionType, setMotionType] = useState<MotionType>("acceleration");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: Number(value),
    }));
  };

  const trajectoryData = calculateMotion(parameters, motionType);

  return (
    <div className={styles.page}>
      <Input
        parameters={parameters}
        motionType={motionType}
        onMotionChange={setMotionType}
        handleChange={handleChange}
      />
      <Visualization trajectoryData={trajectoryData} motionType={motionType} />
    </div>
  );
};

export default Page;
