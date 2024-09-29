import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; 

const initUserData = {
  id: 0,
  email: '',
  name: '',
};

const ProUser = {
  id: 1,
  email: '123@test.com',
  password: '123456',
  name: '小鑫',
};

// 建立Context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
 
  // 認證狀態管理
  const [auth, setAuth] = useState({
    isAuth: false,
    userData: initUserData,
  });
  const navigate = useNavigate();

  // 處理登出
  const handleLogout = () => {
    try {
      // 移除cookie中的登入資訊
      Cookies.remove('authData'); // 合併後只需移除一個 cookie

      // 更新認證狀態
      const nextAuth = {
        isAuth: false,
        userData: initUserData,
      };

      setAuth(nextAuth);

      toast.success('成功登出');
    } catch (e) {
      console.error(e);
    }
  };

  // 處理登入並儲存cookie
  const handleLogin = (email, password) => {
    try {
      // 檢查用戶輸入是否正確
      if (password === ProUser.password && email === ProUser.email) {
        // 模擬登入成功後，將 token 和用戶資料合併存入一個 cookie
        const authData = {
          token: 'fake-jwt-token', // 模擬的 token
          userData: {
            id: ProUser.id,
            email: ProUser.email,
            name: ProUser.name,
          },        // 使用者資料
        };
        Cookies.set('authData', JSON.stringify(authData), { expires: 1 });

        // 更新認證狀態
        const nextAuth = {
          isAuth: true,
          userData: {
            id: ProUser.id,
            email: ProUser.email,
            name: ProUser.name,
          }, 
        };

        setAuth(nextAuth);

        toast.success('登入成功');

        navigate('/');
      } else {
        toast.error('帳號或密碼錯誤');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 從cookie中取得token和用戶資料
  const getAuthHeader = () => {
    const authData = Cookies.get('authData');
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      return {
        Authorization: `Bearer ${parsedAuthData.token}`,
      };
    }
    return {};
  };

  useEffect(() => {
    // 初次加載時檢查cookie中是否有token，並恢復登入狀態
    const authData = Cookies.get('authData');
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      setAuth({
        isAuth: true,
        userData: parsedAuthData.userData, // 恢復用戶資料
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        handleLogin,
        handleLogout,
        getAuthHeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 專用的useAuth勾子
export const useAuth = () => useContext(AuthContext);
