import React from "react";
import { Image, Button } from "react-bootstrap";
import CSS from "csstype";
import { BuildingLibraryIcon } from "@heroicons/react/20/solid";
import ToaIconCard from "@/app/components/toa-icon-card";

const lineStyles: CSS.Properties = {
  width: "100%",
  height: "2px",
  borderWidth: 0,
  color: "#323232",
  backgroundColor: "#323232",
};

const ToaLibrary = () => {
  return (
    <div className="flex flex-auto flex-col mx-0 rounded-3xl p-2">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex-1"></div>
        <div className="flex flex-row">
          <BuildingLibraryIcon className="h-10 w-10" />
          <h1 className="text-3xl font-semibold px-5 text-center flex-1">
            Icon Library
          </h1>
        </div>
        <div className="flex space-x-1 pr-5 flex-1 justify-end">
          <button className="btn bg-stone-300"> +Create TOA</button>
          <button className="btn bg-stone-300">Edit TOA</button>
          <button className="btn bg-stone-300">Delete TOA</button>
        </div>
      </div>
      <div className="w-full mt-8">
        <section>
          <h2 className="text-2xl font-semibold">Red Team TOA Icons</h2>
          <hr style={lineStyles}></hr>

          {/* Red team icon selections labeled with their action titles */}
          {/* Red team default icon labeled with "(Default)" */}
          <div className="flex-row">
            <ToaIconCard 
            imageSrc = "/RedTeam/RedTeam_Activity-removebg.png"
            cardTitle="Red Team Activity"
            isDefault={true}
             />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Blue Team TOA Icons</h2>
          <hr style={lineStyles}></hr>
          <div className="flex-row">
            {/* Blue team icon selections labeled with their action titles */}
            {/* BLue team default icon labeled with "(Default)" */}
            <Image
              className="p-0"
              src="/BlueTeam/BlueTeam_Activity.png"
              width={"auto"}
              height={"auto"}
              alt={"blue_team"}
            ></Image>
            <Image
              className="p-0"
              src="/BlueTeam/detect.png"
              width={"auto"}
              height={"auto"}
              alt={"blue_team"}
            ></Image>
            <Image
              className="p-0"
              src="/BlueTeam/protect.png"
              width={"auto"}
              height={"auto"}
              alt={"blue_team"}
            ></Image>
            <Image
              className="p-0"
              src="/BlueTeam/react.png"
              width={"auto"}
              height={"auto"}
              alt={"blue_team"}
            ></Image>
            <Image
              className="p-0"
              src="/BlueTeam/restore.png"
              width={"auto"}
              height={"auto"}
              alt={"blue_team"}
            ></Image>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">White Team TOA Icons</h2>
          <hr style={lineStyles}></hr>
          {/* White team icon selections labeled with their action titles */}
          {/* White team default icon labeled with "(Default)" */}
          <div className="flex-row">
            <Image
              className="p-0"
              src="/WhiteTeam/Whitecard.png"
              width={"auto"}
              height={"auto"}
              alt={"white_team"}
            ></Image>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ToaLibrary;
