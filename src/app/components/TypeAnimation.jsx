"useClient";
import { TypeAnimation } from "react-type-animation";

export default function TypingAnimation() {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        "an iOS Developer",
        1000,
        "a Fullstack Engineer",
        1000,
        "an UI/UX Designer",
        1000,
      ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
    />
  );
}
