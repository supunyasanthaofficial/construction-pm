"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ATTENDANCE_STATUS_OPTIONS } from "@/lib/constants";
import type { AttendanceStatus, Worker, Attendance } from "@/lib/types";
import { CalendarCheck, Save } from "lucide-react";

interface AttendanceMarkerProps {
  workers: Worker[];
  existingAttendance: Attendance[];
  onSave: (records: Omit<Attendance, "id">[]) => void;
  projectId: string;
}

export function AttendanceMarker({
  workers,
  existingAttendance,
  onSave,
  projectId,
}: AttendanceMarkerProps) {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [statuses, setStatuses] = useState<Record<string, AttendanceStatus>>(
    {},
  );
  const [hours, setHours] = useState<Record<string, string>>({});

  // Load existing attendance for selected date
  const loadForDate = (selectedDate: string) => {
    const records = existingAttendance.filter((a) => a.date === selectedDate);
    const newStatuses: Record<string, AttendanceStatus> = {};
    const newHours: Record<string, string> = {};
    workers.forEach((w) => {
      const rec = records.find((r) => r.workerId === w.id);
      newStatuses[w.id] = rec?.status || "present";
      newHours[w.id] = rec ? rec.hoursWorked.toString() : "8";
    });
    setStatuses(newStatuses);
    setHours(newHours);
  };

  // On date change, reload
  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    loadForDate(newDate);
  };

  // Initial load (today)
  useState(() => {
    loadForDate(date);
  });

  const handleSaveAll = () => {
    const records: Omit<Attendance, "id">[] = workers.map((worker) => ({
      workerId: worker.id,
      workerName: worker.fullName,
      projectId,
      date,
      status: statuses[worker.id] || "present",
      hoursWorked: parseFloat(hours[worker.id]) || 0,
    }));
    onSave(records);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-48">
          <Label htmlFor="attendanceDate">Date</Label>
          <Input
            id="attendanceDate"
            type="date"
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="flex items-end">
          <Button
            onClick={handleSaveAll}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Attendance
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-orange-600" />
            Attendance for {date}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-12 gap-4 pb-2 border-b text-sm font-medium text-slate-500">
            <div className="col-span-4">Worker</div>
            <div className="col-span-4">Status</div>
            <div className="col-span-4">Hours</div>
          </div>
          <div className="divide-y">
            {workers.map((worker) => (
              <div
                key={worker.id}
                className="grid grid-cols-12 gap-4 py-3 items-center"
              >
                <div className="col-span-4">
                  <p className="font-medium text-slate-900">
                    {worker.fullName}
                  </p>
                  <p className="text-xs text-slate-500">{worker.role}</p>
                </div>
                <div className="col-span-4">
                  <RadioGroup
                    value={statuses[worker.id] || "present"}
                    onValueChange={(val: AttendanceStatus) =>
                      setStatuses({ ...statuses, [worker.id]: val })
                    }
                    className="flex flex-wrap gap-2"
                  >
                    {Object.entries(ATTENDANCE_STATUS_OPTIONS).map(
                      ([value, { label }]) => (
                        <div
                          key={value}
                          className="flex items-center space-x-1"
                        >
                          <RadioGroupItem
                            value={value}
                            id={`${worker.id}-${value}`}
                          />
                          <Label
                            htmlFor={`${worker.id}-${value}`}
                            className="text-xs"
                          >
                            {label}
                          </Label>
                        </div>
                      ),
                    )}
                  </RadioGroup>
                </div>
                <div className="col-span-4">
                  <Input
                    type="number"
                    value={hours[worker.id] || "8"}
                    onChange={(e) =>
                      setHours({ ...hours, [worker.id]: e.target.value })
                    }
                    className="w-20"
                    min="0"
                    max="16"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
