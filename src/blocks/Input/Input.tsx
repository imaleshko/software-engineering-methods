import styles from "./Input.module.css";
import type { MotionParameters, MotionType } from "@/page/Page/Page.tsx";
import type { ChangeEvent, FocusEvent } from "react";

interface InputProps {
  parameters: MotionParameters;
  motionType: MotionType;
  onMotionChange: (type: MotionType) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  parameters,
  motionType,
  onMotionChange,
  handleChange,
}: InputProps) => {
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Параметри</h1>

      <div className={styles.switch}>
        <button
          type="button"
          className={
            motionType === "acceleration" ? styles.activeButton : styles.button
          }
          onClick={() => onMotionChange("acceleration")}
        >
          Прямолінійний рівноприскорений
        </button>
        <button
          type="button"
          className={
            motionType === "projectile" ? styles.activeButton : styles.button
          }
          onClick={() => onMotionChange("projectile")}
        >
          Під кутом до горизонту
        </button>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="x0" className={styles.label}>
          Початкова координата x0
        </label>
        <input
          type="number"
          id="x0"
          name="x0"
          value={parameters.x0}
          onChange={handleChange}
          onFocus={handleFocus}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="y0" className={styles.label}>
          Початкова координата y0
        </label>
        <input
          type="number"
          id="y0"
          name="y0"
          value={parameters.y0}
          onChange={handleChange}
          onFocus={handleFocus}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="z0" className={styles.label}>
          Початкова координата z0
        </label>
        <input
          type="number"
          id="z0"
          name="z0"
          value={parameters.z0}
          onChange={handleChange}
          onFocus={handleFocus}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="v0" className={styles.label}>
          Початкова швидкість v0
        </label>
        <input
          type="number"
          id="v0"
          name="v0"
          value={parameters.v0}
          onChange={handleChange}
          onFocus={handleFocus}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="theta" className={styles.label}>
          Кут θ (вертикальний кут між площиною XY та вектором руху) [0, 90]
        </label>
        <input
          type="range"
          id="theta"
          name="theta"
          value={parameters.theta}
          min="0"
          max="90"
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="phi" className={styles.label}>
          Кут φ (горизонтальний кут між проекцією вектора на XY та віссю X) [0,
          90]
        </label>
        <input
          type="range"
          id="phi"
          name="phi"
          value={parameters.phi}
          min="0"
          max="90"
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="totalTime" className={styles.label}>
          Час польоту t
        </label>
        <input
          type="number"
          id="totalTime"
          name="totalTime"
          value={parameters.totalTime}
          onChange={handleChange}
          onFocus={handleFocus}
          className={styles.input}
        />
      </div>

      {motionType === "projectile" && (
        <>
          <div className={styles.inputGroup}>
            <label htmlFor="m" className={styles.label}>
              Маса тіла m [0.1, 10]
            </label>
            <input
              type="range"
              id="m"
              name="m"
              value={parameters.m}
              min="0.1"
              max="10"
              step="0.01"
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="k" className={styles.label}>
              Опір повітря k [0.1, 1.5]
            </label>
            <input
              type="range"
              id="k"
              name="k"
              value={parameters.k}
              min="0.1"
              max="1.5"
              step="0.01"
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </>
      )}

      {motionType === "acceleration" && (
        <>
          <div className={styles.inputGroup}>
            <label htmlFor="a" className={styles.label}>
              Прискорення a
            </label>
            <input
              type="number"
              id="a"
              name="a"
              value={parameters.a}
              onChange={handleChange}
              className={styles.input}
              onFocus={handleFocus}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Input;
