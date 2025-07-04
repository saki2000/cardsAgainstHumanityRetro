"use client";

import { useSession } from "next-auth/react";
import {
  CognitoIdentityProviderClient,
  ChangePasswordCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { toast } from "react-toastify";

export default function ChangePasswordModal() {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMatch =
    newPassword === confirmPassword && newPassword.length > 0;

  const resetForm = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage("");
    setLoading(false);
  };

  const openModal = () => {
    resetForm();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    resetForm();
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    if (!passwordsMatch) return;

    try {
      if (!session?.accessToken) {
        setMessage("No access token found. Please re-login.");
        return;
      }
      const client = new CognitoIdentityProviderClient({
        region: process.env.NEXT_PUBLIC_AWS_REGION,
      });
      const command = new ChangePasswordCommand({
        AccessToken: session.accessToken,
        PreviousPassword: oldPassword,
        ProposedPassword: newPassword,
      });
      await client.send(command);
      toast.success("Password changed successfully!", {
        position: "bottom-right",
      });
      resetForm();
      setIsOpen(false);
      closeModal();
    } catch (err: unknown) {
      toast.error("Failed to change password", { position: "bottom-right" });
      setMessage(
        "Error: " +
          (err && typeof err === "object" && "message" in err
            ? (err as { message?: string }).message
            : "Failed to change password"),
      );
    }
    setLoading(false);
  };

  return (
    <>
      <button
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
        onClick={openModal}
      >
        Change
      </button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-black"
              >
                Password Change
              </DialogTitle>
              <div className="mt-4">
                <form onSubmit={handleChangePassword}>
                  <label className="block mb-4 text-black">
                    <span className="block mb-1">Old Password</span>
                    <input
                      type="password"
                      className="w-full px-3 py-2 rounded text-black border-1"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                    />
                  </label>
                  <label className="block mb-6">
                    <span className="block mb-1 text-black">New Password</span>
                    <input
                      type="password"
                      className="w-full px-3 py-2 rounded  text-black border-1"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </label>
                  <label className="block mb-6">
                    <span className="block mb-1 text-black">
                      Confirm Password
                    </span>
                    <input
                      disabled={loading}
                      type="password"
                      className="w-full px-3 py-2 rounded text-black border-1"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </label>

                  {message && (
                    <div className="mt-4 text-center text-red-600">
                      {message}
                    </div>
                  )}

                  {confirmPassword && !passwordsMatch && (
                    <div className="text-red-600 text-sm mb-2 text-center">
                      Passwords do not match.
                    </div>
                  )}

                  <div className="flex justify-between mb-4 gap-4">
                    <button
                      type="submit"
                      disabled={!passwordsMatch || loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      {loading ? "Changing..." : "Change Password"}
                    </button>

                    <button
                      onClick={closeModal}
                      type="button"
                      disabled={loading}
                      className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
