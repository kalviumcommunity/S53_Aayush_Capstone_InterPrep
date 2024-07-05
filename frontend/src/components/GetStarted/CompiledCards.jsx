import React from "react";
import { FcManager } from "react-icons/fc";
import { FcReadingEbook } from "react-icons/fc";
import { FcDepartment } from "react-icons/fc";
import StartedCard from "./StartedCard";

function StartedCards() {
  const options = [
    {
      icon: FcReadingEbook,
      name: "Student",
      desc: "Practice with our AI chat bot to prepare for interviews, get personalized feedback according to your performance, and identify your weak points. Book mock interviews with verified professionals to get better at coding interviews! Apply for jobs, and find gigs to earn some money.",
      to: "/user/signup"
    },
    {
      icon: FcManager,
      name: "Interviewer",
      desc: "Are you a working professional who wants to help out developers across the world to grow? You can earn while you do that! Get verified as an interviewer in less than 2 hours and start taking mock interviews today.",
      to: "/interviewer/signup"
    },
    {
      icon: FcDepartment,
      name: "Company",
      desc: "Looking to hire some skilled developers? Get the best here! Access a pool of talented individuals who have been rigorously vetted through our comprehensive assessment process. Streamline your recruitment with our platform and find the perfect fit for your team.",
      to: "/company/signup"
    },
  ];

  return (
    options.map((e, i)=>{
        return <StartedCard data = {e} key={i} />
    })
    
  );
}

export default StartedCards;
