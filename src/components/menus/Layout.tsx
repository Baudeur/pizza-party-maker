import { Outlet } from "react-router-dom";
import { Mobile } from "../utils/ReactiveComponents";
import { MobileHeader } from "./MobileHeader";
import { Overlays } from "./Overlays";

export function Layout() {
  return (
    <>
      <Mobile>
        <MobileHeader />
      </Mobile>
      <main>
        <Overlays />
        <Outlet />
      </main>
    </>
  );
}
