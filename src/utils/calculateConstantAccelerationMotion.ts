const calculateConstantAccelerationMotion = ({ x0, y0, v0, a, angle, t }) => {
  const angle_rad = (angle * Math.PI) / 180;
  const v0_x = v0 * Math.cos(angle_rad);
  const v0_y = v0 * Math.sin(angle_rad);
  const a_x = a * Math.cos(angle_rad);
  const a_y = a * Math.sin(angle_rad);

  const x_data = [];
  const y_data = [];
  const z_data = [];

  for (let t_current = 0; t_current <= t; t_current += 0.25) {
    const x = coordinate(x0, v0_x, a_x, t_current);
    const y = coordinate(y0, v0_y, a_y, t_current);
    if (v0 + a * t_current < 0) break;
    x_data.push(x);
    y_data.push(y);
    z_data.push(t_current);
  }

  return { x_data, y_data, z_data };
};

const coordinate = (c0, v0, a, t) => {
  return c0 + v0 * t + (a * t ** 2) / 2;
};

export default calculateConstantAccelerationMotion;
