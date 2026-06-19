"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { Payload } from "recharts/types/component/DefaultTooltipContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ATTENDANCE_STATUS_OPTIONS } from "@/lib/constants";
import type { Attendance, Worker } from "@/lib/types";

interface AttendanceSummaryProps {
  attendance: Attendance[];
  workers: Worker[];
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Payload[];
}) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #E2E8F0",
          borderRadius: "8px",
          padding: "8px 12px",
        }}
      >
        <p style={{ color: "#64748B", fontSize: "13px", margin: 0 }}>
          {data.name}:{" "}
          <span style={{ fontWeight: 600 }}>{data.value} days</span>
        </p>
      </div>
    );
  }
  return null;
};

const COLORS: Record<string, string> = {
  present: "#10B981",
  absent: "#EF4444",
  half_day: "#F59E0B",
  overtime: "#3B82F6",
};

export function AttendanceSummary({
  attendance,
  workers,
}: AttendanceSummaryProps) {
  const totalRecords = attendance.length;
  const statusCounts = attendance.reduce(
    (acc, rec) => {
      acc[rec.status] = (acc[rec.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const pieData = Object.entries(ATTENDANCE_STATUS_OPTIONS)
    .map(([key, { label }]) => ({
      name: label,
      value: statusCounts[key] || 0,
      color: COLORS[key] || "#CBD5E0",
    }))
    .filter((d) => d.value > 0);

  const workerSummary = workers.map((worker) => {
    const records = attendance.filter((a) => a.workerId === worker.id);
    const presentDays = records.filter(
      (r) => r.status === "present" || r.status === "overtime",
    ).length;
    const absentDays = records.filter((r) => r.status === "absent").length;
    const halfDays = records.filter((r) => r.status === "half_day").length;
    const attendanceRate =
      records.length > 0
        ? ((presentDays + halfDays * 0.5) / records.length) * 100
        : 0;
    return {
      worker,
      presentDays,
      absentDays,
      halfDays,
      rate: attendanceRate.toFixed(0),
    };
  });

  return (
    <div className="space-y-6">
      {pieData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Overall Attendance Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-sm">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: d.color }}
                  ></span>
                  <span className="text-slate-600">
                    {d.name}: {d.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Worker Attendance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-slate-500">
                  <th className="text-left py-2 font-medium">Worker</th>
                  <th className="text-center py-2 font-medium">Present</th>
                  <th className="text-center py-2 font-medium">Absent</th>
                  <th className="text-center py-2 font-medium">Half Day</th>
                  <th className="text-center py-2 font-medium">Rate</th>
                </tr>
              </thead>
              <tbody>
                {workerSummary.map(
                  ({ worker, presentDays, absentDays, halfDays, rate }) => (
                    <tr key={worker.id} className="border-b hover:bg-slate-50">
                      <td className="py-3 font-medium text-slate-900">
                        {worker.fullName}
                      </td>
                      <td className="text-center text-emerald-600">
                        {presentDays}
                      </td>
                      <td className="text-center text-red-600">{absentDays}</td>
                      <td className="text-center text-amber-600">{halfDays}</td>
                      <td className="text-center">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            Number(rate) >= 90
                              ? "bg-emerald-100 text-emerald-700"
                              : Number(rate) >= 75
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {rate}%
                        </span>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
