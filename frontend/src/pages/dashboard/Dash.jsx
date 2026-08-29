import React, { useEffect, useState } from 'react';
import { api } from '../../main.jsx';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LineGaph from './chart/LineGaph';
import BarGraph from './chart/BarGraph';
import RecentAplication from './cards/RecentAplication';
import { allAplications } from '../../redux/slices/aplicationData.slice.js';
import { LuArrowRight } from 'react-icons/lu';

const METRIC_CARDS = [
  { key: 'Applied', label: 'Applied', accent: 'text-blue-600 bg-blue-50 border-blue-100' },
  { key: 'Interview', label: 'Interview', accent: 'text-amber-600 bg-amber-50 border-amber-100' },
  { key: 'Offer', label: 'Offer', accent: 'text-purple-600 bg-purple-50 border-purple-100' },
  { key: 'Accepted', label: 'Accepted', accent: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  { key: 'Rejected', label: 'Rejected', accent: 'text-rose-600 bg-rose-50 border-rose-100' },
];

function Dash() {
  const [cardStatusCount, setCardStatusCount] = useState({});
  const [lineGraphData, setLineGraphData] = useState([]);

  const rawApplications = useSelector(allAplications) || [];
  const recentTenApplication = rawApplications.slice(-10).reverse();

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        const response = await api.get(`/data/get-graph-data`);

        const properObjectData = (response.data?.statusAndBarGraphData || []).reduce(
          (acc, { _id, count }) => {
            acc[_id] = count;
            return acc;
          },
          {}
        );

        setLineGraphData(response.data?.lineGraphData || []);
        setCardStatusCount(properObjectData);
      } catch (error) {
        console.error('Failed to load dashboard metrics:', error);
      }
    };

    fetchDashboardMetrics();
  }, []);

  return (
    <div className="flex flex-col gap-5 pb-6">
      {/* Metric Counters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {METRIC_CARDS.map(({ key, label, accent }) => (
          <div
            key={key}
            className="bg-white rounded-xl border border-zinc-200 p-4 shadow-2xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500">{label}</span>
              <span className={`h-2 w-2 rounded-full ${accent.split(' ')[1]}`} />
            </div>
            <p className="text-2xl font-semibold text-zinc-900 mt-2 tracking-tight">
              {cardStatusCount[key] ?? 0}
            </p>
          </div>
        ))}
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 bg-white rounded-xl border border-zinc-200 p-5 shadow-2xs">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-zinc-900">Application Activity</h2>
            <p className="text-xs text-zinc-400">Applications submitted over time</p>
          </div>
          <div className="h-64 flex items-center justify-center">
            <LineGaph lineGraphData={lineGraphData} />
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-xl border border-zinc-200 p-5 shadow-2xs">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-zinc-900">Status Distribution</h2>
            <p className="text-xs text-zinc-400">Current stage breakdown</p>
          </div>
          <div className="h-64 flex items-center justify-center">
            <BarGraph barGraphData={cardStatusCount} />
          </div>
        </div>
      </div>

      {/* Recent Applications Section */}
      <div className="bg-white rounded-xl border border-zinc-200 shadow-2xs overflow-hidden flex flex-col">
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900">Recent Applications</h2>
            <p className="text-xs text-zinc-400">Latest updates on your active submissions</p>
          </div>
          <Link
            to="/applications"
            className="inline-flex items-center gap-1 text-xs font-medium text-zinc-700 hover:text-zinc-950 transition-colors"
          >
            <span>View all</span>
            <LuArrowRight size={13} />
          </Link>
        </div>

        {/* List Content */}
        <div className="divide-y divide-zinc-100">
          {recentTenApplication.length > 0 ? (
            recentTenApplication.map((val) => (
              <RecentAplication key={val._id} applicationData={val} />
            ))
          ) : (
            <div className="py-12 text-center text-xs text-zinc-400">
              No recent applications recorded yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dash;