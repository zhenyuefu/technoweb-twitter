import React from "react";

interface IViewPort {
  width: number;
  height: number;
}

const viewportContext = React.createContext<IViewPort>({
  width: window.innerWidth,
  height: window.innerHeight,
});

const ViewportProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

const useViewport = () => {
  const { width, height } = React.useContext<IViewPort>(viewportContext);
  return { width, height };
};

export default ViewportProvider;
export { useViewport };
