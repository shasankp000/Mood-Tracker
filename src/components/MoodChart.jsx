import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function MoodChart({ data }) {
  return (
    <div className="h-96 w-full sm:w-3/4 md:w-1/5 lg:w-1/2 xl:w-1/2 bg-gray-900 p-4 rounded-xl mt-4">
      <h2 className="text-white mb-2">Mood Frequency</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="#444" />
          <XAxis dataKey="mood" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Bar dataKey="count" fill="#4f46e5"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MoodChart;
