import { useState } from 'react';
import { calculateRequiredTons, MATERIAL_DENSITIES } from '../utils/deliveryCalc';

function MaterialCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [material, setMaterial] = useState('3/4 Crushed Stone');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (!length || !width || !depth) return;
    const tons = calculateRequiredTons(
      parseFloat(length),
      parseFloat(width),
      parseFloat(depth),
      material
    );
    setResult(tons);
  };

  return (
    <div className="calculator">
      <h3>Material Calculator</h3>
      <p style={{ color: 'var(--color-gray)', marginBottom: '20px', fontSize: '0.9rem' }}>
        Enter your area dimensions to estimate how much material you need.
      </p>

      <div className="calc-inputs">
        <div className="form-group">
          <label>Length (m)</label>
          <input
            type="number"
            placeholder="e.g. 10"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            min="0"
            step="0.1"
          />
        </div>
        <div className="form-group">
          <label>Width (m)</label>
          <input
            type="number"
            placeholder="e.g. 5"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            min="0"
            step="0.1"
          />
        </div>
        <div className="form-group">
          <label>Depth (m)</label>
          <input
            type="number"
            placeholder="e.g. 0.15"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '20px' }}>
        <label>Material Type</label>
        <select value={material} onChange={(e) => setMaterial(e.target.value)}>
          {Object.keys(MATERIAL_DENSITIES).map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary" onClick={handleCalculate} style={{ width: '100%', marginBottom: '20px' }}>
        Calculate
      </button>

      {result !== null && (
        <div className="calc-result">
          <h4>{result} Tons</h4>
          <p>Estimated {material} required for your project</p>
        </div>
      )}
    </div>
  );
}

export default MaterialCalculator;
