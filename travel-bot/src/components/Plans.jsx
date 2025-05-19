import React, { useEffect, useRef } from "react";
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
      <h2>Your Travel Plans</h2>
      <div className="plans-container">
      {plans.length === 0 && <p>No plans to show.</p>}
      {plans.map((plan, i) => (
        <div key={i} className="plan-card">
          <h3>Plan {i + 1}</h3>
          <pre>{plan.trim()}</pre>
        </div>
      ))}
      </div>
    </section>
  );
};

export default Plans;
