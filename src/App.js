import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import menu from './menu';

import { Slide } from "react-awesome-reveal";

const App = () => {
  const initialState = (() => {
    const data = localStorage.getItem('@sistema-menu');
    if(![null, undefined, ''].includes(data)) {
      return JSON.parse(data);
    }

    return {
      oldMenu: [],
      currentMenu: menu,
      currentMenuInfo: null
    }
  })();
  
  const [menuOpts, setMenuOpts] = useState(initialState);

  const onClickMenuItem = (menuItem) => {
    if (!menuItem || !menuItem.children) return;
    const oldMenuCopy = [...menuOpts.oldMenu];
    oldMenuCopy.push(menuItem);

    setMenuOpts({
      currentMenu: menuItem.children,
      oldMenu: oldMenuCopy,
      currentMenuInfo: menuItem
    });
  };

  const onClickMenuBack = () => {
    if(menuOpts.oldMenu.length > 0) {
      const oldMenuCopy = [...menuOpts.oldMenu];
      oldMenuCopy.pop();

      setMenuOpts({
        currentMenu: ((oldMenuCopy.length === 0) ? menu : oldMenuCopy[oldMenuCopy.length - 1].children),
        oldMenu: oldMenuCopy,
        currentMenuInfo: ((oldMenuCopy.length === 0) ? null : oldMenuCopy[oldMenuCopy.length - 1])
      });
    }
  };

  window.addEventListener('keyup', async (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      onClickMenuBack();
    }
  });

  const getItensFromCurrent = () => {
    return menuOpts.currentMenu && Array.isArray(menuOpts.currentMenu) === false ? menuOpts.currentMenu.children : menuOpts.currentMenu;
  }

  useEffect(() => {
    localStorage.setItem('@sistema-menu', JSON.stringify(menuOpts));
  }, [menuOpts]);

  return (
    <div id="menu">
      <div id="menu-header">
        {
          menuOpts.oldMenu.length === 0 && menuOpts.currentMenuInfo === null ? (
            <div id="logo"><img src={logo} alt="Brisanet" /></div>
          ) : (
            <div id="menu-go-back-wrapper">
              <div id="menu-go-back" onClick={onClickMenuBack}>
                <span className={`icon fas fa-arrow-left`} />
              </div>
              <span className="menu-title">{menuOpts.currentMenuInfo.label}</span>
            </div>
          )
        }
      </div>
      <div id="menu-body">
        <Slide triggerOnce duration={200}>
          <ul id="menu-items">
            {
              getItensFromCurrent().map(item => (
                <li className="menu-item" key={`${item.icon||'nada'}-${item.label}`}>
                  <a href="#" onClick={() => onClickMenuItem(item)}>
                    <span className={`icon ${item.icon}`}></span>
                    <span className="label">{item.label}</span>
                    {
                      item.children && (
                        <span className="icon fas fa-caret-right" />
                      )
                    }
                  </a>
                </li>
              ))
            }
          </ul>
        </Slide>
      </div>
      <div id="menu-footer">V1.0.0</div>
    </div>
  );
}

export default App;
