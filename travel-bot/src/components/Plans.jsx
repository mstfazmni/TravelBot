import React, { useEffect, useRef } from "react";
import {motion} from 'framer-motion';
// import { FaMapMarkerAlt } from 'react-icons/fa';
import './Plans.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaMapMarkedAlt, FaDownload } from "react-icons/fa";



const Plans = ({ plansText, onPlanSelect }) => {
  const plansRef = useRef(null);

  useEffect(() => {
    plansRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Downloading pdf file of each plan
  const downloadAsPDF = async (planIndex) => {
  const input = document.getElementById(`plan-${planIndex}`);
  if (!input) return;

  const canvas = await html2canvas(input);
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`Plan-${planIndex + 1}.pdf`);
};

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
          id={`plan-${i}`} 
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
               <div className="plan-actions d-flex">
                <button 
                    className="btn bg-warning btn-sm me-1" 
                    onClick={() => {
                      onPlanSelect(`Plan ${i + 1}:\n${plan}`);
                      const element = document.getElementById('mapview');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                  <FaMapMarkedAlt className="me-2" />
                  Show on Map
                </button>

                <button 
                  className="btn btn-sm"
                  style={{ backgroundColor: '#c4c4c4ff', color: '#333' }}
                  onClick={() => downloadAsPDF(i)}
                >
                  <FaDownload className="me-2" />
                  Download PDF
                </button>
              </div>
          </div>
        </motion.div>
      ))}
      </div>
    </section>
  );
};

export default Plans;
