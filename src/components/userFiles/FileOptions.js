import React from 'react';
import { CSSTransition } from 'react-transition-group'
import onClickOutside from "react-onclickoutside";

import './FileOptions.css';

function FileOptions(props) {
  FileOptions.handleClickOutside = () => props.setShowOptions(false);

  return (
    <div className="dropdown">
      <CSSTransition
        in={props.show}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
      >
        <div className="menu">
          <DropdownItem onClick={props.renameHandler}>Rename</DropdownItem>
          <DropdownItem onClick={props.deleteHandler}>Delete</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  )
}
const DropdownItem = (props) => {
  return (
    <a href="#" className="menu-item" onClick={props.onClick}>
      {props.children}
    </a>
  )
}
const clickOutsideConfig = {
  handleClickOutside: () => FileOptions.handleClickOutside
};

export default onClickOutside(FileOptions, clickOutsideConfig);

