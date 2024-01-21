import { useState, useCallback, useEffect } from "react";
import TreeList, { Column, RowDragging } from "devextreme-react/tree-list";
import { useSelector } from "react-redux";
import EmployeeCell from "./EmployeeCall";

function TableComponent() {
  // Table States
  const [sourceTableData, setSourceTableData] = useState([]);

  // redux state data
  const { employeesData } = useSelector((state) => state.EMPLOYEE_DATA[0]);

  useEffect(() => {
    // set employee data on page Load
    setSourceTableData(employeesData);
  }, []);

  // drag and drop funtions
  const onDragChange = (e) => {
    const visibleRows = e.component.getVisibleRows();
    const sourceNode = e.component.getNodeByKey(e.itemData.ID);
    let targetNode = visibleRows[e.toIndex].node;

    while (targetNode && targetNode.data) {
      if (targetNode.data.ID === sourceNode.data.ID) {
        e.cancel = true;
        break;
      }
      targetNode = targetNode.parent;
    }
  };

  const onReorder = useCallback(
    (e) => {
      const visibleRows = e.component.getVisibleRows();
      let sourceData = e.itemData;
      const updatedEmployees = [...sourceTableData];
      const sourceIndex = updatedEmployees.indexOf(sourceData);

      if (e.dropInsideItem) {
        sourceData = { ...sourceData, Head_ID: visibleRows[e.toIndex].key };
        updatedEmployees.splice(sourceIndex, 1);
        updatedEmployees.splice(e.toIndex, 0, sourceData);
      } else {
        const toIndex = e.fromIndex > e.toIndex ? e.toIndex - 1 : e.toIndex;
        let targetData = toIndex >= 0 ? visibleRows[toIndex].node.data : null;

        if (targetData && e.component.isRowExpanded(targetData.ID)) {
          sourceData = { ...sourceData, Head_ID: targetData.ID };
          targetData = null;
        } else {
          const headId = targetData ? targetData.Head_ID : -1;
          if (sourceData.Head_ID !== headId) {
            sourceData = { ...sourceData, Head_ID: headId };
          }
        }

        updatedEmployees.splice(sourceIndex, 1);
        const targetIndex = updatedEmployees.indexOf(targetData) + 1;
        updatedEmployees.splice(targetIndex, 0, sourceData);
      }

      setSourceTableData(updatedEmployees);
    },
    [sourceTableData]
  );

  const onRowPrepared = (e) => {
    if (e.rowType !== "header" && e.node.children.length > 0 && e?.isExpanded) {
      console.log("test", e.level);
      const divElement = document.createElement("div");
      const divElement2 = document.createElement("div");
      const divElement3 = document.createElement("i");
      divElement3.className = "fa-solid fa-bars drag_icon";
      divElement.className = "temp";
      const dynamicHeight = 100;
      divElement.style.height = `${dynamicHeight}%`;
      divElement2.className = "temp2";
      const dynamicWidth = e.level + 1;
      divElement2.style.width = `${dynamicWidth}%`;
      const secondEle = e.rowElement.querySelector("td:nth-child(1)");

      if (secondEle) {
        secondEle.appendChild(divElement);
        secondEle.appendChild(divElement2);
      }
    } else if (e.rowType !== "header") {
      setTimeout(() => {
        const divElement3 = document.createElement("i");
        const contentEle = document.createElement("span");
        const firstTD = e.rowElement.querySelector("td:nth-child(1)");
        const contentDiv = firstTD.querySelector(".dx-treelist-text-content");
        divElement3.className = "fa-solid fa-bars drag_icon";
        const temp = contentDiv.textContent;
        contentDiv.textContent = "";
        contentEle.textContent = temp;
        contentDiv.appendChild(divElement3);
        contentDiv.appendChild(contentEle);
      }, 0);
    }
  };

  return (
    <TreeList
      id="employees"
      dataSource={sourceTableData}
      rootValue={-1}
      keyExpr="ID"
      showRowLines={true}
      showBorders={true}
      parentIdExpr="Head_ID"
      columnAutoWidth={false}
      onRowPrepared={(e) => onRowPrepared(e)}
    >
      <Column dataField="Title" caption="Position" />
      <RowDragging
        onDragChange={onDragChange}
        onReorder={onReorder}
        allowDropInsideItem={true}
        allowReordering={true}
        showDragIcons={false}
      />
      <Column dataField="Title" caption="Position" />
      <Column
        dataField="Task_Assigned_Employee_ID"
        caption="Assigned"
        allowSorting={true}
        minWidth={200}
        cellComponent={EmployeeCell}
      />

      <Column dataField="City" />
      <Column dataField="State" />
      <Column dataField="Mobile_Phone" />
      <Column dataField="Hire_Date" dataType="date" />
    </TreeList>
  );
}

export default TableComponent;
