import { useState, useEffect } from "react";

function Message(props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const colorclass =
    props.type == "model"
      ? "bg-white text-primary-color text-left"
      : "bg-primary-color text-white text-right";
  const flexclass =
    (props.type == "model" ? "" : "justify-end opacity-0 ") +
    (isVisible ? "opacity-100 animate-fade-in" : "");
  return (
    <div className={"flex  " + flexclass}>
      <div
        className={
          "text-primary-color px-6 py-3 rounded-xl my-5 text-lg font-semibold " +
          colorclass
        }
      >
        {props.body}
      </div>
    </div>
  );
}

export default Message;
