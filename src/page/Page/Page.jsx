import styles from "./Page.module.css";
import { useState } from "react";
import calculate from "../../utils/calculate.js";
import Visualization from "../../blocks/Visualization/Visualization.jsx";
import Input from "../../blocks/Input/Input.jsx";

const Page = () => {
  const [data, setData] = useState({
    x0: 0,
    y0: 0,
    v0: 0,
    a: 0,
    angle: 0,
    t: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: Number(value),
    }));
  };

  let trajectory_data = calculate(data);

  return (
    <div className={styles.page}>
      <Input data={data} handleChange={handleChange} />
      <Visualization trajectory_data={trajectory_data} />
    </div>
  );
};

export default Page;
