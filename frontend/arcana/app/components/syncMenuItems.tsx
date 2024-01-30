import React from "react";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Link from "next/link";

import { Globe2, FolderSymlink } from "react-bootstrap-icons";

export function SyncMenuItems() {
  return (
    <div>
      <Container
        className="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle rounded bg-light"
        style={{ height: "75%", width: "100%" }}>
        <Stack
          gap={3}
          className="p-4 mx-8 d-flex align-self-center justify-content-sm-center">
          <Button className="p-3" variant="secondary">
            <Globe2 size={48} className="mx-auto mb-auto p-2" />
            <Link
              href="./dashboard/syncMenu/syncProjects"
              className="text-decoration-none text-reset">
              Create Sync Request
            </Link>
          </Button>

          <Button className="p-3" variant="secondary">
            <FolderSymlink size={48} className="mx-auto mb-auto p-2" />
            <Link
              href="./dashboard/syncMenu"
              className="text-decoration-none text-reset">
              View Sync Requests
            </Link>
          </Button>

          {/* Centered Button */}
          <Button
            className="mx-auto p-2 justify-content-center position-relative bottom-0 start-50"
            variant="secondary"
            style={{ transform: "translateX(-45%)" }}>
            Change Connection
          </Button>
        </Stack>
      </Container>
    </div>
  );
}
export default SyncMenuItems;
