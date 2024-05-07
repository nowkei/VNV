// pages/index.js
import React from 'react';

function Test() {
  return (
    <div>
      <h1>Hello World!</h1>
      <p>This is a simple Next.js page.</p>
      client env alo: {process.env.NEXT_PUBLIC_customKey}
      <br />
      client common env alo: {process.env.NEXT_PUBLIC_customKeyCommon}
    </div>
  );
}

export default Test;
