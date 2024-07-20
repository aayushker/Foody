import React from 'react';
import { Input, Button } from '@nextui-org/react';

const BurgerLoginForm = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0e68c' }}>
      <div style={{ position: 'relative', width: '300px', height: '350px', backgroundColor: '#ffe5b4', borderRadius: '50% 50% 0 0', overflow: 'hidden', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        {/* Top Bun */}
        <div style={{ position: 'absolute', top: '0', left: '0', right: '0', height: '50px', backgroundColor: '#ffcc00', borderRadius: '50% 50% 0 0' }} />

        {/* Lettuce */}
        <div style={{ position: 'absolute', top: '50px', left: '0', right: '0', height: '20px', backgroundColor: '#00cc00', borderRadius: '0 0 50% 50%' }} />

        {/* Patty */}
        <div style={{ position: 'absolute', top: '70px', left: '0', right: '0', height: '50px', backgroundColor: '#663300' }} />

        {/* Form Fields */}
        <div style={{ position: 'absolute', top: '120px', left: '10%', right: '10%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Input placeholder="Username" style={{ backgroundColor: 'white', borderRadius: '10px' }} />
          <Input  type="password" placeholder="Password" style={{ backgroundColor: 'white', borderRadius: '10px' }} />
          <Button style={{ borderRadius: '10px' }}>Login</Button>
        </div>

        {/* Bottom Bun */}
        <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', height: '100px', backgroundColor: '#ffcc00', borderRadius: '0 0 50% 50%' }} />
      </div>
    </div>
  );
};

export default BurgerLoginForm;
