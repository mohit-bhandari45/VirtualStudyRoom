import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Activity, Clock } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { format, formatDistance } from "date-fns";

interface RecentActivity {
  id: string;
  description: string;
  timeStamp: Date;
  type: string;
}

interface RecentActivityProps {
  recentActivity: RecentActivity[];
}

const getActivityIcon = (type?: RecentActivity["type"]) => {
  switch (type) {
    case "room_created":
      return (
        <span className="bg-green-100 text-green-600 p-1 rounded-full">
          <Activity className="w-9 h-4" />
        </span>
      );
    case "room_updated":
      return (
        <span className="bg-blue-100 text-blue-600 p-1 rounded-full">
          <Activity className="w-9 h-4" />
        </span>
      );
    case "room_deleted":
      return (
        <span className="bg-red-100 text-red-600 p-1 rounded-full">
          <Activity className="w-9 h-4" />
        </span>
      );
    case "room_joined":
      return (
        <span className="bg-purple-100 text-purple-600 p-1 rounded-full">
          <Activity className="w-9 h-4" />
        </span>
      );
    case "room_left":
      return (
        <span className="bg-orange-100 text-orange-600 p-1 rounded-full">
          <Activity className="w-9 h-4" />
        </span>
      );
    case "event_scheduled":
      return (
        <span className="bg-orange-100 text-orange-600 p-1 rounded-full">
          <Activity className="w-9 h-4" />
        </span>
      );
    default:
      return (
        <span className="bg-gray-100 text-gray-600 p-1 rounded-full">
          <Activity className="w-9 h-4" />
        </span>
      );
  }
};

const RecentActivity: React.FC<RecentActivityProps> = ({ recentActivity }) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Activity className="text-muted-foreground" size={20} />
          <span className="text-sm font-medium text-gray-600">
            Recent Activity
          </span>
        </CardTitle>
        <Clock className="text-muted-foreground" size={16} />
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-64 w-full">
          <div className="p-4">
            {recentActivity.length === 0 ? (
              <div className="text-center text-gray-500 py-4">
                No recent activities
              </div>
            ) : (
              recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 mb-4 pb-4 border-b last:border-b-0 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="pt-1">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">
                      {activity.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <span>
                          {formatDistance(activity.timeStamp, new Date(), {
                            addSuffix: true,
                          })}
                        </span>
                      </p>
                      <p className="text-xs text-gray-400">
                        {format(activity.timeStamp, "MMM d, yyyy HH:mm")}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
