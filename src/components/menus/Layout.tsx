import { Outlet } from "react-router-dom";
import { Mobile } from "../utils/ReactiveComponents";
import { MobileHeader } from "./MobileHeader";

export function Layout() {
  return (
    <>
      <Mobile>
        <MobileHeader />
      </Mobile>
      <main>
        <Outlet />
      </main>
    </>
  );
}
