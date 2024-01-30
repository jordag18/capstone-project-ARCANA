import Card from "react-bootstrap/Card";
import React from "react";
import ActivityLogErrorAlert from "@/app/ui/activityLogErrorAlert";

function UserLogTable() {
  return (
    <>
      <Card style={{ overflow: "auto", height: "800px" }}>
        <div className=" flex-fluid align-content-center justify-content-center">
          <ul>
            <li>
              [NM] [11/24/2023, 9:17] /Desktop/logs/File ingested in Project A.
            </li>
            <li>
              [NM] [11/24/2023, 9:17] /Desktop/logs/File ingested in Project A.
            </li>
            <li>
              [NM] [11/24/2023, 9:16] /Desktop/logs/File ingested in Project A.
            </li>
            <li>[NM] [11/24/2023, 9:15] Project A created.</li>
            <br></br>

            <li>
              [NM] [11/24/2023, 9:17] /Desktop/logs/File ingested in Project B.
            </li>
            <li>
              [NM] [11/24/2023, 9:17] /Desktop/logs/File ingested in Project B.
            </li>
            <li>
              [NM] [11/24/2023, 9:16] /Desktop/logs/File ingested in Project B.
            </li>
            <li>[NM] [11/24/2023, 9:15] Project B created.</li>
            <br></br>

            <li>
              [NM] [11/24/2023, 9:17] /Desktop/logs/File ingested in Project C.
            </li>
            <li>
              [NM] [11/24/2023, 9:17] /Desktop/logs/File ingested in Project C.
            </li>
            <li>
              [NM] [11/24/2023, 9:16] /Desktop/logs/File ingested in Project C.
            </li>
            <li>[NM] [11/24/2023, 9:15] Project C created.</li>
            <br></br>

            <li>
              [NM] [11/24/2023, 9:17] /Desktop/logs/File ingested in Project D.
            </li>
            <li>
              [NM] [11/24/2023, 9:17] /Desktop/logs/File ingested in Project D.
            </li>
            <li>
              [NM] [11/24/2023, 9:16] /Desktop/logs/File ingested in Project D.
            </li>
            <li>[NM] [11/24/2023, 9:15] Project D created.</li>
            <br></br>

            <li>
              [NM] [11/24/2023, 9:17] /Desktop/logs/File ingested in Project E.
            </li>
            <li>
              [NM] [11/24/2023, 9:17] /Desktop/logs/File ingested in Project E.
            </li>
            <li>
              [NM] [11/24/2023, 9:16] /Desktop/logs/File ingested in Project E.
            </li>
            <li>[NM] [11/24/2023, 9:15] Project E created.</li>
            <br></br>

            <li>
              [NM] [11/24/2023, 9:17] /Desktop/logs/File ingested in Project F.
            </li>
            <li>
              [NM] [11/24/2023, 9:17] /Desktop/logs/File ingested in Project F.
            </li>
            <li>
              [NM] [11/24/2023, 9:16] /Desktop/logs/File ingested in Project F.
            </li>
            <li>[NM] [11/24/2023, 9:15] Project F created.</li>
            <br></br>

            <li>
              [NM] [11/24/2023, 9:17] /Desktop/logs/File ingested in Project G.
            </li>
            <li>
              [NM] [11/24/2023, 9:17] /Desktop/logs/File ingested in Project G.
            </li>
            <li>
              [NM] [11/24/2023, 9:16] /Desktop/logs/File ingested in Project G.
            </li>
            <li>[NM] [11/24/2023, 9:15] Project G created.</li>
            <br></br>

            <li>
              [NM] [11/24/2023, 9:17] /Desktop/logs/File ingested in Project H.
            </li>
            <li>
              [NM] [11/24/2023, 9:17] /Desktop/logs/File ingested in Project H.
            </li>
            <li>
              [NM] [11/24/2023, 9:16] /Desktop/logs/File ingested in Project H.
            </li>
            <li>[NM] [11/24/2023, 9:15] Project H created.</li>
            <br></br>
          </ul>
        </div>
      </Card>
      <div className="p-2">
        <ActivityLogErrorAlert/>
      </div>
    </>
  );
}

export default UserLogTable;
