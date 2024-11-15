import * as React from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import Routes from "../../util/Routes";
import { useSelector } from "react-redux";
import classNames from "classnames";
import TermItState from "../../model/TermItState";
import "./UserDropdown.scss";
import { useI18n } from "../hook/useI18n";

interface UserDropdownProps {
  dark: boolean;
}

/**
 * Have to explicitly add the hash to NavLink paths, otherwise NavLinks act as if using browser history.
 */
function hashPath(path: string): string {
  return "#" + path;
}

export const UserDropdown: React.FC<UserDropdownProps> = (props) => {
  const { i18n } = useI18n();
  const user = useSelector((state: TermItState) => state.user);
  return (
    <UncontrolledDropdown nav={true}>
      <DropdownToggle
        nav={true}
        caret={true}
        className={classNames(
          props.dark ? "text-white-link" : "text-dark text-dropdown",
          "d-flex",
          "align-items-center",
          "px-2",
          "px-sm-3"
        )}
      >
        <i className="fas fa-user-circle user-icon align-middle" />
        &nbsp;
        <span className="user-dropdown">{user.abbreviatedName}</span>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-arrow" right={true}>
        <DropdownItem href={hashPath(Routes.profile.path)}>
          <i className="fas fa-user" />
          <span>{i18n("main.user-profile")}</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
