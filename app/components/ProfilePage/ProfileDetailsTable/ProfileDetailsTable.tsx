export default function ProfileDetailsTable() {
  // TODO: make this page dynamic, fetching user data from the server (maybe using email?)
  const atributes = ["Name", "Email", "Best Score", "Games Played"];

  return (
    <div className="overflow-x-auto">
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
                <td className="px-6 py-4 text-gray-900">{"value"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
