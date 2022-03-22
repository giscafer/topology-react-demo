import Footer from '@/components/Footer';
import type { YongHuMingMiMaDengLuQingQiuCanShu } from '@/rh/apis/Base/data-contracts';
import { setUserAuthInfo } from '@/rh/apis/http-client';
import { THEME_KEY } from '@/shared/constant';
import { encrypt } from '@/utils/utils';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Alert, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { history, Link, useModel } from 'umi';
import { colorSet } from '../../../../config/theme';
import styles from './index.less';

interface ILoginResult {
  status?: 'fail' | 'success';
  msg?: string;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/** 此方法会跳转到 redirect 参数所在的位置 */
const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<ILoginResult>({});
  const { userLogin } = useModel('base.user');
  const { initialState, setInitialState } = useModel('@@initialState');

  useEffect(() => {
    const color = window?.localStorage.getItem(THEME_KEY) || colorSet[0];
    (window as any).less.modifyVars({ 'primary-color': color });
  }, []);

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      setInitialState({
        ...initialState,
        currentUser: userInfo,
      });
    }
  };

  const handleSubmit = async (values: YongHuMingMiMaDengLuQingQiuCanShu) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await userLogin({
        ...values,
        password: encrypt.encrypt(values.password) || '',
      });
      // 存储登录token信息
      setUserAuthInfo(msg as any);
      // 重置登录状态信息
      setUserLoginState({
        status: 'success',
        msg: '',
      });
      await fetchUserInfo();
      goto();
    } catch (error: any) {
      // 如果失败去设置用户错误信息
      setUserLoginState({
        status: 'fail',
        msg: (error?.message as string) || '',
      });
    }
    setSubmitting(false);
    // 绕过登陆
    // 存储登录token信息
    setUserAuthInfo({
      expireTime: 3471264000000,
      firstLogin: true,
      token: 'eyJ0eXAiOiJKV1QiLCJhbGc',
    });

    // 重置登录状态信息
    setUserLoginState({
      status: 'success',
      msg: '',
    });
    goto();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Link to="/">
            <img
              alt="logo"
              className={styles.logo}
              src="/logo.svg"
              width={32}
            />
            <Divider type="vertical" />
            <span className={styles.title}>RootHub Scaffold</span>
          </Link>
        </div>
        <div className={styles.right}>
          <Link to="/">注册账号</Link>
          <Link to="/">帮助中心</Link>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.imgWrapper}>
          <img alt="logo" className={styles.bg} src="/bgimg.png" />
        </div>
        <div className={styles.main}>
          <div className={styles.loginTitle}>账号登录</div>
          <ProForm
            onFinish={async (values) => {
              handleSubmit(values as YongHuMingMiMaDengLuQingQiuCanShu);
            }}
            submitter={{
              searchConfig: {
                submitText: '登 录',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                  fontSize: '14px',
                },
              },
            }}
          >
            {userLoginState.status === 'fail' &&
              userLoginState.msg !== undefined && (
                <LoginMessage content={userLoginState.msg} />
              )}
            <ProFormText
              name="mobile"
              label="手机号码"
              fieldProps={{
                size: 'large',
                maxLength: 11,
              }}
              placeholder="请输入手机号码(随意手机)"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '不合法的手机号格式!',
                },
              ]}
            />
            <ProFormText.Password
              label="密码"
              name="password"
              fieldProps={{
                size: 'large',
              }}
              rules={[
                {
                  required: true,
                  message: '请输入密码!',
                },
              ]}
              placeholder="请输入密码(随意)"
            />
          </ProForm>
          <a
            style={{
              float: 'right',
              marginTop: '12px',
              fontSize: '12px',
            }}
          >
            忘记密码
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
