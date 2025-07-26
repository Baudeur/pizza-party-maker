import {
  CircleHelp,
  History,
  House,
  Menu,
  Settings,
  Star,
  X,
} from "lucide-react";
import title from "../../assets/Title.png";
import { Infos } from "../infos/Infos";
import { useState } from "react";
import { Footer } from "./Footer";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

export function MobileHeader() {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  const isLight = ["/", "/help-light"].includes(location.pathname);
  return (
    <>
      <div
        className={`sticky top-0 w-full z-40 bg-white ${
          expanded ? "ease-[step-start]" : "shadow-lg ease-[step-end]"
        } h-12 transition-shadow duration-200`}
      >
        <div className="h-12 flex justify-between items-center">
          {!expanded && (
            <Menu size={30} className="m-2" onClick={() => setExpanded(true)} />
          )}
          {expanded && (
            <X size={30} className="m-2" onClick={() => setExpanded(false)} />
          )}
          <Link
            to={isLight ? "/" : "/old"}
            className="w-3/5 flex justify-center items-center"
            onClick={() => setExpanded(false)}
          >
            <img src={title} className="max-h-10" alt="Pizza Party Maker" />
          </Link>
          <Infos />
        </div>
      </div>
      <div
        className={`fixed top-12 transition-all duration-200 bg-white z-30 overflow-hidden ${
          expanded ? "h-[calc(100lvh-48px)]" : "h-[0px]"
        }`}
      >
        <div className="flex-col h-[calc(100dvh-48px)] pb-2 flex justify-between">
          <div>
            <hr />
            {isLight ? (
              <>
                <Link to="/">
                  <button
                    className="h-10 text-xl flex items-center pl-2 w-full active:bg-gray-200"
                    onClick={() => setExpanded(false)}
                    title={t("home")}
                  >
                    <House size={30} color="gray" strokeWidth={2} />
                    <span className="ml-2 text-black font-normal">
                      {t("home")}
                    </span>
                  </button>
                </Link>
                <hr />
                <Link to="/help-light">
                  <button
                    className="h-10 text-xl flex items-center pl-2 w-full active:bg-gray-200"
                    onClick={() => setExpanded(false)}
                    title={t("help")}
                  >
                    <CircleHelp size={30} color="gray" strokeWidth={2} />
                    <span className="ml-2 text-black font-normal">
                      {t("help")}
                    </span>
                  </button>
                </Link>
                <hr />
                <Link to="/old">
                  <button
                    className="h-10 text-xl flex items-center pl-2 w-full active:bg-gray-200"
                    onClick={() => setExpanded(false)}
                    title={t("go-previous-ver")}
                  >
                    <History size={30} color="gray" strokeWidth={2} />
                    <span className="ml-2 text-black font-normal">
                      {t("go-previous-ver")}
                    </span>
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/old">
                  <button
                    className="h-10 text-xl flex items-center pl-2 w-full active:bg-gray-200"
                    onClick={() => setExpanded(false)}
                    title={t("home")}
                  >
                    <House size={30} color="gray" strokeWidth={2} />
                    <span className="ml-2 text-black font-normal">
                      {t("home")}
                    </span>
                  </button>
                </Link>
                <hr />
                <Link to="/help">
                  <button
                    className="h-10 text-xl flex items-center pl-2 w-full active:bg-gray-200"
                    onClick={() => setExpanded(false)}
                    title={t("help")}
                  >
                    <CircleHelp size={30} color="gray" strokeWidth={2} />
                    <span className="ml-2 text-black font-normal">
                      {t("help")}
                    </span>
                  </button>
                </Link>
                <hr />
                <Link to="/settings">
                  <button
                    className="h-10 text-xl flex items-center pl-2 w-full active:bg-gray-200"
                    onClick={() => setExpanded(false)}
                    title={t("parameters-title")}
                  >
                    <Settings size={30} color="gray" strokeWidth={2} />
                    <span className="ml-2 text-black font-normal">
                      {t("parameters-title")}
                    </span>
                  </button>
                </Link>
                <hr />
                <Link to="/">
                  <button
                    className="h-10 text-xl flex items-center pl-2 w-full active:bg-gray-200"
                    onClick={() => setExpanded(false)}
                    title={t("go-light-ver")}
                  >
                    <Star size={30} color="gray" strokeWidth={2} />
                    <span className="ml-2 text-black font-normal">
                      {t("go-light-ver")}
                    </span>
                  </button>
                </Link>
              </>
            )}
            <hr />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
