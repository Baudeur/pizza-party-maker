import { ArrowLeft, CircleHelp } from "lucide-react";
import title from "../../assets/Title.png";
import { Infos } from "../infos/Infos";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import { useAppDispatch } from "../../hooks";
import { closeOverlay } from "../../modules/overlays/slice";

export function MobileHeader() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const location = useLocation();

  const handleRedirect = () => {
    dispatch(closeOverlay());
  };

  const isHome = location.pathname == "/";

  return (
    <>
      <div
        className={`sticky top-0 w-full z-40 bg-white shadow-lg ease-[step-end] h-12 transition-shadow duration-200`}
      >
        <div className="h-12 flex justify-between items-center">
          {isHome ? (
            <Link to="/help">
              <button
                className="h-10 text-xl flex items-center pl-2 w-full active:bg-gray-200"
                onClick={handleRedirect}
                title={t("help")}
              >
                <CircleHelp size={30} color="gray" strokeWidth={2} />
              </button>
            </Link>
          ) : (
            <Link to="/">
              <button
                className="h-10 text-xl flex items-center pl-2 w-full active:bg-gray-200"
                onClick={handleRedirect}
                title={t("help")}
              >
                <ArrowLeft size={30} color="gray" strokeWidth={2} />
              </button>
            </Link>
          )}
          <Link
            to="/"
            className="w-3/5 flex justify-center items-center"
            onClick={handleRedirect}
          >
            <img src={title} className="max-h-10" alt="Pizza Party Maker" />
          </Link>
          <Infos />
        </div>
      </div>
    </>
  );
}
