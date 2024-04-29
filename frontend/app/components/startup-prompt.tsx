/**
 * Renders the startup prompt component.
 *
 * @returns The startup prompt component.
 */
//Currently not used in frontend-dev branch
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Link from "next/link";

import {
  CloudUploadFill,
  Folder,
  ListColumnsReverse,
  GearWideConnected,
} from "react-bootstrap-icons";

export function StartUpPrompt() {
  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <Container
        className="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle rounded bg-light"
        style={{ height: "70%", width: "100%" }}>
        <Stack
          gap={3}
          className="p-4 mx-8 d-flex align-self-center justify-content-sm-center">
          <h2> Main Menu </h2>
          <hr></hr>
          <Button className="p-3" variant="secondary">
            <Folder size={90} className="mx-auto mb-auto p-2" />
            <Link
              href="./dashboard/projectsMenu"
              className="text-decoration-none text-reset">
              Manage Projects
            </Link>
          </Button>

          <Button className="p-3" variant="secondary">
            <CloudUploadFill size={90} className="mx-auto mb-auto p-2" />
            <Link
              href="./dashboard/syncMenu"
              className="text-decoration-none text-reset">
              Sync Projects
            </Link>
          </Button>

          <Button className="p-3" variant="secondary">
            <ListColumnsReverse size={90} className="mx-auto mb-auto p-2" />
            <Link
              href="./dashboard/userActivityMenu"
              className="text-decoration-none text-reset">
              View User Activity Logs
            </Link>
          </Button>

          <Button className="p-3" variant="secondary">
            <GearWideConnected size={90} className="mx-auto mb-auto p-2" />
            <Link
              href="./dashboard/systemMenu"
              className="text-decoration-none text-reset">
              Adjust Application Settings
            </Link>
          </Button>
        </Stack>
      </Container>
    </div>
  );
}
export default StartUpPrompt;
