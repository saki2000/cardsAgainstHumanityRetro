import ChangePasswordModal from "../Modals/ChangePasswordModal";

export default function SettingsPageContainer() {
  const atributes = ["Password"];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg bg-white w-full mx-auto">
      <table className="min-w-full text-sm text-left">
        <tbody>
          {atributes.map((atribute) => (
            <tr
              key={atribute}
              className="even:bg-gray-100 odd:bg-white hover:bg-gray-200 transition"
            >
              <th
                scope="row"
                className="px-6 py-4 font-semibold text-gray-700 capitalize whitespace-nowrap border-r border-gray-300"
              >
                {atribute}
              </th>
              <td className="py-4 w-1 whitespace-nowrap p-8">
                <div className="flex justify-center">
                  <ChangePasswordModal />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
