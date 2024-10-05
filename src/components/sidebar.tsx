import { Award, ChartNoAxesColumn, StickyNote } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-full h-full py-3 md:flex flex-col hidden gap-3 border-r text-lg font-bold">
      <div className="flex px-5 rounded-r-full py-5 items-center gap-2">
        <ChartNoAxesColumn />
        <div>Dashboard</div>
      </div>
      <div className="bg-secondary text-blue-600 flex px-5 rounded-r-full py-5 items-center gap-2">
        <Award />
        <div>Skill Test</div>
      </div>
      <div className="flex px-5 rounded-r-full py-5 items-center gap-2">
        <StickyNote />
        <div>Internship</div>
      </div>
    </div>
  );
};

export default Sidebar;
