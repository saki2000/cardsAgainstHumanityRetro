import ReturnButton from "../components/ReturnButton/ReturnButton";

export default function ProfilePage() {
  const atributes = ["Name", "Email", "Best Score", "Games Played"];

  return (
    <div className="flex flex-col items-center min-h-screen bg-black px-2 py-8">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="w-full sm:w-auto flex justify-start">
            <ReturnButton />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight text-center w-full">
            PROFILE
          </h1>
          <div className="w-full sm:w-auto" />
        </div>
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
      </div>
    </div>
  );
}
