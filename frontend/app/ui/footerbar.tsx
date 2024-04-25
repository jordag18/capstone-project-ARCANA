import React from "react";

type TextComponentProps = {
  position: "left" | "center" | "right";
  children: React.ReactNode;
};

const TextComponent: React.FC<TextComponentProps> = ({
  position,
  children,
}) => {
  let justifyClass = "";
  switch (position) {
    case "left":
      justifyClass = "justify-start";
      break;
    case "center":
      justifyClass = "justify-center";
      break;
    case "right":
      justifyClass = "justify-end";
      break;
  }

  return (
    <div className={`flex ${justifyClass} flex-1 text-wrap`}>{children}</div>
  );
};

const CustomBlackRectangle: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white py-4 pr-2 pl-2 flex overflow-hidden">
      <TextComponent position="left">
        Advanced Resiliency Chronicling for Analysis in Network Assessments
        [ARCANA]
      </TextComponent>
      <TextComponent position="center">Team 1: Cui Bono</TextComponent>
      <TextComponent position="right">
        Data Analysis Center&apos;s Cyber Experimentation & Analysis Divison
        [DAC CEAD]
      </TextComponent>
    </div>
  );
};

export default CustomBlackRectangle;
