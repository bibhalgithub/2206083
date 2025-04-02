import { useState } from 'react';
import { Calculator, LineChart, RefreshCw } from 'lucide-react';

interface CalculatorResponse {
  windowPrevState: number[];
  windowCurrState: number[];
  numbers: number[];
  avg: number;
}

function App() {
  const [numberType, setNumberType] = useState<'p' | 'f' | 'e' | 'r'>('p');
  const [response, setResponse] = useState<CalculatorResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNumbers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`http://localhost:9876/numbers/${numberType}`);
      if (!res.ok) throw new Error('Failed to fetch numbers');
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const numberTypes = [
    { id: 'p' as const, name: 'Prime', color: 'bg-blue-500' },
    { id: 'f' as const, name: 'Fibonacci', color: 'bg-green-500' },
    { id: 'e' as const, name: 'Even', color: 'bg-purple-500' },
    { id: 'r' as const, name: 'Random', color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calculator className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Average Calculator</h1>
          </div>
          <div className="flex items-center space-x-2">
            <LineChart className="h-6 w-6 text-gray-500" />
            <span className="text-gray-600">Window Size: 10</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Number Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {numberTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setNumberType(type.id)}
              className={`${
                numberType === type.id ? type.color + ' text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              } p-4 rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center space-x-2 font-medium`}
            >
              <span>{type.name} Numbers</span>
            </button>
          ))}
        </div>

        {/* Calculator Display */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Results</h2>
            <button
              onClick={fetchNumbers}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
              <span>Calculate</span>
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
              {error}
            </div>
          )}

          {response && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Previous Window State</h3>
                  <div className="flex flex-wrap gap-2">
                    {response.windowPrevState.map((num, idx) => (
                      <span key={idx} className="px-2 py-1 bg-white rounded text-gray-700 text-sm">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Current Window State</h3>
                  <div className="flex flex-wrap gap-2">
                    {response.windowCurrState.map((num, idx) => (
                      <span key={idx} className="px-2 py-1 bg-white rounded text-gray-700 text-sm">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-center">
                  <h3 className="text-sm font-medium text-blue-700 mb-2">Average</h3>
                  <p className="text-3xl font-bold text-blue-900">{response.avg.toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Latest Response</h3>
                <div className="flex flex-wrap gap-2">
                  {response.numbers.map((num, idx) => (
                    <span key={idx} className="px-2 py-1 bg-white rounded text-gray-700 text-sm">
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;