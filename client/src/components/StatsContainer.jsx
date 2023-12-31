import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import { AiFillCarryOut } from "react-icons/ai";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";

const StatsContainer = ({ defaultStats }) => {
  const { pending, interview, accepted } = defaultStats;
  const stats = [
    {
      title: "Pending applications",
      count: pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#f59e0b",
      bcg: "fef3c7",
    },
    {
      title: "Interview Schedule",
      count: interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "e0e8f9",
    },
    {
      title: "jobs accepted",
      count: accepted || 0,
      icon: <AiFillCarryOut />,
      color: "#0A0",
      bcg: "#ffeeee",
    },
    // {
    //   title: "Pending applications",
    //   count: pending || 0,
    //   icon: <FaSuitcaseRolling />,
    //   color: "#f59e0b",
    //   bcg: "fef3c7",
    // },
  ];
  return (
    <Wrapper>
      {stats.map((stat) => {
        return <StatItem key={stat.title} {...stat} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
