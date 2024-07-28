import React from "react";
import PageIndex from "../PageIndex/PageIndex";

function AsideMenu() {
  return (
    <aside className="sm:block hidden bg-custom-link-blue sm:text-2xl w-[min(17rem,25vw)] rounded-l-lg p-6 text-white h-fit">
      <h5>Aside Menu</h5>
      <ul className="sm:text-lg px-6">
        <li>Item 1</li>
        <li>
          Item 1
          <ul className="sm:text-sm text-[12px] px-6">
            <li>Item 2</li>
            <li>Item 2</li>
            <li>Item 2</li>
            <li>Item 2</li>
          </ul>
        </li>
        <li>Item 1</li>
        <li>Item 1</li>
        <li>Item 1</li>
        <li>Item 1</li>
        <li>Item 1</li>
        <li>Item 1</li>
        <li>Item 1</li>
        <li>Item 1</li>
        <li>Item 1</li>
        <li>Item 1</li>
        <li>Item 1</li>
        <li>Item 1</li>
        <li>Item 1</li>
        <li>Item 1</li>
      </ul>
    </aside>
  );
}

export default AsideMenu;
