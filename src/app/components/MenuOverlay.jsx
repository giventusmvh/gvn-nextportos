import { useState, useEffect } from "react";
import Navlink from "./NavLink";

export default function MenuOverlay({ links, visible }) {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (visible) {
      setAnimationClass("slide-down");
    } else {
      setAnimationClass("slide-up");
    }
  }, [visible]);

  return (
    <div className={`menu-overlay ${animationClass}`}>
      <ul className="flex flex-col items-center py-4">
        {links.map((link, index) => (
          <li key={index}>
            <Navlink href={link.href} title={link.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}
