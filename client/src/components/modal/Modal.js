import React from 'react'
import { useState } from 'react';
import './Modal.css'

export default function Modal({children}) {
    

  return (
    <div className='MODAL'>
     <div className="mo">
        {children}
     </div> 
    
    </div>
  );
}
