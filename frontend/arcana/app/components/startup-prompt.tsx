/**
 * Renders the startup prompt component.
 *
 * @returns The startup prompt component.
 */
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Link from "next/link";

import { CloudUploadFill, Folder, ListColumnsReverse, GearWideConnected } from "react-bootstrap-icons";

export function StartUpPrompt() {
  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <Container className="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle rounded bg-light" style={{ height: "75%", width: "100%" }}>
        <Stack gap={3} className="p-4 mx-8 d-flex align-self-center justify-content-sm-center">
          <h3> Main Menu </h3>
            <Button className="p-3" variant="secondary">
              <Folder size={48} className="mx-auto mb-auto p-2"/>
              <Link href="./dashboard/manageProjects" className="text-decoration-none text-reset">
                Manage Projects
              </Link>
            </Button>

            <Button className="p-3" variant="secondary">
              <CloudUploadFill size={48} className="mx-auto mb-auto p-2"/>
              <Link href="./dashboard/syncProjects" className="text-decoration-none text-reset">
                Sync Projects
              </Link>
            </Button>

            <Button className="p-3" variant="secondary">
            <ListColumnsReverse size={48} className="mx-auto mb-auto p-2"/>
              <Link href="./dashboard/manageUserActivity" className="text-decoration-none text-reset">
                View User Activity Logs
              </Link>
            </Button>

            <Button className="p-3" variant="secondary">
              <GearWideConnected size={48} className="mx-auto mb-auto p-2"/>
              <Link href="./dashboard/manageSystem" className="text-decoration-none text-reset">
                Adjust Application Settings
              </Link>
            </Button>
        </Stack>
      </Container>
    </div>
  );
}
export default StartUpPrompt;
