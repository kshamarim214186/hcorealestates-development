'use client';
import { useState } from 'react';
export default function LoanForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const formSubmit = e => {
    e.preventDefault();
  };
  return (
    <>
      <form action="" onSubmit={formSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="tel"
            className="form-control"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
