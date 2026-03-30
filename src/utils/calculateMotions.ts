import type {
  MotionParameters,
  MotionType,
  TrajectoryData,
} from "@/page/Page/Page.tsx";

interface ConstantAccelerationParameters {
  x0: number;
  y0: number;
  z0: number;
  v0: number;
  v0x: number;
  v0y: number;
  v0z: number;
  totalTime: number;
  cosTheta: number;
  sinTheta: number;
  cosPhi: number;
  sinPhi: number;
  a: number;
}

interface ProjectileMotionParameters {
  x0: number;
  y0: number;
  z0: number;
  v0x: number;
  v0y: number;
  v0z: number;
  totalTime: number;
  m: number;
  k: number;
}

const coordinate = (c0: number, v0: number, a: number, t: number): number => {
  return c0 + v0 * t + (a * t ** 2) / 2;
};

const calculateConstantAccelerationMotion = ({
  x0,
  y0,
  z0,
  v0,
  v0x,
  v0y,
  v0z,
  totalTime,
  cosTheta,
  sinTheta,
  cosPhi,
  sinPhi,
  a,
}: ConstantAccelerationParameters) => {
  const xValues: number[] = [];
  const yValues: number[] = [];
  const zValues: number[] = [];

  const ax = a * cosTheta * cosPhi;
  const ay = a * cosTheta * sinPhi;
  const az = a * sinTheta;

  for (let currentTime = 0; currentTime <= totalTime; currentTime += 0.1) {
    const x = coordinate(x0, v0x, ax, currentTime);
    const y = coordinate(y0, v0y, ay, currentTime);
    const z = coordinate(z0, v0z, az, currentTime);
    if (v0 + a * currentTime < 0) break;
    xValues.push(x);
    yValues.push(y);
    zValues.push(z);
  }

  return { xValues, yValues, zValues };
};

const calculateProjectileMotion = ({
  x0,
  y0,
  z0,
  v0x,
  v0y,
  v0z,
  totalTime,
  m,
  k,
}: ProjectileMotionParameters): TrajectoryData => {
  const xValues: number[] = [];
  const yValues: number[] = [];
  const zValues: number[] = [];

  const g = 9.81;
  const mDividedByK = m / k;
  const kDividedByM = k / m;
  const zConstant = mDividedByK * (v0z + mDividedByK * g);

  for (let currentTime = 0; currentTime <= totalTime; currentTime += 0.01) {
    const oneMinusExp = 1 - Math.exp(-kDividedByM * currentTime);

    const x = x0 + mDividedByK * v0x * oneMinusExp;
    const y = y0 + mDividedByK * v0y * oneMinusExp;
    const z = z0 + zConstant * oneMinusExp - mDividedByK * g * currentTime;

    if (z < 0) {
      // z = 0;
      // xValues.push(x);
      // yValues.push(y);
      // zValues.push(z);
      break;
    }

    xValues.push(x);
    yValues.push(y);
    zValues.push(z);
  }

  return { xValues, yValues, zValues };
};

const calculateMotion = (
  { x0, y0, z0, v0, theta, phi, totalTime, m, k, a }: MotionParameters,
  motionType: MotionType,
): TrajectoryData => {
  const toRadians = (angle: number): number => (angle * Math.PI) / 180;
  const thetaRad = toRadians(theta);
  const phiRad = toRadians(phi);

  const cosTheta = Math.cos(thetaRad);
  const sinTheta = Math.sin(thetaRad);
  const cosPhi = Math.cos(phiRad);
  const sinPhi = Math.sin(phiRad);

  const v0x = v0 * cosTheta * cosPhi;
  const v0y = v0 * cosTheta * sinPhi;
  const v0z = v0 * sinTheta;

  return motionType === "acceleration"
    ? calculateConstantAccelerationMotion({
        x0,
        y0,
        z0,
        v0,
        v0x,
        v0y,
        v0z,
        totalTime,
        cosTheta,
        sinTheta,
        cosPhi,
        sinPhi,
        a,
      })
    : calculateProjectileMotion({
        x0,
        y0,
        z0,
        v0x,
        v0y,
        v0z,
        totalTime,
        m,
        k,
      });
};

export default calculateMotion;
