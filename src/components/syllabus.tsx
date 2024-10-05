import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Syllabus = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Syllabus Wise Analysis</CardTitle>
      </CardHeader>
      <CardContent className="font-semibold text-muted-foreground grid gap-5">
        <div>
          <p className="pb-4">HTML Tools, Forms, History</p>
          <div className="flex items-center gap-14">
            <Progress value={80} />
            <p className="text-primary font-bold">80%</p>
          </div>
        </div>
        <div>
          <p className="pb-4">Tags & References in HTML</p>
          <div className="flex items-center gap-14">
            <Progress value={60} variant="orange" />
            <p className="text-orange-500 font-bold">60%</p>
          </div>
        </div>
        <div>
          <p className="pb-4">Tables & References in HTML</p>
          <div className="flex items-center gap-14">
            <Progress value={24} variant="red" />
            <p className="text-red-500 font-bold">24%</p>
          </div>
        </div>
        <div>
          <p className="pb-4">Tables & CSS Basics</p>
          <div className="flex items-center gap-14">
            <Progress value={96} variant="green" />
            <p className="text-green-500 font-bold">96%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Syllabus;
