/* eslint-disable no-unused-vars */
import React from "react";
import { Tabs } from "devextreme-react";

const tabsText = [
  {
    id: 0,
    text: "User",
  },
  {
    id: 1,
    text: "Analytics",
  },
];

function SidebarDrawer() {
  return (
    <div className="list sidebar_drawer">
      <Tabs
        id="withText"
        width="auto"
        defaultSelectedIndex={0}
        rtlEnabled="false"
        dataSource={tabsText}
        scrollByContent="false"
        showNavButtons="false"
        orientation="horizontal"
        stylingMode="aria-label"
        iconPosition="top"
      />
    </div>
  );
}

export default SidebarDrawer;
