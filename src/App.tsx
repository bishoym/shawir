import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";

function App() {
  return (
    <main className="">
      <Onboarding />
      <HomePage />
    </main>
  );
}

export default App;

const getUserLocation = (
  success:
    | ((pos: GeolocationPosition) => GeolocationPosition)
    | ((pos: GeolocationPosition) => void),
  errors?: (err: GeolocationPositionError) => void,
  options?: {
    maximumAge?: number;
    timeout?: number;
    enableHighAccuracy?: boolean;
  },
) => navigator.geolocation.getCurrentPosition(success, errors, options);

const Onboarding = () => {
  return (
    <div className="mx-auto max-w-fit">
      {/* Step 1 */}
      <h1>شاور بيساعدك تركب ميكروباص اسرع</h1>
      {/* Step 2 */}
      <h1>عشان نسهل عليك الدنيا، شاور محتاج يعرف انت واقف فين دلوقتي</h1>
      {/* Location permissions request page */}
      <Button
        onClick={() =>
          navigator.permissions
            .query({ name: "geolocation" })
            .then((result) => {
              console.log(result);
              const { state } = result;
              switch (state) {
                case "granted":
                case "prompt":
                  return getUserLocation(success, errors, options);

                case "denied":
                default:
                  return;
              }
            })
        }
      >
        Enable location
      </Button>
      {/* or Skip to home page */}
    </div>
  );
};
const success = (pos: GeolocationPosition) => {
  console.log("pos", pos);
  return pos;
};

function errors(err: GeolocationPositionError) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const HomePage = () => {
  const [currentLoc, setCurrentLoc] = useState<GeolocationPosition>();
  useEffect(() => {
    getUserLocation((pos) => setCurrentLoc(pos), errors, options);
  }, []);

  console.log("currentLoc", currentLoc);
  return (
    <div className="mx-auto max-w-screen-sm">
      <h1>
        You are currently at {currentLoc?.coords.latitude},{" "}
        {currentLoc?.coords.longitude}, you can go to the following places:
      </h1>
      <ul className="grid grid-cols-2 gap-4">
        <li className="aspect-square rounded-md bg-gray-100">
          <p>Some gif </p>
        </li>
        <li className="aspect-square rounded-md bg-gray-100">
          <p>Some gif </p>
        </li>
        <li className="aspect-square rounded-md bg-gray-100">
          <p>Some gif </p>
        </li>
        <li className="aspect-square rounded-md bg-gray-100">
          <p>Some gif </p>
        </li>
      </ul>
    </div>
  );
};
