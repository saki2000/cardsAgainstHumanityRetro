import ProfileDetailsTable from "../components/ProfilePage/ProfileDetailsTable/ProfileDetailsTable";
import ReturnButton from "../components/ReturnButton/ReturnButton";

export default function ProfilePage() {
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
        <ProfileDetailsTable />
      </div>
    </div>
  );
}
