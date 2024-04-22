import SearchFilters from "./HeaderBar/NavBarLeft/SearchFilters";
import StudyToggle from "./HeaderBar/NavBarRight/StudyToggle";
import Logout from "./Logout";

const HeaderBar = () => {

  return (
    <header className="sticky top-0 z-50 bg-teal-700 w-full">
      <div className="relative">
        <div className="h-40 flex flex-col">
          <div className="absolute flex flex-col top-0">
            <SearchFilters />
          </div>
          <h1 className="absolute flex left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-gray-100 font-bold text-4xl sm:text-5xl font-comic">
            Anatomon Trainers
          </h1>
          <StudyToggle />
          <Logout />
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
