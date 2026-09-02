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
  { key: 'Applied', label: 'Applied', dot: 'bg-blue-500' },
  { key: 'Interview', label: 'Interview', dot: 'bg-amber-500' },
  { key: 'Offer', label: 'Offer', dot: 'bg-purple-500' },
  { key: 'Accepted', label: 'Accepted', dot: 'bg-emerald-500' },
  { key: 'Rejected', label: 'Rejected', dot: 'bg-rose-500' },
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
        {METRIC_CARDS.map(({ key, label, dot }) => (
          <div
            key={key}
            className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800/90 p-4 shadow-2xs flex flex-col justify-between transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{label}</span>
              <span className={`h-2 w-2 rounded-full ${dot}`} />
            </div>
            <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-2 tracking-tight">
              {cardStatusCount[key] ?? 0}
            </p>
          </div>
        ))}
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800/90 p-5 shadow-2xs transition-colors">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Application Activity</h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">Applications submitted over time</p>
          </div>
          <div className="h-64 flex items-center justify-center">
            <LineGaph lineGraphData={lineGraphData} />
          </div>
        </div>

        <div className="lg:col-span-5 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800/90 p-5 shadow-2xs transition-colors">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Status Distribution</h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">Current stage breakdown</p>
          </div>
          <div className="h-64 flex items-center justify-center">
            <BarGraph barGraphData={cardStatusCount} />
          </div>
        </div>
      </div>

      {/* Recent Applications Section */}
      <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800/90 shadow-2xs overflow-hidden flex flex-col transition-colors">
        <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Recent Applications</h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">Latest updates on your active submissions</p>
          </div>
          <Link
            to="/applications"
            className="inline-flex items-center gap-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
          >
            <span>View all</span>
            <LuArrowRight size={13} />
          </Link>
        </div>

        {/* List Content */}
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800/70">
          {recentTenApplication.length > 0 ? (
            recentTenApplication.map((val) => (
              <RecentAplication key={val._id} applicationData={val} />
            ))
          ) : (
            <div className="py-12 text-center text-xs text-zinc-400 dark:text-zinc-500">
              No recent applications recorded yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dash;