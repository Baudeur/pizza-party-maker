import { CircleHelp, Menu, Settings, X } from "lucide-react";
import title from "../../assets/Title.png";
import { Infos } from "../infos/Infos";
import { useState } from "react";
import { Footer } from "./Footer";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function MobileHeader() {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <div className={`sticky top-0 w-full z-40 bg-white shadow-lg h-12`}>
        <div className="h-12 flex justify-between items-center">
          {!expanded && (
            <Menu size={30} className="m-2" onClick={() => setExpanded(true)} />
          )}
          {expanded && (
            <X size={30} className="m-2" onClick={() => setExpanded(false)} />
          )}
          <Link to="/" className="w-3/5" onClick={() => setExpanded(false)}>
            <img src={title} alt="Pizza Party Maker" />
          </Link>
          <Infos />
        </div>
      </div>
      <div
        className={`fixed top-12 transition-all duration-[200ms] bg-white z-40 overflow-hidden ${
          expanded ? "h-[calc(100lvh-48px)]" : "h-[0px]"
        }`}
      >
        <div className="flex-col h-[calc(100dvh-48px)] pb-2 flex justify-between">
          <div>
            <hr />
            <Link to="/help">
              <button
                className="h-10 text-xl flex items-center pl-2 w-full active:bg-gray-200"
                onClick={() => setExpanded(false)}
                title={t("help")}
              >
                <CircleHelp size={30} color="gray" strokeWidth={2} />
                <span className="ml-2 text-black font-normal">{t("help")}</span>
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
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
