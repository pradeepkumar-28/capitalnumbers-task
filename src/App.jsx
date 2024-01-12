import { useState } from "react";
import { Button } from "devextreme-react";
import Drawer from "devextreme-react/drawer";
import SidebarDrawer from "./components/sidebar/SidebarDrawer.jsx";
import BottomDrawer from "./components/sidebar/BottomDrawer.jsx";
import TableComponent from "./components/Table/Index.jsx";

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
      <Drawer
        opened={opened}
        openedStateMode={drawerPosition == "right" ? "shrink" : "overlap"}
        position={drawerPosition}
        revealMode="slide"
        component={drawerPosition == "right" ? SidebarDrawer : BottomDrawer}
        height="auto"
        onOptionChanged={(e) => {
          if (e.fullName === "opened") {
            setOpened(e.value);
          }
        }}
      >
        <TableComponent />
      </Drawer>
    </>
  );
}

export default App;
