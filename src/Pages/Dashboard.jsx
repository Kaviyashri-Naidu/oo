import React, { useEffect } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'

import Footer from '/New folder (2)/otp-veri-website/src/Components/Footer'
import { useNavigate } from 'react-router-dom'


const inventoryData = [
  { name: 'Day 1', value: 20 },
  { name: 'Day 2', value: 40 },
  { name: 'Day 3', value: 30 },
  { name: 'Day 4', value: 60 },
  { name: 'Day 5', value: 55 },
  { name: 'Day 6', value: 70 },
  { name: 'Day 7', value: 65 },
];

const ordersData = [
  { name: 'Day 1', value: 25 },
  { name: 'Day 2', value: 50 },
  { name: 'Day 3', value: 40 },
  { name: 'Day 4', value: 60 },
  { name: 'Day 5', value: 45 },
  { name: 'Day 6', value: 65 },
  { name: 'Day 7', value: 55 },
];

const marginData = [
  { name: '12th Oct', value: 48 },
  { name: '13th Oct', value: 32 },
  { name: '14th Oct', value: 80 },
  { name: '15th Oct', value: 58 },
  { name: '16th Oct', value: 100 },
  { name: '17th Oct', value: 75 },
];

const batteryData = [
  { name: 'Consumed', value: 35 },
  { name: 'Remaining', value: 65 },
];

const COLORS = ['#facc15', '#3b82f6'];

const SmallChart = ({ title, percent, data, color }) => (
  <div className="card">
    <div className="card-header">
      <span>{title}</span>
      <span>7 days ▼</span>
    </div>
    <div className="percent">{percent}%</div>
    <ResponsiveContainer width="100%" height={80}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('otp');
    navigate('/');
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      alert('Session expired. Logging out...');
      handleLogout();
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
    <div className="header">
          <h2>Analytics Dashboard</h2>
          <button onClick={handleLogout}>Logout</button>
    </div>
    <div className="dashboard">
      <aside className="sidebar">
        <div className="icon">🏠</div>
        <div className="icon">⚙️</div>
      </aside>

      <main>
        

        <div className="card-grid">
          <SmallChart classname='chert' title="Inventory" percent={93} data={inventoryData} color="#facc15" />
          
          <div className="card donut">
            <span>Battery</span>
            <PieChart width={150} height={150}>
              <Pie
                data={batteryData}
                innerRadius={50}
                outerRadius={70}
                dataKey="value"
              >
                {batteryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
            <div className="donut-label">65%</div>
          </div>

          <div className="card wide">
            <div className="card-header">
              <span>Margin %</span>
              <span>7 days ▼</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={marginData}>
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" domain={[0, 120]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#a3e635" strokeWidth={3} dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <SmallChart classname='chert' title="Orders" percent={65} data={ordersData} color="#f43f5e" />
        </div>
      </main>
    </div>
    <Footer />
    </>
  );
};

export default Dashboard;
