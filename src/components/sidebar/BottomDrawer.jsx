import React from "react";
import TabPanel from "devextreme-react/tab-panel";
import TabPanelItem from "./TabPannel";

const dataSource = [
  {
    icon: "description",
    title: "Not Started",
  },
  {
    icon: "taskhelpneeded",
    title: "Help Needed",
  },
  {
    icon: "taskinprogress",
    title: "In Progress",
  },
];

function BottomDrawer() {
  return (
    <div className="bottom-drawer">
      <TabPanel
        className="dx-theme-background-color tabPanel"
        width="100%"
        height={418}
        animationEnabled={true}
        swipeEnabled={true}
        dataSource={dataSource}
        tabsPosition="left"
        stylingMode="secondary"
        iconPosition="start"
        itemComponent={TabPanelItem}
      >
        Tab content
      </TabPanel>
    </div>
  );
}

export default BottomDrawer;
