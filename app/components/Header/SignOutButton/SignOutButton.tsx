"use client";

import { Fragment, useState } from "react";
import { signOut } from "next-auth/react";
import { getLogOutUrl } from "@/lib/clientUtils";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";

export default function SignOutButton() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setIsOpen(true);
  }

  const handleSignOut = () => {
    const cognitoUrl = getLogOutUrl();
    signOut({ redirect: false }).then(() => {
      window.location.href = cognitoUrl;
    });
  };

  return (
    <>
      <div className="p-2">
        <button type="button" onClick={openModal} className="btn-cancel">
          Sign out
        </button>
      </div>
      <ConfirmationModal
        isOpen={isOpen}
        closeModal={() => {}}
        onConfirm={handleSignOut}
        onCancel={closeModal}
        title="Confirm Sign Out"
        message="Are you sure you want to sign out?"
        okText="Sign Out"
        cancelText="Cancel"
      />
    </>
  );
}
