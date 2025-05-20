import React, { useEffect, useRef } from "react";
import {motion} from 'framer-motion';
// import { FaMapMarkerAlt } from 'react-icons/fa';
import './Plans.css';

const Plans = ({ plansText }) => {
  const plansRef = useRef(null);

  useEffect(() => {
    plansRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Split plans text by "Plan 1:", "Plan 2:", etc.
  const plans = plansText?.split(/Plan \d:/).filter(Boolean) || [];

  return (
    <section ref={plansRef} className="plans-section">
        <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your Travel Plans
      </motion.h2>
      <div className="plans-container">
      {plans.length === 0 && <p>No plans to show.</p>}
      {plans.map((plan, i) => (
        <motion.div
          key={i}
          className="plan-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.2 }}
        >
          <h3>Plan {i + 1}</h3>
          <div className="plan-card-content">
            {plan
              .trim()
              .split('\n')                      // split plan into lines
              .map(line => line.trim().replace(/^[-•]\s*/, ''))  // remove "- " from start
              .map((line, idx) => {
                const [label, ...rest] = line.split(':');
                const value = rest.join(':').trim(); // handles ":" in value
                return (
                  <div className="plan-line" key={idx}>
                    <span className="plan-label">{label.trim()}:</span>
                    <span className="plan-value">{value}</span>
                  </div>
                );
              })}
          </div>
        </motion.div>
      ))}
      </div>
    </section>
  );
};

export default Plans;
