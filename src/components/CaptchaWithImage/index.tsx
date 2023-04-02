import React, { useState, useRef, ReactElement } from 'react';
import { Form, FormInstance, Input, Button } from 'antd';

import './index.less';
import classnames from 'classnames';
interface LoginProps {
  fields?: ReactElement;
  available: boolean;
  destinationField: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Props {
  verticalAlign?: 'top' | 'middle';
  codeField?: string;
  handleSubmit?: () => void;
}

export default function CaptchaWithImage(props: LoginProps & Props) {
  const { codeField = 'code', handleSubmit, verticalAlign = 'middle' } = props;
  const _available = (props as LoginProps).available;
  const [form] = Form.useForm();
  const [countDown, setCountDown] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout>();
  const [showImage, setShowImage] = useState<boolean | undefined>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [mockShowImage, setMockShowImage] = useState(true);
  const handleSendCode = async () => {
    const { imageCode } = form.getFieldsValue();
    if (countDown > 0 || !_available) return;
    const showVarifyImage = mockShowImage;
    setMockShowImage(!mockShowImage);

    if (showVarifyImage) {
      setShowImage(true);
      setImageUrl(
        'data:image/jpeg;base64,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',
      );
    } else {
      if (showImage) {
        setShowImage(false);
      }
      form.setFieldsValue({ [codeField]: '' });
      setCountDown(60);
      intervalRef.current = setInterval(() => {
        setCountDown((countDown) => {
          if (countDown <= 1 && intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return countDown - 1;
        });
      }, 1000);
    }
  };

  const refreshImage = async () => {
    setImageUrl(
      'data:image/jpeg;base64,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',
    );
  };

  const handleImageCodeChange = (e) => {
    const imageCode = e.target.value;
    if (imageCode.length !== 4) return;
    handleSendCode();
    form.setFieldsValue({ imageCode: '' });
  };
  return (
    <>
      <div
        style={{ display: showImage === true ? 'block' : 'none' }}
        className={classnames({
          'captcha-block': true,
          verticalAlign: verticalAlign === 'middle',
          back: showImage === false,
          front: showImage === true,
        })}
      >
        <Form.Item
          name='imageCode'
          rules={[
            () => ({
              validator(_, value) {
                if (showImage && (!value || value.length === 0)) {
                  return Promise.reject(new Error('请输入图形验证码'));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input placeholder={'请输入图形验证码'} onChange={handleImageCodeChange} />
        </Form.Item>
        <Form.Item>
          <img src={imageUrl} className='w-full' onClick={refreshImage} />
        </Form.Item>
      </div>
      <div
        className={classnames({
          'captcha-block': true,
          verticalAlign: verticalAlign === 'middle',
          back: showImage === true,
          front: showImage === false,
        })}
      >
        {(props as LoginProps).fields}
        <Form.Item
          name={codeField}
          rules={[
            () => ({
              validator(_, value) {
                if (!value || value.length === 0) {
                  return Promise.reject(new Error('请输入验证码'));
                }
                return Promise.resolve();
              },
            }),
          ]}
          className='captcha-input-formitem'
        >
          <Input
            type='number'
            placeholder={'请输入验证码'}
            onPressEnter={handleSubmit}
            suffix={
              <span
                onClick={handleSendCode}
                className={_available && countDown <= 0 ? 'text-link-color' : 'text-hint-color'}
                style={{
                  cursor: _available && countDown <= 0 ? 'pointer' : 'default',
                }}
              >
                {countDown > 0 ? `重新发送(${countDown})` : '发送验证码'}
              </span>
            }
          />
        </Form.Item>
      </div>
    </>
  );
}
