import Link from "next/link";
import { useState } from "react";
import { BsXLg } from "react-icons/bs";

const MenuItems = [
  {
    name: "SOB COLLECTIONS",
    href: "/collections",
  },
  {
    name: "PRODUCTS",
    href: "/products",
  },
];


const MobileMenu = ({ mobileMenuhandle }) => {
  const [menuId, setMenuId] = useState("");
  const [subMenuId, setSubMenuId] = useState("");

  return (
    <div className="bepe_mobile_menu_content">
      <div className="mobile_menu_logo">
        <button
          className="mobile_menu_close_btn"
          onClick={() => mobileMenuhandle()}
        >
          {" "}
          <BsXLg />{" "}
        </button>
      </div>
      <div className="bepe_mobile_menu_list">
        <ul>
          {/* menu  */}
          {MenuItems?.map((menu, i) => (
            <li
              key={i}
              // manu expand icon and menu active based on condition
              className={`${menu.subMenus?.length > 0 ? "has_submenu" : ""} ${
                menuId === menu.id ? "expand_submenu" : ""
              }`}
              onClick={() => setMenuId(menu.id)}
            >
              <Link href={menu.url}>{menu.title}</Link>

              {/* if has subMenu and length is greater than 0 */}
              {menu.subMenus?.length > 0 && (
                <ul className="sub_menu_list">
                  {menu.subMenus?.map((subMenu, i) => (
                    <li
                      key={i}
                      // manu expand icon and menu active based on condition
                      className={`${
                        subMenu?.subMenuChilds?.length > 0
                          ? "sub_has_submenu"
                          : ""
                      } ${
                        subMenuId === subMenu.id ? "expand_submenu_child" : ""
                      }`}
                      onClick={() => setSubMenuId(subMenu.id)}
                    >
                      <Link href={subMenu.url}>{subMenu.title}</Link>
                      {/* if subMenu child has menu child */}
                      {subMenu?.subMenuChilds?.length > 0 && (
                        <ul className="sub_menu_child_list">
                          {subMenu?.subMenuChilds?.map((subChild, i) => (
                            <li key={i}>
                              <Link href={subChild.url}>
                                {subChild.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
