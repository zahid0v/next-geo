import * as React from 'react';

function ControlPanel() {
  return (
    <div className="font-helvetica absolute top-[100px] right-0 max-w-[320px] bg-white shadow-md p-6 m-5 text-[15px] leading-8 text-gray-500 outline-none" >
      <h3>Styled Clusters</h3>
      <p>Visualize points as dynamic clusters.</p>
    </div>
  );
}

export default React.memo(ControlPanel);
