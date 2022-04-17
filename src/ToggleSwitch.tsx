import React from "react";

import "./ToggleSwitch.css";

type ToggleSwitchProps = { value: boolean; onChange: () => void };

function ToggleSwitch(props: ToggleSwitchProps) {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={props.value} onChange={props.onChange} />
      <span className="switch" />
    </label>
  );
}
export default ToggleSwitch;
