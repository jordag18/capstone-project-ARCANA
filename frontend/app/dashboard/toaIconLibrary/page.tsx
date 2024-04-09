import React from 'react';
import { Image, Button } from "react-bootstrap";
import CSS from 'csstype';
import Sidebar from "@/app/components/sidebar";

const lineStyles: CSS.Properties = {
  width: "100%",
  height: "2px",
  borderWidth: 0,
  color: "#323232",
  backgroundColor: "#323232"
}

const ToaLibrary: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold pl-5">Icon Library</h1>
      <div className="flex space-x-4 pr-5">
        <Button>+ Create TOA</Button>
        <Button>Modify TOA</Button>
        <Button>Delete TOA</Button>
      </div>
      <div className="w-full mt-8">
        <section>
          <h2>Red Team TOA Icons</h2>
          <hr style={lineStyles}></hr>
          {/* Red team icon selections labeled with their action titles */}
          {/* Red team default icon labeled with "(Default)" */}
          <div className='flex-row'>
            <Image className="p-0" src="/RedTeam_Activity.png" width={"auto"} height={"auto"} alt={"red_team"} ></Image>
          </div>
        </section>

        <section>
          <h2>Blue Team TOA Icons</h2>
          <hr style={lineStyles}></hr>
          <div className="flex-row">
            {/* Blue team icon selections labeled with their action titles */}
            {/* BLue team default icon labeled with "(Default)" */}
            <Image className="p-0" src="/BlueTeam_Activity.png" width={"auto"} height={"auto"} alt={"blue_team"} ></Image>
            <Image className="p-0" src="/detect.png" width={"auto"} height={"auto"} alt={"blue_team"} ></Image>
            <Image className="p-0" src="/protect.png" width={"auto"} height={"auto"} alt={"blue_team"} ></Image>
            <Image className="p-0" src="/react.png" width={"auto"} height={"auto"} alt={"blue_team"} ></Image>
            <Image className="p-0" src="/restore.png" width={"auto"} height={"auto"} alt={"blue_team"} ></Image>
          </div>
        </section>

        <section>
          <h2>White Team TOA Icons</h2>
          <hr style={lineStyles}></hr>
          {/* White team icon selections labeled with their action titles */}
          {/* White team default icon labeled with "(Default)" */}
          <div className='flex-row'>
            <Image className="p-0" src="/Whitecard.png" width={"auto"} height={"auto"} alt={"white_team"} ></Image>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ToaLibrary;
