import type { MotionParameters } from "@/page/Page/Page.tsx";

interface ProjectileMotionResult {
  xValue: number[];
  yValue: number[];
  zValue: number[];
}

const calculateProjectileMotion = ({
  x0,
  y0,
  z0,
  v0,
  theta,
  phi,
  totalTime,
  m,
  k,
}: MotionParameters): ProjectileMotionResult => {
  const toRadians = (angle: number): number => (angle * Math.PI) / 180;
  const thetaRad = toRadians(theta);
  const phiRad = toRadians(phi);

  const v0x = v0 * Math.cos(thetaRad) * Math.cos(phiRad);
  const v0y = v0 * Math.cos(thetaRad) * Math.sin(phiRad);
  const v0z = v0 * Math.sin(thetaRad);

  const xValue: number[] = [];
  const yValue: number[] = [];
  const zValue: number[] = [];

  const g = 9.81;
  const mDividedByK = m / k;
  const kDividedByM = k / m;
  const zConstant = mDividedByK * (v0z + mDividedByK * g);

  for (let currentTime = 0; currentTime <= totalTime; currentTime += 0.001) {
    const oneMinusExp = 1 - Math.exp(-kDividedByM * currentTime);

    const x = x0 + mDividedByK * v0x * oneMinusExp;
    const y = y0 + mDividedByK * v0y * oneMinusExp;
    let z = z0 + zConstant * oneMinusExp - mDividedByK * g * currentTime;

    if (z < 0) {
      z = 0;
      xValue.push(x);
      yValue.push(y);
      zValue.push(z);
      break;
    }

    xValue.push(x);
    yValue.push(y);
    zValue.push(z);
  }

  return { xValue, yValue, zValue };
};

export default calculateProjectileMotion;
