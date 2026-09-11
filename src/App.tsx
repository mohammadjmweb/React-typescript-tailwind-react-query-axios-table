import { useQuery } from 'react-query';
import React from 'react';
import axios from 'axios';
import './App.css';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
  return data;
};

/* ---------------- Loading Skeleton ---------------- */
const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8 text-center">
          <div className="h-10 w-64 mx-auto bg-slate-200 rounded-lg animate-pulse mb-3" />
          <div className="h-4 w-96 mx-auto bg-slate-200 rounded animate-pulse" />
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Table Header Skeleton */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-5">
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-white/30 rounded animate-pulse" />
              ))}
            </div>
          </div>

          {/* Table Rows Skeleton */}
          <div className="divide-y divide-slate-100">
            {[...Array(8)].map((_, rowIdx) => (
              <div
                key={rowIdx}
                className="grid grid-cols-4 gap-4 px-6 py-4"
                style={{ animationDelay: `${rowIdx * 80}ms` }}
              >
                {[...Array(4)].map((_, colIdx) => (
                  <div
                    key={colIdx}
                    className="h-4 bg-slate-200 rounded animate-pulse"
                    style={{ width: `${60 + Math.random() * 30}%` }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Loading Indicator */}
        <div className="flex items-center justify-center mt-8 gap-3">
          <div className="relative">
            <div className="w-6 h-6 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          </div>
          <p className="text-slate-600 font-medium">Fetching users...</p>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Error State ---------------- */
interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 flex items-center justify-center py-10 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl border border-red-100 p-8 text-center relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-50 rounded-full -ml-12 -mb-12" />

          {/* Icon */}
          <div className="relative">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-red-200 mb-6">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-slate-500 text-sm mb-1">
              We couldn't fetch the user data.
            </p>
            <p className="text-red-500 text-xs font-mono bg-red-50 rounded-lg px-3 py-2 mt-3 break-words">
              {message}
            </p>

            <button
              onClick={onRetry}
              className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Main App ---------------- */
const App: React.FC = () => {
  const { data, error, isLoading, refetch } = useQuery<User[], Error>(
    'users',
    fetchUsers,
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} onRetry={() => refetch()} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl shadow-lg shadow-indigo-200 mb-4">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            User List
          </h1>
          <p className="text-slate-500">
            A curated list of users fetched from JSONPlaceholder API
          </p>
        </div>

        {/* Stats Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {data?.length ?? 0} users loaded
          </span>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                  <th className="py-4 px-6 text-left text-xs font-bold uppercase tracking-wider">
                    ID
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-bold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-bold uppercase tracking-wider">
                    Username
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-bold uppercase tracking-wider">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data?.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-indigo-50/50 transition-colors duration-150 group"
                    style={{ animation: `fadeIn 0.3s ease-out ${index * 30}ms both` }}
                  >
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-150">
                        {user.id}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                          {user.name.charAt(0)}
                        </div>
                        <span className="text-slate-800 font-semibold">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-slate-600 font-medium">
                        @{user.username}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <a
                        href={`mailto:${user.email}`}
                        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                          />
                        </svg>
                        {user.email}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-6">
          Data provided by{' '}
          <a
            href="https://jsonplaceholder.typicode.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:text-indigo-700 font-medium underline decoration-dotted"
          >
            JSONPlaceholder
          </a>
        </p>
      </div>

      {/* Inline Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;