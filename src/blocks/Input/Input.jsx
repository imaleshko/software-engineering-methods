import styles from "./Input.module.css";

const Input = ({ data, handleChange }) => {
  const handleFocus = (e) => {
    e.target.select();
  };
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Введіть дані</h1>
      <div className={styles.inputGroup}>
        <label htmlFor="x0" className={styles.label}>
          Початкова координата x0
        </label>
        <input
          type="number"
          id="x0"
          name="x0"
          value={data.x0}
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
          value={data.y0}
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
          value={data.v0}
          onChange={handleChange}
          onFocus={handleFocus}
          className={styles.input}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="a" className={styles.label}>
          Прискорення a
        </label>
        <input
          type="number"
          id="a"
          name="a"
          value={data.a}
          onChange={handleChange}
          className={styles.input}
          onFocus={handleFocus}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="angle" className={styles.label}>
          Кут
        </label>
        <input
          type="range"
          id="angle"
          name="angle"
          value={data.angle}
          min="0"
          max="90"
          onChange={handleChange}
          className={styles.angle}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="t" className={styles.label}>
          Час польоту t
        </label>
        <input
          type="number"
          id="t"
          name="t"
          value={data.t}
          onChange={handleChange}
          onFocus={handleFocus}
          className={styles.input}
        />
      </div>
    </div>
  );
};

export default Input;
