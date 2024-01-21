import { useState } from "react";
import { Button } from "devextreme-react";
import Resizable from "devextreme-react/resizable";
import SidebarDrawer from "./components/sidebar/SidebarDrawer.jsx";
import TableComponent from "./components/Table/Index.jsx";
import BottomDrawer from "./components/sidebar/BottomDrawer.jsx";

function App() {
  // drawer state
  const [opened, setOpened] = useState(false);
  const [drawerPosition, setDrawerPosition] = useState("right");

  const onDrawerOpenHandler = (position) => {
    if (opened && drawerPosition === position) {
      // If the drawer is already open at the same position, close it
      setOpened(false);
    } else {
      // Otherwise, open the drawer at the specified position
      setDrawerPosition(position);
      setOpened(true);
    }
  };

  return (
    <>
      <div className="header-tabs-buttons">
        <Button icon="link" onClick={() => onDrawerOpenHandler("right")} />
        <Button icon="menu" onClick={() => onDrawerOpenHandler("bottom")} />
      </div>

      <div className="Container widget-container">
        <div
          className={
            drawerPosition == "bottom" ? "dx-fieldset-bottom" : "dx-fieldset"
          }
        >
          <div
            className={
              drawerPosition == "bottom" ? "dx-field-bottom" : "dx-field"
            }
          >
            <div style={{ width: "100%", height: "100%" }}>
              <TableComponent />
            </div>
            {opened && drawerPosition == "right" && (
              <Resizable
                id="gridContainer"
                minWidth={350}
                height={700}
                handles="left"
                area=".Container .dx-field"
              >
                <SidebarDrawer />
              </Resizable>
            )}
            {opened && drawerPosition == "bottom" && (
              <Resizable
                id="gridContainer_bottom"
                width={"100%"}
                minHeight={100}
                handles="top"
                area=".Container .dx-field-bottom"
              >
                <BottomDrawer />
              </Resizable>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
