import React from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
// 사용할 아이콘 import
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';
// FontAwesomIcon 컴포넌트를 사용하기 위해 import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  // 현재 선택된 아이콘을 관리하는 state
  const locationNow = useLocation();

  //   const userId = sessionStorage.getItem('email');
  //   const userRole = sessionStorage.getItem('role');
  //   const storeId = sessionStorage.getItem('storeid');
  //   const token = sessionStorage.getItem('token');

  //   let url;

  const navigate = useNavigate();

  const handleConnectUser = () => {
    // 유저버튼 클릭 시 로그인 상태 체크 후 라우팅 진행.
    // if (userId === null) {
    //   navigate('/login');
    // } else if (userId !== null) {
    //   navigate('/user');
    // }
  };
  return (
    <nav className="flex justify-evenly fixed bottom-0 left-0 right-0 h-10 max-w-[400px] mx-auto">
      {/* 하단 네비게이션 최상위 태그 */}
      <Link to="/" className="nav-link">
        <div>
          <FontAwesomeIcon
            icon={faHome}
            className={
              locationNow.pathname === '/'
                ? 'nav-item active-nav-item'
                : 'nav-item'
            }
          />
          {/* 네비게이션을 구성하고 있는 하나의 버튼 */}
        </div>
      </Link>
      <Link to="/mypage" className="nav-link">
        <div>
          <FontAwesomeIcon
            icon={faUser}
            className={
              locationNow.pathname === '/mypage'
                ? 'nav-item active-nav-item'
                : 'nav-item'
            }
          />
        </div>
      </Link>

      {/* <div onClick={handleConnectUser} className="nav-link">
        <FontAwesomeIcon
          icon="user"
          className={
            locationNow.pathname === '/user'
              ? 'nav-item active-nav-item'
              : 'nav-item'
          }
        />
      </div> */}
    </nav>
  );
};

export default Navbar;
