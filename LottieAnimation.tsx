import { useRef, useEffect } from "react";
import lottie from "lottie-web";

interface LottieAnimationProps {
  animationPath: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

const LottieAnimation = ({
  animationPath,
  className = "h-64 md:h-96 w-full",
  loop = true,
  autoplay = true
}: LottieAnimationProps) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anim: any;
    
    if (container.current) {
      anim = lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop,
        autoplay,
        path: animationPath
      });
    }

    return () => anim?.destroy();
  }, [animationPath, loop, autoplay]);

  return <div ref={container} className={className}></div>;
};

export default LottieAnimation;
