'use client';
import { faIndianRupeeSign } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState(200000); // default 25 lakh
  const [rate, setRate] = useState(7.5); // annual interest %
  const [tenure, setTenure] = useState(10); // years

  // EMI Formula
  const monthlyRate = rate / 12 / 100;
  const months = tenure * 12;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const totalAmount = emi * months;
  const totalInterest = totalAmount - principal;
  return (
    <>
      <div className="card p-4">
        {/* Loan amount */}
        <div className="d-flex flex-wrap justify-content-between mb-4">
          <label htmlFor="loanAmount" className="mb-0">
            Loan amount
          </label>
          <input
            type="number"
            value={principal}
            className="form-control form-control-sm text-end"
            style={{ width: '95px' }}
            onChange={e => setPrincipal(Number(e.target.value))}
            min={100000}
          />
          <input
            type="range"
            min="100000"
            max="25000000"
            step="50000"
            id="loanAmount"
            value={principal}
            onChange={e => setPrincipal(Number(e.target.value))}
            className="form-range"
          />
          <small className="d-flex align-items-center gap-1">
            <FontAwesomeIcon icon={faIndianRupeeSign} style={{ fontSize: '12px' }} />
            {principal.toLocaleString('en-IN')}
          </small>
        </div>

        {/* Interest rate */}
        <div className="d-flex flex-wrap justify-content-between mb-4">
          <label htmlFor="rateOfInterest" className="form-label">
            Rate of Interest (p.a)
          </label>

          <div className="d-flex">
            <input
              type="number"
              min="1"
              max="15"
              step="0.1"
              value={rate}
              onChange={e => setRate(Number(e.target.value))}
              className="form-control form-control-sm rounded-0 text-end"
              style={{ width: '50px' }}
            />{' '}
            <div className="border pt-1 px-1">%</div>
          </div>
          <input
            type="range"
            min="1"
            max="15"
            step="0.1"
            value={rate}
            id="rateOfInterest"
            onChange={e => setRate(Number(e.target.value))}
            className="form-range"
          />
        </div>

        {/* Tenure */}
        <div className="d-flex flex-wrap justify-content-between mb-4">
          <label htmlFor="loanTenure" className="form-label">
            Loan Tenure (Years)
          </label>
          <div className="d-flex">
            <input
              type="number"
              min="1"
              max="30"
              step="1"
              value={tenure}
              onChange={e => setTenure(Number(e.target.value))}
              className="form-control form-control-sm rounded-0 text-end"
              style={{ width: '35px' }}
            />
            <div className="border pt-1 px-1">Yr</div>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={tenure}
            id="loanTenure"
            onChange={e => setTenure(Number(e.target.value))}
            className="form-range"
          />
        </div>
        <div className="d-flex flex-column gap-2 mt-3">
          <div className="text-gray-500 d-flex justify-content-between">
            Monthly EMI
            <span>
              <FontAwesomeIcon icon={faIndianRupeeSign} /> {emi.toFixed(0).toLocaleString('en-IN')}
            </span>
          </div>

          <div className="text-gray-500 d-flex justify-content-between">
            Principal Amount
            <span>
              <FontAwesomeIcon icon={faIndianRupeeSign} /> {principal.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="text-gray-500 d-flex justify-content-between">
            Total Interest
            <span>
              <FontAwesomeIcon icon={faIndianRupeeSign} />{' '}
              {totalInterest.toFixed(0).toLocaleString('en-IN')}
            </span>
          </div>

          <div className="text-gray-500 d-flex justify-content-between">
            Total Amount
            <span>
              <FontAwesomeIcon icon={faIndianRupeeSign} />{' '}
              {totalAmount.toFixed(0).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
