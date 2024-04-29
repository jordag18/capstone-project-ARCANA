import React from "react";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Link from "next/link";

import { Globe2, FolderSymlink } from "react-bootstrap-icons";

export function SyncMenuItems() {
  return (
    <>
      <Stack
        gap={3}
        className="p-4 mx-8 d-flex align-self-center justify-content-sm-center">
        <Button className="p-3" variant="secondary">
          <Globe2 size={48} className="mx-auto mb-auto p-2" />
          <Link
            href="./syncMenu/syncProjects"
            className="text-decoration-none text-reset">
            Create Sync Request
          </Link>
        </Button>

        <Button className="p-3" variant="secondary">
          <FolderSymlink size={48} className="mx-auto mb-auto p-2" />
          <Link
            href="./syncMenu/viewSyncedProjects"
            className="text-decoration-none text-reset">
            View Sync Requests
          </Link>
        </Button>

        <Button
          className="mx-auto p-2 justify-content-center position-relative align-self-center"
          variant="secondary">
          Change Connection
        </Button>
      </Stack>
    </>
  );
}
export default SyncMenuItems;
