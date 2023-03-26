import { useTranslation } from 'react-i18next';
import React from 'react';
import OutfireBlock from '@/components/OutfireBlock';
import FlashCatTag from '@/components/FlashCatTag';
import SuccessRate from '../successRate';
export default function index() {
  const { t } = useTranslation();
  return (
    <OutfireBlock title={t('训练饱和度')} type='both'>
      <div
        style={{
          padding: 20,
          display: 'flex',
        }}
      >
        <div>
          <FlashCatTag text={t('咕咕鸡')} />
          <div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#262626',
              }}
            >
              79.743
              <span
                style={{
                  fontSize: 12,
                  marginLeft: 6,
                }}
              >
                %
              </span>
            </div>
            <div
              style={{
                color: '#595959',
              }}
            >
              {t('最近1年出勤率')}
            </div>
          </div>
        </div>
        <div
          style={{
            margin: '0 15px 5px',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <SuccessRate type='error' value={79.743} />
        </div>
        <div
          style={{
            color: '#595959',
          }}
        >
          <div>{t('天 100.00%')}</div>
          <div>{t('周 90.35%')}</div>
          <div
            style={{
              margin: '2px 0 2px -7px',
            }}
          >
            <FlashCatTag text={t('月 79.35%')} />
          </div>
          <div>{t('季 50.35%')}</div>
        </div>
      </div>
    </OutfireBlock>
  );
}
