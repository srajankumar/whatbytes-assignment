"use client";

import * as React from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import Image from "next/image";

import { LineChart, Line, XAxis, Tooltip, TooltipProps } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";
import Syllabus from "./syllabus";

interface DataPoint {
  name: string;
  average: number;
  you: number;
}

const Dashboard = () => {
  const [rank, setRank] = useState<number>(1);
  const [percentile, setPercentile] = useState<number>(30);
  const [score, setScore] = useState<number>(10);

  // Form state to track input fields in the dialog
  const [newRank, setNewRank] = useState<string>("");
  const [newPercentile, setNewPercentile] = useState<string>("");
  const [newScore, setNewScore] = useState<string>("");

  // Load data from local storage on mount
  useEffect(() => {
    const savedRank = localStorage.getItem("rank");
    const savedPercentile = localStorage.getItem("percentile");
    const savedScore = localStorage.getItem("score");

    if (savedRank) setRank(Number(savedRank));
    if (savedPercentile) setPercentile(Number(savedPercentile));
    if (savedScore) setScore(Number(savedScore));
  }, []);

  // Save data to local storage and update UI
  const handleSave = () => {
    if (newRank) {
      setRank(Number(newRank));
      localStorage.setItem("rank", newRank);
    }
    if (newPercentile) {
      setPercentile(Number(newPercentile));
      localStorage.setItem("percentile", newPercentile);
    }
    if (newScore) {
      setScore(Number(newScore));
      localStorage.setItem("score", newScore);
    }

    // Clear the inputs after saving
    setNewRank("");
    setNewPercentile("");
    setNewScore("");
  };

  const totalQuestions = 15;

  const percentage = (score / totalQuestions) * 100;

  const data = [
    {
      name: "Score",
      value: percentage,
      fill: "hsl(var(--primary))",
    },
  ];
  const averagePercentile = 72;

  const generateData = (yourPercentile: number): DataPoint[] => [
    { name: "0", average: 0, you: 0 },
    {
      name: "25",
      average: 25,
      you: yourPercentile > 0 && yourPercentile < 50 ? 15 : 0,
    },
    {
      name: "50",
      average: 50,
      you: yourPercentile > 25 && yourPercentile < 75 ? 15 : 0,
    },
    {
      name: "75",
      average: 10,
      you: yourPercentile > 50 && yourPercentile < 75 ? 15 : 0,
    },
    {
      name: "100",
      average: 5,
      you: yourPercentile > 75 && yourPercentile <= 100 ? 15 : 0,
    },
  ];

  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-md z-50">
          <p className="font-semibold">{`${label}`}</p>
          <p className="text-primary">{`numberOfStudent: ${payload[0].value}`}</p>
          {/* {payload[1] ? (
            <p className="text-muted-foreground">{`Average: ${payload[1].value}%`}</p>
          ) : (
            <p className="text-muted-foreground">Average: Data unavailable</p>
          )} */}
        </div>
      );
    }
    return null;
  };
  const percentage_data = generateData(percentile);
  return (
    <div>
      <Header />
      <div className="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="w-full h-screen md:p-10 p-5">
          <h1 className="text-lg font-medium md:pb-10 pb-5">Skill Test</h1>
          <div className="grid lg:grid-cols-5 gap-5 pb-10">
            <div className="lg:col-span-3 grid gap-5">
              <Card>
                <CardContent className="pt-6 flex justify-between items-center gap-5">
                  <div className="flex gap-5 items-center">
                    <Image
                      src={"/logo-html5.svg"}
                      alt="html5"
                      width={500}
                      height={500}
                      className="w-14 h-14"
                    />
                    <div className="flex flex-col gap-1">
                      <h1 className="font-bold">Hyper Text Markup Language</h1>
                      <p className="text-sm font-semibold text-muted-foreground">
                        Questions: 08 | Duration: 15 mins | Submitted on 5 June
                        2021
                      </p>
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                      Update
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex justify-between items-cente0">
                          <p>Update Scores</p>
                          <Image
                            src={"/logo-html5.svg"}
                            alt="html5"
                            width={500}
                            height={500}
                            className="w-10 h-10"
                          />
                        </AlertDialogTitle>
                      </AlertDialogHeader>

                      <div className="space-y-4">
                        <div className="grid grid-cols-5 gap-5">
                          <div className="flex gap-3 col-span-3">
                            <div className="bg-blue-900 text-white w-6 h-6 rounded-full flex justify-center items-center flex-shrink-0">
                              1
                            </div>
                            <label>
                              Update your{" "}
                              <span className="font-bold">Rank</span>
                            </label>
                          </div>
                          <Input
                            type="number"
                            value={newRank}
                            onChange={(e) => setNewRank(e.target.value)}
                            className="col-span-2"
                          />
                        </div>
                        <div className="grid grid-cols-5 gap-5">
                          <div className="flex gap-3 col-span-3">
                            <div className="bg-blue-900 text-white w-6 h-6 rounded-full flex justify-center items-center flex-shrink-0">
                              2
                            </div>
                            <label>
                              Update your{" "}
                              <span className="font-bold">Percentile</span>
                            </label>
                          </div>
                          <Input
                            type="number"
                            value={newPercentile}
                            onChange={(e) => setNewPercentile(e.target.value)}
                            className="col-span-2"
                          />
                        </div>
                        <div className="grid grid-cols-5 gap-5">
                          <div className="flex gap-3 col-span-3">
                            <div className="bg-blue-900 text-white w-6 h-6 rounded-full flex justify-center items-center flex-shrink-0">
                              3
                            </div>
                            <label>
                              Update your{" "}
                              <span className="font-bold">
                                Current Score (out of 15)
                              </span>
                            </label>
                          </div>
                          <Input
                            type="number"
                            value={newScore}
                            max={15}
                            onChange={(e) => setNewScore(e.target.value)}
                            className="col-span-2"
                          />
                        </div>
                      </div>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSave}>
                          Save {"->"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="grid xl:grid-cols-3 gap-5">
                    <div className="flex gap-3 xl:border-r">
                      <div className="p-4 bg-secondary rounded-full w-14 h-14 flex justify-center items-center flex-shrink-0 border">
                        <Image
                          src={"/logo-trophy.svg"}
                          alt="trophy"
                          width={500}
                          height={500}
                          className="w-10 h-10"
                        />
                      </div>
                      <div>
                        <h1 className="text-xl font-bold text-black">{rank}</h1>
                        <p className="xl:font-semibold font-medium uppercase xl:text-xs">
                          Your Rank
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 xl:border-r">
                      <div className="p-4 bg-secondary rounded-full w-14 h-14 flex justify-center items-center flex-shrink-0 border">
                        <Image
                          src={"/logo-clipboard.svg"}
                          alt="clipboard"
                          width={500}
                          height={500}
                          className="w-10 h-10"
                        />
                      </div>
                      <div>
                        <h1 className="text-xl font-bold text-black">
                          {percentile}%
                        </h1>
                        <p className="xl:font-semibold font-medium uppercase xl:text-xs">
                          Percentile
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="p-4 bg-secondary rounded-full w-14 h-14 flex justify-center items-center flex-shrink-0 border">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-10 h-10 text-green-600"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M2.5 2a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5zm4.854 8.354l4.5-4.5l-.707-.708L7 9.293L4.854 7.146l-.708.708l2.5 2.5a.5.5 0 0 0 .708 0"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <h1 className="text-xl font-bold text-black">
                          {score}/15
                        </h1>
                        <p className="xl:font-semibold font-medium uppercase xl:text-xs">
                          Correct Answers
                        </p>
                      </div>
                    </div>
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Comparison Graph</CardTitle>
                  <CardDescription className="flex items-center justify-between">
                    <div>
                      <span className="font-bold">
                        You scored {percentile}% percentile
                      </span>{" "}
                      which is{" "}
                      {percentile < averagePercentile ? "lower" : "higher"} than
                      the average percentile {averagePercentile}% of all the
                      engineers assignment.
                    </div>
                    <div className="p-4 bg-secondary rounded-full w-14 h-14 flex justify-center items-center flex-shrink-0 border">
                      <Image
                        src="/logo-stock.svg"
                        alt="WhatBytes"
                        width={40}
                        height={40}
                      />
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[300px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={percentage_data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        {/* <CartesianGrid vertical={false} /> */}
                        <XAxis dataKey="name" />
                        {/* <YAxis domain={[0, 100]} /> */}
                        <Tooltip content={<CustomTooltip />} />
                        {/* <Line
                          type="monotone"
                          dataKey="you"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ r: 6 }}
                          activeDot={{ r: 8 }}
                          name="Your Percentile"
                        /> */}
                        <Line
                          type="monotone"
                          dataKey="average"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ r: 6 }}
                          name="Average Percentile"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <div
                      className="absolute z-10 top-0 h-full border-l border-muted-foreground"
                      style={{ left: `${percentile}%` }}
                    />
                    <div
                      className="absolute top-20 z-10 transform -translate-x-1/2 text-sm font-bold text-muted-foreground"
                      style={{ left: `${percentile}%` }}
                    >
                      your percentile
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-2 grid gap-5">
              <Syllabus />
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <div>Question Analysis</div>
                    <div className="text-primary text-base">{score}/15</div>
                  </CardTitle>
                  <CardDescription>
                    <span className="font-bold">
                      You scored {score} question correct out of 15.
                    </span>{" "}
                    However it still needs some improvements.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="w-full h-[300px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"
                        outerRadius="80%"
                        barSize={20}
                        data={data}
                        startAngle={90}
                        endAngle={-270}
                      >
                        <PolarAngleAxis
                          type="number"
                          domain={[0, 100]}
                          angleAxisId={0}
                          tick={false}
                        />
                        <RadialBar
                          background
                          dataKey="value"
                          cornerRadius={30}
                          fill="hsl(var(--primary))"
                        />
                      </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        {/* <p className="text-4xl font-bold text-primary">
                          {percentage.toFixed(0)}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Completion
                        </p> */}
                        <p className="text-5xl">🎯</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
