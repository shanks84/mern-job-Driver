import React from "react";

import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats, MdAssignmentAdd } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";

const links = [
  {
    text: "add job",
    path: ".",
    icon: <FaWpforms />,
  },
  {
    text: "all job",
    // or we can write ./all-jobs
    path: "all-jobs",
    icon: <MdQueryStats />,
  },
  {
    text: "new jobs",
    // or we can write ./all-jobs
    path: "new-jobs",
    icon: <MdAssignmentAdd />,
  },
  {
    text: "stats",
    path: "stats",
    icon: <IoBarChartSharp />,
  },
  {
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
  {
    text: "admin",
    path: "admin",
    icon: <MdAdminPanelSettings />,
  },
];

export default links;
