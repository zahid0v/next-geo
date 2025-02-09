import * as React from 'react';
import './index.css'

interface ControlPanelProps {
  year: number;
  onChange: (value: number) => void;
}

export default function ControlPanel(props:ControlPanelProps) {
  const {year} = props;

  return (
    <div className="control-panel" >
      <h3>Interactive Data</h3>
      <p>
        Map showing median household income by state in year <b>{year}</b>. Hover over a state to
        see details.
      </p>
      <p>
        Data source:{' '}
        <a href="https://www.census.gov" target="_new">
          US Census Bureau
        </a>
      </p>
      <hr />
      <hr />
      <hr />
      <hr />

      <div key={'year'} className="input">
        <label>Year</label>
        <input
          type="range"
          value={year}
          min={1995}
          max={2015}
          step={1}
          onChange={(evt) => props.onChange(Number(evt.target.value) as number)}
        />
      </div>
    </div>
  );
}
