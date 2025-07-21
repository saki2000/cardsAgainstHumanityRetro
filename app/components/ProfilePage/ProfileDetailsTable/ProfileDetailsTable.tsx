"use client";

import { Users } from "@/app/types/customTypes";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  username?: string | null;
}

export default function ProfileDetailsTable({ username }: Props) {
  const [userData, setUserData] = useState<Users | null>(null);

  useEffect(() => {
    if (!username) return;
    const fetchUserData = async () => {
      try {
        const response = await axios.post(`/api/users/retrieve`, {
          userName: username,
        });
        console.log("User data fetched:", response.data);
        setUserData(response.data);
        toast.success("User data retrieved successfully", {
          position: "bottom-right",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error fetching user data", {
          position: "bottom-right",
        });
      }
    };

    fetchUserData();
  }, [username]);

  const attributes = [
    { label: "Name", value: userData?.username },
    { label: "Email", value: userData?.email },
    { label: "Games Played", value: userData?.gamesPlayed },
    { label: "Total Score", value: userData?.totalPoints },
    { label: "Best Score", value: userData?.bestScore },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg bg-white w-full mx-auto">
        <table className="min-w-full text-sm text-left">
          <tbody>
            {attributes.map((attribute) => (
              <tr
                key={attribute.label}
                className="even:bg-gray-100 odd:bg-white hover:bg-gray-200 transition"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-semibold text-gray-700 capitalize whitespace-nowrap border-r border-gray-300"
                >
                  {attribute.label}
                </th>
                <td className="px-6 py-4 text-gray-900">
                  {attribute.value ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
