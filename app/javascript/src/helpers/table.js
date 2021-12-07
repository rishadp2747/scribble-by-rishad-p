//Function to change design of the table which is not able to controll vai props
export const changeTableDesign = () => {
  const table = document.getElementsByTagName("table");
  const tableHeaders = document.querySelectorAll(".ant-table-thead tr th");

  tableHeaders.forEach(tableHeader =>
    tableHeader.classList.add("bg-indigo-50")
  );
  table[1].classList.add("redirection-table");
};
